import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { getURL } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get or create customer
    let customerId: string | undefined

    // Check if user already has a Stripe customer ID
    const { data: profile } = await supabase.from("users").select("stripe_customer_id").eq("id", user.id).single()

    if (profile?.stripe_customer_id) {
      customerId = profile.stripe_customer_id
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id

      // Update user profile with Stripe customer ID
      await supabase.from("users").update({ stripe_customer_id: customerId }).eq("id", user.id)
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          supabase_user_id: user.id,
        },
      },
      success_url: `${getURL()}dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getURL()}dashboard/billing`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
