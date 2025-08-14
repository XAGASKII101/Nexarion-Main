"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Send, Loader2, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WhatsAppTemplate {
  id: string
  name: string
  components: Array<{
    type: string
    text: string
  }>
}

export function WhatsAppTester() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [messageType, setMessageType] = useState("text")
  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [templateParams, setTemplateParams] = useState<string[]>([])
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([])
  const [isSending, setIsSending] = useState(false)
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false)
  const { toast } = useToast()

  const loadTemplates = async () => {
    setIsLoadingTemplates(true)
    try {
      const response = await fetch("/api/whatsapp/templates")
      const data = await response.json()

      if (response.ok) {
        setTemplates(data.templates || [])
      } else {
        throw new Error(data.error || "Failed to load templates")
      }
    } catch (error) {
      console.error("Failed to load templates:", error)
      toast({
        title: "Failed to load templates",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
    } finally {
      setIsLoadingTemplates(false)
    }
  }

  const handleSendMessage = async () => {
    if (!phoneNumber.trim() || (!message.trim() && messageType === "text")) {
      toast({
        title: "Missing information",
        description: "Please provide a phone number and message",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)

    try {
      let messagePayload = message

      if (messageType === "template" && selectedTemplate) {
        messagePayload = JSON.stringify({
          templateName: selectedTemplate,
          parameters: templateParams.filter((p) => p.trim()),
        })
      }

      const response = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: messagePayload,
          type: messageType,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      toast({
        title: "Message sent!",
        description: `WhatsApp message sent successfully to ${phoneNumber}`,
      })

      // Reset form
      setMessage("")
      setTemplateParams([])
    } catch (error) {
      console.error("Send message error:", error)
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Add country code if not present
    if (digits.length > 0 && !digits.startsWith("1")) {
      return "1" + digits
    }

    return digits
  }

  const selectedTemplateData = templates.find((t) => t.name === selectedTemplate)
  const templateBodyComponent = selectedTemplateData?.components.find((c) => c.type === "BODY")
  const parameterCount = (templateBodyComponent?.text.match(/\{\{\d+\}\}/g) || []).length

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">WhatsApp Message Tester</h3>
          <p className="text-slate-400">Send test messages via WhatsApp Business API</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              placeholder="15551234567 (with country code)"
              className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-green-500"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">Include country code (e.g., 1 for US/Canada)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Message Type</label>
          <Select value={messageType} onValueChange={setMessageType}>
            <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="text" className="text-white hover:bg-slate-700">
                Text Message
              </SelectItem>
              <SelectItem value="template" className="text-white hover:bg-slate-700">
                Template Message
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {messageType === "text" && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your WhatsApp message..."
              className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-green-500 min-h-[100px]"
            />
          </div>
        )}

        {messageType === "template" && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-300">Template</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadTemplates}
                  disabled={isLoadingTemplates}
                  className="text-slate-400 hover:text-white"
                >
                  {isLoadingTemplates ? <Loader2 className="w-4 h-4 animate-spin" /> : "Load Templates"}
                </Button>
              </div>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-green-500">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.name} className="text-white hover:bg-slate-700">
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplateData && (
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <h4 className="text-sm font-medium text-white mb-2">Template Preview</h4>
                <p className="text-slate-300 text-sm">{templateBodyComponent?.text}</p>
              </div>
            )}

            {parameterCount > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Template Parameters ({parameterCount} required)
                </label>
                <div className="space-y-2">
                  {Array.from({ length: parameterCount }, (_, i) => (
                    <Input
                      key={i}
                      value={templateParams[i] || ""}
                      onChange={(e) => {
                        const newParams = [...templateParams]
                        newParams[i] = e.target.value
                        setTemplateParams(newParams)
                      }}
                      placeholder={`Parameter ${i + 1}`}
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-green-500"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={handleSendMessage}
          disabled={isSending || !phoneNumber.trim() || (messageType === "text" && !message.trim())}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send WhatsApp Message
            </>
          )}
        </Button>
      </div>

      <div className="mt-6 bg-slate-900/50 rounded-lg p-4 border border-slate-600">
        <h4 className="text-sm font-medium text-white mb-2">Setup Requirements</h4>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• WhatsApp Business Account verified</li>
          <li>• Phone number registered with Meta</li>
          <li>• Webhook URL configured</li>
          <li>• Message templates approved (for template messages)</li>
        </ul>
      </div>
    </div>
  )
}
