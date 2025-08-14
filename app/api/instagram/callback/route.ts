import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createInstagramClient, InstagramClient } from "@/lib/instagram"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?error=instagram_auth_failed`,
    )
  }

  if (!code || !state) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?error=missing_parameters`)
  }

  try {
    const { userId } = JSON.parse(Buffer.from(state, "base64").toString())

    const clientId = process.env.INSTAGRAM_APP_ID!
    const clientSecret = process.env.INSTAGRAM_APP_SECRET!
    const redirectUri = process.env.INSTAGRAM_REDIRECT_URI!

    // Exchange code for access token
    const tokenData = await InstagramClient.exchangeCodeForToken(clientId, clientSecret, code, redirectUri)

    // Get user account info
    const instagramClient = createInstagramClient(tokenData.access_token)
    const accountInfo = await instagramClient.getAccount()

    // Save to database
    const supabase = createClient()

    const { error: dbError } = await supabase.from("integration_accounts").upsert({
      user_id: userId,
      platform: "instagram",
      account_id: accountInfo.id,
      account_name: accountInfo.username,
      access_token: tokenData.access_token,
      account_data: {
        username: accountInfo.username,
        account_type: accountInfo.account_type,
        media_count: accountInfo.media_count,
      },
      status: "active",
      updated_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?error=database_error`)
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?success=instagram_connected`,
    )
  } catch (error) {
    console.error("Instagram callback error:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/integrations?error=callback_failed`)
  }
}
