// Tomtebudet Email Design Tokens
export const colors = {
  pine: '#0f2f21',        // hsl(153, 52%, 12%)
  pineLight: '#1a4a35',
  gold: '#d4a657',        // hsl(39, 60%, 59%)
  goldLight: '#e0bb7a',
  snow: '#faf8f5',        // hsl(45, 30%, 98%)
  cream: '#f7f4ef',       // hsl(45, 30%, 96%)
  warmGray: '#6b7c71',
  tomteRed: '#c43a3a',
  white: '#ffffff',
};

export const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// Shared styles for all email templates
export const main = {
  backgroundColor: colors.cream,
  fontFamily: fonts.sans,
};

export const container = {
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
};

export const header = {
  backgroundColor: colors.pine,
  padding: '32px 40px',
  textAlign: 'center' as const,
};

export const logo = {
  fontFamily: fonts.serif,
  fontSize: '28px',
  color: colors.white,
  margin: 0,
};

export const logoAccent = {
  color: colors.gold,
};

export const body = {
  backgroundColor: colors.white,
  padding: '40px',
};

export const h1 = {
  fontFamily: fonts.serif,
  fontSize: '28px',
  lineHeight: '36px',
  color: colors.pine,
  margin: '0 0 8px 0',
};

export const h2 = {
  fontFamily: fonts.serif,
  fontSize: '22px',
  lineHeight: '28px',
  color: colors.pine,
  margin: '24px 0 12px 0',
};

export const goldText = {
  color: colors.gold,
};

export const paragraph = {
  fontFamily: fonts.sans,
  fontSize: '16px',
  lineHeight: '26px',
  color: colors.warmGray,
  margin: '0 0 16px 0',
};

export const infoBox = {
  backgroundColor: colors.cream,
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
};

export const infoRow = {
  fontSize: '15px',
  lineHeight: '24px',
  margin: '8px 0',
};

export const infoLabel = {
  color: colors.warmGray,
  fontWeight: 400,
};

export const infoValue = {
  color: colors.pine,
  fontWeight: 500,
};

export const button = {
  backgroundColor: colors.pine,
  borderRadius: '12px',
  color: colors.white,
  fontFamily: fonts.sans,
  fontSize: '16px',
  fontWeight: 600,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '16px 32px',
  margin: '24px 0',
};

export const goldButton = {
  ...button,
  backgroundColor: colors.gold,
  color: colors.pine,
};

export const divider = {
  borderTop: `1px solid ${colors.cream}`,
  margin: '24px 0',
};

export const footer = {
  backgroundColor: colors.cream,
  padding: '32px 40px',
  textAlign: 'center' as const,
};

export const footerText = {
  fontFamily: fonts.sans,
  fontSize: '13px',
  lineHeight: '20px',
  color: colors.warmGray,
  margin: '0 0 8px 0',
};

export const footerLink = {
  color: colors.pine,
  textDecoration: 'underline',
};

export const trustBadge = {
  backgroundColor: 'rgba(212, 166, 87, 0.15)',
  borderRadius: '8px',
  padding: '12px 16px',
  fontSize: '14px',
  color: colors.pine,
  margin: '16px 0',
  textAlign: 'center' as const,
};