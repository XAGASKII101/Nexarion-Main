import { type NextRequest, NextResponse } from "next/server"
import { createWhatsAppClient } from "@/lib/whatsapp"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const { to, message, type = "text", automationId } = await req.json()

    if (!to || !message) {
      return NextResponse.json({ error: "Phone number and message are required" }, { status: 400 })
    }

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const whatsapp = createWhatsAppClient()
    let result

    switch (type) {
      case "text":
        result = await whatsapp.sendTextMessage(to, message)
        break
      case "audio":
        result = await whatsapp.sendAudioMessage(to, message) // message should be audio URL
        break
      case "template":
        const { templateName, parameters = [] } = JSON.parse(message)
        result = await whatsapp.sendTemplateMessage(to, templateName, "en_US", parameters)
        break
      default:
        return NextResponse.json({ error: "Unsupported message type" }, { status: 400 })
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Log the sent message
    if (automationId) {
      await supabase.from("automation_responses").insert({
        automation_id: automationId,
        user_id: user.id,
        platform: "whatsapp",
        trigger_content: `Manual send to ${to}`,
        response_content: message,
        response_type: type,
        status: "sent",
      })
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    })
  } catch (error) {
    console.error("WhatsApp send error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
