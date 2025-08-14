"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Mic, X, Play, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VoiceCloneUploaderProps {
  onSuccess?: (voiceClone: any) => void
}

export function VoiceCloneUploader({ onSuccess }: VoiceCloneUploaderProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [audioFiles, setAudioFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const audioFiles = files.filter((file) => file.type.startsWith("audio/"))

    if (audioFiles.length !== files.length) {
      toast({
        title: "Invalid files",
        description: "Please select only audio files",
        variant: "destructive",
      })
    }

    setAudioFiles((prev) => [...prev, ...audioFiles].slice(0, 5)) // Max 5 files
  }

  const removeFile = (index: number) => {
    setAudioFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || audioFiles.length === 0) {
      toast({
        title: "Missing information",
        description: "Please provide a name and at least one audio file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)

      audioFiles.forEach((file) => {
        formData.append("audioFiles", file)
      })

      const response = await fetch("/api/voice/clone", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create voice clone")
      }

      toast({
        title: "Voice clone created!",
        description: "Your voice has been successfully cloned and is ready to use.",
      })

      // Reset form
      setName("")
      setDescription("")
      setAudioFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      onSuccess?.(result.voiceClone)
    } catch (error) {
      console.error("Voice cloning error:", error)
      toast({
        title: "Voice cloning failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Mic className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Create Voice Clone</h3>
          <p className="text-slate-400">Upload audio samples to clone your voice</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Voice Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., My Professional Voice"
            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description (Optional)</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe when to use this voice..."
            className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Audio Samples ({audioFiles.length}/5)</label>
          <div className="space-y-4">
            <div
              className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-300 mb-1">Click to upload audio files</p>
              <p className="text-sm text-slate-500">MP3, WAV, M4A up to 10MB each</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {audioFiles.length > 0 && (
              <div className="space-y-2">
                {audioFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center space-x-3">
                      <Mic className="w-4 h-4 text-cyan-400" />
                      <div>
                        <p className="text-sm text-white font-medium">{file.name}</p>
                        <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button type="button" variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
          <h4 className="text-sm font-medium text-white mb-2">Tips for better voice cloning:</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>• Upload 3-5 clear audio samples (1-2 minutes each)</li>
            <li>• Speak naturally and clearly</li>
            <li>• Include different emotions and tones</li>
            <li>• Avoid background noise</li>
            <li>• Use high-quality recordings (44.1kHz, 16-bit minimum)</li>
          </ul>
        </div>

        <Button
          type="submit"
          disabled={isUploading || !name.trim() || audioFiles.length === 0}
          className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Voice Clone...
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              Create Voice Clone
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
