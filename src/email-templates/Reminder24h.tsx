/**
 * E-POSTMALL 3: Påminnelse 24 timmar innan besöket
 * 
 * Trygghetsinfo och kontaktuppgifter
 */

import React from 'react';

interface Reminder24hProps {
  customerName: string;
  santaName: string;
  bookingDate: string;
  bookingTime: string;
  duration: string;
  address: string;
  childrenNames: string[];
  dashboardUrl: string;
}

// ============================================
// HTML VERSION
// ============================================

export const Reminder24hEmail: React.FC<Reminder24hProps> = ({
  customerName,
  santaName,
  bookingDate,
  bookingTime,
  duration,
  address,
  childrenNames,
  dashboardUrl,
}) => {
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Imorgon kommer tomten! – Tomtebudet</title>
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
              <!-- Bell Icon -->
              <p style="text-align: center; font-size: 48px; margin: 0 0 16px 0;">🔔</p>
              
              <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; line-height: 36px; color: #0f2f21; margin: 0 0 8px 0; text-align: center;">
                Imorgon kommer <span style="color: #d4a657;">tomten!</span>
              </h2>
              
              <p style="font-size: 16px; line-height: 26px; color: #6b7c71; margin: 0 0 24px 0; text-align: center;">
                Kära ${customerName}, nu är det bara en dag kvar till er magiska julupplevelse!
              </p>
              
              <!-- Time Highlight Box -->
              <div style="background: linear-gradient(135deg, #d4a657 0%, #e0bb7a 100%); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
                <p style="font-size: 14px; color: #0f2f21; margin: 0 0 4px 0; opacity: 0.8;">Er tomte anländer</p>
                <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 32px; color: #0f2f21; margin: 0; font-weight: 600;">
                  ${bookingTime}
                </p>
                <p style="font-size: 14px; color: #0f2f21; margin: 4px 0 0 0;">${bookingDate}</p>
              </div>
              
              <!-- Booking Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 15px;">Tomte</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 15px; font-weight: 500; text-align: right;">${santaName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7c71; font-size: 15px;">Längd</td>
                        <td style="padding: 8px 0; color: #0f2f21; font-size: 15px; font-weight: 500; text-align: right;">${duration}</td>
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
                  </td>
                </tr>
              </table>
              
              <!-- Checklist -->
              <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 18px; color: #0f2f21; margin: 24px 0 16px 0;">
                Checklista inför besöket
              </h3>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8;">
                    <span style="font-size: 20px; margin-right: 12px;">✅</span>
                    <span style="font-size: 15px; color: #0f2f21;">Ha presenterna redo och inslagna</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8;">
                    <span style="font-size: 20px; margin-right: 12px;">✅</span>
                    <span style="font-size: 15px; color: #0f2f21;">Se till att porten/dörren är tillgänglig</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede8;">
                    <span style="font-size: 20px; margin-right: 12px;">✅</span>
                    <span style="font-size: 15px; color: #0f2f21;">Förbered barnen på att tomten snart kommer</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="font-size: 20px; margin-right: 12px;">✅</span>
                    <span style="font-size: 15px; color: #0f2f21;">Ha telefonen nära ifall tomten behöver kontakta er</span>
                  </td>
                </tr>
              </table>
              
              <!-- Contact Info -->
              <div style="background-color: rgba(15, 47, 33, 0.05); border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #0f2f21;">
                <h4 style="font-size: 15px; color: #0f2f21; margin: 0 0 8px 0; font-weight: 600;">
                  💬 Behöver ni kontakta tomten?
                </h4>
                <p style="font-size: 14px; color: #6b7c71; margin: 0;">
                  Använd chatten i "Mina bokningar" för att skicka meddelanden till ${santaName}. Vid akuta frågor på julafton, ring Tomtebudets support.
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
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 32px 40px; text-align: center;">
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0 0 8px 0;">
                🎄 Vi önskar er en underbar julafton! 🎄
              </p>
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0;">
                Med varma julhälsningar,<br>
                <strong style="color: #0f2f21;">Tomtebudet</strong>
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

export const reminder24hText = ({
  customerName,
  santaName,
  bookingDate,
  bookingTime,
  duration,
  address,
  childrenNames,
  dashboardUrl,
}: Reminder24hProps): string => `
TOMTEBUDET
═══════════════════════════════════

🔔 IMORGON KOMMER TOMTEN!

Kära ${customerName},
Nu är det bara en dag kvar till er magiska julupplevelse!

═══════════════════════════════════
ER TOMTE ANLÄNDER: ${bookingTime}
${bookingDate}
═══════════════════════════════════

───────────────────────────────────
BOKNINGSDETALJER
───────────────────────────────────

Tomte: ${santaName}
Längd: ${duration}
Adress: ${address}
Barn: ${childrenNames.join(', ')}

───────────────────────────────────
CHECKLISTA INFÖR BESÖKET
───────────────────────────────────

✅ Ha presenterna redo och inslagna
✅ Se till att porten/dörren är tillgänglig
✅ Förbered barnen på att tomten snart kommer
✅ Ha telefonen nära ifall tomten behöver kontakta er

───────────────────────────────────
BEHÖVER NI KONTAKTA TOMTEN?
───────────────────────────────────

Använd chatten i "Mina bokningar" för att skicka 
meddelanden till ${santaName}. Vid akuta frågor på 
julafton, ring Tomtebudets support.

Visa min bokning: ${dashboardUrl}

───────────────────────────────────

🎄 Vi önskar er en underbar julafton! 🎄

Med varma julhälsningar,
Tomtebudet
`;

export default Reminder24hEmail;