import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CircuitBoard,
  Droplets,
  Factory,
  Flame,
  Gauge,
  MapPinned,
  RadioTower,
  School,
  ShieldCheck,
  Sparkles,
  Wind,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import SubHero from '../../components/layout/SubHero';
import PageSEO from '../../components/seo/PageSEO';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

type PageId = 'zero' | 'public-edu' | 'industrial-logistics' | 'defense-special' | 'iot-control';

interface DataBarItem { value: string; label: string; note: string; }
interface SpotlightMetric { v: string; l: string; }
interface PageSpotlight { tag: string; title: string; situation: string; result: string; metrics: SpotlightMetric[]; }

interface PageConfig {
  breadcrumb: string; badge: string; title: string; lead: string;
  accent: string; gradient: string; icon: typeof Sparkles;
  stats: Array<{ label: string; value: string }>;
  dataBar: DataBarItem[];
  pains: Array<{ title: string; desc: string }>;
  solutions: Array<{ title: string; desc: string }>;
  applications: Array<{ title: string; desc: string; icon: typeof Building2 }>;
  methodLead: string;
  process: Array<{ step: string; title: string; desc: string }>;
  checklist: Array<{ title: string; desc: string }>;
  diagramLabels: { source: string; center: string; outcome: string };
  spotlight?: PageSpotlight;
}

