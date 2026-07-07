# BankID-integration – Tomtebudet

Riktig BankID-verifiering (RP API v6.0) i tomteonboardingen, steg 2.
Fungerar mot **testmiljön** nu och byts till produktion med två secrets.

## Arkitektur

```
Webbläsare (BankIdVerification.tsx)
   │  supabase.functions.invoke("bankid")
   ▼
Edge function: supabase/functions/bankid/index.ts
   │  mTLS med klientcertifikat
   ▼
BankID RP API v6.0 (/auth, /collect, /cancel)
```

- **Start**: funktionen startar en order, sparar `orderRef` + QR-hemligheter i tabellen `bankid_orders` (endast service role kommer åt den).
- **QR-koden** animeras: klienten pollar `collect` var 1,5 s och får en ny QR-sträng varje gång (HMAC-beräknad server-side, hemligheten lämnar aldrig servern).
- **Samma enhet**: knappen öppnar `bankid:///?autostarttoken=...`.
- **Vid lyckad verifiering** sätter funktionen `bankid_verified` på `santa_applications` server-side (klienten kan inte fejka det) och sparar det BankID-verifierade namnet på profilen.

## Kom igång (testmiljö)

1. Installera [Supabase CLI](https://supabase.com/docs/guides/cli) och logga in: `supabase login`
2. Kör migrationen (skapar `bankid_orders`):
   ```
   supabase db push --project-ref zmxwfkjpgzmocazvpgvl
   ```
3. Hämta testcertifikat + sätt secrets:
   ```
   ./scripts/setup-bankid-test.sh zmxwfkjpgzmocazvpgvl
   ```
4. Deploya funktionen:
   ```
   supabase functions deploy bankid --project-ref zmxwfkjpgzmocazvpgvl
   ```
5. Testa: skaffa ett **test-BankID** i BankID-appen via
   [demo.bankid.com](https://demo.bankid.com) (logga in → aktivera testläge → utfärda test-BankID).
   Gå sedan igenom "Bli tomte"-flödet.

## Mock-läge (utveckling utan certifikat)

Sätt `BANKID_MOCK=true` som secret så simuleras hela flödet (verifieras efter ~5 s).
Stäng av med `BANKID_MOCK=false`.

## Byte till produktion

1. Teckna avtal om BankID via din bank, eller enklare via en återförsäljare
   (Criipto, Signicat, Scrive, Zealid – jämför pris per identifiering).
   Får du eget RP-certifikat (`.p12`) från banken:
2. Konvertera till PEM (som i `scripts/setup-bankid-test.sh`) och sätt:
   ```
   supabase secrets set --project-ref <ref> \
     BANKID_API_URL="https://appapi2.bankid.com/rp/v6.0" \
     BANKID_CERT_PEM="..." \
     BANKID_KEY_PEM="..."
   ```
3. Ingen kodändring behövs.

Väljer du i stället en mäklare (Criipto m.fl. – OIDC i stället för direkt-API)
behöver edge-funktionen skrivas om till ett OAuth-flöde; be Claude om det då.

## Säkerhetsnoteringar

- `bankid_orders` har RLS utan policies → endast service role.
- Triggern `protect_bankid_fields` (migration `20260705130000`) gör att
  `bankid_verified`/`bankid_verified_at` endast kan sättas av service role –
  klienter kan aldrig verifiera sig själva, oavsett RLS.
- Personnummer sparas inte – endast verifierat namn.
