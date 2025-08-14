"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Mail, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const verifyEmail = async () => {
      const token_hash = searchParams.get("token_hash")
      const type = searchParams.get("type")

      if (!token_hash || type !== "email") {
        setStatus("error")
        setMessage("Invalid verification link. Please check your email and try again.")
        return
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: "email",
        })

        if (error) {
          setStatus("error")
          setMessage(error.message || "Failed to verify email. Please try again.")
        } else {
          setStatus("success")
          setMessage("Your email has been successfully verified! You can now sign in to your account.")
        }
      } catch (error) {
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
      }
    }

    verifyEmail()
  }, [searchParams, supabase.auth])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            {status === "loading" && <Mail className="h-8 w-8 text-blue-600 animate-pulse" />}
            {status === "success" && <CheckCircle className="h-8 w-8 text-green-600" />}
            {status === "error" && <XCircle className="h-8 w-8 text-red-600" />}
          </div>
          <CardTitle className="text-2xl">
            {status === "loading" && "Verifying Email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "success" && (
            <Link href="/auth/login" className="block">
              <Button className="w-full">Sign In to Your Account</Button>
            </Link>
          )}
          {status === "error" && (
            <div className="space-y-2">
              <Link href="/auth/sign-up" className="block">
                <Button className="w-full">Try Signing Up Again</Button>
              </Link>
              <Link href="/auth/login" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          )}
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
