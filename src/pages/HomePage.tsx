import { useOutletContext } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import KpiSection from '../components/home/KpiSection';
import ZeroSection from '../components/home/ZeroSection';
import CompareSection from '../components/home/CompareSection';
import SolutionSection from '../components/home/SolutionSection';
import ProductLineupSection from '../components/home/ProductLineupSection';
import CasesSection from '../components/home/CasesSection';
import CertSection from '../components/home/CertSection';
import CalcSection from '../components/home/CalcSection';
import FastTrackBanner from '../components/home/FastTrackBanner';
import CtaSection from '../components/home/CtaSection';
import type { CmsState } from '../types/cms';

export default function HomePage() {
  const { content } = useOutletContext<CmsState>();

  return (
    <>
      <HeroSection heroContent={content.hero} />
      <KpiSection />
      <ZeroSection />
      <CompareSection />
      <SolutionSection />
      <ProductLineupSection />
      <CasesSection />
      <CertSection />
      <CalcSection />
      <FastTrackBanner />
      <CtaSection />
    </>
  );
}
