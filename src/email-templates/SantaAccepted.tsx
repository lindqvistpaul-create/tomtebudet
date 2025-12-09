/**
 * E-POSTMALL 2: Notis – Tomten har accepterat bokningen
 * 
 * Bekräftelse med tomtens info och omdömesstatistik
 */

import React from 'react';

interface SantaAcceptedProps {
  customerName: string;
  santaName: string;
  santaRating: string;
  santaReviews: number;
  santaExperience: string;
  bookingDate: string;
  bookingTime: string;
  dashboardUrl: string;
}

// ============================================
// HTML VERSION
// ============================================

export const SantaAcceptedEmail: React.FC<SantaAcceptedProps> = ({
  customerName,
  santaName,
  santaRating,
  santaReviews,
  santaExperience,
  bookingDate,
  bookingTime,
  dashboardUrl,
}) => {
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tomten har accepterat! – Tomtebudet</title>
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
              <!-- Success Icon -->
              <p style="text-align: center; font-size: 48px; margin: 0 0 16px 0;">✅</p>
              
              <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; line-height: 36px; color: #0f2f21; margin: 0 0 8px 0; text-align: center;">
                <span style="color: #d4a657;">${santaName}</span> har accepterat!
              </h2>
              
              <p style="font-size: 16px; line-height: 26px; color: #6b7c71; margin: 0 0 24px 0; text-align: center;">
                Underbara nyheter, ${customerName}! Er tomte ser fram emot att besöka er familj.
              </p>
              
              <!-- Santa Profile Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 18px; color: #0f2f21; margin: 0 0 16px 0;">
                      Er tomte
                    </h3>
                    
                    <table width="100%">
                      <tr>
                        <td width="80" valign="top">
                          <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #d4a657 0%, #e0bb7a 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 32px;">🎅</span>
                          </div>
                        </td>
                        <td valign="top" style="padding-left: 16px;">
                          <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #0f2f21; margin: 0 0 4px 0;">
                            ${santaName}
                          </h4>
                          <p style="font-size: 14px; color: #6b7c71; margin: 0 0 12px 0;">
                            ${santaExperience}
                          </p>
                          
                          <!-- Rating -->
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-right: 8px;">
                                <span style="color: #d4a657; font-size: 16px;">⭐⭐⭐⭐⭐</span>
                              </td>
                              <td>
                                <span style="font-size: 16px; font-weight: 600; color: #0f2f21;">${santaRating}</span>
                                <span style="font-size: 14px; color: #6b7c71;"> (${santaReviews} omdömen)</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Booking Quick Info -->
              <div style="background-color: rgba(212, 166, 87, 0.15); border-radius: 8px; padding: 16px 20px; text-align: center; margin: 24px 0;">
                <span style="font-size: 15px; color: #0f2f21;">
                  📅 <strong>${bookingDate}</strong> kl <strong>${bookingTime}</strong>
                </span>
              </div>
              
              <p style="font-size: 15px; line-height: 24px; color: #6b7c71; text-align: center; margin: 0 0 24px 0;">
                Ni kan nu chatta direkt med ${santaName} för att dela era barns önskemål och annan viktig information.
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" style="display: inline-block; background-color: #0f2f21; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 32px; border-radius: 12px;">
                      Visa bokning & chatta
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 32px 40px; text-align: center;">
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

export const santaAcceptedText = ({
  customerName,
  santaName,
  santaRating,
  santaReviews,
  santaExperience,
  bookingDate,
  bookingTime,
  dashboardUrl,
}: SantaAcceptedProps): string => `
TOMTEBUDET
═══════════════════════════════════

✅ ${santaName.toUpperCase()} HAR ACCEPTERAT!

Underbara nyheter, ${customerName}!
Er tomte ser fram emot att besöka er familj.

───────────────────────────────────
ER TOMTE
───────────────────────────────────

🎅 ${santaName}
${santaExperience}

⭐ ${santaRating} (${santaReviews} omdömen)

───────────────────────────────────
BOKNINGSINFO
───────────────────────────────────

📅 ${bookingDate} kl ${bookingTime}

───────────────────────────────────

Ni kan nu chatta direkt med ${santaName} för att dela 
era barns önskemål och annan viktig information.

Visa bokning & chatta: ${dashboardUrl}

───────────────────────────────────

Med varma julhälsningar,
Tomtebudet
`;

export default SantaAcceptedEmail;