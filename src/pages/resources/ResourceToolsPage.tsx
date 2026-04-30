import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  Download,
  FileText,
  Gauge,
  Layers,
  LineChart,
  PlayCircle,
  Ruler,
  Wallet,
} from 'lucide-react';
import SubHero from '../../components/layout/SubHero';

type ToolPageId = 'heating-load' | 'energy-roi' | 'cad' | 'videos';

interface ToolPageConfig {
  breadcrumb: string;
  badge: string;
  title: string;
  lead: string;
  accent: string;
  icon: typeof Calculator;
  points: Array<{ title: string; desc: string }>;
}

const PAGE_CONFIG: Record<ToolPageId, ToolPageConfig> = {
  'heating-load': {
    breadcrumb: '난방 용량 계산기',
    badge: 'Heating Load Calculator',
    title: '현장 조건으로 빠르게 보는 난방 용량 1차 계산',
    lead: '면적, 천장고, 단열 상태, 실제 난방 구역을 입력하면 복사난방 검토에 필요한 대략 용량과 제품 수량을 확인할 수 있습니다.',
    accent: '#2563EB',
    icon: Calculator,
    points: [
      { title: '면적·천장고 반영', desc: '공간 체적을 기준으로 1차 난방 부하를 계산합니다.' },
      { title: '단열 상태 보정', desc: '단열이 약한 공간은 기준 부하를 높여 검토합니다.' },
      { title: '구역 난방 고려', desc: '전체 면적이 아닌 실제 체류 구역만 따로 계산할 수 있습니다.' },
    ],
  },
  'energy-roi': {
    breadcrumb: '에너지 ROI 계산기',
    badge: 'Energy ROI Calculator',
    title: '운영비 절감 효과와 투자 회수 기간을 빠르게 비교',
    lead: '현재 난방비, 난방 시즌, 예상 절감률, 설치 예산을 입력하면 연간 절감액과 단순 회수 기간을 바로 확인할 수 있습니다.',
    accent: '#16A34A',
    icon: LineChart,
    points: [
      { title: '연간 절감액 산출', desc: '난방 시즌 기준으로 절감 가능한 비용을 계산합니다.' },
      { title: '단순 회수 기간', desc: '초기 설치비 대비 투자 회수 기간을 빠르게 봅니다.' },
      { title: '5년 누적 효과', desc: '장기 운영 관점에서 비용 차이를 확인합니다.' },
    ],
  },
  cad: {
    breadcrumb: '스펙·도면 CAD',
    badge: 'Specs & CAD',
    title: '설계 검토에 필요한 스펙·도면 자료 안내',
    lead: '제품별 시방서, 설치 상세도, 전기 인입 조건, CAD 도면은 현장 조건 확인 후 필요한 범위부터 제공하는 흐름으로 정리했습니다.',
    accent: '#7C3AED',
    icon: Ruler,
    points: [
      { title: '시방서', desc: '제품 규격, 설치 조건, 안전 기준 확인용 자료입니다.' },
      { title: '설치 상세도', desc: '매립형·노출형·천장형 등 설치 방식별 검토 자료입니다.' },
      { title: '전기 조건', desc: '전원, 제어반, 구역 운전 조건 검토에 필요한 항목입니다.' },
    ],
  },
  videos: {
    breadcrumb: '동영상 자료',
    badge: 'Video Library',
    title: '제품 이해와 현장 검토를 돕는 동영상 자료',
    lead: '복사난방 원리, 제품 설치 방식, 현장 적용 사례를 영상 중심으로 볼 수 있도록 자료 구조를 먼저 열어두었습니다.',
    accent: '#DC2626',
    icon: PlayCircle,
    points: [
      { title: '원리 설명', desc: '대류난방과 복사난방의 차이를 쉽게 설명하는 영상 영역입니다.' },
      { title: '설치 가이드', desc: '현장 담당자가 설치 흐름을 빠르게 이해할 수 있는 자료입니다.' },
      { title: '시공 사례', desc: '학교, 물류, 특수 현장의 적용 장면을 모아볼 수 있습니다.' },
    ],
  },
};

