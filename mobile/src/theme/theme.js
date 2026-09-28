// Shared design tokens, based on the Tikondane Stitch designs.
// Keep this the single source of truth for colors/spacing so screens stay consistent.

export const colors = {
  primary: '#1F6F54',       // deep teal-green (buttons, active nav)
  primaryLight: '#E3F1EC',  // soft teal background for cards
  accent: '#2563A8',        // blue accents (links, secondary icons)
  warning: '#C97A2E',       // amber for "needs attention"
  urgent: '#C0392B',        // red for urgent/severe flags
  background: '#F7F9F8',
  card: '#FFFFFF',
  border: '#E3E7E5',
  textPrimary: '#1A2E27',
  textSecondary: '#5B6B65',
  textMuted: '#8A968F',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
};

export const typography = {
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 15, fontWeight: '600', color: colors.textSecondary },
  body: { fontSize: 15, color: colors.textPrimary },
  small: { fontSize: 12, color: colors.textMuted },
};
