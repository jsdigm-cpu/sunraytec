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
import PageSEO from '../components/seo/PageSEO';
import JsonLd from '../components/seo/JsonLd';
import type { CmsState } from '../types/cms';

export default function HomePage() {
  const { content } = useOutletContext<CmsState>();

  return (
    <>
      <PageSEO
        title="썬레이텍 | 대한민국 복사난방의 기준"
        description="2009년부터 16년간 산업·공공·교육시설 복사난방을 책임져온 썬레이텍. 조달청 우수제품, MAS 다수공급자 등록 패널형 히터 전문 제조사."
        keywords={['복사난방', '패널히터', '천장난방', '조달청 우수제품', 'MAS 다수공급자', '산업난방', '학교난방', '물류센터난방', '썬레이텍']}
        canonical="/"
      />
      <JsonLd type="organization" />
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
