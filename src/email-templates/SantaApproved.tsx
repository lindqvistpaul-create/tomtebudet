/**
 * E-POSTMALL 5: Tomte-onboarding godkänd
 * 
 * Gratulation och instruktioner för första bokningen
 */

import React from 'react';

interface SantaApprovedProps {
  santaName: string;
  profileUrl: string;
  dashboardUrl: string;
}

// ============================================
// HTML VERSION
// ============================================

export const SantaApprovedEmail: React.FC<SantaApprovedProps> = ({
  santaName,
  profileUrl,
  dashboardUrl,
}) => {
  return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grattis! Du är nu en certifierad tomte – Tomtebudet</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f7f4ef; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f4ef;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 47, 33, 0.08);">
          
          <!-- Header with celebration -->
          <tr>
            <td style="background: linear-gradient(180deg, #0f2f21 0%, #1a4a35 100%); padding: 40px; text-align: center;">
              <p style="font-size: 48px; margin: 0 0 16px 0;">🎉 🎅 🎉</p>
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #ffffff; margin: 0;">
                Tomte<span style="color: #d4a657;">budet</span>
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 32px; line-height: 40px; color: #0f2f21; margin: 0 0 8px 0; text-align: center;">
                Grattis, <span style="color: #d4a657;">${santaName}!</span>
              </h2>
              
              <p style="font-size: 18px; line-height: 28px; color: #6b7c71; margin: 0 0 24px 0; text-align: center;">
                Du är nu en <strong style="color: #0f2f21;">certifierad Tomtebudet-tomte</strong>!
              </p>
              
              <!-- Badge -->
              <div style="background: linear-gradient(135deg, #d4a657 0%, #e0bb7a 100%); border-radius: 16px; padding: 32px; text-align: center; margin: 24px 0;">
                <p style="font-size: 64px; margin: 0 0 12px 0;">🎅</p>
                <p style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #0f2f21; margin: 0; font-weight: 600;">
                  Certifierad Tomte
                </p>
                <p style="font-size: 14px; color: #0f2f21; margin: 8px 0 0 0; opacity: 0.8;">
                  ✓ BankID-verifierad • ✓ Manuellt granskad
                </p>
              </div>
              
              <!-- What's Next -->
              <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #0f2f21; margin: 32px 0 16px 0;">
                Nästa steg
              </h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; margin: 0 0 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <!-- Step 1 -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      <tr>
                        <td width="48" valign="top">
                          <div style="width: 36px; height: 36px; background-color: #0f2f21; border-radius: 50%; text-align: center; line-height: 36px; color: #d4a657; font-size: 16px; font-weight: 700;">1</div>
                        </td>
                        <td valign="top">
                          <p style="font-size: 16px; color: #0f2f21; margin: 0 0 4px 0; font-weight: 600;">Granska din profil</p>
                          <p style="font-size: 14px; color: #6b7c71; margin: 0;">Se till att din bio, bilder och tillgängliga tider är uppdaterade.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Step 2 -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      <tr>
                        <td width="48" valign="top">
                          <div style="width: 36px; height: 36px; background-color: #0f2f21; border-radius: 50%; text-align: center; line-height: 36px; color: #d4a657; font-size: 16px; font-weight: 700;">2</div>
                        </td>
                        <td valign="top">
                          <p style="font-size: 16px; color: #0f2f21; margin: 0 0 4px 0; font-weight: 600;">Lägg till tillgängliga tider</p>
                          <p style="font-size: 14px; color: #6b7c71; margin: 0;">Ange vilka tider du är tillgänglig på julafton och dagarna innan.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Step 3 -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      <tr>
                        <td width="48" valign="top">
                          <div style="width: 36px; height: 36px; background-color: #0f2f21; border-radius: 50%; text-align: center; line-height: 36px; color: #d4a657; font-size: 16px; font-weight: 700;">3</div>
                        </td>
                        <td valign="top">
                          <p style="font-size: 16px; color: #0f2f21; margin: 0 0 4px 0; font-weight: 600;">Vänta på bokningsförfrågningar</p>
                          <p style="font-size: 14px; color: #6b7c71; margin: 0;">Familjer i ditt område kan nu boka dig! Du får en notis för varje ny förfrågan.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Step 4 -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" valign="top">
                          <div style="width: 36px; height: 36px; background-color: #0f2f21; border-radius: 50%; text-align: center; line-height: 36px; color: #d4a657; font-size: 16px; font-weight: 700;">4</div>
                        </td>
                        <td valign="top">
                          <p style="font-size: 16px; color: #0f2f21; margin: 0 0 4px 0; font-weight: 600;">Sprid julmagin!</p>
                          <p style="font-size: 14px; color: #6b7c71; margin: 0;">Gör varje besök till ett oförglömligt minne för familjerna.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" style="display: inline-block; background-color: #0f2f21; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 32px; border-radius: 12px; margin-bottom: 12px;">
                      Gå till Min tomtesida
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 12px;">
                    <a href="${profileUrl}" style="font-size: 14px; color: #0f2f21; text-decoration: underline;">
                      Visa din offentliga profil →
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Tips Box -->
              <div style="background-color: rgba(15, 47, 33, 0.05); border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #d4a657;">
                <h4 style="font-size: 15px; color: #0f2f21; margin: 0 0 8px 0; font-weight: 600;">
                  💡 Tips för en lyckad start
                </h4>
                <p style="font-size: 14px; color: #6b7c71; margin: 0;">
                  Familjer uppskattar tomtar som svarar snabbt på meddelanden och har en personlig, varm bio. Lägg extra tid på att göra din profil inbjudande!
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 32px 40px; text-align: center;">
              <p style="font-size: 13px; line-height: 20px; color: #6b7c71; margin: 0 0 8px 0;">
                🎄 Välkommen till tomtefamiljen! 🎄
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

export const santaApprovedText = ({
  santaName,
  profileUrl,
  dashboardUrl,
}: SantaApprovedProps): string => `
TOMTEBUDET
═══════════════════════════════════

🎉 GRATTIS, ${santaName.toUpperCase()}! 🎉

Du är nu en CERTIFIERAD TOMTEBUDET-TOMTE!

═══════════════════════════════════
🎅 CERTIFIERAD TOMTE
✓ BankID-verifierad • ✓ Manuellt granskad
═══════════════════════════════════

───────────────────────────────────
NÄSTA STEG
───────────────────────────────────

1. GRANSKA DIN PROFIL
   Se till att din bio, bilder och tillgängliga 
   tider är uppdaterade.

2. LÄGG TILL TILLGÄNGLIGA TIDER
   Ange vilka tider du är tillgänglig på julafton 
   och dagarna innan.

3. VÄNTA PÅ BOKNINGSFÖRFRÅGNINGAR
   Familjer i ditt område kan nu boka dig! 
   Du får en notis för varje ny förfrågan.

4. SPRID JULMAGIN!
   Gör varje besök till ett oförglömligt 
   minne för familjerna.

───────────────────────────────────

Gå till Min tomtesida: ${dashboardUrl}
Visa din offentliga profil: ${profileUrl}

───────────────────────────────────
💡 TIPS FÖR EN LYCKAD START
───────────────────────────────────

Familjer uppskattar tomtar som svarar snabbt på 
meddelanden och har en personlig, varm bio. 
Lägg extra tid på att göra din profil inbjudande!

───────────────────────────────────

🎄 Välkommen till tomtefamiljen! 🎄

Med varma julhälsningar,
Tomtebudet-teamet
`;

export default SantaApprovedEmail;