import type { SiteContent } from '../types/cms';

export const initialSiteContent: SiteContent = {
  hero: {
    headline: '공공·산업 현장의\n열 손실을 줄이는\n원적외선 복사난방',
    subcopy:
      '학교 급식실, 물류센터, 군 특수시설처럼 바람과 분진, 높은 천장 때문에 난방 효율이 떨어지는 공간에 검증된 패널형 복사난방 솔루션을 제안합니다.',
    primaryCta: '견적 상담하기',
    secondaryCta: '조달 제품 보기',
    highlightText: '열 손실',
    highlightColor: '#F39C12',
    headlineFontFamily: 'display',
    headlineFontSize: 'xl',
    headlineFontWeight: 'black',
    copyEffect: 'glow-pulse',
    overlayStrength: 'medium',
    slideDurationSec: 6,
    autoSlide: true,
    showSiteBadge: true,
    showCertBadges: true,
  },
  certifications: [
    { title: '정부조달 우수제품 지정', year: '2013 · 2019 · 2025' },
    { title: '혁신제품 지정', year: '2020' },
    { title: 'K 마크 인증 (성능)', year: 'SUR-D300P~SUR-3600' },
    { title: '품질경영시스템 ISO 9001:2015' },
    { title: '환경경영시스템 ISO 14001:2015' },
  ],
  caseStudies: ['인천공항 FedEx 물류센터', '대전 우편물류센터', '서울 공공기관 교육시설', '자동차 출고센터 세차장'],
};
