import type { TextStyle } from 'react-native';

export const colors = {
  background: '#090B16',
  surface: '#11162A',
  surfaceRaised: '#171B32',
  accent: '#7C5CFF',
  accentSoft: '#211B42',
  cyan: '#35C2FF',
  electric: '#FACC15',
  text: '#FFFFFF',
  textMuted: '#9EA9CA',
  textFaint: '#6F7A9E',
  border: '#343B63',
  overlay: 'rgba(6, 8, 22, 0.76)',
  blackOverlay: 'rgba(5, 7, 18, 0.38)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  huge: 32,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  full: 999,
} as const;

export const type = {
  largeTitle: { color: colors.text, fontSize: 34, fontWeight: '900' },
  title: { color: colors.text, fontSize: 25, fontWeight: '800' },
  headline: { color: colors.text, fontSize: 17, fontWeight: '700' },
  body: { color: colors.text, fontSize: 16, fontWeight: '400' },
  subhead: { color: colors.textMuted, fontSize: 14, fontWeight: '500' },
  caption: { color: colors.textFaint, fontSize: 12, fontWeight: '600' },
} as const satisfies Record<string, TextStyle>;

export const shadows = {
  card: '0 8px 24px rgba(0, 0, 0, 0.22)',
  glow: '0 0 20px rgba(124, 92, 255, 0.28)',
} as const;
