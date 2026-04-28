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
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

type PageId = 'zero' | 'public-edu' | 'industrial-logistics' | 'defense-special' | 'iot-control';

interface PageConfig {
  breadcrumb: string;
  badge: string;
  title: string;
  lead: string;
  accent: string;
  gradient: string;
  icon: typeof Sparkles;
  stats: Array<{ label: string; value: string }>;
  pains: Array<{ title: string; desc: string }>;
  solutions: Array<{ title: string; desc: string }>;
  applications: Array<{ title: string; desc: string; icon: typeof Building2 }>;
  diagramLabels: { source: string; center: string; outcome: string };
}

const PAGES: Record<PageId, PageConfig> = {
  zero: {
    breadcrumb: '4대 ZERO 기술',
    badge: 'Core Technology',
    title: '분진·전자파·화재·결로를 줄이는 4대 ZERO 설계',
    lead: '복사난방의 장점은 단순히 따뜻함이 아닙니다. 바람을 만들지 않고, 화염을 쓰지 않고, 표면 냉기를 줄이는 방식으로 민감한 현장의 리스크를 동시에 낮춥니다.',
    accent: '#E8574A',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #16233A 54%, #2B1818 100%)',
    icon: Sparkles,
    stats: [
      { label: '무풍 난방', value: 'Zero Dust' },
      { label: '송풍 없음', value: 'Zero Noise' },
      { label: '화염 없음', value: 'Zero Flame' },
      { label: '표면 냉기 저감', value: 'Zero Dew' },
    ],
    pains: [
      { title: '먼지와 기류', desc: '송풍식 난방은 먼지, 냄새, 바이러스성 비말을 함께 이동시킬 수 있습니다.' },
      { title: '결로와 곰팡이', desc: '차가운 바닥·벽면은 이슬점 이하로 내려가 결로와 곰팡이 원인이 됩니다.' },
      { title: '특수 현장 안전성', desc: '위험물 취급 공간은 화염, 과열, 방폭 조건을 모두 검토해야 합니다.' },
    ],
    solutions: [
      { title: '미세먼지 Zero', desc: '공기 순환을 최소화해 분진 발생과 확산을 줄입니다.' },
      { title: '전자파 Zero 지향', desc: '원적외선 복사열 중심 설계로 민감 장비가 있는 공간에도 적용성을 검토할 수 있습니다.' },
      { title: '화재위험 Zero 지향', desc: '개방형 화염 없이 전기식 발열체와 안전 제어를 조합합니다.' },
      { title: '결로 Zero 지향', desc: '바닥·벽·장비 표면 온도를 높여 결로가 생기는 조건을 완화합니다.' },
    ],
    applications: [
      { icon: Factory, title: '식품·의약품 창고', desc: '분진·기류 관리가 중요한 보관 공간' },
      { icon: ShieldCheck, title: '특수 설비실', desc: '안전성 검토와 안정 운전이 중요한 공간' },
      { icon: Droplets, title: '결로 취약 구역', desc: '지하·출입구·냉기 유입 구간' },
    ],
    diagramLabels: { source: '위험 요인', center: '복사난방', outcome: 'ZERO 리스크' },
  },
  'public-edu': {
    breadcrumb: '공공·교육 솔루션',
    badge: 'Public & Education',
    title: '학교와 공공시설에 맞춘 조용하고 깨끗한 체감 난방',
    lead: '급식실, 체육관, 민원실처럼 사람이 오래 머무는 공간은 소음과 바람이 적고 유지관리가 쉬운 난방이 중요합니다. 썬레이텍은 조달 흐름에 맞춰 도입 검토가 쉬운 구성을 제안합니다.',
    accent: '#2563EB',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #12315F 58%, #14233A 100%)',
    icon: School,
    stats: [
      { label: '주요 공간', value: '학교·관공서' },
      { label: '핵심 체감', value: '무풍·저소음' },
      { label: '구매 흐름', value: '조달 검토' },
      { label: '운영 포인트', value: '구역 제어' },
    ],
    pains: [
      { title: '수업·업무 중 소음', desc: '팬 소음과 바람은 학습 환경과 민원 공간의 집중도를 떨어뜨립니다.' },
      { title: '먼지와 건조감', desc: '송풍 난방은 먼지 이동과 건조한 체감을 만들 수 있습니다.' },
      { title: '넓고 높은 다목적 공간', desc: '체육관·강당은 따뜻한 공기가 상부에 정체되기 쉽습니다.' },
    ],
    solutions: [
      { title: '무바람 체감 난방', desc: '사람과 바닥 표면을 직접 데워 바람 없이 따뜻함을 전달합니다.' },
      { title: '구역별 운전', desc: '사용 시간과 체류 구역에 맞춰 필요한 곳만 운영할 수 있습니다.' },
      { title: '조달 대응 구성', desc: '우수제품·MAS 등 공공 구매 흐름에 맞춰 제품군을 비교할 수 있습니다.' },
      { title: '유지관리 단순화', desc: '필터·송풍부 관리 부담을 줄이고 장기 운영성을 높입니다.' },
    ],
    applications: [
      { icon: School, title: '학교 급식실·체육관', desc: '학생 체류 공간의 무풍 난방' },
      { icon: Building2, title: '관공서·복지관', desc: '민원·대기 공간의 균일 체감' },
      { icon: BadgeCheck, title: '공공 조달 현장', desc: '나라장터 검토가 필요한 발주처' },
    ],
    diagramLabels: { source: '공공 공간', center: '구역별 복사열', outcome: '쾌적한 체류' },
  },
  'industrial-logistics': {
    breadcrumb: '산업·물류 솔루션',
    badge: 'Industrial & Logistics',
    title: '고천장 대공간에서 작업자에게 직접 도달하는 난방',
    lead: '물류센터, 제조공장, 정비창은 천장이 높고 출입문 개방이 잦아 공기를 데우는 방식의 손실이 큽니다. 복사난방은 작업자 동선과 작업면을 중심으로 열을 전달합니다.',
    accent: '#F59E0B',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #23324B 50%, #3A2812 100%)',
    icon: Factory,
    stats: [
      { label: '핵심 공간', value: '고천장' },
      { label: '난방 대상', value: '작업자·작업면' },
      { label: '운영 방식', value: '존 난방' },
      { label: '리스크 저감', value: '결로·냉기' },
    ],
    pains: [
      { title: '상부 열 정체', desc: '따뜻한 공기가 천장으로 올라가 작업자는 여전히 춥게 느낄 수 있습니다.' },
      { title: '출입문 개방 손실', desc: '상하차, 지게차 이동, 대형 셔터 개방으로 데운 공기가 빠르게 빠져나갑니다.' },
      { title: '물류 품질과 결로', desc: '바닥 냉기와 표면 결로는 작업 안전과 보관 품질에 영향을 줍니다.' },
    ],
    solutions: [
      { title: '작업면 직접 난방', desc: '공기보다 사람, 바닥, 설비 표면에 열을 전달해 체감 효율을 높입니다.' },
      { title: '동선 중심 배치', desc: '피킹라인, 포장라인, 정비구역 등 실제 체류 구역 위주로 설계합니다.' },
      { title: '피크 관리', desc: '존별 운전과 스케줄 제어로 에너지 사용을 단계적으로 관리합니다.' },
      { title: '결로 완화', desc: '표면 온도를 올려 바닥 냉기와 결로 발생 조건을 줄입니다.' },
    ],
    applications: [
      { icon: Factory, title: '물류센터·창고', desc: '피킹·포장·상하차 구역' },
      { icon: Gauge, title: '제조공장', desc: '라인 작업자 체류 공간' },
      { icon: MapPinned, title: '정비·서비스 구역', desc: '부분 난방이 필요한 개방형 현장' },
    ],
    diagramLabels: { source: '고천장 손실', center: '작업면 복사열', outcome: '체감 효율' },
  },
  'defense-special': {
    breadcrumb: '국방·특수 솔루션',
    badge: 'Defense & Special',
    title: '안전 조건이 까다로운 현장을 위한 특수 난방 접근',
    lead: '군 정비창, 특수 창고, 방폭 검토가 필요한 공간은 일반 난방기 선택이 제한됩니다. 썬레이텍은 현장 위험도와 설치 환경을 먼저 검토하고 적합한 제품군을 제안합니다.',
    accent: '#DC2626',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #1E293B 48%, #3B1111 100%)',
    icon: ShieldCheck,
    stats: [
      { label: '검토 기준', value: '안전성' },
      { label: '환경 대응', value: '방수·방진' },
      { label: '현장 유형', value: '정비·보관' },
      { label: '운영 목적', value: '동파·체감' },
    ],
    pains: [
      { title: '화재·방폭 조건', desc: '가연성 물질 또는 위험 구역은 열원과 전기 설비 조건을 세밀히 검토해야 합니다.' },
      { title: '열악한 설치 환경', desc: '먼지, 습기, 외기 유입, 높은 천장 등 일반 난방기가 버티기 어려운 조건이 많습니다.' },
      { title: '부분 난방 필요', desc: '전체 공간보다 장비, 작업자, 특정 보관 구역 중심의 난방이 필요한 경우가 많습니다.' },
    ],
    solutions: [
      { title: '현장 위험도 기반 설계', desc: '방폭·방수·방진 필요 여부를 먼저 구분해 제품과 회로 구성을 검토합니다.' },
      { title: '비화염 전기식 열원', desc: '개방형 화염 없이 필요한 지점에 복사열을 전달합니다.' },
      { title: '특정 구역 집중 난방', desc: '정비대, 출입구, 동파 취약 구간처럼 필요한 곳에 집중 배치합니다.' },
      { title: '장기 운영 안정성', desc: '구동부가 적은 구조로 유지보수 부담을 줄입니다.' },
    ],
    applications: [
      { icon: ShieldCheck, title: '군 정비창', desc: '작업자 체감과 장비 주변 난방' },
      { icon: Flame, title: '위험물 주변 구역', desc: '안전 조건 검토가 필요한 공간' },
      { icon: Droplets, title: '동파 취약 시설', desc: '외기 유입과 습기가 많은 구간' },
    ],
    diagramLabels: { source: '위험 조건', center: '안전 검토', outcome: '특수 난방' },
  },
  'iot-control': {
    breadcrumb: 'IoT 중앙제어',
    badge: 'IoT Control',
    title: '구역별 난방을 데이터로 관리하는 중앙제어 운영',
    lead: '복사난방은 필요한 구역만 켜는 방식과 궁합이 좋습니다. IoT 중앙제어를 결합하면 스케줄, 피크, 현장별 운전 상태를 한눈에 관리할 수 있습니다.',
    accent: '#22C55E',
    gradient: 'linear-gradient(150deg, #0A1628 0%, #12353A 58%, #102A1B 100%)',
    icon: RadioTower,
    stats: [
      { label: '운전 단위', value: 'Zone' },
      { label: '관리 방식', value: '스케줄' },
      { label: '절감 포인트', value: '피크 제어' },
      { label: '확장 방향', value: '원격 관리' },
    ],
    pains: [
      { title: '불필요한 전체 운전', desc: '사용하지 않는 구역까지 동시에 가동하면 에너지 비용이 커집니다.' },
      { title: '현장별 수동 관리', desc: '담당자가 직접 켜고 끄는 방식은 누락과 과운전이 발생하기 쉽습니다.' },
      { title: '피크 시간대 부담', desc: '전기 난방은 시간대별 부하와 동시 운전 전략이 중요합니다.' },
    ],
    solutions: [
      { title: '존별 스케줄 운전', desc: '사용 시간, 체류 구역, 요일에 따라 구역별 운전 계획을 설정합니다.' },
      { title: '중앙 모니터링', desc: '다수 공간의 가동 상태와 이상 여부를 한 화면에서 확인할 수 있는 구조로 확장합니다.' },
      { title: '피크 분산 제어', desc: '동시 가동을 조절해 전력 피크 부담을 줄이는 운전 전략을 세울 수 있습니다.' },
      { title: '운영 데이터 축적', desc: '사용 패턴을 기반으로 다음 시즌의 난방 계획을 더 정교하게 다듬습니다.' },
    ],
    applications: [
      { icon: RadioTower, title: '학교·공공시설', desc: '시간표·행사 일정 기반 운전' },
      { icon: CircuitBoard, title: '산업 현장', desc: '라인·작업구역별 제어' },
      { icon: Zap, title: '다수 지점 운영', desc: '여러 공간의 원격 모니터링' },
    ],
    diagramLabels: { source: '현장 구역', center: 'IoT 제어', outcome: '에너지 관리' },
  },
};

