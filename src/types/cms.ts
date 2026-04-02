import type { Product } from './product';

export interface HeroContent {
  headline: string;
  subcopy: string;
  primaryCta: string;
  secondaryCta: string;
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
