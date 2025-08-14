import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: voiceClones, error } = await supabase
      .from("voice_clones")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch voice clones" }, { status: 500 })
    }

    return NextResponse.json({ voiceClones })
  } catch (error) {
    console.error("Failed to list voice clones:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