function SunraytecSymbol() {
  const rows = ['SUN', 'RAY', 'TEC'];

  return (
    <div
      aria-label="SUN RAY TEC"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 3,
        width: 92,
        height: 92,
        padding: 5,
        background: '#111827',
        borderRadius: 8,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
      }}
    >
      {rows.flatMap((row, rowIndex) =>
        row.split('').map((letter, colIndex) => {
          const isAccent = rowIndex === 0 && colIndex === 0;
          return (
            <span
              key={`${row}-${letter}-${colIndex}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isAccent ? '#C8392B' : '#F8FAFC',
                color: isAccent ? '#fff' : '#111827',
                borderRadius: 3,
                fontFamily: 'Georgia, serif',
                fontSize: 17,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: 0,
              }}
            >
              {letter}
            </span>
          );
        }),
      )}
    </div>
  );
}

function EnergyDiagram({ config }: { config: PageConfig }) {
  const Icon = config.icon;

  if (config.breadcrumb === '4대 ZERO 기술') {
    const riskItems = [
      { icon: Wind, label: '분진·먼지', note: '송풍 확산' },
      { icon: Zap, label: '전자파 우려', note: '민감 장비' },
      { icon: Flame, label: '화재 위험', note: '화염·과열' },
      { icon: Droplets, label: '결로·곰팡이', note: '차가운 표면' },
    ];
    const zeroItems = [
      { label: '미세먼지 Zero', detail: '무바람 복사열' },
      { label: '전자파 Zero 지향', detail: '원적외선 중심' },
      { label: '화재위험 Zero 지향', detail: '비화염 전기식' },
      { label: '결로 Zero 지향', detail: '표면 온도 상승' },
    ];

    return (
      <div
        style={{
          minHeight: 350,
          borderRadius: 8,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
          border: '1px solid rgba(15,34,65,0.11)',
          boxShadow: '0 24px 70px rgba(15,34,65,0.14)',
          padding: 22,
          display: 'grid',
          gridTemplateColumns: '1fr 0.82fr 1fr',
          gap: 14,
          alignItems: 'center',
        }}
        className="zero-diagram"
      >
        <div style={{ display: 'grid', gap: 10 }}>
          <p style={{ color: '#64748B', fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>
            Before
          </p>
          {riskItems.map(({ icon: RiskIcon, label, note }, index) => (
            <motion.div
              key={label}
              animate={{ x: [0, index % 2 ? -3 : 3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                minHeight: 56,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #FECACA',
                background: '#FFF5F5',
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <RiskIcon size={18} />
              </div>
              <div>
                <div style={{ color: '#7F1D1D', fontSize: 13.5, fontWeight: 900 }}>{label}</div>
                <div style={{ color: '#991B1B', opacity: 0.68, fontSize: 11.5, fontWeight: 700 }}>{note}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
          <motion.div
            animate={{ boxShadow: ['0 16px 38px rgba(200,57,43,0.18)', '0 22px 54px rgba(200,57,43,0.32)', '0 16px 38px rgba(200,57,43,0.18)'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 132,
              height: 132,
              borderRadius: 8,
              background: '#fff',
              border: '1px solid #FECACA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: 14,
            }}
          >
            <SunraytecSymbol />
            <motion.div
              animate={{ opacity: [0.25, 0.7, 0.25], scale: [0.86, 1.18, 0.86] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: -18,
                border: '2px solid rgba(200,57,43,0.25)',
                borderRadius: 8,
              }}
            />
          </motion.div>
          <div style={{ color: 'var(--navy)', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 900 }}>썬레이텍</div>
            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 800 }}>원적외선 복사난방</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#C8392B', fontSize: 12, fontWeight: 900 }}>
            위험요인 완화 <ArrowRight size={15} />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <p style={{ color: '#64748B', fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 }}>
            After
          </p>
          {zeroItems.map((item, index) => (
            <motion.div
              key={item.label}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.16 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                minHeight: 56,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #BBF7D0',
                background: '#F0FDF4',
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BadgeCheck size={19} />
              </div>
              <div>
                <div style={{ color: '#14532D', fontSize: 13.5, fontWeight: 900 }}>{item.label}</div>
                <div style={{ color: '#166534', opacity: 0.72, fontSize: 11.5, fontWeight: 700 }}>{item.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: 350,
        borderRadius: 8,
        background: '#F8FAFC',
        border: '1px solid rgba(15,34,65,0.11)',
        boxShadow: '0 24px 70px rgba(15,34,65,0.14)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 720 350" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id={`flow-${config.breadcrumb}`} x1="0" x2="1">
            <stop offset="0%" stopColor={config.accent} stopOpacity="0.08" />
            <stop offset="48%" stopColor={config.accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F39C12" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="360"
          cy="172"
          r="84"
          fill={config.accent}
          animate={{ opacity: [0.06, 0.16, 0.06], scale: [0.92, 1.08, 0.92] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '360px 172px' }}
        />
        {[78, 126, 594, 642].map((x, index) => (
          <motion.circle
            key={x}
            cx={x}
            cy={index < 2 ? 118 + index * 112 : 118 + (index - 2) * 112}
            r="34"
            fill="#FFFFFF"
            stroke="#D8DEE8"
            strokeWidth="2"
            animate={{ y: [0, index % 2 ? -8 : 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
          />
        ))}
        {[130, 180, 230, 490, 540, 590].map((x, index) => (
          <motion.path
            key={x}
            d={`M ${x} ${index < 3 ? 128 : 220} C 250 ${index < 3 ? 96 : 260}, 470 ${index < 3 ? 96 : 260}, ${720 - x} ${index < 3 ? 128 : 220}`}
            stroke={`url(#flow-${config.breadcrumb})`}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="12 16"
            animate={{ strokeDashoffset: [0, -56], opacity: [0.34, 0.9, 0.34] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: index * 0.14 }}
          />
        ))}
        <rect x="276" y="90" width="168" height="164" rx="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <text x="360" y="292" textAnchor="middle" fill="#0A1628" fontSize="16" fontWeight="900">{config.diagramLabels.center}</text>
        <text x="100" y="306" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="800">{config.diagramLabels.source}</text>
        <text x="620" y="306" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="800">{config.diagramLabels.outcome}</text>
      </svg>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 108, height: 108, borderRadius: 8, background: config.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 18px 42px rgba(15,34,65,0.22)' }}>
          <Icon size={54} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

export default function TechnologySolutionPage({ pageId }: { pageId: PageId }) {
  const config = PAGES[pageId];
  const Icon = config.icon;

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <section style={{ background: config.gradient, color: '#fff', padding: '58px 0 70px' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.48)', marginBottom: 20 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.48)' }}>홈</Link>
              <span>/</span>
              <span>기술·솔루션</span>
              <span>/</span>
              <strong style={{ color: 'rgba(255,255,255,0.82)' }}>{config.breadcrumb}</strong>
            </div>

            <div className="tech-solution-hero-grid" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 34, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 11px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 13, fontWeight: 800, marginBottom: 18 }}>
                  <Icon size={15} /> {config.badge}
                </div>
                <h1 style={{ fontSize: '2.38rem', lineHeight: 1.16, fontWeight: 900, marginBottom: 18 }}>{config.title}</h1>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.02rem', lineHeight: 1.78, maxWidth: 590 }}>{config.lead}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginTop: 28, maxWidth: 520 }} className="tech-stat-grid">
                  {config.stats.map((stat) => (
                    <div key={stat.label} style={{ border: '1px solid rgba(255,255,255,0.16)', borderRadius: 8, padding: '12px 14px', background: 'rgba(255,255,255,0.07)' }}>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.58)', fontWeight: 700 }}>{stat.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <EnergyDiagram config={config} />
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '68px 0', background: '#F8FAFC' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 34 }}>
            <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Problem Map</p>
            <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900 }}>현장에서 먼저 해결해야 할 문제</h2>
          </ScrollReveal>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="tech-card-grid">
            {config.pains.map((item, index) => (
              <motion.article key={item.title} variants={staggerItem} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 14px 34px rgba(15,34,65,0.06)' }}>
                <span style={{ display: 'inline-flex', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: '#FFF7ED', color: config.accent, fontWeight: 900, marginBottom: 18 }}>{index + 1}</span>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.06rem', fontWeight: 900, marginBottom: 9 }}>{item.title}</h3>
                <p style={{ color: '#526173', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div className="tech-solution-split" style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 34, alignItems: 'start' }}>
            <ScrollReveal>
              <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Sunraytec Method</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900, lineHeight: 1.25, marginBottom: 16 }}>썬레이텍 방식으로 바꾸면 달라지는 것</h2>
              <p style={{ color: '#526173', lineHeight: 1.82 }}>
                자료가 추가되기 전에도 기본 설계 방향은 명확합니다. 공기 전체를 데우는 방식보다 현장 조건, 체류 구역, 안전 조건을 먼저 보고 제품 배치와 제어 전략을 결정합니다.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ borderRadius: 8, marginTop: 24 }}>
                현장 상담 요청 <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }} className="tech-method-grid">
              {config.solutions.map((item) => (
                <motion.article key={item.title} variants={staggerItem} style={{ border: '1px solid #E2E8F0', borderLeft: `4px solid ${config.accent}`, borderRadius: 8, padding: 20, background: '#fff' }}>
                  <h3 style={{ color: 'var(--navy)', fontSize: '1rem', fontWeight: 900, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: '#526173', fontSize: 13.5, lineHeight: 1.68 }}>{item.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0', background: 'linear-gradient(180deg, #0A1628 0%, #14233A 100%)', color: '#fff' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Applications</p>
            <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>우선 적용하기 좋은 공간</h2>
          </ScrollReveal>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }} className="tech-card-grid">
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
          .tech-solution-hero-grid,
          .tech-solution-split {
            grid-template-columns: 1fr !important;
          }
          .tech-card-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .tech-stat-grid,
          .tech-method-grid {
            grid-template-columns: 1fr !important;
          }
          .zero-diagram {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .tech-cta {
            align-items: flex-start !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </main>
  );
}
