import type { Product } from './product';

export type HeroFontFamily = 'display' | 'sans';
export type HeroFontSize = 'md' | 'lg' | 'xl';
export type HeroFontWeight = 'bold' | 'black';

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
