"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "expired">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        const token_hash = searchParams.get("token_hash")
        const type = searchParams.get("type")

        if (type === "email" && token_hash) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: "email",
          })

          if (error) {
            console.error("Verification error:", error)
            if (error.message.includes("expired")) {
              setStatus("expired")
              setMessage("Your verification link has expired. Please request a new one.")
            } else {
              setStatus("error")
              setMessage(error.message || "Failed to verify email. Please try again.")
            }
          } else {
            setStatus("success")
            setMessage("Your email has been successfully verified! You can now access your dashboard.")

            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
              router.push("/dashboard")
            }, 3000)
          }
        } else {
          setStatus("error")
          setMessage("Invalid verification link. Please check your email and try again.")
        }
      } catch (error) {
        console.error("Unexpected error:", error)
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
      }
    }

    handleEmailVerification()
  }, [searchParams, router, supabase.auth])

  const resendVerification = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) {
        const { error } = await supabase.auth.resend({
          type: "signup",
          email: user.email,
        })

        if (error) {
          setMessage("Failed to resend verification email. Please try again.")
        } else {
          setMessage("Verification email sent! Please check your inbox.")
        }
      }
    } catch (error) {
      console.error("Resend error:", error)
      setMessage("Failed to resend verification email. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === "loading" && <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />}
            {status === "success" && <CheckCircle className="h-12 w-12 text-green-500" />}
            {(status === "error" || status === "expired") && <XCircle className="h-12 w-12 text-red-500" />}
          </div>
          <CardTitle className="text-2xl">
            {status === "loading" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
            {status === "expired" && "Link Expired"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "success" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Redirecting to dashboard in 3 seconds...</p>
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          )}

          {(status === "error" || status === "expired") && (
            <div className="space-y-3">
              <Button onClick={resendVerification} className="w-full bg-transparent" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Resend Verification Email
              </Button>
              <Button asChild className="w-full">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          )}

          {status === "loading" && (
            <div className="text-center">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
