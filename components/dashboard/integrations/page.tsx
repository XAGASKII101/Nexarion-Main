"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/dashboard/header"
import { IntegrationCard } from "@/components/dashboard/integration-card"
import { WhatsAppTester } from "@/components/dashboard/whatsapp-tester"
import { Instagram, Mail, MessageSquare, Smartphone, Zap } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface IntegrationAccount {
  id: string
  platform: string
  account_name: string
  status: string
  account_data: any
  created_at: string
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationAccount[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadIntegrations()
    checkUrlParams()
  }, [])

  const checkUrlParams = () => {
    const params = new URLSearchParams(window.location.search)
    const success = params.get("success")
    const error = params.get("error")

    if (success) {
      const messages = {
        instagram_connected: "Instagram account connected successfully!",
        gmail_connected: "Gmail account connected successfully!",
        whatsapp_connected: "WhatsApp account connected successfully!",
      }
      setMessage({
        type: "success",
        text: messages[success as keyof typeof messages] || "Account connected successfully!",
      })
      // Clean URL
      window.history.replaceState({}, "", "/dashboard/integrations")
    }

    if (error) {
      const messages = {
        instagram_auth_failed: "Instagram authentication failed. Please try again.",
        gmail_auth_failed: "Gmail authentication failed. Please try again.",
        whatsapp_auth_failed: "WhatsApp authentication failed. Please try again.",
        missing_parameters: "Authentication failed due to missing parameters.",
        database_error: "Database error occurred. Please try again.",
        callback_failed: "Authentication callback failed. Please try again.",
      }
      setMessage({
        type: "error",
        text: messages[error as keyof typeof messages] || "An error occurred. Please try again.",
      })
      // Clean URL
      window.history.replaceState({}, "", "/dashboard/integrations")
    }
  }

  const loadIntegrations = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      setUser(user)

      const { data, error } = await supabase
        .from("integration_accounts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading integrations:", error)
        return
      }

      setIntegrations(data || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = async (accountId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("integration_accounts").delete().eq("id", accountId)

      if (error) {
        throw error
      }

      setIntegrations((prev) => prev.filter((int) => int.id !== accountId))
    } catch (error) {
      console.error("Disconnect error:", error)
      throw error
    }
  }

  const getIntegrationAccount = (platform: string) => {
    return integrations.find((int) => int.platform === platform && int.status === "active")
  }

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header title="Integrations" subtitle="Loading integrations..." />
        <div className="p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-slate-800/50 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header title="Integrations" subtitle="Connect and manage your platform integrations" />

      <div className="p-8 space-y-8">
        {message && (
          <Alert
            className={`border ${message.type === "success" ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
          >
            <AlertDescription className={message.type === "success" ? "text-green-400" : "text-red-400"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Integration Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard
            platform="instagram"
            title="Instagram"
            description="Automate comments and DM responses"
            icon={<Instagram className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-pink-500 to-purple-500"
            account={getIntegrationAccount("instagram")}
            userId={user?.id}
            onConnect={() => {}}
            onDisconnect={handleDisconnect}
          />

          <IntegrationCard
            platform="gmail"
            title="Gmail"
            description="Send automated email sequences"
            icon={<Mail className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-red-500 to-orange-500"
            account={getIntegrationAccount("gmail")}
            userId={user?.id}
            onConnect={() => {}}
            onDisconnect={handleDisconnect}
          />

          <IntegrationCard
            platform="whatsapp"
            title="WhatsApp Business"
            description="Send messages via WhatsApp API"
            icon={<MessageSquare className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-green-500 to-emerald-500"
            account={getIntegrationAccount("whatsapp")}
            userId={user?.id}
            onConnect={() => {}}
            onDisconnect={handleDisconnect}
          />
        </div>

        {/* Testing Tools */}
        <div className="grid lg:grid-cols-2 gap-8">
          <WhatsAppTester />

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Automation Workflow</h3>
                <p className="text-slate-400">How your integrations work together</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-white">Instagram Trigger</h4>
                  <p className="text-sm text-slate-400">User comments or sends DM</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-white">WhatsApp Follow-up</h4>
                  <p className="text-sm text-slate-400">AI sends personalized WhatsApp message</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-white">Email Sequence</h4>
                  <p className="text-sm text-slate-400">Automated email nurturing begins</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">Pro Tip</span>
              </div>
              <p className="text-sm text-slate-300">
                Connect all three platforms to create powerful cross-platform automation workflows that maximize your
                conversion rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
