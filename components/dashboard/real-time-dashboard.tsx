"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Bot, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AutomationResponse {
  id: string
  automation_id: string
  platform: string
  trigger_content: string
  response_content: string
  response_type: string
  status: string
  created_at: string
  automations: {
    name: string
  }
}

interface WebhookEvent {
  id: string
  platform: string
  event_type: string
  event_data: any
  processed: boolean
  created_at: string
}

export function RealTimeDashboard() {
  const [responses, setResponses] = useState<AutomationResponse[]>([])
  const [events, setEvents] = useState<WebhookEvent[]>([])
  const [stats, setStats] = useState({
    totalResponses: 0,
    successRate: 0,
    activeAutomations: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    const supabase = createClient()

    // Load initial data
    loadInitialData()

    // Subscribe to real-time updates
    const responsesChannel = supabase
      .channel("automation_responses")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "automation_responses",
        },
        (payload) => {
          const newResponse = payload.new as AutomationResponse
          setResponses((prev) => [newResponse, ...prev.slice(0, 9)])

          // Show toast notification
          toast({
            title: "New Response Sent",
            description: `${newResponse.platform} automation responded to a ${newResponse.response_type}`,
          })
        },
      )
      .subscribe()

    const eventsChannel = supabase
      .channel("webhook_events")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "webhook_events",
        },
        (payload) => {
          const newEvent = payload.new as WebhookEvent
          setEvents((prev) => [newEvent, ...prev.slice(0, 9)])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(responsesChannel)
      supabase.removeChannel(eventsChannel)
    }
  }, [toast])

  const loadInitialData = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    // Load recent responses
    const { data: responsesData } = await supabase
      .from("automation_responses")
      .select(`
        *,
        automations (name)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (responsesData) {
      setResponses(responsesData)
    }

    // Load recent events
    const { data: eventsData } = await supabase
      .from("webhook_events")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (eventsData) {
      setEvents(eventsData)
    }

    // Calculate stats
    const { data: allResponses } = await supabase
      .from("automation_responses")
      .select("status")
      .eq("user_id", user.id)
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    const { data: automations } = await supabase.from("automations").select("status").eq("user_id", user.id)

    if (allResponses && automations) {
      const totalResponses = allResponses.length
      const successfulResponses = allResponses.filter((r) => r.status === "sent").length
      const successRate = totalResponses > 0 ? (successfulResponses / totalResponses) * 100 : 0
      const activeAutomations = automations.filter((a) => a.status === "active").length

      setStats({
        totalResponses,
        successRate,
        activeAutomations,
      })
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Real-time Stats */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">24h Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalResponses}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-sm text-green-400">Live updates</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.successRate.toFixed(1)}%</div>
            <div className="flex items-center mt-1">
              <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-sm text-green-400">Excellent</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Automations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeAutomations}</div>
            <div className="flex items-center mt-1">
              <Bot className="w-4 h-4 text-cyan-400 mr-1" />
              <span className="text-sm text-cyan-400">Running</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Responses */}
      <Card className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Recent Responses
          </CardTitle>
          <CardDescription>Live automation responses across all platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {responses.length > 0 ? (
              responses.map((response) => (
                <div
                  key={response.id}
                  className="flex items-start space-x-3 p-3 bg-slate-900/50 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      response.platform === "instagram"
                        ? "bg-pink-500"
                        : response.platform === "whatsapp"
                          ? "bg-green-500"
                          : response.platform === "gmail"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white truncate">
                        {response.automations?.name || "Unknown Automation"}
                      </span>
                      <Badge
                        variant={response.status === "sent" ? "default" : "destructive"}
                        className={response.status === "sent" ? "bg-green-500/20 text-green-400" : ""}
                      >
                        {response.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-400 truncate mb-1">{response.trigger_content}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 capitalize">
                        {response.platform} • {response.response_type}
                      </span>
                      <span className="text-xs text-slate-500">{formatTimeAgo(response.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No responses yet. Your automations will appear here in real-time.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Webhook Events */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Live Events
          </CardTitle>
          <CardDescription>Incoming webhook events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white capitalize">{event.platform}</span>
                    <Badge variant={event.processed ? "default" : "secondary"}>
                      {event.processed ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Processed
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending
                        </>
                      )}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-400 mb-2">{event.event_type}</p>

                  <span className="text-xs text-slate-500">{formatTimeAgo(event.created_at)}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No events yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
