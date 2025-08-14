import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("user_id")

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 })
  }

  const clientId = process.env.GMAIL_CLIENT_ID
  const redirectUri = process.env.GMAIL_REDIRECT_URI

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: "Gmail credentials not configured" }, { status: 500 })
  }

  const state = Buffer.from(JSON.stringify({ userId })).toString("base64")

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent("https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly")}&access_type=offline&prompt=consent&state=${state}`

  return NextResponse.redirect(authUrl)
}
