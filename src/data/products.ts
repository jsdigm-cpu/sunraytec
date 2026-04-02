import type { Product } from '../types/product';

export const initialProducts: Product[] = [
  {
    id: 'sur-3600',
    name: 'SUR-3600',
    category: '천장형 (노출)',
    summary: '대형 공간 및 산업 현장 난방에 최적화된 고출력 모델',
    applications: ['물류센터', '공장', '체육관', '대공간 상업시설'],
    specs: {
      powerW: 3600,
      sizeMm: '1510 × 375 × 48',
      voltage: '220V / 60Hz',
      heatingArea: '약 6~9평',
    },
  },
  {
    id: 'sur-2400',
    name: 'SUR-2400',
    category: '천장형 (매립/노출)',
    summary: '교육·공공 시설에 많이 적용되는 중대형 표준 모델',
    applications: ['학교', '관공서', '사무실', '식당'],
    specs: {
      powerW: 2400,
      sizeMm: '1510 × 300 × 48',
      voltage: '220V / 60Hz',
      heatingArea: '약 4~6평',
    },
  },
  {
    id: 'sur-1200',
    name: 'SUR-1200',
    category: '천장형 (매립/노출)',
    summary: '중소형 공간에 적합한 에너지 절감형 모델',
    applications: ['소회의실', '학원', '소형 매장'],
    specs: {
      powerW: 1200,
      sizeMm: '1200 × 300 × 48',
      voltage: '220V / 60Hz',
      heatingArea: '약 2~3평',
    },
  },
  {
    id: 'sur-d300a',
    name: 'SUR-D300A',
    category: '책상형(개인용)',
    summary: '책상 하부 고정형 개인 난방 솔루션',
    applications: ['사무공간', '학교 교무실', '개인 작업공간'],
    specs: {
      powerW: 300,
      sizeMm: '500 × 580 × 28',
      voltage: '220V / 60Hz',
      heatingArea: '개인용',
    },
  },
];
