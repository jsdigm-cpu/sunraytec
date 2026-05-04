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
  gradientStart: '#0F172A', // Deep Navy
  gradientMid: '#152035',   // Slate Navy
  gradientEnd: '#0E1E3A',   // Darker Navy
  accentColor: '#F59E0B',   // Warm Amber for high contrast and warmth
  overlayEffect: 'grid',    // Subtle grid for professional feel
};

export function buildGradient(theme: HeroTheme): string {
  return `linear-gradient(${theme.gradientAngle}deg, ${theme.gradientStart} 0%, ${theme.gradientMid} 60%, ${theme.gradientEnd} 100%)`;
}
