import type { NextRequest } from "next/server"
import { generateStreamingResponse, type ChatMessage, type AutomationContext } from "@/lib/openai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const { messages, automationId } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages array is required", { status: 400 })
    }

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Get automation context if provided
    let context: AutomationContext = {
      platform: "instagram",
      triggerType: "comment",
    }

    let userProfile = null

    if (automationId) {
      const { data: automation } = await supabase
        .from("automations")
        .select("*")
        .eq("id", automationId)
        .eq("user_id", user.id)
        .single()

      if (automation) {
        context = {
          platform: automation.platform,
          triggerType: automation.trigger_type,
          responseTemplate: automation.response_template,
        }
      }
    }

    // Get user profile for personalization
    const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

    if (profile) {
      userProfile = {
        full_name: profile.full_name,
        brand_voice: profile.brand_voice,
      }
    }

    const response = await generateStreamingResponse(messages as ChatMessage[], context, userProfile)
    return response
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
