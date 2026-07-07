// BankID Relying Party API v6.0 integration (test + production).
//
// Actions (POST JSON { action, ... }):
//   start   -> starts a BankID auth order, returns { orderRef, autoStartToken, qr }
//   collect -> polls order status, returns { status, hintCode?, qr?, completionData? }
//   cancel  -> cancels an order
//
// Secrets (set via `supabase secrets set`):
//   BANKID_API_URL   e.g. https://appapi2.test.bankid.com/rp/v6.0  (test)
//                         https://appapi2.bankid.com/rp/v6.0       (production)
//   BANKID_CERT_PEM  client certificate (PEM)
//   BANKID_KEY_PEM   client private key (PEM)
//   BANKID_MOCK      "true" to simulate BankID locally without certificates (dev only)
//
// On completed auth, this function (using the service role) marks the user's
// santa_application as bankid_verified and stores the verified name.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BANKID_API_URL =
  Deno.env.get("BANKID_API_URL") ?? "https://appapi2.test.bankid.com/rp/v6.0";
const CERT_PEM = Deno.env.get("BANKID_CERT_PEM");
const KEY_PEM = Deno.env.get("BANKID_KEY_PEM");
const MOCK = Deno.env.get("BANKID_MOCK") === "true";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Admin client (bypasses RLS) for the bankid_orders table + marking verification.
const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// mTLS HTTP client against the BankID API.
let httpClient: Deno.HttpClient | null = null;
function getHttpClient(): Deno.HttpClient {
  if (!httpClient) {
    if (!CERT_PEM || !KEY_PEM) {
      throw new Error(
        "BANKID_CERT_PEM / BANKID_KEY_PEM saknas. Sätt secrets eller använd BANKID_MOCK=true."
      );
    }
    httpClient = Deno.createHttpClient({
      cert: CERT_PEM,
      key: KEY_PEM,
    });
  }
  return httpClient;
}

async function bankidRequest(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${BANKID_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    client: getHttpClient(),
  } as RequestInit & { client: Deno.HttpClient });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`BankID ${path} error`, res.status, data);
    throw new Error(data.details ?? data.errorCode ?? `BankID ${res.status}`);
  }
  return data;
}

// Animated QR code: "bankid.<qrStartToken>.<time>.<qrAuthCode>"
// where qrAuthCode = HMAC-SHA256(key=qrStartSecret, message=String(time)) hex.
async function computeQr(
  qrStartToken: string,
  qrStartSecret: string,
  startedAt: string
): Promise<string> {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000)
  );
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(qrStartSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(String(seconds)));
  const hex = [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `bankid.${qrStartToken}.${seconds}.${hex}`;
}

async function getUserId(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user.id;
}

async function markVerified(userId: string, completionData: unknown) {
  const cd = completionData as {
    user?: { name?: string; givenName?: string; surname?: string };
  };
  const verifiedName = cd?.user?.name ?? null;

  const { data: existing } = await admin
    .from("santa_applications")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  const fields = {
    bankid_verified: true,
    bankid_verified_at: new Date().toISOString(),
  };

  if (existing) {
    await admin.from("santa_applications").update(fields).eq("id", existing.id);
  } else {
    await admin
      .from("santa_applications")
      .insert({ user_id: userId, ...fields });
  }

  // Store the BankID-verified name on the profile for admin review.
  if (verifiedName) {
    await admin
      .from("profiles")
      .update({ full_name: verifiedName })
      .eq("user_id", userId);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const userId = await getUserId(req);
    if (!userId) return json({ error: "Ej inloggad" }, 401);

    const { action, orderRef } = await req.json();
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

    // ---------- MOCK MODE (dev without certificates) ----------
    if (MOCK) {
      if (action === "start") {
        const mockRef = crypto.randomUUID();
        await admin.from("bankid_orders").insert({
          order_ref: mockRef,
          user_id: userId,
          qr_start_token: "mock",
          qr_start_secret: "mock",
          status: "pending",
        });
        return json({
          orderRef: mockRef,
          autoStartToken: "mock",
          qr: "bankid.mock.0.mock",
        });
      }
      if (action === "collect") {
        const { data: order } = await admin
          .from("bankid_orders")
          .select("*")
          .eq("order_ref", orderRef)
          .eq("user_id", userId)
          .single();
        if (!order) return json({ error: "Okänd order" }, 404);
        const age = Date.now() - new Date(order.created_at).getTime();
        if (age > 5000) {
          await admin
            .from("bankid_orders")
            .update({ status: "complete" })
            .eq("order_ref", orderRef);
          await markVerified(userId, {
            user: { name: "Test Testsson (mock)" },
          });
          return json({
            status: "complete",
            completionData: { user: { name: "Test Testsson (mock)" } },
          });
        }
        return json({
          status: "pending",
          hintCode: "userSign",
          qr: "bankid.mock.1.mock",
        });
      }
      return json({ ok: true });
    }

    // ---------- REAL BANKID ----------
    switch (action) {
      case "start": {
        // Purge stale orders (QR secrets shouldn't be retained longer than needed)
        await admin
          .from("bankid_orders")
          .delete()
          .lt("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString());

        const data = await bankidRequest("/auth", {
          endUserIp: clientIp,
          requirement: {},
        });
        await admin.from("bankid_orders").insert({
          order_ref: data.orderRef,
          user_id: userId,
          qr_start_token: data.qrStartToken,
          qr_start_secret: data.qrStartSecret,
          status: "pending",
        });
        const qr = await computeQr(
          data.qrStartToken,
          data.qrStartSecret,
          new Date().toISOString()
        );
        return json({
          orderRef: data.orderRef,
          autoStartToken: data.autoStartToken,
          qr,
        });
      }

      case "collect": {
        const { data: order } = await admin
          .from("bankid_orders")
          .select("*")
          .eq("order_ref", orderRef)
          .eq("user_id", userId)
          .single();
        if (!order) return json({ error: "Okänd order" }, 404);

        const data = await bankidRequest("/collect", { orderRef });

        if (data.status === "complete") {
          // Delete the order – QR secrets have no value after completion
          await admin.from("bankid_orders").delete().eq("order_ref", orderRef);
          await markVerified(userId, data.completionData);
          return json({
            status: "complete",
            completionData: {
              user: { name: data.completionData?.user?.name },
            },
          });
        }

        if (data.status === "failed") {
          await admin.from("bankid_orders").delete().eq("order_ref", orderRef);
          return json({ status: "failed", hintCode: data.hintCode });
        }

        // pending -> refresh QR
        const qr = await computeQr(
          order.qr_start_token,
          order.qr_start_secret,
          order.created_at
        );
        return json({ status: "pending", hintCode: data.hintCode, qr });
      }

      case "cancel": {
        await bankidRequest("/cancel", { orderRef }).catch(() => {});
        await admin
          .from("bankid_orders")
          .delete()
          .eq("order_ref", orderRef)
          .eq("user_id", userId);
        return json({ ok: true });
      }

      default:
        return json({ error: "Okänd action" }, 400);
    }
  } catch (err) {
    console.error("bankid function error:", err);
    return json({ error: (err as Error).message }, 500);
  }
});