function NumberField({ label, value, onChange, suffix, min = 0, step = 1 }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix: string;
  min?: number;
  step?: number;
}) {
  return (
    <label style={{ display: 'grid', gap: 8 }}>
      <span style={{ color: '#334155', fontSize: 13, fontWeight: 800 }}>{label}</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', border: '1px solid #D8DEE8', borderRadius: 8, background: '#fff', overflow: 'hidden' }}>
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          style={{ width: '100%', border: 0, padding: '12px 13px', color: 'var(--navy)', fontSize: 16, fontWeight: 800, outline: 'none' }}
        />
        <span style={{ color: '#64748B', fontSize: 13, fontWeight: 800, paddingRight: 13 }}>{suffix}</span>
      </div>
    </label>
  );
}

function ResultMetric({ label, value, note, accent }: { label: string; value: string; note: string; accent: string }) {
  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 18, background: '#fff' }}>
      <div style={{ color: '#64748B', fontSize: 12, fontWeight: 800, marginBottom: 7 }}>{label}</div>
      <div style={{ color: accent, fontSize: '1.65rem', fontWeight: 900, lineHeight: 1.15 }}>{value}</div>
      <div style={{ color: '#64748B', fontSize: 12.5, fontWeight: 700, marginTop: 8, lineHeight: 1.55 }}>{note}</div>
    </div>
  );
}

function HeatingLoadTool({ accent }: { accent: string }) {
  const [area, setArea] = useState(240);
  const [height, setHeight] = useState(4.5);
  const [zoneRatio, setZoneRatio] = useState(70);
  const [panelKw, setPanelKw] = useState(2.4);
  const [insulation, setInsulation] = useState('standard');
  const [exposure, setExposure] = useState('normal');

  const result = useMemo(() => {
    const insulationFactor = insulation === 'good' ? 30 : insulation === 'poor' ? 48 : 38;
    const exposureFactor = exposure === 'high' ? 1.22 : exposure === 'low' ? 0.92 : 1;
    const usableArea = Math.max(area, 0) * Math.max(zoneRatio, 0) / 100;
    const kw = usableArea * Math.max(height, 0) * insulationFactor * exposureFactor / 1000;
    const panelCount = Math.max(1, Math.ceil(kw / Math.max(panelKw, 0.1)));
    const low = Math.max(0, kw * 0.88);
    const high = kw * 1.18;
    return { usableArea, kw, panelCount, low, high };
  }, [area, height, zoneRatio, panelKw, insulation, exposure]);

  return (
    <div className="resource-tool-grid" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 22, alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: 14 }}>
        <NumberField label="전체 면적" value={area} onChange={setArea} suffix="m²" />
        <NumberField label="천장고" value={height} onChange={setHeight} suffix="m" step={0.1} />
        <NumberField label="실제 난방 구역" value={zoneRatio} onChange={setZoneRatio} suffix="%" />
        <NumberField label="제품 1대 기준 용량" value={panelKw} onChange={setPanelKw} suffix="kW" step={0.1} />

        <label style={{ display: 'grid', gap: 8 }}>
          <span style={{ color: '#334155', fontSize: 13, fontWeight: 800 }}>단열 상태</span>
          <select value={insulation} onChange={(event) => setInsulation(event.target.value)} style={{ border: '1px solid #D8DEE8', borderRadius: 8, padding: '12px 13px', color: 'var(--navy)', fontSize: 15, fontWeight: 800, background: '#fff' }}>
            <option value="good">양호</option>
            <option value="standard">보통</option>
            <option value="poor">취약</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 8 }}>
          <span style={{ color: '#334155', fontSize: 13, fontWeight: 800 }}>외기 유입</span>
          <select value={exposure} onChange={(event) => setExposure(event.target.value)} style={{ border: '1px solid #D8DEE8', borderRadius: 8, padding: '12px 13px', color: 'var(--navy)', fontSize: 15, fontWeight: 800, background: '#fff' }}>
            <option value="low">낮음</option>
            <option value="normal">보통</option>
            <option value="high">높음</option>
          </select>
        </label>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        <ResultMetric label="검토 난방 구역" value={`${Math.round(result.usableArea).toLocaleString()} m²`} note="입력 면적 중 실제 체류·작업 구역 기준" accent={accent} />
        <ResultMetric label="권장 1차 용량" value={`${result.kw.toFixed(1)} kW`} note={`${result.low.toFixed(1)}~${result.high.toFixed(1)} kW 범위에서 현장 보정 권장`} accent={accent} />
        <ResultMetric label="예상 제품 수량" value={`${result.panelCount.toLocaleString()} 대`} note={`${panelKw.toFixed(1)} kW급 제품 기준 단순 산출`} accent={accent} />
      </div>
    </div>
  );
}

