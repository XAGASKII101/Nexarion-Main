import { type NextRequest, NextResponse } from "next/server"
import { generateAutomationResponse } from "@/lib/openai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const { automationId, triggerContent, platform, triggerType } = await req.json()

    if (!automationId || !triggerContent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createClient()

    // Get automation details
    const { data: automation, error: automationError } = await supabase
      .from("automations")
      .select("*")
      .eq("id", automationId)
      .single()

    if (automationError || !automation) {
      return NextResponse.json({ error: "Automation not found" }, { status: 404 })
    }

    // Get user profile for personalization
    const { data: userProfile } = await supabase.from("users").select("*").eq("id", automation.user_id).single()

    // Generate AI response
    const context = {
      platform: platform || automation.platform,
      triggerType: triggerType || automation.trigger_type,
      responseTemplate: automation.response_template,
    }

    const result = await generateAutomationResponse(triggerContent, context, userProfile)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Save the response to database
    const { error: saveError } = await supabase.from("automation_responses").insert({
      automation_id: automationId,
      user_id: automation.user_id,
      platform: context.platform,
      trigger_content: triggerContent,
      response_content: result.response,
      response_type: "text",
      status: "sent",
    })

    if (saveError) {
      console.error("Failed to save response:", saveError)
    }

    return NextResponse.json({
      success: true,
      response: result.response,
      automationId,
    })
  } catch (error) {
    console.error("Automation response error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
