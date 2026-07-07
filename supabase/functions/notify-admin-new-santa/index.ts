import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "admin@tomtebudet.se";

interface NewSantaRequest {
  name?: string;
  email?: string;
  region?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("notify-admin-new-santa function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Derive the user from the verified JWT – never trust a user_id from the body.
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    const user_id = user.id;

    const { name, email, region }: NewSantaRequest = await req.json();

    console.log("New santa registration:", { user_id, name, email, region });
    // If we don't have full data, try to fetch from database
    let santaName = name || "Ej angivet";
    let santaEmail = email || "Ej angivet";
    let santaRegion = region || "Ej angivet";

    if (!name || !email) {
      // Fetch profile data
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("full_name, email")
        .eq("user_id", user_id)
        .maybeSingle();
      
      if (profile) {
        santaName = profile.full_name || santaName;
        santaEmail = profile.email || santaEmail;
      }
      
      console.log("Fetched profile data:", profile);
    }

    // Send email notification to admin using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tomtebudet <no-reply@tomtebudet.se>",
        to: [ADMIN_EMAIL],
        subject: "Ny tomte registrerad på Tomtebudet",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0F2F22 0%, #1a4a35 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; }
              .info-box { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #D4A657; }
              .info-row { margin: 10px 0; }
              .label { font-weight: 600; color: #666; }
              .value { color: #333; }
              .status { display: inline-block; background: #fef3cd; color: #856404; padding: 4px 12px; border-radius: 16px; font-size: 14px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎅 Ny tomte registrerad</h1>
              </div>
              <div class="content">
                <p>En ny tomte har registrerat sig på Tomtebudet och väntar på granskning.</p>
                
                <div class="info-box">
                  <div class="info-row">
                    <span class="label">Namn:</span>
                    <span class="value">${santaName}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">E-post:</span>
                    <span class="value">${santaEmail}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">Ort/område:</span>
                    <span class="value">${santaRegion}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">Profilstatus:</span>
                    <span class="status">Under granskning</span>
                  </div>
                </div>
                
                <p>Logga in på adminpanelen för att granska ansökan.</p>
              </div>
              <div class="footer">
                <p>Tomtebudet – Sveriges tryggaste tomtenätverk</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in notify-admin-new-santa function:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
