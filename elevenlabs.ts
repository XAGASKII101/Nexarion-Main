export interface VoiceCloneSettings {
  name: string
  description?: string
  labels?: Record<string, string>
}

export interface VoiceSynthesisOptions {
  voiceId: string
  text: string
  modelId?: string
  voiceSettings?: {
    stability: number
    similarityBoost: number
    style?: number
    useSpeakerBoost?: boolean
  }
}

export class ElevenLabsClient {
  private apiKey: string
  private baseUrl = "https://api.elevenlabs.io/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getVoices() {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          "xi-api-key": this.apiKey,
        },
      })

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to get voices:", error)
      throw error
    }
  }

  async cloneVoice(audioFiles: File[], settings: VoiceCloneSettings) {
    try {
      const formData = new FormData()
      formData.append("name", settings.name)

      if (settings.description) {
        formData.append("description", settings.description)
      }

      if (settings.labels) {
        formData.append("labels", JSON.stringify(settings.labels))
      }

      // Add audio files
      audioFiles.forEach((file, index) => {
        formData.append("files", file, `sample_${index}.${file.name.split(".").pop()}`)
      })

      const response = await fetch(`${this.baseUrl}/voices/add`, {
        method: "POST",
        headers: {
          "xi-api-key": this.apiKey,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Voice cloning failed: ${errorData.detail?.message || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Voice cloning failed:", error)
      throw error
    }
  }

  async synthesizeSpeech(options: VoiceSynthesisOptions): Promise<ArrayBuffer> {
    try {
      const requestBody = {
        text: options.text,
        model_id: options.modelId || "eleven_multilingual_v2",
        voice_settings: options.voiceSettings || {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.0,
          use_speaker_boost: true,
        },
      }

      const response = await fetch(`${this.baseUrl}/text-to-speech/${options.voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Speech synthesis failed: ${errorData}`)
      }

      return await response.arrayBuffer()
    } catch (error) {
      console.error("Speech synthesis failed:", error)
      throw error
    }
  }

  async deleteVoice(voiceId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/voices/${voiceId}`, {
        method: "DELETE",
        headers: {
          "xi-api-key": this.apiKey,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to delete voice: ${response.statusText}`)
      }

      return { success: true }
    } catch (error) {
      console.error("Failed to delete voice:", error)
      throw error
    }
  }
}

// Server-side helper functions
export async function createElevenLabsClient() {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    throw new Error("ElevenLabs API key not configured")
  }
  return new ElevenLabsClient(apiKey)
}

export async function generateVoiceResponse(text: string, voiceId: string) {
  try {
    const client = await createElevenLabsClient()
    const audioBuffer = await client.synthesizeSpeech({
      voiceId,
      text,
      voiceSettings: {
        stability: 0.6,
        similarityBoost: 0.8,
        style: 0.2,
        useSpeakerBoost: true,
      },
    })

    return { success: true, audioBuffer }
  } catch (error) {
    console.error("Voice generation failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
