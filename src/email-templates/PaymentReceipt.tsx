/**
 * E-POSTMALL 6: Kvittomail / Betalningsbekräftelse
 * 
 * Premium ton med momsuppgifter
 */

import React from 'react';

interface PaymentReceiptProps {
  customerName: string;
  customerEmail: string;
  santaName: string;
  bookingDate: string;
  bookingTime: string;
  duration: string;
  subtotal: string;
  serviceFee: string;
  vat: string;
  totalAmount: string;
  paymentMethod: string;
  paymentDate: string;
  invoiceNumber: string;
  dashboardUrl: string;
}

// ============================================
// HTML VERSION
// ============================================

export const PaymentReceiptEmail: React.FC<PaymentReceiptProps> = ({
  customerName,
  customerEmail,
  santaName,
  bookingDate,
  bookingTime,
  duration,
  subtotal,
  serviceFee,
  vat,
  totalAmount,
  paymentMethod,
  paymentDate,
  invoiceNumber,
  dashboardUrl,
}) => {
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Betalningsbekräftelse – Tomtebudet</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f7f4ef; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f4ef;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 47, 33, 0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(180deg, #0f2f21 0%, #1a4a35 100%); padding: 32px 40px; text-align: center;">
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #ffffff; margin: 0;">
                Tomte<span style="color: #d4a657;">budet</span>
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; line-height: 32px; color: #0f2f21; margin: 0 0 8px 0; text-align: center;">
                Betalnings<span style="color: #d4a657;">bekräftelse</span>
              </h2>
              
              <p style="font-size: 15px; line-height: 24px; color: #6b7c71; margin: 0 0 24px 0; text-align: center;">
                Tack för din betalning, ${customerName}. Nedan följer ditt kvitto.
              </p>
              
              <!-- Invoice Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="font-size: 14px; color: #6b7c71;">
                    Kvittonummer: <strong style="color: #0f2f21;">${invoiceNumber}</strong>
                  </td>
                  <td style="font-size: 14px; color: #6b7c71; text-align: right;">
                    Datum: <strong style="color: #0f2f21;">${paymentDate}</strong>
                  </td>
                </tr>
              </table>
              
              <!-- Service Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #0f2f21; margin: 0 0 16px 0;">
                      Bokningsdetaljer
                    </h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 14px;">Tjänst</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 14px; text-align: right;">Tomtebesök (${duration})</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 14px;">Tomte</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 14px; text-align: right;">${santaName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 14px;">Datum & tid</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 14px; text-align: right;">${bookingDate} kl ${bookingTime}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Price Breakdown -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e8e4de; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 14px;">Tomtebesök</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 14px; text-align: right;">${subtotal}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 14px;">Serviceavgift</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 14px; text-align: right;">${serviceFee}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 14px;">Moms (25%)</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 14px; text-align: right;">${vat}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top: 1px solid #e8e4de; padding-top: 16px; margin-top: 8px;"></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 16px; font-weight: 600;">Totalt betalt</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 20px; font-weight: 600; text-align: right; font-family: 'Playfair Display', Georgia, serif;">${totalAmount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Payment Method -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(212, 166, 87, 0.1); border-radius: 8px; margin: 24px 0;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table width="100%">
                      <tr>
                        <td style="font-size: 14px; color: #6b7c71;">Betalmetod</td>
                        <td style="font-size: 14px; color: #0f2f21; font-weight: 500; text-align: right;">${paymentMethod}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Reservation Note -->
              <div style="background-color: rgba(15, 47, 33, 0.05); border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #0f2f21;">
                <h4 style="font-size: 14px; color: #0f2f21; margin: 0 0 8px 0; font-weight: 600;">
                  🛡️ Trygg betalning
                </h4>
                <p style="font-size: 13px; color: #6b7c71; margin: 0;">
                  Beloppet är reserverat och frisläpps till tomten först efter genomfört besök. Vid avbokning mer än 24 timmar innan besöket återbetalas hela beloppet.
                </p>
              </div>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" style="display: inline-block; background-color: #0f2f21; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 32px; border-radius: 12px;">
                      Visa min bokning
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Company Info Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top" width="50%">
                    <p style="font-size: 12px; color: #6b7c71; margin: 0 0 4px 0; font-weight: 600;">Tomtebudet AB</p>
                    <p style="font-size: 12px; color: #6b7c71; margin: 0;">
                      Org.nr: 559XXX-XXXX<br>
                      Momsreg.nr: SE559XXXXXXXX01<br>
                      Storgatan 1, 111 22 Stockholm
                    </p>
                  </td>
                  <td valign="top" width="50%" style="text-align: right;">
                    <p style="font-size: 12px; color: #6b7c71; margin: 0 0 4px 0;">Frågor om betalningen?</p>
                    <p style="font-size: 12px; color: #6b7c71; margin: 0;">
                      <a href="mailto:faktura@tomtebudet.se" style="color: #0f2f21;">faktura@tomtebudet.se</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="font-size: 11px; color: #6b7c71; margin: 24px 0 0 0; text-align: center;">
                Detta kvitto skickades till ${customerEmail}. Spara det för din bokföring.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

// ============================================
// TEXT VERSION
// ============================================

export const paymentReceiptText = ({
  customerName,
  customerEmail,
  santaName,
  bookingDate,
  bookingTime,
  duration,
  subtotal,
  serviceFee,
  vat,
  totalAmount,
  paymentMethod,
  paymentDate,
  invoiceNumber,
  dashboardUrl,
}: PaymentReceiptProps): string => `
TOMTEBUDET
═══════════════════════════════════

BETALNINGSBEKRÄFTELSE

Tack för din betalning, ${customerName}. 
Nedan följer ditt kvitto.

───────────────────────────────────
KVITTOINFORMATION
───────────────────────────────────

Kvittonummer: ${invoiceNumber}
Datum: ${paymentDate}
Betalmetod: ${paymentMethod}

───────────────────────────────────
BOKNINGSDETALJER
───────────────────────────────────

Tjänst: Tomtebesök (${duration})
Tomte: ${santaName}
Datum & tid: ${bookingDate} kl ${bookingTime}

───────────────────────────────────
PRISSPECIFIKATION
───────────────────────────────────

Tomtebesök:                ${subtotal}
Serviceavgift:             ${serviceFee}
Moms (25%):                ${vat}
───────────────────────────────────
TOTALT BETALT:             ${totalAmount}

───────────────────────────────────
TRYGG BETALNING
───────────────────────────────────

Beloppet är reserverat och frisläpps till tomten 
först efter genomfört besök. Vid avbokning mer än 
24 timmar innan besöket återbetalas hela beloppet.

───────────────────────────────────

Visa min bokning: ${dashboardUrl}

───────────────────────────────────
FÖRETAGSINFORMATION
───────────────────────────────────

Tomtebudet AB
Org.nr: 559XXX-XXXX
Momsreg.nr: SE559XXXXXXXX01
Storgatan 1, 111 22 Stockholm

Frågor om betalningen?
faktura@tomtebudet.se

───────────────────────────────────

Detta kvitto skickades till ${customerEmail}.
Spara det för din bokföring.
`;

export default PaymentReceiptEmail;