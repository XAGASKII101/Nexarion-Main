import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("user_id")

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 })
  }

  const clientId = process.env.INSTAGRAM_APP_ID
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: "Instagram credentials not configured" }, { status: 500 })
  }

  const state = Buffer.from(JSON.stringify({ userId })).toString("base64")

  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user_profile,user_media&response_type=code&state=${state}`

  return NextResponse.redirect(authUrl)
}
