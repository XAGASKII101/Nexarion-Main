"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      const token_hash = searchParams.get("token_hash")
      const type = searchParams.get("type")

      if (!token_hash || type !== "email") {
        setStatus("error")
        setMessage("Invalid verification link")
        return
      }

      try {
        const supabase = createClient()
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: "email",
        })

        if (error) {
          setStatus("error")
          setMessage(error.message)
        } else {
          setStatus("success")
          setMessage("Email verified successfully!")
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        }
      } catch (error) {
        setStatus("error")
        setMessage("An unexpected error occurred")
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            {status === "loading" && <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />}
            {status === "success" && <CheckCircle className="w-8 h-8 text-green-600" />}
            {status === "error" && <XCircle className="w-8 h-8 text-red-600" />}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === "loading" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription>
            {status === "loading" && "Please wait while we verify your email address."}
            {status === "success" && "Your email has been successfully verified. Redirecting to dashboard..."}
            {status === "error" && message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "success" && (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Mail className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-700">Welcome to NexarionAI! You can now access all features.</p>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700">{message || "There was an issue verifying your email address."}</p>
              </div>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/auth/sign-up">Try Signing Up Again</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <Link href="/auth/login">Back to Login</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
