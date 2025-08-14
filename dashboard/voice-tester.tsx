"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Loader2, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VoiceTesterProps {
  voiceClones: Array<{
    id: string
    name: string
    status: string
  }>
}

export function VoiceTester({ voiceClones }: VoiceTesterProps) {
  const [selectedVoice, setSelectedVoice] = useState("")
  const [text, setText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!selectedVoice || !text.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a voice and enter text to synthesize",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setAudioUrl(null)

    try {
      const response = await fetch("/api/voice/synthesize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voiceCloneId: selectedVoice,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate voice")
      }

      // Convert base64 to blob URL
      const audioBlob = new Blob([Uint8Array.from(atob(result.audioData), (c) => c.charCodeAt(0))], {
        type: result.mimeType,
      })
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)

      toast({
        title: "Voice generated!",
        description: "Your voice message is ready to play.",
      })
    } catch (error) {
      console.error("Voice generation error:", error)
      toast({
        title: "Voice generation failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement("a")
      a.href = audioUrl
      a.download = "voice-message.mp3"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const readyVoices = voiceClones.filter((voice) => voice.status === "ready")

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-bold text-white mb-6">Test Voice Synthesis</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Select Voice</label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500">
              <SelectValue placeholder="Choose a voice clone" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {readyVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id} className="text-white hover:bg-slate-700">
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Text to Synthesize</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 min-h-[100px]"
            maxLength={1000}
          />
          <p className="text-xs text-slate-500 mt-1">{text.length}/1000 characters</p>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !selectedVoice || !text.trim() || readyVoices.length === 0}
          className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Voice...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Generate Voice Message
            </>
          )}
        </Button>

        {audioUrl && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-white">Generated Voice Message</h4>
              <Button variant="ghost" size="sm" onClick={handleDownload} className="text-slate-400 hover:text-white">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {readyVoices.length === 0 && (
          <div className="text-center py-4 text-slate-400">
            <p>No voice clones available. Create a voice clone first to test synthesis.</p>
          </div>
        )}
      </div>
    </div>
  )
}
