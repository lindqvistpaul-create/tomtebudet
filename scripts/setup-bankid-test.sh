#!/usr/bin/env bash
# Hämtar BankIDs officiella testcertifikat och sätter Supabase-secrets.
# Körs på DIN dator (kräver: curl, openssl, supabase CLI inloggad).
#
#   ./scripts/setup-bankid-test.sh <supabase-project-ref>
#
set -euo pipefail

PROJECT_REF="${1:?Ange projekt-ref, t.ex. zmxwfkjpgzmocazvpgvl}"
CERT_URL="https://www.bankid.com/assets/bankid/rp/FPTestcert5_20240610.p12"
CERT_PASS="qwerty123"   # Officiellt lösenord för testcertet (publikt)

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

echo "1/3 Laddar ner testcertifikat..."
curl -fsSL "$CERT_URL" -o "$TMP/test.p12"

echo "2/3 Konverterar till PEM..."
openssl pkcs12 -in "$TMP/test.p12" -passin "pass:$CERT_PASS" \
  -clcerts -nokeys -out "$TMP/cert.pem" -legacy 2>/dev/null || \
openssl pkcs12 -in "$TMP/test.p12" -passin "pass:$CERT_PASS" \
  -clcerts -nokeys -out "$TMP/cert.pem"
openssl pkcs12 -in "$TMP/test.p12" -passin "pass:$CERT_PASS" \
  -nocerts -nodes -out "$TMP/key.pem" -legacy 2>/dev/null || \
openssl pkcs12 -in "$TMP/test.p12" -passin "pass:$CERT_PASS" \
  -nocerts -nodes -out "$TMP/key.pem"

echo "3/3 Sätter Supabase-secrets..."
supabase secrets set --project-ref "$PROJECT_REF" \
  BANKID_API_URL="https://appapi2.test.bankid.com/rp/v6.0" \
  BANKID_CERT_PEM="$(cat "$TMP/cert.pem")" \
  BANKID_KEY_PEM="$(cat "$TMP/key.pem")" \
  BANKID_MOCK="false"

echo "Klart! Deploya funktionen med:"
echo "  supabase functions deploy bankid --project-ref $PROJECT_REF"