function EnergyRoiTool({ accent }: { accent: string }) {
  const [monthlyCost, setMonthlyCost] = useState(420);
  const [months, setMonths] = useState(5);
  const [savingRate, setSavingRate] = useState(24);
  const [installCost, setInstallCost] = useState(1800);
  const [maintenanceSaving, setMaintenanceSaving] = useState(80);

  const result = useMemo(() => {
    const annualHeatingCost = Math.max(monthlyCost, 0) * Math.max(months, 0);
    const energySaving = annualHeatingCost * Math.max(savingRate, 0) / 100;
    const annualSaving = energySaving + Math.max(maintenanceSaving, 0);
    const payback = annualSaving > 0 ? Math.max(installCost, 0) / annualSaving : 0;
    const fiveYear = annualSaving * 5 - Math.max(installCost, 0);
    return { annualHeatingCost, annualSaving, payback, fiveYear };
  }, [monthlyCost, months, savingRate, installCost, maintenanceSaving]);

  return (
    <div className="resource-tool-grid" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 22, alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: 14 }}>
        <NumberField label="현재 월 난방비" value={monthlyCost} onChange={setMonthlyCost} suffix="만원" />
        <NumberField label="연간 난방 사용 기간" value={months} onChange={setMonths} suffix="개월" />
        <NumberField label="예상 절감률" value={savingRate} onChange={setSavingRate} suffix="%" />
        <NumberField label="예상 설치 예산" value={installCost} onChange={setInstallCost} suffix="만원" />
        <NumberField label="연간 유지관리 절감" value={maintenanceSaving} onChange={setMaintenanceSaving} suffix="만원" />
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        <ResultMetric label="현재 연간 난방비" value={`${Math.round(result.annualHeatingCost).toLocaleString()} 만원`} note="월 난방비와 난방 시즌 기준" accent={accent} />
        <ResultMetric label="예상 연간 절감액" value={`${Math.round(result.annualSaving).toLocaleString()} 만원`} note="에너지 절감액과 유지관리 절감 포함" accent={accent} />
        <ResultMetric label="단순 회수 기간" value={`${result.payback.toFixed(1)} 년`} note="금융 비용과 세부 공사비는 별도 검토 필요" accent={accent} />
        <ResultMetric label="5년 누적 효과" value={`${Math.round(result.fiveYear).toLocaleString()} 만원`} note="초기 설치비 차감 후 단순 누적 기준" accent={accent} />
      </div>
    </div>
  );
}

const CAD_ITEMS = [
  { icon: FileText, title: '제품 시방서', desc: '제품 규격, 발열 방식, 설치 기준, 안전 조건을 검토하는 기본 문서' },
  { icon: Layers, title: '설치 상세도', desc: '천장형, 벽부형, 매립형 등 설치 방식별 구조 검토 자료' },
  { icon: Gauge, title: '전기·제어 조건', desc: '전원, 회로, 구역 제어, 중앙제어 연동 검토 항목' },
  { icon: Download, title: 'CAD 요청 흐름', desc: '현장 도면과 제품군이 정해지면 필요한 파일 형식부터 선별 제공' },
];

