import type { Product } from './product';

export type HeroFontFamily = 'display' | 'sans';
export type HeroFontSize = 'md' | 'lg' | 'xl';
export type HeroFontWeight = 'bold' | 'black';
export type HeroCopyEffect = 'none' | 'glow-pulse' | 'gradient-flow' | 'shimmer' | 'underline-draw' | 'word-reveal';
export type HeroOverlayStrength = 'light' | 'medium' | 'dark';
export type HeroSlideDuration = 4 | 6 | 8 | 10;

export interface HeroContent {
  headline: string;
  subcopy: string;
  primaryCta: string;
  secondaryCta: string;
  highlightText: string;
  highlightColor: string;
  headlineFontFamily: HeroFontFamily;
  headlineFontSize: HeroFontSize;
  headlineFontWeight: HeroFontWeight;
  copyEffect: HeroCopyEffect;
  overlayStrength: HeroOverlayStrength;
  slideDurationSec: HeroSlideDuration;
  autoSlide: boolean;
  showSiteBadge: boolean;
  showCertBadges: boolean;
}

export interface CertificationItem {
  title: string;
  year?: string;
}

export interface SiteContent {
  hero: HeroContent;
  certifications: CertificationItem[];
  caseStudies: string[];
}

export interface CmsState {
  products: Product[];
  content: SiteContent;
}
