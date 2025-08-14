import { type NextRequest, NextResponse } from "next/server"
import { generateVoiceResponse } from "@/lib/elevenlabs"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const { text, voiceCloneId } = await req.json()

    if (!text || !voiceCloneId) {
      return NextResponse.json({ error: "Text and voice clone ID are required" }, { status: 400 })
    }

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get voice clone details
    const { data: voiceClone, error: voiceError } = await supabase
      .from("voice_clones")
      .select("*")
      .eq("id", voiceCloneId)
      .eq("user_id", user.id)
      .single()

    if (voiceError || !voiceClone) {
      return NextResponse.json({ error: "Voice clone not found" }, { status: 404 })
    }

    if (voiceClone.status !== "ready") {
      return NextResponse.json({ error: "Voice clone is not ready" }, { status: 400 })
    }

    // Generate voice response
    const result = await generateVoiceResponse(text, voiceClone.elevenlabs_voice_id)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Convert ArrayBuffer to base64 for JSON response
    const base64Audio = Buffer.from(result.audioBuffer!).toString("base64")

    return NextResponse.json({
      success: true,
      audioData: base64Audio,
      mimeType: "audio/mpeg",
    })
  } catch (error) {
    console.error("Voice synthesis error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Voice synthesis failed" },
      { status: 500 },
    )
  }
}
