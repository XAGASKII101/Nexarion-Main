import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import type Stripe from "stripe"

const webhookSecret =`sk${process.env.STRIPE_KEY}`!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const supabase = await createClient()

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Get customer to find user ID
        const customer = await stripe.customers.retrieve(customerId)
        if (customer.deleted) break

        const userId = customer.metadata?.supabase_user_id
        if (!userId) break

        // Update user subscription status
        await supabase
          .from("users")
          .update({
            subscription_id: subscription.id,
            subscription_status: subscription.status,
            subscription_plan: subscription.items.data[0]?.price.lookup_key || "starter",
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            trial_ends_at: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
          })
          .eq("id", userId)

        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Get customer to find user ID
        const customer = await stripe.customers.retrieve(customerId)
        if (customer.deleted) break

        const userId = customer.metadata?.supabase_user_id
        if (!userId) break

        // Update user subscription status
        await supabase
          .from("users")
          .update({
            subscription_status: "canceled",
            subscription_plan: "free",
            current_period_end: null,
            trial_ends_at: null,
          })
          .eq("id", userId)

        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
          const customerId = subscription.customer as string

          // Get customer to find user ID
          const customer = await stripe.customers.retrieve(customerId)
          if (customer.deleted) break

          const userId = customer.metadata?.supabase_user_id
          if (!userId) break

          // Update subscription status to active
          await supabase
            .from("users")
            .update({
              subscription_status: "active",
            })
            .eq("id", userId)
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
          const customerId = subscription.customer as string

          // Get customer to find user ID
          const customer = await stripe.customers.retrieve(customerId)
          if (customer.deleted) break

          const userId = customer.metadata?.supabase_user_id
          if (!userId) break

          // Update subscription status to past_due
          await supabase
            .from("users")
            .update({
              subscription_status: "past_due",
            })
            .eq("id", userId)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
