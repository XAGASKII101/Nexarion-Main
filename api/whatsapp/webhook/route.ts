import { type NextRequest, NextResponse } from "next/server"
import { createWhatsAppClient } from "@/lib/whatsapp"
import { createClient } from "@/lib/supabase/server"
import { generateAutomationResponse } from "@/lib/openai"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (!mode || !token || !challenge) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
  }

  try {
    const whatsapp = createWhatsAppClient()
    const verificationChallenge = whatsapp.verifyWebhook(mode, token, challenge)

    if (verificationChallenge) {
      return new NextResponse(verificationChallenge, { status: 200 })
    } else {
      return NextResponse.json({ error: "Verification failed" }, { status: 403 })
    }
  } catch (error) {
    console.error("WhatsApp webhook verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const whatsapp = createWhatsAppClient()
    const messages = whatsapp.parseWebhookPayload(body)

    if (messages.length === 0) {
      return NextResponse.json({ status: "no_messages" })
    }

    const supabase = createClient()

    // Process each incoming message
    for (const message of messages) {
      // Mark message as read
      await whatsapp.markAsRead(message.id)

      // Skip if not a text message
      if (message.type !== "text" || !message.text?.body) {
        continue
      }

      // Find active WhatsApp automations
      const { data: automations } = await supabase
        .from("automations")
        .select("*")
        .eq("platform", "whatsapp")
        .eq("status", "active")

      for (const automation of automations || []) {
        // Get user profile for personalization
        const { data: userProfile } = await supabase.from("users").select("*").eq("id", automation.user_id).single()

        // Generate AI response
        const context = {
          platform: "whatsapp" as const,
          triggerType: automation.trigger_type as any,
          responseTemplate: automation.response_template,
        }

        const aiResponse = await generateAutomationResponse(message.text.body, context, userProfile)

        if (aiResponse.success) {
          // Send response back to WhatsApp
          const sendResult = await whatsapp.sendTextMessage(message.from, aiResponse.response!)

          // Log the interaction
          await supabase.from("automation_responses").insert({
            automation_id: automation.id,
            user_id: automation.user_id,
            platform: "whatsapp",
            trigger_content: message.text.body,
            response_content: aiResponse.response,
            response_type: "text",
            status: sendResult.success ? "sent" : "failed",
          })

          // If voice is enabled and we have a voice clone, send voice message too
          if (automation.voice_enabled && automation.voice_clone_id) {
            // This would integrate with the voice synthesis API
            // Implementation depends on how you want to handle voice message delivery
          }
        }
      }
    }

    return NextResponse.json({ status: "processed" })
  } catch (error) {
    console.error("WhatsApp webhook processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
