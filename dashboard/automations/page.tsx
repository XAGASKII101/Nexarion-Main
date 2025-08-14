import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Plus, Bot, Play, Pause, Settings } from "lucide-react"
import Link from "next/link"

export default async function AutomationsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: automations } = await supabase
    .from("automations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header title="Automations" subtitle="Manage your AI-powered automation workflows" />

      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Automations</h2>
            <p className="text-slate-400">Create and manage intelligent automation workflows</p>
          </div>
          <Link href="/dashboard/automations/new">
            <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Automation
            </Button>
          </Link>
        </div>

        {automations && automations.length > 0 ? (
          <div className="grid gap-6">
            {automations.map((automation) => (
              <div
                key={automation.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{automation.name}</h3>
                      <p className="text-slate-400">{automation.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-slate-500 capitalize">Platform: {automation.platform}</span>
                        <span className="text-sm text-slate-500 capitalize">Trigger: {automation.trigger_type}</span>
                        {automation.voice_enabled && <span className="text-sm text-cyan-400">Voice Enabled</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        automation.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : automation.status === "paused"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {automation.status}
                    </div>

                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      {automation.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bot className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No automations yet</h3>
            <p className="text-slate-400 mb-6">Create your first automation to start converting leads automatically</p>
            <Link href="/dashboard/automations/new">
              <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Automation
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
