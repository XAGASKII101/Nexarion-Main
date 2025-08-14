export interface WhatsAppMessage {
  to: string
  type: "text" | "template" | "interactive" | "audio"
  text?: {
    body: string
  }
  template?: {
    name: string
    language: {
      code: string
    }
    components?: Array<{
      type: string
      parameters: Array<{
        type: string
        text: string
      }>
    }>
  }
  audio?: {
    id?: string
    link?: string
  }
}

export interface WhatsAppWebhookMessage {
  from: string
  id: string
  timestamp: string
  text?: {
    body: string
  }
  type: string
  context?: {
    from: string
    id: string
  }
}

export class WhatsAppClient {
  private accessToken: string
  private phoneNumberId: string
  private apiVersion: string
  private baseUrl: string

  constructor() {
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN!
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!
    this.apiVersion = "v18.0"
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`

    if (!this.accessToken || !this.phoneNumberId) {
      throw new Error("WhatsApp credentials not configured")
    }
  }

  async sendMessage(message: WhatsAppMessage): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("WhatsApp API error:", data)
        return {
          success: false,
          error: data.error?.message || "Failed to send message",
        }
      }

      return {
        success: true,
        messageId: data.messages?.[0]?.id,
      }
    } catch (error) {
      console.error("WhatsApp send error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async sendTextMessage(to: string, text: string) {
    return this.sendMessage({
      to,
      type: "text",
      text: { body: text },
    })
  }

  async sendAudioMessage(to: string, audioUrl: string) {
    return this.sendMessage({
      to,
      type: "audio",
      audio: { link: audioUrl },
    })
  }

  async sendTemplateMessage(to: string, templateName: string, languageCode = "en_US", parameters: string[] = []) {
    const components =
      parameters.length > 0
        ? [
            {
              type: "body",
              parameters: parameters.map((param) => ({
                type: "text",
                text: param,
              })),
            },
          ]
        : undefined

    return this.sendMessage({
      to,
      type: "template",
      template: {
        name: templateName,
        language: { code: languageCode },
        components,
      },
    })
  }

  async markAsRead(messageId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          status: "read",
          message_id: messageId,
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Failed to mark message as read:", error)
      return false
    }
  }

  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN

    if (mode === "subscribe" && token === verifyToken) {
      return challenge
    }

    return null
  }

  parseWebhookPayload(body: any): WhatsAppWebhookMessage[] {
    const messages: WhatsAppWebhookMessage[] = []

    try {
      if (body.object === "whatsapp_business_account") {
        for (const entry of body.entry || []) {
          for (const change of entry.changes || []) {
            if (change.field === "messages") {
              for (const message of change.value?.messages || []) {
                messages.push({
                  from: message.from,
                  id: message.id,
                  timestamp: message.timestamp,
                  text: message.text,
                  type: message.type,
                  context: message.context,
                })
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to parse WhatsApp webhook payload:", error)
    }

    return messages
  }
}

export function createWhatsAppClient() {
  return new WhatsAppClient()
}
