# Senior-granskning & åtgärder – 2026-07-05

Fullständig genomgång av backend och frontend inför lansering julen 2026.
Bygge och typecheck är gröna efter åtgärderna.

## Åtgärdat – säkerhet (kritiskt)

**Självgodkännande av tomtar stoppat.** RLS-policyerna på `santa_applications`
saknade `WITH CHECK` – en användare kunde skapa sin ansökan direkt med
`status: 'approved'` och bli "verifierad tomte" utan granskning. Nu kan
klienter bara sätta `draft`/`pending_review`, och en databastrigger
(`protect_review_fields`) stoppar dessutom alla ändringar av status till
approved/rejected samt `reviewed_at`/`review_notes` om man inte är admin
eller systemet. (Migration `20260705140000`.)

**ID-handlingar: trasigt och farligt mönster fixat.** Koden använde
`getPublicUrl` mot den privata bucketen `santa-uploads` – URL:erna som
sparades i databasen fungerade inte, så admin kunde aldrig granska
ID-handlingar. Nu sparas lagringssökvägar och både admin-sidorna och
onboardingen genererar kortlivade signerade URL:er vid behov. En ny
storage-policy ger admins läsrätt. Bucketen förblir privat – **gör den
aldrig publik**, den innehåller ID-handlingar.

**Stripe-webhooken är nu fail-closed.** Tidigare accepterades osignerade
anrop om `STRIPE_WEBHOOK_SECRET` saknades – vem som helst kunde POST:a ett
fejkat "payment completed" och markera bokningar som betalda. Nu krävs
giltig signatur, annars avvisas anropet. **Innan bokningar aktiveras måste
`STRIPE_WEBHOOK_SECRET` sättas som secret.**

**Övriga säkerhetsfixar:** `create-checkout-session` vägrar skapa nya
betalsessioner för redan betalda bokningar (409). `notify-admin-new-santa`
härleder användaren från JWT:n i stället för att lita på `user_id` i
request-body. BankID-ordrar (med QR-hemligheter) raderas nu direkt vid
slutförande/avbrott plus städning av gamla rader. Gränsvärden på
klient-skrivbara fält (pris 1–10 000 kr, bio/erfarenhet max 2 000 tecken).

## Åtgärdat – trasig funktionalitet

**Kontaktformulären sparade ingenting.** Både kontaktsidan och
integritetssidan hade fejkade submit-handlers (setTimeout + succémeddelande –
meddelandet kastades bort). Nu skrivs de till nya tabellen `contact_messages`
(publikt INSERT, endast admin läser).

**Riktiga användare såg mockdata.** `/mitt-konto` visade påhittade bokningar
för inloggade användare. Nu hämtas riktiga bokningar med tom-tillstånd
("Du har inga bokningar ännu"). Tomte-dashboarden visade hårdkodat
"Verifierad", 4,9 i betyg och påhittade omdömen – nu läses verifieringsstatus
från databasen och omdömen/notiser visar ärliga tomma tillstånd.

**Admin-sidor som låtsades fungera.** Avbokningar och Inställningar visade
succé-toasts men sparade ingenting. Nu har de tydlig varningsbanner och
inaktiverade knappar tills de byggs på riktigt.

**SEO/juridik.** `index.html` innehöll fabricerad strukturerad data
(4,9 stjärnor, 500 recensioner – utan en enda riktig bokning). Borttaget;
det bryter mot Googles policyer och riskerar marknadsföringsrättsliga
problem. "2024" uppdaterat till "2026".

## Åtgärdat – prestanda & struktur

- **Kodsplittring**: alla admin-sidor och tunga sidor lazy-laddas nu;
  vendor/supabase i egna chunkar. Huvudbundlen gick från en monolit på
  >800 kB till 424 kB, och admin-koden skickas inte längre till varje
  besökare.
- **Auth-race fixad**: rollen hämtades dubbelt på varje sidladdning
  (race mellan listener och manuell getSession) – nu en gång.
- **Typsäkerhet**: ansökningssparningen är nu typad mot genererade
  Supabase-typer (fångar kolumnfel vid kompilering). `tsc --noEmit` är helt
  grönt.
- Trasig menylänk (#top-santas) borttagen under prelaunch.

## Nya secrets att sätta vid deploy

| Secret | Krävs för | Värde |
|---|---|---|
| `STRIPE_WEBHOOK_SECRET` | stripe-webhook (obligatorisk) | från Stripe Dashboard → Webhooks |
| `ADMIN_EMAIL` | notify-admin-new-santa | din admin-adress |
| `SITE_URL` | create-checkout-session | `https://tomtebudet.se` |
| `BANKID_*` | bankid | se `docs/BANKID.md` |

Deploy: `supabase db push` (två nya migrations) + `supabase functions deploy`.

## Kvarstående backlog (medvetet inte gjort nu)

1. **Före lansering av bokningar**: idempotens för Stripe-events
   (tabell med behandlade event-id:n), CORS låst till produktionsdomänen,
   audit-logg för admin-godkännanden (flytta approve/reject till en RPC).
2. **Städning**: orutade sidor (SearchSantas, Booking, SantaProfile,
   MyBookings m.fl.) importerar fortfarande `mockData.ts` – radera eller
   koppla till riktig data när bokningsflödet aktiveras.
3. **React Query**: installerat men oanvänt; migrera de ~12 handrullade
   fetch-mönstren dit (eller ta bort beroendet).
4. **Tillgänglighet**: filuppladdningsytorna saknar tangentbordsstöd,
   ikonknappar saknar aria-labels.
5. **SEO**: per-sida titlar/canonical (react-helmet-async), sitemap.xml,
   riktig og-bild.
6. **Admin på riktigt**: bygg Avbokningar + Inställningar när flödena finns.