const PAGES: Record<PageId, PageConfig> = {
  zero: {
    breadcrumb: '4대 검증 기술', badge: 'Core Technology',
    title: '분진·전파·화재·결로 리스크를 줄이는 복사난방 설계',
    lead: '복사난방의 장점은 단순히 따뜻함이 아닙니다. 바람을 만들지 않고, 화염을 쓰지 않고, 표면 냉기를 줄이는 방식으로 민감한 현장의 리스크를 동시에 낮춥니다.',
    accent: '#E8574A',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #16233A 54%, #2B1818 100%)',
    icon: Sparkles,
    stats: [
      { label: '항균 성능', value: '99.9%' },
      { label: '탈취율', value: '88%+' },
      { label: '방진·방수', value: 'IP65' },
      { label: '원적외선 방사율', value: '91.2%' },
    ],
    dataBar: [
      { value: '99.9%', label: '항균 성능', note: '대장균·포도상구균 — 한국원적외선협회 공인 성적서 KFIA-386' },
      { value: '88%+', label: '탈취율', note: '암모니아 기준 — 한국원적외선협회 탈취시험 성적서 KFIG-292' },
      { value: 'IP65', label: '방진·방수 등급', note: '2024 KTR 시험성적서 ECU-2024-014357 공식 확인' },
      { value: '91.2%', label: '원적외선 방사율', note: '한국화학융합시험연구원 TBK-2024-009053 확인' },
    ],
    pains: [
      { title: '먼지와 기류', desc: '팬·송풍 난방은 먼지, 바이러스성 비말, 냄새를 공간 전체로 순환시킵니다. 급식실·의료시설처럼 위생이 중요한 공간에서는 기류 발생이 핵심 문제입니다.' },
      { title: '결로와 곰팡이', desc: '차가운 바닥·벽면은 이슬점 이하로 내려가 결로와 곰팡이를 만들어냅니다. 탄약고·지하창고·외벽 접촉면에서 특히 심각합니다.' },
      { title: '특수 현장 안전성', desc: '위험물 취급 공간은 화염, 과열, 방폭 조건을 모두 검토해야 합니다. 기존 난방기를 그대로 쓰면 설치 자체가 규정 위반이 됩니다.' },
    ],
    solutions: [
      { title: '분진 비산 Zero', desc: '공기 순환 없는 복사 방식으로 먼지·미생물 확산 없음. 항균 99.9% 공인 성적서 보유.' },
      { title: '전파 적합등록', desc: '국립전파연구원 적합등록(R-R-SUR-SUR-3600-P)으로 전자기기 민감 환경에도 적용 가능.' },
      { title: '화재 위험 저감', desc: '개방형 화염 없는 전기식 발열 + 방폭 인증(EX emb II T1) 제품군 별도 보유.' },
      { title: '결로 저감', desc: '복사열로 바닥·벽·장비 표면 온도를 높여 이슬점 이하 환경을 차단합니다.' },
    ],
    applications: [
      { icon: Factory, title: '식품·의약품 창고', desc: '분진·기류 관리가 핵심인 GMP 보관 환경' },
      { icon: ShieldCheck, title: '탄약고·위험물 시설', desc: '방폭 EX emb II T1 인증 제품 적용 가능' },
      { icon: Droplets, title: '지하·결로 취약 구역', desc: '출입구 냉기 유입, 외벽 냉기 접촉 구간' },
    ],
    methodLead: '4대 검증 기술은 제품 스펙이 아니라 현장 리스크 관리 시스템입니다. 항균 99.9%(KFIA-386), 탈취 88%(KFIG-292), IP65(2024 KTR ECU-2024-014357), 방폭 EX emb II T1(KGS) — 각 성능은 공인 기관 성적서와 인증으로 검증됩니다.',
    process: [
      { step: '01', title: '위험 요인 분류', desc: '분진, 전자파 민감도, 화재 조건, 결로 취약 지점을 먼저 구분합니다.' },
      { step: '02', title: '복사열 배치 설계', desc: '사람이 머무는 위치와 차가운 표면을 기준으로 발열 면과 방향을 정합니다.' },
      { step: '03', title: '안전 제어 적용', desc: '온도, 시간, 구역 제어를 조합해 과열과 불필요한 운전을 방지합니다.' },
    ],
    checklist: [
      { title: '송풍이 부담되는 공간인가', desc: '분진, 냄새, 비말 확산을 줄여야 하는 급식실·의료·식품시설에 최우선 검토.' },
      { title: '차가운 표면이 문제인가', desc: '벽, 바닥, 장비 표면 온도가 낮아 결로가 생기는 탄약고·지하 구간 확인.' },
      { title: '화염 열원을 쓰기 어려운가', desc: '위험물·인화성 물질 취급 공간은 방폭 인증 제품을 별도 검토합니다.' },
      { title: '구역별 운전이 필요한가', desc: '전체 난방보다 오염 제어·위험도가 높은 구역을 선별 운전합니다.' },
    ],
    diagramLabels: { source: '위험 요인', center: '복사난방', outcome: '리스크 저감' },
  },

  'public-edu': {
    breadcrumb: '공공·교육 솔루션', badge: 'Public & Education',
    title: '학교와 공공시설에 맞춘 조용하고 깨끗한 체감 난방',
    lead: '급식실, 체육관, 민원실처럼 사람이 오래 머무는 공간은 소음과 바람이 적고 유지관리가 쉬운 난방이 중요합니다. 썬레이텍은 조달 흐름에 맞춰 도입 검토가 쉬운 구성을 제안합니다.',
    accent: '#2563EB',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #12315F 58%, #14233A 100%)',
    icon: School,
    stats: [
      { label: '혁신제품 만족도', value: '96점' },
      { label: '조달 우수제품', value: '3회 지정' },
      { label: '공공 납품 이력', value: '13년+' },
      { label: '항균 성능', value: '99.9%' },
    ],
    dataBar: [
      { value: '96점', label: '혁신제품 만족도', note: '육군 지상작전사령부 12개 사단 시범사용 — 100점 만점' },
      { value: '3회', label: '조달 우수제품 지정', note: '2013 · 2019 · 2025년 — 조달청 기술력·품질 심사 통과' },
      { value: '13년+', label: '공공기관 납품 이력', note: '2013년 최초 지정 이후 학교·관공서·복지시설 지속 공급' },
      { value: '99.9%', label: '항균·탈취 성능', note: '급식실·교실·화장실 적용 핵심 — 공인 성적서 보유' },
    ],
    pains: [
      { title: '수업·업무 중 소음과 바람', desc: '팬 소음과 기류는 학생 집중도와 민원 공간 쾌적성을 떨어뜨립니다. 특히 급식실에서는 바람이 식판·음식에 직접 영향을 줍니다.' },
      { title: '먼지·세균·건조감', desc: '송풍 난방은 공기 중 분진과 세균을 순환시킵니다. 학교·복지시설처럼 면역이 약한 이용자가 많은 공간에서는 항균 성능이 핵심입니다.' },
      { title: '넓고 높은 다목적 공간', desc: '체육관·강당은 공기 난방 시 따뜻한 공기가 천장에 정체됩니다. 에너지는 쓰지만 정작 학생은 춥습니다.' },
    ],
    solutions: [
      { title: '무풍·무소음 체감 난방', desc: '기류·팬 소음 없이 원적외선으로 사람과 바닥 표면을 직접 데웁니다. 수업·민원 중 방해 없음.' },
      { title: '항균·탈취 성능 내장', desc: '원적외선 방사로 대장균·포도상구균 99.9% 항균, 암모니아 88% 탈취. 급식실·화장실 특화 효과.' },
      { title: '조달 대응 원스톱 구성', desc: '우수제품 3자단가·MAS 등 공공 구매 절차에 맞춰 식별번호·일위대가표·시방서를 패키지로 제공.' },
      { title: '유지관리 부담 Zero', desc: '필터 없음, 실외기 없음. 천장 설치 후 표면 청소만으로 장기 운영 가능. 관리 인력 부담 최소화.' },
    ],
    applications: [
      { icon: School, title: '학교 급식실·체육관', desc: '항균 99.9%·무풍 난방으로 위생 유지 + 고천장 체감 개선' },
      { icon: Building2, title: '관공서·복지관·민원실', desc: '무소음·무기류로 대기 환경 쾌적화' },
      { icon: BadgeCheck, title: '나라장터 조달 발주처', desc: '우수제품 수의계약·MAS 직접 구매 가능' },
    ],
    methodLead: '공공·교육시설 도입의 핵심은 조달 절차와 성능 검증 자료를 동시에 갖추는 것입니다. 썬레이텍은 2013·2019·2025년 3회 우수제품 지정으로 공공기관 담당자가 의심 없이 도면에 올릴 수 있는 자료를 갖추고 있습니다. 혁신제품 시범사용 만족도 96점(육군 12개 사단)은 실사용 검증 결과입니다.',
    process: [
      { step: '01', title: '공간 용도 확인', desc: '급식실, 체육관, 교실, 화장실, 민원실 등 체류 방식이 다른 공간을 구분합니다.' },
      { step: '02', title: '조달 방식 선택', desc: '우수제품 3자단가, MAS, 비교 견적 중 발주처에 맞는 구매 방식을 확인합니다.' },
      { step: '03', title: '자료 패키지 제공', desc: '일위대가표·시방서·인증서·시험성적서를 패키지로 제공해 행정 처리 기간을 단축합니다.' },
    ],
    checklist: [
      { title: '소음·바람 민원이 반복되는가', desc: '수업·대기 환경에서 팬 소음과 기류가 문제라면 복사난방 전환 효과가 큽니다.' },
      { title: '급식실·화장실 위생이 중요한가', desc: '항균 99.9%·탈취 88% 성적서로 위생 기준 대응. 학교 급식실 최적.' },
      { title: '공공 구매 절차가 필요한가', desc: '우수제품·MAS 등록으로 나라장터에서 직접 조달 가능. 수의계약 대응.' },
      { title: '관리 인력이 부족한가', desc: '필터·실외기 없음. 표면 청소만으로 장기 운영 — 소규모 시설에 최적.' },
    ],
    diagramLabels: { source: '공공 공간', center: '구역별 복사열', outcome: '쾌적한 체류' },
    spotlight: {
      tag: '교육청 납품 사례',
      title: '경기도교육청 학교 급식실 — 온풍기에서 복사난방으로',
      situation: '겨울철 급식실 온풍기 운영으로 인한 미세먼지 비산, 소음, 기류 문제. 학생 위생 환경 개선 및 에너지 절감을 위한 난방 시스템 교체 요구.',
      result: '복사난방 도입 후 무풍·무소음 환경 구현. 항균 99.9% 성능으로 위생 기준 강화. 나라장터 우수제품 수의계약으로 예산 집행 간소화.',
      metrics: [
        { v: '99.9%', l: '항균 성능' },
        { v: '무풍', l: '기류 Zero' },
        { v: '수의계약', l: '조달 방식' },
      ],
    },
  },

  'industrial-logistics': {
    breadcrumb: '산업·물류 솔루션', badge: 'Industrial & Logistics',
    title: '고천장 대공간에서 작업자에게 직접 도달하는 난방',
    lead: '물류센터, 제조공장, 정비창은 천장이 높고 출입문 개방이 잦아 공기를 데우는 방식의 손실이 큽니다. 복사난방은 작업자 동선과 작업면을 중심으로 열을 전달합니다.',
    accent: '#F59E0B',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #23324B 50%, #3A2812 100%)',
    icon: Factory,
    stats: [
      { label: '에너지 절감 실증', value: '57%' },
      { label: '월 절감액', value: '115만원↓' },
      { label: 'KTR 소비전력 절감', value: '39.4%' },
      { label: '방진·방수', value: 'IP65' },
    ],
    dataBar: [
      { value: '57%', label: '에너지 절감 실증', note: 'EHP 온풍기 대비 — ㈜가나에너지 공장 200평 실증 사례' },
      { value: '월 115만원', label: '절감액', note: '공장 200평 기준, 5개월 가동 → 연간 554만원 절감' },
      { value: '39.4%', label: 'KTR 소비전력 절감', note: '2024 KTR 공식 난방성능 시험 확인 (ECU-2024-014352)' },
      { value: 'IP65', label: '방진·방수 등급', note: '먼지·수분 많은 산업현장에서도 안정적 장기 운전' },
    ],
    pains: [
      { title: '상부 열 정체', desc: '따뜻한 공기는 항상 위로 올라갑니다. 8m 이상 고천장 창고에서는 에너지의 60~70%가 허공을 데우는 데 소모됩니다.' },
      { title: '출입문 개방 열 손실', desc: '지게차, 상하차 도크, 대형 셔터 개방 때마다 데운 공기가 빠져나갑니다. 결국 계속 틀어야 하는 악순환입니다.' },
      { title: '바닥 냉기와 결로', desc: '차가운 콘크리트 바닥은 작업자 피로도와 낙상 위험을 높이고, 적재 물품의 습기 피해를 야기합니다.' },
    ],
    solutions: [
      { title: '작업자에게 직접 도달', desc: '공기를 데우는 게 아니라 사람·바닥·작업면에 열을 직접 전달. 57% 에너지 절감 실증.' },
      { title: '출입문 개방에도 체감 유지', desc: '복사열은 공기 이동에 영향 받지 않아 셔터가 열려도 즉각 체감 유지 가능.' },
      { title: '동선 집중 배치 설계', desc: '피킹라인, 포장라인, 정비구역 등 실제 체류 구역 위주로 배치해 낭비 없는 운전.' },
      { title: '바닥 냉기 차단', desc: '복사열로 콘크리트 표면 온도 상승 → 작업자 피로 감소, 적재품 습기 피해 최소화.' },
    ],
    applications: [
      { icon: Factory, title: '물류센터·냉동창고', desc: '피킹·포장·상하차 구역 집중 난방, IP65 대응' },
      { icon: Gauge, title: '제조공장·작업장', desc: '라인 작업자 체감 개선, 57% 절감 실증 공간' },
      { icon: MapPinned, title: '차량 정비·세차장', desc: 'IP65 방수 제품 — 수분 많은 환경 안전 대응' },
    ],
    methodLead: '산업·물류 현장의 핵심은 에너지 효율과 실증 데이터입니다. ㈜가나에너지 공장 200평(천장 5m) 실증 결과: 온풍기 45kW×3대 운전 시 연간 1,130만원 → 복사난방 후 576만원, 월 115만원 절감. KTR 공식 시험(2024)에서도 소비전력량 39.4% 절감 확인. 이 수치를 기준으로 귀사 현장의 예상 절감을 산출해드립니다.',
    process: [
      { step: '01', title: '열 손실 구간 파악', desc: '대형 셔터, 상하차 도크, 외기 유입 방향과 빈도를 먼저 확인합니다.' },
      { step: '02', title: '작업자 동선 매핑', desc: '피킹, 포장, 정비, 대기 구역처럼 체류 시간이 긴 지점을 난방 기준으로 삼습니다.' },
      { step: '03', title: '존별 운전 계획', desc: '라인별 가동 시간과 전력 피크를 고려해 단계 운전 기준을 정합니다.' },
    ],
    checklist: [
      { title: '천장이 높고 문이 자주 열리는가', desc: '고천장 + 잦은 출입 조합에서 복사난방 효과가 가장 큽니다. 57% 절감 실증 조건과 일치.' },
      { title: '작업자가 춥다고 느끼는 지점이 명확한가', desc: '전체 면적보다 작업 위치 중심으로 난방 배치. 낭비 없이 체감 개선.' },
      { title: '바닥 냉기나 결로가 있는가', desc: '복사열로 콘크리트 바닥 표면 온도 상승 → 낙상 사고 위험·적재품 습기 동시 해결.' },
      { title: '전력 피크 관리가 필요한가', desc: '동시 운전보다 구역별 순차 운전으로 피크 분산. IoT 제어 결합 시 더 정밀하게.' },
    ],
    diagramLabels: { source: '고천장 손실', center: '작업면 복사열', outcome: '체감 효율' },
    spotlight: {
      tag: '공장·산업 실증 사례',
      title: '㈜가나에너지 제조공장 200평 — 온풍기 45kW×3대에서 복사난방으로',
      situation: '천장고 5m, 연면적 200평의 제조공장. 기존 EHP 온풍기 45kW 3대 동시 운전으로 동절기 5개월 기준 연간 난방비 1,130만원 부담. 고천장으로 인한 열 손실과 작업자 체감 불만이 지속.',
      result: '원적외선 복사난방 패널 설치 후 동일 조건 운전 결과 연간 576만원으로 절감. 월 평균 115만원 절약. 평당 난방비 13,500원에서 5,760원으로 감소. 작업자 체감 온도 개선으로 민원 해소.',
      metrics: [
        { v: '57%', l: '에너지 절감' },
        { v: '월 115만원', l: '절감액' },
        { v: '5,760원', l: '평당 난방비' },
      ],
    },
  },

  'defense-special': {
    breadcrumb: '국방·특수 솔루션', badge: 'Defense & Special',
    title: '안전 조건이 까다로운 현장을 위한 특수 난방 접근',
    lead: '군 정비창, 특수 창고, 방폭 검토가 필요한 공간은 일반 난방기 선택이 제한됩니다. 썬레이텍은 현장 위험도와 설치 환경을 먼저 검토하고 적합한 제품군을 제안합니다.',
    accent: '#DC2626',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #1E293B 48%, #3B1111 100%)',
    icon: ShieldCheck,
    stats: [
      { label: '시범사용 만족도', value: '96점' },
      { label: '납품 사단', value: '12개' },
      { label: '방폭 인증', value: 'EX emb II T1' },
      { label: '방진·방수', value: 'IP65' },
    ],
    dataBar: [
      { value: '96점', label: '혁신제품 시범사용 만족도', note: '육군 지상작전사령부 산하 — 100점 만점 평가' },
      { value: '12개 사단', label: '전방 납품 실적', note: '혁신제품 지정 이후 전방 경계초소 등 납품 완료' },
      { value: 'EX emb II T1', label: '방폭 인증', note: '한국가스안전공사(KGS) — 위험물 취급·화학시설 대응' },
      { value: 'IP65', label: '방진·방수 등급', note: '먼지·습기 혼재 야외·특수 환경에서 안정 운전' },
    ],
    pains: [
      { title: '화재·방폭 조건', desc: '탄약고, 화학시설, 도장공장은 일반 난방기 설치 자체가 안전 규정 위반입니다. 방폭 등급과 열원 조건을 먼저 검토해야 합니다.' },
      { title: '열악한 설치 환경', desc: '먼지, 습기, 동절기 극한 외기, 높은 천장. 일반 난방기는 6개월 이내 고장이 빈번한 환경입니다.' },
      { title: '결로로 인한 장비 손상', desc: '차가운 금속 표면의 결로는 탄약·전자장비의 녹과 기능 이상으로 이어집니다. 결로 방지가 난방만큼 중요합니다.' },
    ],
    solutions: [
      { title: '방폭 인증 제품군 보유', desc: '한국가스안전공사(KGS) EX emb II T1 방폭인증. 탄약고·화학시설·도장공장 설치 가능.' },
      { title: '비화염 전기식 열원', desc: '개방형 화염 없이 필요한 지점에 복사열을 전달. 화재 위험 최소화.' },
      { title: 'IP65 방진방수 대응', desc: '2024 KTR 시험성적서(ECU-2024-014357) 기준 IP65 확인. 먼지·습기 혼재 환경 안정 운전.' },
      { title: '결로 완전 차단 설계', desc: '복사열로 금속 표면 온도를 이슬점 이상으로 유지 → 탄약·장비 결로 방지.' },
    ],
    applications: [
      { icon: ShieldCheck, title: '군 정비창·경계초소', desc: '혁신제품 96점 만족 — 전방 12개 사단 납품 완료' },
      { icon: Flame, title: '탄약고·위험물 취급소', desc: '방폭 EX emb II T1 + 결로 차단 동시 대응' },
      { icon: Droplets, title: '동파·습기 취약 시설', desc: '야외 전기실, 지하 창고, 외기 유입 구간' },
    ],
    methodLead: '국방·특수 현장은 성능보다 안전 인증이 먼저입니다. 썬레이텍은 방폭(EX emb II T1, KGS), 방진방수(IP65, 2024 KTR), 방사율(91.2%), 항균(99.9%) 등 특수 환경 대응 인증을 복합적으로 보유합니다. 혁신제품 시범사용 후 육군 12개 사단 납품과 96점 만족도는 실전 검증 결과입니다.',
    process: [
      { step: '01', title: '위험 등급 확인', desc: '화재, 방폭, 방수, 방진 검토가 필요한 구역을 일반 공간과 분리합니다.' },
      { step: '02', title: '설치 조건 검토', desc: '천장 구조, 장비 간섭, 습기, 먼지, 외기 유입 정도를 확인합니다.' },
      { step: '03', title: '제어·보호 구성', desc: '과열 방지, 구역 운전, 유지보수 접근성을 고려해 운전 방식을 정합니다.' },
    ],
    checklist: [
      { title: '일반 난방기 설치가 규정상 불가한가', desc: '방폭 EX emb II T1 제품군으로 탄약고·화학시설 안전 규정 대응 가능.' },
      { title: '결로로 인한 장비 손상이 있는가', desc: '복사열로 금속 표면 이슬점 이상 유지 → 탄약·전자장비 결로 방지.' },
      { title: '습기·먼지 노출이 큰가', desc: 'IP65 방진방수 2024 KTR 확인. 야외·특수 환경 장기 운전 안정성 검증.' },
      { title: '혁신제품 시범구매를 검토하는가', desc: '일위대가·시방서·인증서 패키지 제공. 공공기관 행정 처리 지원.' },
    ],
    diagramLabels: { source: '위험 조건', center: '안전 검토', outcome: '특수 난방' },
    spotlight: {
      tag: '국방 납품 실증',
      title: '육군 지상작전사령부 산하 전방 12개 사단 복사난방 도입',
      situation: '전방 GOP 경계초소와 군 시설의 혹한기 난방 문제. 기존 난방 방식의 화재 위험·결로·연료 보급 문제 해결 요구. 2020년 조달청 혁신제품 지정(수요자 제안형 — 육군 지상작전사령부 과제).',
      result: '혁신제품 시범사용 후 만족도 96점/100점. 전방 12개 사단 납품 완료. 국방부 건설분야 신기술·우수제품 선정(2017). 탄약고 결로방지 전용 제안서 별도 운영 중.',
      metrics: [
        { v: '96점', l: '시범사용 만족도' },
        { v: '12개', l: '납품 사단' },
        { v: '2017', l: '국방 신기술 선정' },
      ],
    },
  },

  'iot-control': {
    breadcrumb: 'IoT 중앙제어', badge: 'IoT Control',
    title: '128회로 중앙제어로 구역별 난방을 데이터로 관리',
    lead: '복사난방은 필요한 구역만 켜는 방식과 궁합이 좋습니다. 128회로 IoT 중앙제어를 결합하면 스케줄, 피크, 현장별 운전 상태를 한눈에 관리할 수 있습니다.',
    accent: '#22C55E',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #12353A 58%, #102A1B 100%)',
    icon: RadioTower,
    stats: [
      { label: '최대 제어 회로', value: '128회로' },
      { label: '에너지 절감 연계', value: '57%' },
      { label: '원격 조절', value: 'WiFi' },
      { label: 'KTR 소비전력', value: '39.4%↓' },
    ],
    dataBar: [
      { value: '128회로', label: '최대 중앙제어', note: '다수 구역 개별 ON/OFF + 스케줄 운전 동시 관리' },
      { value: '57%', label: '에너지 절감 연계', note: '복사난방 + IoT 제어 결합 시 실증 기반 절감 목표' },
      { value: 'WiFi', label: '원격 조절기', note: '스마트폰 앱으로 현장 밖에서 구역별 원격 ON/OFF' },
      { value: '39.4%', label: 'KTR 소비전력 절감', note: '2024 공식 시험 — IoT 제어 연동 시 추가 절감 가능' },
    ],
    pains: [
      { title: '불필요한 전체 운전', desc: '사용하지 않는 구역까지 동시에 가동하면 에너지 비용이 커집니다. 체육관, 강당, 빈 교실까지 모두 켜두는 것이 현실입니다.' },
      { title: '현장별 수동 관리 부담', desc: '담당자가 직접 켜고 끄는 방식은 퇴근 후 누락, 휴일 과운전이 발생합니다. 소규모 시설일수록 관리 공백이 큽니다.' },
      { title: '피크 시간대 전기 요금', desc: '전기 난방은 시간대별 요금 차이가 큽니다. 동시 전체 가동은 피크 요금 부담을 키웁니다.' },
    ],
    solutions: [
      { title: '128회로 존별 스케줄 운전', desc: '교실·체육관·급식실·화장실을 개별 회로로 나눠 필요한 시간에만 자동 운전.' },
      { title: 'WiFi 원격 모니터링', desc: '스마트폰 앱으로 가동 상태·이상 여부 실시간 확인. 현장 방문 없이 원격 제어.' },
      { title: '피크 분산 자동 제어', desc: '동시 가동을 자동으로 분산해 전력 피크를 낮추고 시간대 요금 효율화.' },
      { title: '운영 데이터 기반 최적화', desc: '사용 패턴 누적 → 다음 시즌 더 정교한 스케줄 설정으로 지속 개선.' },
    ],
    applications: [
      { icon: RadioTower, title: '학교·공공시설', desc: '128회로 — 교실·급식실·체육관·화장실 개별 스케줄 제어' },
      { icon: CircuitBoard, title: '산업·물류 현장', desc: '라인별·작업구역별 제어로 피크 분산 + 존 난방 최적화' },
      { icon: Zap, title: '다수 거점 원격 관리', desc: 'WiFi 기반 — 여러 건물·공간 상태를 한 앱에서 통합 관리' },
    ],
    methodLead: 'IoT 중앙제어는 더 많이 켜기 위한 기능이 아니라 필요한 구역을 정확한 시간에 운영하기 위한 관리 도구입니다. 128회로 중앙제어 + WiFi 원격 조절기 + 스케줄 자동 운전의 3단 구성으로 에너지 낭비 없이 현장 체감을 유지합니다.',
    process: [
      { step: '01', title: '구역 체계 정의', desc: '교실, 체육관, 급식실, 화장실처럼 따로 운영해야 할 존을 나눕니다.' },
      { step: '02', title: '스케줄·권한 설정', desc: '요일, 시간, 행사, 담당자 권한에 맞춰 128회로 운전 기준을 세웁니다.' },
      { step: '03', title: '모니터링 확장', desc: '가동 상태, 피크 부담, 이상 징후를 WiFi 앱에서 실시간 확인합니다.' },
    ],
    checklist: [
      { title: '구역별 운영 시간이 다른가', desc: '128회로 개별 제어로 교실·체육관·급식실을 각각 다른 스케줄로 운전 가능.' },
      { title: '담당자가 없을 때 켜진 채 방치되는가', desc: 'WiFi 원격 제어 + 자동 스케줄로 퇴근 후·휴일 과운전 방지.' },
      { title: '전력 피크 요금이 부담되는가', desc: '동시 가동 대신 순차 분산 운전으로 피크 시간대 요금 최소화.' },
      { title: '여러 건물을 한 곳에서 관리하고 싶은가', desc: 'WiFi 앱 원격 모니터링으로 다수 거점 통합 관제 가능.' },
    ],
    diagramLabels: { source: '현장 구역', center: 'IoT 제어', outcome: '에너지 관리' },
  },
};

