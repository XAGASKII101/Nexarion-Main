export interface GmailMessage {
  id: string
  threadId: string
  snippet: string
  payload: {
    headers: Array<{ name: string; value: string }>
    body?: { data: string }
    parts?: Array<{
      mimeType: string
      body: { data: string }
    }>
  }
  internalDate: string
}

export interface EmailTemplate {
  subject: string
  body: string
  isHtml?: boolean
}

export class GmailClient {
  private accessToken: string
  private baseUrl = "https://gmail.googleapis.com/gmail/v1"

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Gmail API error: ${response.statusText}`)
    }

    return response.json()
  }

  async getProfile() {
    return this.makeRequest("/users/me/profile")
  }

  async getMessages(query?: string, maxResults = 10) {
    const params = new URLSearchParams({
      maxResults: maxResults.toString(),
      ...(query && { q: query }),
    })

    return this.makeRequest(`/users/me/messages?${params.toString()}`)
  }

  async getMessage(messageId: string) {
    return this.makeRequest(`/users/me/messages/${messageId}`)
  }

  async sendEmail(to: string, subject: string, body: string, isHtml = false) {
    const mimeType = isHtml ? "text/html" : "text/plain"

    const email = [`To: ${to}`, `Subject: ${subject}`, `Content-Type: ${mimeType}; charset=utf-8`, "", body].join("\n")

    const encodedEmail = btoa(email).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

    return this.makeRequest("/users/me/messages/send", {
      method: "POST",
      body: JSON.stringify({
        raw: encodedEmail,
      }),
    })
  }

  async createDraft(to: string, subject: string, body: string, isHtml = false) {
    const mimeType = isHtml ? "text/html" : "text/plain"

    const email = [`To: ${to}`, `Subject: ${subject}`, `Content-Type: ${mimeType}; charset=utf-8`, "", body].join("\n")

    const encodedEmail = btoa(email).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

    return this.makeRequest("/users/me/drafts", {
      method: "POST",
      body: JSON.stringify({
        message: {
          raw: encodedEmail,
        },
      }),
    })
  }

  async sendBulkEmails(emails: Array<{ to: string; subject: string; body: string; isHtml?: boolean }>) {
    const results = []

    for (const email of emails) {
      try {
        const result = await this.sendEmail(email.to, email.subject, email.body, email.isHtml)
        results.push({ success: true, result })
      } catch (error) {
        results.push({ success: false, error: error instanceof Error ? error.message : "Unknown error" })
      }
    }

    return results
  }

  static getAuthUrl(clientId: string, redirectUri: string, state?: string): string {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly",
      access_type: "offline",
      prompt: "consent",
      ...(state && { state }),
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  static async exchangeCodeForToken(
    clientId: string,
    clientSecret: string,
    code: string,
    redirectUri: string,
  ): Promise<{ access_token: string; refresh_token: string; expires_in: number }> {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to exchange code for token")
    }

    return response.json()
  }

  static async refreshToken(
    clientId: string,
    clientSecret: string,
    refreshToken: string,
  ): Promise<{ access_token: string; expires_in: number }> {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    return response.json()
  }
}

export function createGmailClient(accessToken: string) {
  return new GmailClient(accessToken)
}
