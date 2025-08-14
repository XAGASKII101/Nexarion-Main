import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Mock template data - in production, this would come from WhatsApp Business API
const WHATSAPP_TEMPLATES = [
  {
    id: "hello_world",
    name: "hello_world",
    status: "APPROVED",
    category: "UTILITY",
    language: "en_US",
    components: [
      {
        type: "BODY",
        text: "Hello World",
      },
    ],
  },
  {
    id: "welcome_message",
    name: "welcome_message",
    status: "APPROVED",
    category: "MARKETING",
    language: "en_US",
    components: [
      {
        type: "BODY",
        text: "Welcome {{1}}! Thanks for your interest. How can we help you today?",
      },
    ],
  },
  {
    id: "follow_up",
    name: "follow_up",
    status: "APPROVED",
    category: "MARKETING",
    language: "en_US",
    components: [
      {
        type: "BODY",
        text: "Hi {{1}}, just following up on your inquiry about {{2}}. Are you still interested?",
      },
    ],
  },
]

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In production, you would fetch templates from WhatsApp Business API
    // const whatsapp = createWhatsAppClient()
    // const templates = await whatsapp.getMessageTemplates()

    return NextResponse.json({ templates: WHATSAPP_TEMPLATES })
  } catch (error) {
    console.error("Failed to fetch WhatsApp templates:", error)
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}
