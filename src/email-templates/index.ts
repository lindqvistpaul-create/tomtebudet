/**
 * Tomtebudet E-postmallar
 * 
 * Premium, varm, trygg och elegant tonalitet med julmagisk känsla.
 * 
 * Design tokens:
 * - Mörkgrönt header: #0f2f21
 * - Guld accent: #d4a657
 * - Snövit bakgrund: #faf8f5
 * - Serif rubriker: Playfair Display
 * - Sans-serif text: Inter
 */

// Shared styles
export * from './shared-styles';

// Email templates
export { BookingConfirmationEmail, bookingConfirmationText } from './BookingConfirmation';
export { SantaAcceptedEmail, santaAcceptedText } from './SantaAccepted';
export { Reminder24hEmail, reminder24hText } from './Reminder24h';
export { SantaOnboardingReviewEmail, santaOnboardingReviewText } from './SantaOnboardingReview';
export { SantaApprovedEmail, santaApprovedText } from './SantaApproved';
export { PaymentReceiptEmail, paymentReceiptText } from './PaymentReceipt';
export { ReviewRequestEmail, reviewRequestText } from './ReviewRequest';

/**
 * Användning i Supabase Edge Functions:
 * 
 * import { Resend } from 'npm:resend@2.0.0';
 * import { BookingConfirmationEmail, bookingConfirmationText } from './email-templates';
 * 
 * const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
 * 
 * await resend.emails.send({
 *   from: 'Tomtebudet <noreply@tomtebudet.se>',
 *   to: [customerEmail],
 *   subject: 'Din bokning är bekräftad! ✨',
 *   html: BookingConfirmationEmail({ ...props }),
 *   text: bookingConfirmationText({ ...props }),
 * });
 */