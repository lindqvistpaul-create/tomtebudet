/**
 * E-POSTMALL 1: Bekräftelse på bokning av jultomte
 * 
 * En varm och julmagisk hälsning med bokningsdetaljer
 */

import React from 'react';

interface BookingConfirmationProps {
  customerName: string;
  santaName: string;
  bookingDate: string;
  bookingTime: string;
  duration: string;
  address: string;
  childrenNames: string[];
  totalPrice: string;
  bookingId: string;
  dashboardUrl: string;
}

// ============================================
// HTML VERSION (React Email Component)
// ============================================

export const BookingConfirmationEmail: React.FC<BookingConfirmationProps> = ({
  customerName,
  santaName,
  bookingDate,
  bookingTime,
  duration,
  address,
  childrenNames,
  totalPrice,
  bookingId,
  dashboardUrl,
}) => {
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Din bokning är bekräftad – Tomtebudet</title>
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
              <!-- Sparkle decoration -->
              <p style="text-align: center; font-size: 24px; margin: 0 0 24px 0;">✨ 🎄 ✨</p>
              
              <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; line-height: 36px; color: #0f2f21; margin: 0 0 8px 0; text-align: center;">
                Er bokning är <span style="color: #d4a657;">bekräftad!</span>
              </h2>
              
              <p style="font-size: 16px; line-height: 26px; color: #6b7c71; margin: 0 0 24px 0; text-align: center;">
                Kära ${customerName}, tack för ert förtroende! En magisk julupplevelse väntar er familj.
              </p>
              
              <!-- Booking Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 18px; color: #0f2f21; margin: 0 0 16px 0;">
                      Bokningsdetaljer
                    </h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 15px;">Tomte</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 15px; font-weight: 500; text-align: right;">${santaName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 15px;">Datum</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 15px; font-weight: 500; text-align: right;">${bookingDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 15px;">Tid</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 15px; font-weight: 500; text-align: right;">${bookingTime} (${duration})</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 15px;">Adress</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 15px; font-weight: 500; text-align: right;">${address}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 15px;">Barn</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 15px; font-weight: 500; text-align: right;">${childrenNames.join(', ')}</td>
                      </tr>
                    </table>
                    
                    <div style="border-top: 1px solid #e8e4de; margin-top: 16px; padding-top: 16px;">
                      <table width="100%">
                        <tr>
                          <td style="color: #0f2f21; font-size: 16px; font-weight: 600;">Totalt</td>
                          <td style="color: #0f2f21; font-size: 20px; font-weight: 600; text-align: right; font-family: 'Playfair Display', Georgia, serif;">${totalPrice}</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Trust Badge -->
              <div style="background-color: rgba(212, 166, 87, 0.15); border-radius: 8px; padding: 12px 16px; text-align: center; margin: 24px 0;">
                <span style="font-size: 14px; color: #0f2f21;">🛡️ BankID-verifierad tomte • Trygg betalning</span>
              </div>
              
              <!-- Preparation Tips -->
              <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 18px; color: #0f2f21; margin: 24px 0 12px 0;">
                Förberedelser inför besöket
              </h3>
              <ul style="color: #6b7c71; font-size: 15px; line-height: 28px; padding-left: 20px; margin: 0;">
                <li>Ha presenterna redo och inslagna – tomten tar med dem i sin säck</li>
                <li>Förbered barnen på att tomten kommer knacka på dörren</li>
                <li>Se till att tomten har tillgång till er entré</li>
                <li>Kontakta tomten via chatten om ni har speciella önskemål</li>
              </ul>
              
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
              
              <p style="font-size: 15px; line-height: 24px; color: #6b7c71; text-align: center; margin: 0;">
                Bokningsnummer: <strong style="color: #0f2f21;">${bookingId}</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 32px 40px; text-align: center;">
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0 0 8px 0;">
                Vi önskar er en riktigt magisk julafton! ✨
              </p>
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0;">
                Med varma julhälsningar,<br>
                <strong style="color: #0f2f21;">Tomtebudet</strong>
              </p>
              <p style="font-size: 12px; color: #6b7c71; margin: 16px 0 0 0;">
                <a href="#" style="color: #0f2f21; text-decoration: underline;">Avbokningsvillkor</a> • 
                <a href="#" style="color: #0f2f21; text-decoration: underline;">Kontakta oss</a>
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
// TEXT VERSION (Plain Text Fallback)
// ============================================

export const bookingConfirmationText = ({
  customerName,
  santaName,
  bookingDate,
  bookingTime,
  duration,
  address,
  childrenNames,
  totalPrice,
  bookingId,
  dashboardUrl,
}: BookingConfirmationProps): string => `
TOMTEBUDET
═══════════════════════════════════

✨ ER BOKNING ÄR BEKRÄFTAD! ✨

Kära ${customerName},

Tack för ert förtroende! En magisk julupplevelse väntar er familj.

───────────────────────────────────
BOKNINGSDETALJER
───────────────────────────────────

Tomte: ${santaName}
Datum: ${bookingDate}
Tid: ${bookingTime} (${duration})
Adress: ${address}
Barn: ${childrenNames.join(', ')}

Totalt: ${totalPrice}
Bokningsnummer: ${bookingId}

🛡️ BankID-verifierad tomte • Trygg betalning

───────────────────────────────────
FÖRBEREDELSER INFÖR BESÖKET
───────────────────────────────────

• Ha presenterna redo och inslagna – tomten tar med dem i sin säck
• Förbered barnen på att tomten kommer knacka på dörren
• Se till att tomten har tillgång till er entré
• Kontakta tomten via chatten om ni har speciella önskemål

───────────────────────────────────

Visa din bokning: ${dashboardUrl}

───────────────────────────────────

Vi önskar er en riktigt magisk julafton! ✨

Med varma julhälsningar,
Tomtebudet

www.tomtebudet.se
`;

export default BookingConfirmationEmail;