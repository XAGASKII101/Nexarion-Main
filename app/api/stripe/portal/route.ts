import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { getURL } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's Stripe customer ID
    const { data: profile } = await supabase.from("users").select("stripe_customer_id").eq("id", user.id).single()

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: "No customer found" }, { status: 404 })
    }

    // Create portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${getURL()}dashboard/billing`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error("Error creating portal session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