const VIDEO_ITEMS = [
  { icon: PlayCircle, title: '복사난방 원리', desc: '공기를 데우는 방식과 표면·사람에 열을 전달하는 방식의 차이' },
  { icon: Ruler, title: '설치 방식', desc: '천장고, 설치 위치, 배선, 제어 구성을 이해하기 위한 안내 영상' },
  { icon: BadgeCheck, title: '현장 적용 사례', desc: '학교, 물류센터, 특수 시설에서 검토할 만한 적용 포인트' },
  { icon: Wallet, title: '운영비 절감', desc: '구역별 운전과 스케줄 제어가 비용 구조에 주는 영향' },
];

function ResourceGuide({ pageId, accent }: { pageId: ToolPageId; accent: string }) {
  const items = pageId === 'cad' ? CAD_ITEMS : VIDEO_ITEMS;
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="resource-card-grid">
      {items.map(({ icon: Icon, title, desc }) => (
        <motion.article key={title} variants={cardVariant} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 22, boxShadow: '0 14px 34px rgba(15,34,65,0.06)' }}>
          <Icon size={28} color={accent} style={{ marginBottom: 16 }} />
          <h3 style={{ color: 'var(--navy)', fontSize: '1rem', fontWeight: 900, marginBottom: 8 }}>{title}</h3>
          <p style={{ color: '#526173', fontSize: 13.5, lineHeight: 1.68 }}>{desc}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ResourceToolsPage({ pageId }: { pageId: ToolPageId }) {
  const config = PAGE_CONFIG[pageId];
  const Icon = config.icon;
  const isCalculator = pageId === 'heating-load' || pageId === 'energy-roi';

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <SubHero
        breadcrumb={[{ label: '자료실' }, { label: config.breadcrumb }]}
        badge={config.badge}
        title={config.title}
        lead={config.lead}
        keywords={config.points.map(p => p.title)}
      />

      <section style={{ padding: '68px 0 78px', background: '#F8FAFC' }}>
        <div className="container">
          {/* 핵심 포인트 카드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 40 }} className="resource-point-grid">
            {config.points.map((point) => (
              <div key={point.title} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 20 }}>
                <BadgeCheck size={20} color={config.accent} style={{ marginBottom: 12 }} />
                <h3 style={{ fontSize: 15, fontWeight: 900, marginBottom: 7, color: 'var(--navy)' }}>{point.title}</h3>
                <p style={{ color: '#64748B', fontSize: 12.5, lineHeight: 1.6, fontWeight: 700 }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 78px', background: '#F8FAFC' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: 30, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: config.accent, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
              {isCalculator ? 'Quick Simulation' : 'Resource Guide'}
            </p>
            <h2 style={{ color: 'var(--navy)', fontSize: '2rem', fontWeight: 900 }}>
              {isCalculator ? '입력값을 바꾸며 바로 검토해보세요' : '자료 준비 전에도 검토 흐름을 먼저 확인하세요'}
            </h2>
          </motion.div>

          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 18px 44px rgba(15,34,65,0.08)' }}>
            {pageId === 'heating-load' && <HeatingLoadTool accent={config.accent} />}
            {pageId === 'energy-roi' && <EnergyRoiTool accent={config.accent} />}
            {(pageId === 'cad' || pageId === 'videos') && <ResourceGuide pageId={pageId} accent={config.accent} />}
          </div>

          <div className="resource-cta" style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, background: '#fff', border: `1px solid ${config.accent}33`, borderRadius: 8, padding: 24 }}>
            <div>
              <h2 style={{ color: 'var(--navy)', fontSize: '1.18rem', fontWeight: 900, marginBottom: 6 }}>현장 조건을 보내주시면 더 정확히 검토해드립니다</h2>
              <p style={{ color: '#64748B', fontSize: 14 }}>면적, 천장고, 사진, 도면 중 가능한 정보만 있어도 1차 검토가 가능합니다.</p>
            </div>
            <Link to="/contact" className="btn btn-primary" style={{ borderRadius: 8, flexShrink: 0 }}>
              상담 요청 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .resource-hero-grid,
          .resource-tool-grid {
            grid-template-columns: 1fr !important;
          }
          .resource-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 700px) {
          .resource-point-grid,
          .resource-card-grid {
            grid-template-columns: 1fr !important;
          }
          .resource-cta {
            align-items: flex-start !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </main>
  );
}
