-- BankID order tracking. Only accessed by the bankid edge function (service role).
CREATE TABLE IF NOT EXISTS public.bankid_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref text NOT NULL UNIQUE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  qr_start_token text NOT NULL,
  qr_start_secret text NOT NULL,
  status text NOT NULL DEFAULT 'pending', -- pending | complete | failed | cancelled
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS on, no policies: clients cannot read/write. Service role bypasses RLS.
ALTER TABLE public.bankid_orders ENABLE ROW LEVEL SECURITY;

-- Auto-clean old orders (BankID orders live max 3 minutes).
CREATE INDEX IF NOT EXISTS bankid_orders_created_at_idx ON public.bankid_orders (created_at);
