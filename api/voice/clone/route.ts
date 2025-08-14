import { type NextRequest, NextResponse } from "next/server"
import { createElevenLabsClient } from "@/lib/elevenlabs"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const audioFiles = formData.getAll("audioFiles") as File[]

    if (!name || audioFiles.length === 0) {
      return NextResponse.json({ error: "Name and audio files are required" }, { status: 400 })
    }

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create ElevenLabs client
    const elevenLabs = await createElevenLabsClient()

    // Clone the voice
    const cloneResult = await elevenLabs.cloneVoice(audioFiles, {
      name,
      description,
      labels: {
        user_id: user.id,
        created_by: "nexarion_ai",
      },
    })

    // Save voice clone to database
    const { data: voiceClone, error: dbError } = await supabase
      .from("voice_clones")
      .insert({
        user_id: user.id,
        name,
        elevenlabs_voice_id: cloneResult.voice_id,
        status: "ready",
      })
      .select()
      .single()

    if (dbError) {
      console.error("Failed to save voice clone:", dbError)
      // Try to clean up the ElevenLabs voice
      try {
        await elevenLabs.deleteVoice(cloneResult.voice_id)
      } catch (cleanupError) {
        console.error("Failed to cleanup ElevenLabs voice:", cleanupError)
      }
      return NextResponse.json({ error: "Failed to save voice clone" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      voiceClone: {
        id: voiceClone.id,
        name: voiceClone.name,
        elevenlabsVoiceId: voiceClone.elevenlabs_voice_id,
        status: voiceClone.status,
      },
    })
  } catch (error) {
    console.error("Voice cloning error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Voice cloning failed" },
      { status: 500 },
    )
  }
}
