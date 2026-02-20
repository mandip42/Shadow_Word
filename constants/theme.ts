export const COLOR_TOKENS = {
  bgPrimary: '#0A0A0F',
  bgSurface: '#13131A',
  bgCard: '#1C1C28',
  border: '#2A2A3D',
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  accent: '#06B6D4',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  textPrimary: '#F8F8FF',
  textSecondary: '#9CA3AF',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const TYPOGRAPHY = {
  display: {
    fontFamily: 'var(--font-playfair), serif',
    sizes: ['2rem', '1.75rem', '1.5rem', '1.25rem'] as const,
  },
  body: {
    fontFamily: 'var(--font-outfit), sans-serif',
    sizes: ['1rem', '0.875rem', '0.75rem'] as const,
  },
} as const;

export const TRANSITION_MS = 300;
export const MIN_TAP_TARGET_PX = 48;
