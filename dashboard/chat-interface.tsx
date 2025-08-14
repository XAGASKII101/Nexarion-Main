"use client"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

interface ChatInterfaceProps {
  automationId?: string
  placeholder?: string
}

export function ChatInterface({ automationId, placeholder = "Test your automation response..." }: ChatInterfaceProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { automationId },
  })

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 h-96 flex flex-col">
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">AI Response Preview</h3>
        <p className="text-sm text-slate-400">Test how your automation will respond</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Start a conversation to test your AI responses</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-700/50 text-slate-200 border border-slate-600/50"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>

            {message.role === "user" && (
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-1 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
