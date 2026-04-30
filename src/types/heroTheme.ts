export type OverlayEffect = 'none' | 'glow' | 'grid';

export interface HeroTheme {
  gradientAngle: number;
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;
  accentColor: string;
  overlayEffect: OverlayEffect;
}

export const DEFAULT_HERO_THEME: HeroTheme = {
  gradientAngle: 160,
  gradientStart: '#0F2241',
  gradientMid: '#152035',
  gradientEnd: '#0E1E3A',
  accentColor: '#E5483A',
  overlayEffect: 'none',
};

export function buildGradient(theme: HeroTheme): string {
  return `linear-gradient(${theme.gradientAngle}deg, ${theme.gradientStart} 0%, ${theme.gradientMid} 60%, ${theme.gradientEnd} 100%)`;
}
