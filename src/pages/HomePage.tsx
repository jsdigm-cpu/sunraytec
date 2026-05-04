import { useOutletContext } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import SegmentEntrySection from '../components/home/SegmentEntrySection';
import KpiSection from '../components/home/KpiSection';
import ZeroSection from '../components/home/ZeroSection';
import CompareSection from '../components/home/CompareSection';
import SolutionSection from '../components/home/SolutionSection';
import ProductLineupSection from '../components/home/ProductLineupSection';
import ProcurementGuideSection from '../components/home/ProcurementGuideSection';
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
        description="2009년부터 17년간 산업·공공·교육시설 복사난방을 책임져온 썬레이텍. 조달청 우수제품, MAS 다수공급자 등록 원적외선 패널히터 전문 제조사."
        keywords={['복사난방', '패널히터', '천장난방', '조달청 우수제품', 'MAS 다수공급자', '산업난방', '학교난방', '물류센터난방', '썬레이텍', '양지처럼']}
        canonical="/"
      />
      <JsonLd type="organization" />
      
      {/* 1. 메인 히어로 */}
      <HeroSection heroContent={content.hero} />

      {/* 2. 대상별 맞춤형 진입 (신규) */}
      <SegmentEntrySection />

      {/* 3. 실증 사례 및 비교 */}
      <CompareSection />

      {/* 4. 데이터로 증명하는 기술력 */}
      <KpiSection />

      {/* 5. 5無 원칙 (강화된 가치) */}
      <ZeroSection />

      {/* 6. 공간별 솔루션 */}
      <SolutionSection />

      {/* 7. 제품 라인업 */}
      <ProductLineupSection />

      {/* 8. 조달 구매 안내 (신규) */}
      <ProcurementGuideSection />

      {/* 9. 대표 시공사례 */}
      <CasesSection />

      {/* 10. 인증 및 특허 */}
      <CertSection />

      {/* 11. 에너지 계산기 및 보조 도구 */}
      <FastTrackBanner />
      <CalcSection />

      {/* 12. 최종 문의 및 푸터 연결 */}
      <CtaSection />
    </>
  );
}
