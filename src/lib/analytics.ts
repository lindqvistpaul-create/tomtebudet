// Google Analytics 4 Helper Functions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Track a custom event in Google Analytics 4
 * @param name - Event name (e.g., 'button_click', 'signup', 'booking_started')
 * @param params - Optional event parameters
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
}

/**
 * Track a page view in Google Analytics 4
 * Called automatically on route changes
 * @param path - The page path
 * @param title - The page title
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
}

// Pre-defined event helpers for common actions
export const analytics = {
  // Booking events
  bookingStarted: (santaId: string, santaName: string) =>
    trackEvent('booking_started', { santa_id: santaId, santa_name: santaName }),
  
  bookingCompleted: (bookingId: string, amount: number) =>
    trackEvent('booking_completed', { booking_id: bookingId, value: amount, currency: 'SEK' }),
  
  bookingCancelled: (bookingId: string) =>
    trackEvent('booking_cancelled', { booking_id: bookingId }),

  // Auth events
  signUp: (method: string, role: string) =>
    trackEvent('sign_up', { method, role }),
  
  login: (method: string) =>
    trackEvent('login', { method }),

  // Santa events
  santaApplicationStarted: () =>
    trackEvent('santa_application_started'),
  
  santaApplicationCompleted: () =>
    trackEvent('santa_application_completed'),

  // Search events
  searchPerformed: (query: string, resultsCount: number) =>
    trackEvent('search', { search_term: query, results_count: resultsCount }),

  // CTA clicks
  ctaClick: (ctaName: string, location: string) =>
    trackEvent('cta_click', { cta_name: ctaName, location }),
};
