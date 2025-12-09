import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookingId } = await req.json();
    
    if (!bookingId) {
      console.error("Missing bookingId in request");
      return new Response(
        JSON.stringify({ error: "bookingId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Creating checkout session for booking:", bookingId);

    // Initialize Supabase client with service role for admin access
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get the user from the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header");
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user from the token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      console.error("User authentication error:", userError);
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Authenticated user:", user.id);

    // Fetch booking details
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (bookingError) {
      console.error("Error fetching booking:", bookingError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch booking" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!booking) {
      console.error("Booking not found for id:", bookingId);
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Found booking:", booking.id, "Total price:", booking.total_price);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get user profile for email
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email, full_name")
      .eq("user_id", user.id)
      .maybeSingle();

    const customerEmail = profile?.email || user.email;

    // Determine the domain for redirect URLs
    const origin = req.headers.get("origin") || "https://tomtebudet.lovable.app";

    console.log("Creating Stripe checkout session with origin:", origin);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "sek",
            product_data: {
              name: `Tomtebesök med ${booking.santa_name}`,
              description: `${booking.duration} minuters besök den ${booking.date} kl ${booking.time}`,
              images: booking.santa_image ? [booking.santa_image] : [],
            },
            unit_amount: booking.total_price * 100, // Stripe uses cents/öre
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/bekraftelse/${bookingId}`,
      cancel_url: `${origin}/betala/${booking.santa_id}?cancelled=true&bookingId=${bookingId}`,
      metadata: {
        booking_id: bookingId,
        user_id: user.id,
      },
    });

    console.log("Created Stripe session:", session.id);

    // Update booking with Stripe session ID
    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({ 
        stripe_session_id: session.id,
        payment_status: "pending"
      })
      .eq("id", bookingId);

    if (updateError) {
      console.error("Error updating booking with session ID:", updateError);
    }

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error creating checkout session:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
