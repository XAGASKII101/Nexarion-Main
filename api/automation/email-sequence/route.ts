import { type NextRequest, NextResponse } from "next/server"
import { generateEmailSequence } from "@/lib/openai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const { leadEmail, leadName, source, businessContext } = await req.json()

    if (!leadEmail || !source) {
      return NextResponse.json({ error: "Lead email and source are required" }, { status: 400 })
    }

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's business context
    const { data: userProfile } = await supabase.from("users").select("*").eq("id", user.id).single()

    const defaultBusinessContext = {
      name: userProfile?.full_name || "Business",
      industry: "Digital Services",
      value_proposition: "Helping businesses grow through automation",
    }

    const finalBusinessContext = { ...defaultBusinessContext, ...businessContext }

    const leadInfo = {
      name: leadName,
      email: leadEmail,
      source,
    }

    const result = await generateEmailSequence(leadInfo, finalBusinessContext)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Save the email sequence
    const { error: saveError } = await supabase.from("automation_responses").insert({
      user_id: user.id,
      platform: "email",
      trigger_content: `Lead from ${source}: ${leadEmail}`,
      response_content: result.email,
      response_type: "sequence",
      status: "pending",
    })

    if (saveError) {
      console.error("Failed to save email sequence:", saveError)
    }

    return NextResponse.json({
      success: true,
      email: result.email,
      leadInfo,
    })
  } catch (error) {
    console.error("Email sequence error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
