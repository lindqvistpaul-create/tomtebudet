/**
 * E-POSTMALL 7: Omdömesförfrågan efter besöket
 * 
 * Elegant, mjuk, personlig ton
 */

import React from 'react';

interface ReviewRequestProps {
  customerName: string;
  santaName: string;
  bookingDate: string;
  childrenNames: string[];
  reviewUrl: string;
}

// ============================================
// HTML VERSION
// ============================================

export const ReviewRequestEmail: React.FC<ReviewRequestProps> = ({
  customerName,
  santaName,
  bookingDate,
  childrenNames,
  reviewUrl,
}) => {
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hur var tomtebesöket? – Tomtebudet</title>
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
              <!-- Star Icon -->
              <p style="text-align: center; font-size: 48px; margin: 0 0 16px 0;">⭐</p>
              
              <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; line-height: 36px; color: #0f2f21; margin: 0 0 8px 0; text-align: center;">
                Hur var <span style="color: #d4a657;">julmagin?</span>
              </h2>
              
              <p style="font-size: 16px; line-height: 26px; color: #6b7c71; margin: 0 0 24px 0; text-align: center;">
                Kära ${customerName}, vi hoppas att ${childrenNames.join(' och ')} fick en oförglömlig stund med ${santaName}!
              </p>
              
              <!-- Personal Touch Box -->
              <div style="background-color: #faf8f5; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
                <p style="font-size: 15px; color: #6b7c71; margin: 0; font-style: italic;">
                  "Ert omdöme hjälper andra familjer att hitta rätt tomte – och ger ${santaName} värdefull feedback för att fortsätta sprida julglädje."
                </p>
              </div>
              
              <!-- Star Rating Preview -->
              <div style="text-align: center; margin: 32px 0;">
                <p style="font-size: 14px; color: #6b7c71; margin: 0 0 12px 0;">Hur många stjärnor ger ni ${santaName}?</p>
                <p style="font-size: 40px; margin: 0; letter-spacing: 8px;">⭐⭐⭐⭐⭐</p>
              </div>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${reviewUrl}" style="display: inline-block; background: linear-gradient(135deg, #d4a657 0%, #e0bb7a 100%); color: #0f2f21; font-size: 16px; font-weight: 600; text-decoration: none; padding: 18px 40px; border-radius: 12px;">
                      Skriv ett omdöme
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="font-size: 14px; color: #6b7c71; text-align: center; margin: 0;">
                Det tar bara 1 minut ✨
              </p>
              
              <!-- What to Write -->
              <div style="margin: 32px 0; padding: 24px; border: 1px dashed #e8e4de; border-radius: 12px;">
                <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; color: #0f2f21; margin: 0 0 12px 0;">
                  💡 Tips på vad ni kan skriva om:
                </h3>
                <ul style="color: #6b7c71; font-size: 14px; line-height: 24px; padding-left: 20px; margin: 0;">
                  <li>Hur reagerade barnen när tomten kom?</li>
                  <li>Var ${santaName} punktlig och professionell?</li>
                  <li>Hur upplevde ni stämningen och magin?</li>
                  <li>Skulle ni rekommendera ${santaName} till andra familjer?</li>
                </ul>
              </div>
              
              <!-- Booking Reference -->
              <p style="font-size: 13px; color: #6b7c71; text-align: center; margin: 24px 0 0 0;">
                Besök den ${bookingDate} med ${santaName}
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 32px 40px; text-align: center;">
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0 0 8px 0;">
                Tack för att ni valde Tomtebudet! 🎄
              </p>
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0;">
                Med varma julhälsningar,<br>
                <strong style="color: #0f2f21;">Tomtebudet</strong>
              </p>
              
              <p style="font-size: 11px; color: #6b7c71; margin: 24px 0 0 0;">
                <a href="#" style="color: #6b7c71;">Avprenumerera</a> från påminnelser om omdömen
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

export const reviewRequestText = ({
  customerName,
  santaName,
  bookingDate,
  childrenNames,
  reviewUrl,
}: ReviewRequestProps): string => `
TOMTEBUDET
═══════════════════════════════════

⭐ HUR VAR JULMAGIN? ⭐

Kära ${customerName},

Vi hoppas att ${childrenNames.join(' och ')} fick en 
oförglömlig stund med ${santaName}!

───────────────────────────────────

"Ert omdöme hjälper andra familjer att hitta 
rätt tomte – och ger ${santaName} värdefull 
feedback för att fortsätta sprida julglädje."

───────────────────────────────────
HUR MÅNGA STJÄRNOR GER NI ${santaName.toUpperCase()}?
───────────────────────────────────

⭐⭐⭐⭐⭐

Skriv ett omdöme: ${reviewUrl}
(Det tar bara 1 minut ✨)

───────────────────────────────────
TIPS PÅ VAD NI KAN SKRIVA OM
───────────────────────────────────

• Hur reagerade barnen när tomten kom?
• Var ${santaName} punktlig och professionell?
• Hur upplevde ni stämningen och magin?
• Skulle ni rekommendera ${santaName} till andra familjer?

───────────────────────────────────

Besök den ${bookingDate} med ${santaName}

───────────────────────────────────

Tack för att ni valde Tomtebudet! 🎄

Med varma julhälsningar,
Tomtebudet
`;

export default ReviewRequestEmail;