"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, ExternalLink, Unlink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface IntegrationAccount {
  id: string
  platform: string
  account_name: string
  status: string
  account_data: any
  created_at: string
}

interface IntegrationCardProps {
  platform: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  account?: IntegrationAccount
  userId: string
  onConnect: () => void
  onDisconnect: (accountId: string) => void
}

export function IntegrationCard({
  platform,
  title,
  description,
  icon,
  color,
  account,
  userId,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      // Redirect to OAuth flow
      window.location.href = `/api/${platform}/auth?user_id=${userId}`
    } catch (error) {
      console.error("Connection error:", error)
      toast({
        title: "Connection failed",
        description: "Failed to initiate connection. Please try again.",
        variant: "destructive",
      })
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    if (!account) return

    setIsDisconnecting(true)
    try {
      const response = await fetch(`/api/integrations/${account.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to disconnect")
      }

      onDisconnect(account.id)
      toast({
        title: "Disconnected",
        description: `${title} account has been disconnected.`,
      })
    } catch (error) {
      console.error("Disconnect error:", error)
      toast({
        title: "Disconnect failed",
        description: "Failed to disconnect account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDisconnecting(false)
    }
  }

  const isConnected = account && account.status === "active"

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>{icon}</div>
            <div>
              <CardTitle className="text-white">{title}</CardTitle>
              <CardDescription className="text-slate-400">{description}</CardDescription>
            </div>
          </div>
          <Badge
            variant={isConnected ? "default" : "secondary"}
            className={isConnected ? "bg-green-500/20 text-green-400" : ""}
          >
            {isConnected ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 mr-1" />
                Not Connected
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {isConnected && account ? (
          <div className="space-y-4">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
              <div className="text-sm text-slate-300 mb-2">Connected Account</div>
              <div className="font-medium text-white">{account.account_name}</div>
              {account.account_data && (
                <div className="text-xs text-slate-400 mt-1">
                  Connected on {new Date(account.created_at).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                disabled={isDisconnecting}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                {isDisconnecting ? (
                  "Disconnecting..."
                ) : (
                  <>
                    <Unlink className="w-4 h-4 mr-2" />
                    Disconnect
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(`/dashboard/integrations/${platform}`, "_blank")}
                className="text-slate-400 hover:text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Manage
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-slate-400">Connect your {title} account to enable automation features.</div>

            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className={`w-full ${color.replace("bg-", "bg-").replace("/20", "")} hover:opacity-90 text-white`}
            >
              {isConnecting ? (
                "Connecting..."
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect {title}
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
