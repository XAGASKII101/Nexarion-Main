import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createGmailClient, GmailClient } from "@/lib/gmail"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?error=gmail_auth_failed`)
  }

  if (!code || !state) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?error=missing_parameters`)
  }

  try {
    const { userId } = JSON.parse(Buffer.from(state, "base64").toString())

    const clientId = process.env.GMAIL_CLIENT_ID!
    const clientSecret = process.env.GMAIL_CLIENT_SECRET!
    const redirectUri = process.env.GMAIL_REDIRECT_URI!

    // Exchange code for access token
    const tokenData = await GmailClient.exchangeCodeForToken(clientId, clientSecret, code, redirectUri)

    // Get user profile
    const gmailClient = createGmailClient(tokenData.access_token)
    const profile = await gmailClient.getProfile()

    // Save to database
    const supabase = createClient()

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000)

    const { error: dbError } = await supabase.from("integration_accounts").upsert({
      user_id: userId,
      platform: "gmail",
      account_id: profile.emailAddress,
      account_name: profile.emailAddress,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      token_expires_at: expiresAt.toISOString(),
      account_data: {
        email: profile.emailAddress,
        messages_total: profile.messagesTotal,
        threads_total: profile.threadsTotal,
      },
      status: "active",
      updated_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?error=database_error`)
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?success=gmail_connected`)
  } catch (error) {
    console.error("Gmail callback error:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?error=callback_failed`)
  }
}