/* ── DataBar: 인포그래픽 성능 수치 바 ── */
function DataBar({ items, accent }: { items: DataBarItem[]; accent: string }) {
  return (
    <section style={{ background: '#0D1B2E', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0' }}>
      <div className="container">
        <div className="databar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.4 }}
              style={{
                padding: '28px 22px',
                borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                borderLeft: i === 0 ? `3px solid ${accent}` : 'none',
                background: i === 0 ? `${accent}10` : 'transparent',
              }}
            >
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                color: i === 0 ? accent : '#F1F5F9',
                lineHeight: 1,
                marginBottom: 6,
                letterSpacing: 1,
              }}>
                {item.value}
              </div>
              <div style={{ color: '#CBD5E1', fontWeight: 800, fontSize: 13, marginBottom: 5 }}>{item.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 11, lineHeight: 1.55 }}>{item.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CaseSpotlight: 실증 사례 하이라이트 ── */
function CaseSpotlight({ spotlight, accent }: { spotlight: PageSpotlight; accent: string }) {
  return (
    <section style={{ padding: '56px 0', background: 'linear-gradient(135deg, #0A1628 0%, #162035 100%)' }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <span style={{
              display: 'inline-block', padding: '4px 14px', borderRadius: 999,
              background: `${accent}20`, color: accent,
              fontSize: 11, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16,
            }}>
              📋 {spotlight.tag}
            </span>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 2.4vw, 1.65rem)', fontWeight: 900, marginBottom: 24, lineHeight: 1.35 }}>
              {spotlight.title}
            </h2>

            <div className="spotlight-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '20px 22px', borderLeft: '3px solid rgba(239,68,68,0.45)' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10.5, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>
                  도입 상황
                </p>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13.5, lineHeight: 1.78 }}>{spotlight.situation}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '20px 22px', borderLeft: `3px solid ${accent}` }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10.5, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>
                  도입 결과
                </p>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13.5, lineHeight: 1.78 }}>{spotlight.result}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {spotlight.metrics.map((m) => (
                <div key={m.l} style={{
                  flex: '1 1 110px',
                  background: `${accent}12`, border: `1px solid ${accent}28`,
                  borderRadius: 10, padding: '18px 16px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.9rem', color: accent, lineHeight: 1 }}>{m.v}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, marginTop: 5 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── SunraytecSymbol ── */
function SunraytecSymbol() {
  const rows = ['SUN', 'RAY', 'TEC'];
  return (
    <div aria-label="SUN RAY TEC" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, width: 92, height: 92, padding: 5, background: '#111827', borderRadius: 8, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
      {rows.flatMap((row, rowIndex) =>
        row.split('').map((letter, colIndex) => {
          const isAccent = rowIndex === 0 && colIndex === 0;
          return (
            <span key={`${row}-${letter}-${colIndex}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: isAccent ? '#C8392B' : '#F8FAFC', color: isAccent ? '#fff' : '#111827', borderRadius: 3, fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 900, lineHeight: 1 }}>
              {letter}
            </span>
          );
        }),
      )}
    </div>
  );
}

/* ── EnergyDiagram ── */
function EnergyDiagram({ config }: { config: PageConfig }) {
  const Icon = config.icon;

  if (config.breadcrumb === '4대 검증 기술') {
    const riskItems = [
      { icon: Wind, label: '분진·먼지', note: '송풍 확산' },
      { icon: Zap, label: '전자파 우려', note: '민감 장비' },
      { icon: Flame, label: '화재 위험', note: '화염·과열' },
      { icon: Droplets, label: '결로·곰팡이', note: '차가운 표면' },
    ];
    const zeroItems = [
      { label: '99.9% 항균', detail: '대장균·포도상구균' },
      { label: '전파 적합등록', detail: '국립전파연구원' },
      { label: '방폭 EX emb II T1', detail: '비화염 전기식' },
      { label: 'IP65 방진방수', detail: '2024 KTR 확인' },
    ];
    return (
      <div style={{ minHeight: 350, borderRadius: 8, background: 'linear-gradient(180deg,#fff 0%,#F8FAFC 100%)', border: '1px solid rgba(15,34,65,0.11)', boxShadow: '0 24px 70px rgba(15,34,65,0.14)', padding: 22, display: 'grid', gridTemplateColumns: '1fr 0.82fr 1fr', gap: 14, alignItems: 'center' }} className="zero-diagram">
        <div style={{ display: 'grid', gap: 10 }}>
          <p style={{ color: '#64748B', fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>Before</p>
          {riskItems.map(({ icon: RiskIcon, label, note }, index) => (
            <motion.div key={label} animate={{ x: [0, index % 2 ? -3 : 3, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '10px 12px', borderRadius: 8, border: '1px solid #FECACA', background: '#FFF5F5' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><RiskIcon size={18} /></div>
              <div><div style={{ color: '#7F1D1D', fontSize: 13.5, fontWeight: 900 }}>{label}</div><div style={{ color: '#991B1B', opacity: 0.68, fontSize: 11.5, fontWeight: 700 }}>{note}</div></div>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
          <motion.div animate={{ boxShadow: ['0 16px 38px rgba(200,57,43,0.18)', '0 22px 54px rgba(200,57,43,0.32)', '0 16px 38px rgba(200,57,43,0.18)'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 132, height: 132, borderRadius: 8, background: '#fff', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: 14 }}>
            <SunraytecSymbol />
            <motion.div animate={{ opacity: [0.25, 0.7, 0.25], scale: [0.86, 1.18, 0.86] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', inset: -18, border: '2px solid rgba(200,57,43,0.25)', borderRadius: 8 }} />
          </motion.div>
          <div style={{ color: 'var(--navy)', textAlign: 'center' }}><div style={{ fontSize: 16, fontWeight: 900 }}>썬레이텍</div><div style={{ fontSize: 12, color: '#64748B', fontWeight: 800 }}>원적외선 복사난방</div></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#C8392B', fontSize: 12, fontWeight: 900 }}>위험요인 완화 <ArrowRight size={15} /></div>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <p style={{ color: '#64748B', fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>After</p>
          {zeroItems.map((item, index) => (
            <motion.div key={item.label} animate={{ y: [0, -3, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.16 }} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '10px 12px', borderRadius: 8, border: '1px solid #BBF7D0', background: '#F0FDF4' }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><BadgeCheck size={19} /></div>
              <div><div style={{ color: '#14532D', fontSize: 13.5, fontWeight: 900 }}>{item.label}</div><div style={{ color: '#166534', opacity: 0.72, fontSize: 11.5, fontWeight: 700 }}>{item.detail}</div></div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  const beforeItems = config.pains.slice(0, 3);
  const afterItems = config.solutions.slice(0, 3);
  return (
    <div style={{ minHeight: 350, borderRadius: 8, background: 'linear-gradient(180deg,#fff 0%,#F8FAFC 100%)', border: '1px solid rgba(15,34,65,0.11)', boxShadow: '0 24px 70px rgba(15,34,65,0.14)', padding: 22, display: 'grid', gridTemplateColumns: '1fr 0.78fr 1fr', gap: 14, alignItems: 'center' }} className="solution-diagram">
      <div style={{ display: 'grid', gap: 10 }}>
        <p style={{ color: '#64748B', fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>현장 과제</p>
        {beforeItems.map((item, index) => (
          <motion.div key={item.title} animate={{ x: [0, index % 2 ? -3 : 3, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }} style={{ minHeight: 68, padding: '12px 13px', borderRadius: 8, border: '1px solid #FED7AA', background: '#FFF7ED' }}>
            <div style={{ color: '#9A3412', fontSize: 13.5, fontWeight: 900, marginBottom: 4 }}>{item.title}</div>
            <div style={{ color: '#9A3412', opacity: 0.68, fontSize: 11.5, fontWeight: 700, lineHeight: 1.45 }}>{item.desc.length > 34 ? `${item.desc.slice(0, 34)}...` : item.desc}</div>
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
        <motion.div animate={{ boxShadow: [`0 16px 38px ${config.accent}22`, `0 22px 54px ${config.accent}44`, `0 16px 38px ${config.accent}22`] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 122, height: 122, borderRadius: 8, background: config.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Icon size={52} strokeWidth={1.8} />
          <motion.div animate={{ opacity: [0.22, 0.62, 0.22], scale: [0.86, 1.18, 0.86] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', inset: -18, border: `2px solid ${config.accent}36`, borderRadius: 8 }} />
        </motion.div>
        <div style={{ color: 'var(--navy)', textAlign: 'center' }}><div style={{ fontSize: 16, fontWeight: 900 }}>썬레이텍</div><div style={{ fontSize: 12, color: '#64748B', fontWeight: 800 }}>{config.diagramLabels.center}</div></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: config.accent, fontSize: 12, fontWeight: 900 }}>맞춤 설계 <ArrowRight size={15} /></div>
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        <p style={{ color: '#64748B', fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>운영 결과</p>
        {afterItems.map((item, index) => (
          <motion.div key={item.title} animate={{ y: [0, -3, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.16 }} style={{ minHeight: 68, padding: '12px 13px', borderRadius: 8, border: '1px solid #BFDBFE', background: '#EFF6FF', display: 'grid', gridTemplateColumns: '34px 1fr', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: `${config.accent}18`, color: config.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BadgeCheck size={18} /></div>
            <div><div style={{ color: '#0F2241', fontSize: 13.5, fontWeight: 900, marginBottom: 3 }}>{item.title}</div><div style={{ color: '#334155', opacity: 0.72, fontSize: 11.5, fontWeight: 700, lineHeight: 1.42 }}>{item.desc.length > 30 ? `${item.desc.slice(0, 30)}...` : item.desc}</div></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Page ── */
const CANONICAL_BY_PAGE: Record<PageId, string> = {
  zero: '/technology/zero',
  'public-edu': '/solutions/public-edu',
  'industrial-logistics': '/solutions/industrial-logistics',
  'defense-special': '/solutions/defense-special',
  'iot-control': '/solutions/iot-control',
};

export default function TechnologySolutionPage({ pageId }: { pageId: PageId }) {
  const config = PAGES[pageId];
  const Icon = config.icon;

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <PageSEO
        title={`${config.title.replace(/<[^>]+>/g, '')} - 썬레이텍`}
        description={config.lead}
        keywords={[config.breadcrumb, '복사난방', '패널히터', ...config.stats.map((s) => `${s.label} ${s.value}`)]}
        canonical={CANONICAL_BY_PAGE[pageId]}
      />

      {/* Hero — SubHero 통일 */}
      <SubHero
        breadcrumb={[{ label: '기술·솔루션' }, { label: config.breadcrumb }]}
        badge={config.badge}
        title={config.title}
        lead={config.lead}
        keywords={config.stats.map(s => `${s.label} ${s.value}`)}
      />

      {/* DataBar — 인포그래픽 수치 바 */}
      <DataBar items={config.dataBar} accent={config.accent} />

      {/* 솔루션 다이어그램 (히어로에서 본문으로 이동) */}
      <section style={{ padding: '56px 0', background: '#F8FAFC' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 34 }}>
            <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Solution Overview</p>
            <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900 }}>솔루션 구성도</h2>
          </ScrollReveal>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <EnergyDiagram config={config} />
          </div>
        </div>
      </section>

      {/* Problem Map */}
      <section style={{ padding: '68px 0', background: '#F8FAFC' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 34 }}>
            <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Problem Map</p>
            <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900 }}>현장에서 먼저 해결해야 할 문제</h2>
          </ScrollReveal>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="tech-card-grid">
            {config.pains.map((item, index) => (
              <motion.article key={item.title} variants={staggerItem} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 14px 34px rgba(15,34,65,0.06)' }}>
                <span style={{ display: 'inline-flex', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: '#FFF7ED', color: config.accent, fontWeight: 900, marginBottom: 18 }}>{index + 1}</span>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.06rem', fontWeight: 900, marginBottom: 9 }}>{item.title}</h3>
                <p style={{ color: '#526173', fontSize: 14, lineHeight: 1.78 }}>{item.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Spotlight (실증 사례 — 있는 경우만) */}
      {config.spotlight && <CaseSpotlight spotlight={config.spotlight} accent={config.accent} />}

      {/* Sunraytec Method */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div className="tech-solution-split" style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 34, alignItems: 'start' }}>
            <ScrollReveal>
              <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Sunraytec Method</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900, lineHeight: 1.25, marginBottom: 16 }}>썬레이텍 방식으로 바꾸면 달라지는 것</h2>
              <p style={{ color: '#526173', lineHeight: 1.82 }}>{config.methodLead}</p>
              <Link to="/contact" className="btn btn-primary" style={{ borderRadius: 8, marginTop: 24 }}>
                현장 상담 요청 <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
            <div style={{ display: 'grid', gap: 16 }}>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }} className="tech-process-grid">
                {config.process.map((item) => (
                  <motion.article key={item.step} variants={staggerItem} style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 18, background: '#F8FAFC', minHeight: 170 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 28, borderRadius: 8, background: `${config.accent}14`, color: config.accent, fontSize: 12, fontWeight: 900, marginBottom: 14 }}>{item.step}</span>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1rem', fontWeight: 900, marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ color: '#526173', fontSize: 13.2, lineHeight: 1.68 }}>{item.desc}</p>
                  </motion.article>
                ))}
              </motion.div>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="tech-method-grid">
                {config.solutions.map((item) => (
                  <motion.article key={item.title} variants={staggerItem} style={{ border: '1px solid #E2E8F0', borderLeft: `4px solid ${config.accent}`, borderRadius: 8, padding: 20, background: '#fff' }}>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1rem', fontWeight: 900, marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ color: '#526173', fontSize: 13.5, lineHeight: 1.68 }}>{item.desc}</p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section style={{ padding: '72px 0', background: 'linear-gradient(180deg,#0A1628 0%,#14233A 100%)', color: '#fff' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Applications</p>
            <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>우선 적용하기 좋은 공간</h2>
          </ScrollReveal>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="tech-card-grid">
            {config.applications.map(({ icon: AppIcon, title, desc }) => (
              <motion.article key={title} variants={staggerItem} whileHover={{ y: -5 }} style={{ border: '1px solid rgba(255,255,255,0.11)', borderRadius: 8, padding: 22, background: 'rgba(255,255,255,0.05)' }}>
                <AppIcon size={28} color={config.accent} style={{ marginBottom: 14 }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.64)', fontSize: 13.5, lineHeight: 1.65 }}>{desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Checklist */}
      <section style={{ padding: '72px 0', background: '#F8FAFC' }}>
        <div className="container">
          <div className="tech-solution-split" style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 34, alignItems: 'start' }}>
            <ScrollReveal>
              <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Decision Check</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900, lineHeight: 1.25, marginBottom: 16 }}>도입 전에 확인하면 좋은 체크포인트</h2>
              <p style={{ color: '#526173', lineHeight: 1.82 }}>현장 사진이나 도면이 없어도 아래 조건만 확인되면 1차 적용 방향을 잡을 수 있습니다. 상담 단계에서 이 항목을 기준으로 제품군, 설치 위치, 제어 방식을 빠르게 좁힙니다.</p>
            </ScrollReveal>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }} className="tech-method-grid">
              {config.checklist.map((item) => (
                <motion.article key={item.title} variants={staggerItem} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 20, display: 'grid', gridTemplateColumns: '38px 1fr', gap: 12, alignItems: 'start', boxShadow: '0 14px 34px rgba(15,34,65,0.05)' }}>
                  <span style={{ display: 'inline-flex', width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: `${config.accent}14`, color: config.accent }}>
                    <BadgeCheck size={19} />
                  </span>
                  <div>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1rem', fontWeight: 900, marginBottom: 7 }}>{item.title}</h3>
                    <p style={{ color: '#526173', fontSize: 13.5, lineHeight: 1.68 }}>{item.desc}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '66px 0', background: '#FFF7ED' }}>
        <div className="container">
          <ScrollReveal>
            <div className="tech-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22, background: '#fff', border: '1px solid #FED7AA', borderRadius: 8, padding: 30, boxShadow: '0 18px 44px rgba(194,65,12,0.1)' }}>
              <div>
                <h2 style={{ color: 'var(--navy)', fontSize: '1.35rem', fontWeight: 900, marginBottom: 6 }}>현장 조건에 맞춰 제품과 제어 방식을 같이 검토합니다</h2>
                <p style={{ color: '#64748B', fontSize: 14 }}>면적, 천장고, 개방 빈도, 체류 동선만 알려주시면 다음 검토 포인트를 빠르게 정리할 수 있습니다.</p>
              </div>
              <Link to="/products" className="btn btn-primary" style={{ borderRadius: 8, flexShrink: 0 }}>
                제품 라인업 보기 <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .tech-solution-hero-grid, .tech-solution-split { grid-template-columns: 1fr !important; }
          .tech-card-grid { grid-template-columns: 1fr 1fr !important; }
          .tech-process-grid { grid-template-columns: 1fr 1fr !important; }
          .databar-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 700px) {
          .tech-stat-grid, .tech-method-grid { grid-template-columns: 1fr !important; }
          .zero-diagram, .solution-diagram { grid-template-columns: 1fr !important; gap: 18px !important; }
          .tech-cta { align-items: flex-start !important; flex-direction: column !important; }
          .spotlight-grid { grid-template-columns: 1fr !important; }
          .tech-card-grid { grid-template-columns: 1fr !important; }
          .databar-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .databar-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
