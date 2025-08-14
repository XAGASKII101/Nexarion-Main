"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { signIn } from "@/lib/actions"
import Image from "next/image"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white py-6 text-lg font-medium rounded-lg h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  )
}

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8">
            <Image src="/images/nexarion-logo.png" alt="Nexarion AI" width={48} height={48} className="rounded-lg" />
            <span className="text-2xl font-bold text-white">Nexarion AI</span>
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">Welcome back</h1>
          <p className="text-lg text-slate-400">Sign in to your automation dashboard</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                {state.error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500"
                />
              </div>
            </div>

            <SubmitButton />

            <div className="text-center text-slate-400">
              Don't have an account?{" "}
              <Link href="/auth/sign-up" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
