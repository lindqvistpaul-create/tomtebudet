import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    console.log("Received webhook, signature present:", !!signature);

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Parse the event (without signature verification for now - add STRIPE_WEBHOOK_SECRET later)
    let event: Stripe.Event;
    
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log("Webhook signature verified");
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Webhook signature verification failed:", errorMessage);
        return new Response(
          JSON.stringify({ error: "Invalid signature" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      // Parse without verification (for development)
      event = JSON.parse(body);
      console.log("Webhook parsed without signature verification (dev mode)");
    }

    console.log("Processing event type:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", session.id);
        
        const bookingId = session.metadata?.booking_id;
        if (!bookingId) {
          console.error("No booking_id in session metadata");
          break;
        }

        console.log("Updating booking to paid:", bookingId);
        
        const { error: updateError } = await supabaseAdmin
          .from("bookings")
          .update({ 
            payment_status: "paid",
            stripe_payment_intent_id: session.payment_intent as string,
            status: "confirmed"
          })
          .eq("id", bookingId);

        if (updateError) {
          console.error("Error updating booking to paid:", updateError);
        } else {
          console.log("Successfully marked booking as paid:", bookingId);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed for intent:", paymentIntent.id);

        // Find booking by payment intent
        const { data: booking, error: findError } = await supabaseAdmin
          .from("bookings")
          .select("id")
          .eq("stripe_payment_intent_id", paymentIntent.id)
          .maybeSingle();

        if (findError) {
          console.error("Error finding booking:", findError);
          break;
        }

        if (booking) {
          const { error: updateError } = await supabaseAdmin
            .from("bookings")
            .update({ payment_status: "failed" })
            .eq("id", booking.id);

          if (updateError) {
            console.error("Error updating booking to failed:", updateError);
          } else {
            console.log("Marked booking as failed:", booking.id);
          }
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log("Charge refunded:", charge.id);
        
        const paymentIntentId = charge.payment_intent as string;
        
        const { data: booking, error: findError } = await supabaseAdmin
          .from("bookings")
          .select("id")
          .eq("stripe_payment_intent_id", paymentIntentId)
          .maybeSingle();

        if (findError) {
          console.error("Error finding booking for refund:", findError);
          break;
        }

        if (booking) {
          const { error: updateError } = await supabaseAdmin
            .from("bookings")
            .update({ payment_status: "refunded" })
            .eq("id", booking.id);

          if (updateError) {
            console.error("Error updating booking to refunded:", updateError);
          } else {
            console.log("Marked booking as refunded:", booking.id);
          }
        }
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
