import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createGmailClient } from "@/lib/gmail"

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body, isHtml = false, automationId } = await req.json()

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get Gmail integration
    const { data: integration } = await supabase
      .from("integration_accounts")
      .select("*")
      .eq("user_id", user.id)
      .eq("platform", "gmail")
      .eq("status", "active")
      .single()

    if (!integration) {
      return NextResponse.json({ error: "Gmail not connected" }, { status: 400 })
    }

    // Check if token needs refresh
    const accessToken = integration.access_token
    if (integration.token_expires_at && new Date(integration.token_expires_at) <= new Date()) {
      // Refresh token logic would go here
      // For now, return error
      return NextResponse.json({ error: "Token expired, please reconnect Gmail" }, { status: 401 })
    }

    const gmailClient = createGmailClient(accessToken)
    const result = await gmailClient.sendEmail(to, subject, body, isHtml)

    // Log the sent email
    if (automationId) {
      await supabase.from("automation_responses").insert({
        automation_id: automationId,
        user_id: user.id,
        platform: "gmail",
        trigger_content: `Email to ${to}`,
        response_content: body,
        response_type: "email",
        status: "sent",
      })
    }

    return NextResponse.json({ success: true, messageId: result.id })
  } catch (error) {
    console.error("Gmail send error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
