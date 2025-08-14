"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ChatInterface } from "./chat-interface"
import { Instagram, MessageSquare, Mail, Mic } from "lucide-react"

export function AutomationBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platform: "",
    triggerType: "",
    responseTemplate: "",
    voiceEnabled: false,
  })

  const platforms = [
    { value: "instagram", label: "Instagram", icon: Instagram },
    { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { value: "email", label: "Email", icon: Mail },
  ]

  const triggerTypes = {
    instagram: [
      { value: "comment", label: "Comments" },
      { value: "dm", label: "Direct Messages" },
      { value: "mention", label: "Mentions" },
    ],
    whatsapp: [
      { value: "message", label: "Messages" },
      { value: "keyword", label: "Keywords" },
    ],
    email: [
      { value: "inquiry", label: "Inquiries" },
      { value: "follow-up", label: "Follow-ups" },
    ],
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6">Automation Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Automation Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Instagram Comment Responder"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of what this automation does"
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value} className="text-white hover:bg-slate-700">
                      <div className="flex items-center space-x-2">
                        <platform.icon className="w-4 h-4" />
                        <span>{platform.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.platform && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Trigger Type</label>
                <Select
                  value={formData.triggerType}
                  onValueChange={(value) => setFormData({ ...formData, triggerType: value })}
                >
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500">
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {triggerTypes[formData.platform as keyof typeof triggerTypes]?.map((trigger) => (
                      <SelectItem key={trigger.value} value={trigger.value} className="text-white hover:bg-slate-700">
                        {trigger.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Response Template (Optional)</label>
              <Textarea
                value={formData.responseTemplate}
                onChange={(e) => setFormData({ ...formData, responseTemplate: e.target.value })}
                placeholder="Provide context or guidelines for AI responses..."
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 min-h-[100px]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mic className="w-5 h-5 text-cyan-400" />
                <label className="text-sm font-medium text-slate-300">Enable Voice Responses</label>
              </div>
              <Switch
                checked={formData.voiceEnabled}
                onCheckedChange={(checked) => setFormData({ ...formData, voiceEnabled: checked })}
              />
            </div>
          </div>

          <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white">
            Create Automation
          </Button>
        </div>
      </div>

      <div>
        <ChatInterface placeholder="Test your automation with a sample message..." />
      </div>
    </div>
  )
}
