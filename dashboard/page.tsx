import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { MessageSquare, Bot, Mic, TrendingUp, Instagram, Mail } from "lucide-react"

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user's automations and stats
  const { data: automations } = await supabase.from("automations").select("*").eq("user_id", user.id)

  const { data: responses } = await supabase
    .from("automation_responses")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  const { data: voiceClones } = await supabase.from("voice_clones").select("*").eq("user_id", user.id)

  const activeAutomations = automations?.filter((a) => a.status === "active").length || 0
  const totalResponses = responses?.length || 0
  const totalVoiceClones = voiceClones?.length || 0

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header title="Dashboard" subtitle="Welcome back! Here's what's happening with your automations." />

      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Automations"
            value={activeAutomations.toString()}
            change="+12%"
            changeType="positive"
            icon={Bot}
          />
          <StatsCard
            title="Responses This Month"
            value={totalResponses.toString()}
            change="+23%"
            changeType="positive"
            icon={MessageSquare}
          />
          <StatsCard
            title="Voice Clones"
            value={totalVoiceClones.toString()}
            change="0%"
            changeType="neutral"
            icon={Mic}
          />
          <StatsCard title="Conversion Rate" value="24.5%" change="+5.2%" changeType="positive" icon={TrendingUp} />
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Recent Automations</h3>
            <div className="space-y-4">
              {automations?.slice(0, 5).map((automation) => (
                <div key={automation.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                      {automation.platform === "instagram" && <Instagram className="w-4 h-4 text-white" />}
                      {automation.platform === "email" && <Mail className="w-4 h-4 text-white" />}
                      {automation.platform === "whatsapp" && <MessageSquare className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <div className="font-medium text-white">{automation.name}</div>
                      <div className="text-sm text-slate-400 capitalize">{automation.platform}</div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      automation.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-500/20 text-slate-400"
                    }`}
                  >
                    {automation.status}
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-slate-400">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No automations yet. Create your first one!</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Platform Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Instagram className="w-8 h-8 text-pink-400" />
                  <div>
                    <div className="font-medium text-white">Instagram</div>
                    <div className="text-sm text-slate-400">142 responses</div>
                  </div>
                </div>
                <div className="text-green-400 font-medium">+18%</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="font-medium text-white">WhatsApp</div>
                    <div className="text-sm text-slate-400">89 responses</div>
                  </div>
                </div>
                <div className="text-green-400 font-medium">+12%</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div className="text-sm text-slate-400">67 responses</div>
                  </div>
                </div>
                <div className="text-green-400 font-medium">+8%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
