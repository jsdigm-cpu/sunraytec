import type { SiteContent } from '../types/cms';

export const initialSiteContent: SiteContent = {
  hero: {
    headline: '대한민국 복사난방의 기준,\n양지처럼 따스한 기술로\n내일의 환경을 설계합니다!',
    subcopy:
      '공공기관·교육시설·산업현장에서 검증된 원적외선 복사난방 기술로, 쾌적하고 안전한 열환경을 제공합니다.',
    primaryCta: '견적 문의',
    secondaryCta: '우수제품 보기',
    highlightText: '양지처럼',
    highlightColor: '#F39C12',
    headlineFontFamily: 'display',
    headlineFontSize: 'xl',
    headlineFontWeight: 'black',
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
