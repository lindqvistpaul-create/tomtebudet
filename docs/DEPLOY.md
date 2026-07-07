# Deploy – Tomtebudet på Vercel + Supabase

Hostingen är oberoende av Lovable: frontenden ligger på Vercel (gratis),
backenden på Supabase. Du kan fortfarande redigera i Lovable om du vill –
båda utgår från samma GitHub-repo.

## 1. Frontend → Vercel (en gång, ~10 min)

1. Gå till [vercel.com](https://vercel.com) → logga in med GitHub
2. **Add New → Project** → välj repot `tomtebudet`
3. Vercel känner igen Vite automatiskt. Lägg till miljövariabler
   (Settings → Environment Variables, kopiera från `.env`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
4. **Deploy**. Klart – du får en `*.vercel.app`-URL direkt.

Varje push till `main` deployas automatiskt. `vercel.json` i repo-roten
sköter SPA-routing (alla vägar → index.html) och cache-headers.

## 2. Domänen tomtebudet.se

1. Vercel → Project → Settings → Domains → lägg till `tomtebudet.se` + `www.tomtebudet.se`
2. Peka DNS hos din registrar enligt Vercels instruktioner
   (A-post `76.76.21.21` för apex, CNAME `cname.vercel-dns.com` för www)
3. SSL utfärdas automatiskt inom några minuter

OBS: dina befintliga MX-poster (mailen) påverkas inte av A/CNAME-ändringarna
– rör dem inte, så fortsätter mailen fungera.

## 3. Backend → Supabase (vid varje backend-ändring)

```bash
supabase db push --project-ref zmxwfkjpgzmocazvpgvl        # migrations
supabase functions deploy --project-ref zmxwfkjpgzmocazvpgvl  # edge functions
```

Secrets (engångs, se även docs/BANKID.md och docs/GRANSKNING-2026-07-05.md):

```bash
supabase secrets set --project-ref zmxwfkjpgzmocazvpgvl \
  ADMIN_EMAIL="din@mail.se" \
  SITE_URL="https://tomtebudet.se" \
  RESEND_API_KEY="re_..."
```

## 4. Checklista efter deploy

- [ ] Startsidan laddar på vercel-URL:en
- [ ] Intresseanmälan familj sparas (kolla Supabase → Table Editor → family_interest)
- [ ] Bli tomte-flödet: BankID-steget svarar (kräver att bankid-funktionen är deployad)
- [ ] Kontaktformuläret sparas (contact_messages)
