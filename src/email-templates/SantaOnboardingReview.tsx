/**
 * E-POSTMALL 4: Tomte-onboarding – Vi granskar din ansökan
 * 
 * Varmt tack och information om granskningstid
 */

import React from 'react';

interface SantaOnboardingReviewProps {
  santaName: string;
  applicationDate: string;
  estimatedReviewTime: string;
}

// ============================================
// HTML VERSION
// ============================================

export const SantaOnboardingReviewEmail: React.FC<SantaOnboardingReviewProps> = ({
  santaName,
  applicationDate,
  estimatedReviewTime,
}) => {
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vi granskar din ansökan – Tomtebudet</title>
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
              <!-- Search Icon -->
              <p style="text-align: center; font-size: 48px; margin: 0 0 16px 0;">🔍</p>
              
              <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; line-height: 36px; color: #0f2f21; margin: 0 0 8px 0; text-align: center;">
                Tack för din <span style="color: #d4a657;">ansökan!</span>
              </h2>
              
              <p style="font-size: 16px; line-height: 26px; color: #6b7c71; margin: 0 0 24px 0; text-align: center;">
                Kära ${santaName}, vi är glada att du vill bli en del av Tomtebudets tomtefamilj!
              </p>
              
              <!-- Status Box -->
              <div style="background: linear-gradient(135deg, rgba(212, 166, 87, 0.2) 0%, rgba(212, 166, 87, 0.1) 100%); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; border: 1px solid rgba(212, 166, 87, 0.3);">
                <p style="font-size: 14px; color: #6b7c71; margin: 0 0 4px 0;">Status</p>
                <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #d4a657; margin: 0; font-weight: 600;">
                  Under granskning
                </p>
              </div>
              
              <!-- Timeline -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 18px; color: #0f2f21; margin: 0 0 16px 0;">
                      Vad händer nu?
                    </h3>
                    
                    <!-- Step 1 -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                      <tr>
                        <td width="40" valign="top">
                          <div style="width: 28px; height: 28px; background-color: #0f2f21; border-radius: 50%; text-align: center; line-height: 28px; color: #ffffff; font-size: 14px; font-weight: 600;">1</div>
                        </td>
                        <td valign="top">
                          <p style="font-size: 15px; color: #0f2f21; margin: 0 0 4px 0; font-weight: 500;">Vi granskar din profil</p>
                          <p style="font-size: 14px; color: #6b7c71; margin: 0;">Vårt team kontrollerar dina uppgifter och bilder.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Step 2 -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                      <tr>
                        <td width="40" valign="top">
                          <div style="width: 28px; height: 28px; background-color: #e8e4de; border-radius: 50%; text-align: center; line-height: 28px; color: #6b7c71; font-size: 14px; font-weight: 600;">2</div>
                        </td>
                        <td valign="top">
                          <p style="font-size: 15px; color: #6b7c71; margin: 0 0 4px 0; font-weight: 500;">BankID-verifiering bekräftas</p>
                          <p style="font-size: 14px; color: #6b7c71; margin: 0;">Din identitet verifieras för familjernas trygghet.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Step 3 -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" valign="top">
                          <div style="width: 28px; height: 28px; background-color: #e8e4de; border-radius: 50%; text-align: center; line-height: 28px; color: #6b7c71; font-size: 14px; font-weight: 600;">3</div>
                        </td>
                        <td valign="top">
                          <p style="font-size: 15px; color: #6b7c71; margin: 0 0 4px 0; font-weight: 500;">Du får besked via e-post</p>
                          <p style="font-size: 14px; color: #6b7c71; margin: 0;">Vi meddelar dig så snart granskningen är klar.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Time Estimate -->
              <div style="background-color: rgba(15, 47, 33, 0.05); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
                <p style="font-size: 14px; color: #6b7c71; margin: 0 0 4px 0;">Beräknad granskningstid</p>
                <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #0f2f21; margin: 0; font-weight: 600;">
                  ${estimatedReviewTime}
                </p>
              </div>
              
              <p style="font-size: 15px; line-height: 24px; color: #6b7c71; text-align: center; margin: 24px 0 0 0;">
                Har du frågor? Tveka inte att kontakta oss på <a href="mailto:tomtar@tomtebudet.se" style="color: #0f2f21; text-decoration: underline;">tomtar@tomtebudet.se</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 32px 40px; text-align: center;">
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0 0 8px 0;">
                Ansökningsdatum: ${applicationDate}
              </p>
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0;">
                Med varma julhälsningar,<br>
                <strong style="color: #0f2f21;">Tomtebudet-teamet</strong>
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

export const santaOnboardingReviewText = ({
  santaName,
  applicationDate,
  estimatedReviewTime,
}: SantaOnboardingReviewProps): string => `
TOMTEBUDET
═══════════════════════════════════

🔍 TACK FÖR DIN ANSÖKAN!

Kära ${santaName},

Vi är glada att du vill bli en del av Tomtebudets tomtefamilj!

───────────────────────────────────
STATUS: UNDER GRANSKNING
───────────────────────────────────

VAD HÄNDER NU?

1. Vi granskar din profil
   Vårt team kontrollerar dina uppgifter och bilder.

2. BankID-verifiering bekräftas
   Din identitet verifieras för familjernas trygghet.

3. Du får besked via e-post
   Vi meddelar dig så snart granskningen är klar.

───────────────────────────────────

Beräknad granskningstid: ${estimatedReviewTime}
Ansökningsdatum: ${applicationDate}

───────────────────────────────────

Har du frågor? Kontakta oss på tomtar@tomtebudet.se

Med varma julhälsningar,
Tomtebudet-teamet
`;

export default SantaOnboardingReviewEmail;