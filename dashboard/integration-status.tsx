"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Instagram, MessageSquare, Mail, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface IntegrationStatus {
  name: string
  icon: React.ComponentType<{ className?: string }>
  status: "connected" | "disconnected" | "error"
  description: string
  setupUrl?: string
}

export function IntegrationStatus() {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    {
      name: "Instagram",
      icon: Instagram,
      status: "disconnected",
      description: "Connect your Instagram Business account to automate comment and DM responses",
      setupUrl: "/api/instagram/auth",
    },
    {
      name: "WhatsApp",
      icon: MessageSquare,
      status: "connected",
      description: "WhatsApp Business API integration for automated messaging",
    },
    {
      name: "Gmail",
      icon: Mail,
      status: "disconnected",
      description: "Connect Gmail to send automated email sequences",
      setupUrl: "/api/gmail/auth",
    },
  ])

  const getStatusIcon = (status: IntegrationStatus["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
    }
  }

  const getStatusText = (status: IntegrationStatus["status"]) => {
    switch (status) {
      case "connected":
        return "Connected"
      case "error":
        return "Error"
      default:
        return "Not Connected"
    }
  }

  const getStatusColor = (status: IntegrationStatus["status"]) => {
    switch (status) {
      case "connected":
        return "text-green-400"
      case "error":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-bold text-white mb-6">Platform Integrations</h3>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                <integration.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-white">{integration.name}</h4>
                  {getStatusIcon(integration.status)}
                  <span className={`text-sm font-medium ${getStatusColor(integration.status)}`}>
                    {getStatusText(integration.status)}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">{integration.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {integration.status === "connected" ? (
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  Configure
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white"
                  onClick={() => {
                    if (integration.setupUrl) {
                      window.location.href = integration.setupUrl
                    }
                  }}
                >
                  Connect
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-900/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-sm font-medium text-white mb-2">Integration Benefits</h4>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• Seamless cross-platform automation workflows</li>
          <li>• Instagram → WhatsApp → Email lead nurturing</li>
          <li>• Real-time response generation with AI</li>
          <li>• Voice message integration across platforms</li>
        </ul>
      </div>
    </div>
  )
}
