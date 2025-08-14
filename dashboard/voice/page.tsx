import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { VoiceCloneUploader } from "@/components/dashboard/voice-clone-uploader"
import { VoiceTester } from "@/components/dashboard/voice-tester"
import { Button } from "@/components/ui/button"
import { Mic, Play, Trash2 } from "lucide-react"

export default async function VoicePage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: voiceClones } = await supabase
    .from("voice_clones")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header title="Voice Clones" subtitle="Create and manage your AI voice clones for emotional automation" />

      <div className="p-8 space-y-8">
        {/* Voice Clones Grid */}
        {voiceClones && voiceClones.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Voice Clones</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {voiceClones.map((voice) => (
                <div
                  key={voice.id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        voice.status === "ready"
                          ? "bg-green-500/20 text-green-400"
                          : voice.status === "processing"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {voice.status}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{voice.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Created {new Date(voice.created_at).toLocaleDateString()}
                  </p>

                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white flex-1"
                      disabled={voice.status !== "ready"}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Test
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          <VoiceCloneUploader />
          <VoiceTester voiceClones={voiceClones || []} />
        </div>
      </div>
    </div>
  )
}
