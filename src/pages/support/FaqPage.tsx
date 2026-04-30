import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';

type FaqCategory = '전체' | '제품·기술' | '견적·구매' | '시공·납기' | '유지·보증' | '공공조달';

interface FaqItem {
  category: Exclude<FaqCategory, '전체'>;
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    category: '제품·기술',
    q: '복사난방은 일반 온풍·대류식 난방과 무엇이 다른가요?',
    a: '공기를 데우는 대류식과 달리, 원적외선 복사패널은 사람·바닥·벽 등 피사체에 직접 열을 전달합니다. 바람·먼지가 일어나지 않고, 결로가 거의 없으며, 켜자마자 따뜻함이 느껴진다는 차이가 있습니다.',
  },
  {
    category: '제품·기술',
    q: '에너지 절감 폭은 어느 정도인가요?',
    a: '현장 조건과 비교 기준에 따라 차이가 있습니다. 2024년 KTR 난방성능 시험에서는 SUR-1800-D가 기존제품 대비 20℃에서 30℃ 도달시간 36분(기존 59분), 소비전력량 1,060Wh(기존 1,749Wh)로 확인되었습니다. 실제 절감 폭은 면적·천장고·단열·운전 시간 기준으로 별도 산정합니다.',
  },
  {
    category: '제품·기술',
    q: '미세먼지·결로·곰팡이에도 효과가 있나요?',
    a: '바람을 일으키지 않아 분진 비산이 없고, 표면 온도를 균일하게 유지해 결로와 곰팡이가 발생하기 어려운 환경을 만듭니다. 항균 시험 성적서(대장균·포도상구균 99.9%)와 탈취율 시험 성적서를 보유하고 있습니다.',
  },
  {
    category: '제품·기술',
    q: '방폭·방수 환경에도 적용 가능한가요?',
    a: '방폭은 EX emb II T1 인증(한국가스안전공사 KGS) 제품군을 보유하고 있어 화학공장·도장공장·위험물 취급 시설의 난방 검토에 대응할 수 있습니다. 방진·방수는 2024년 KTR 시험성적서(ECU-2024-014357) 기준 SUR-1800-D 시험대상에서 IP65 결과가 확인되었습니다.',
  },
  {
    category: '견적·구매',
    q: '견적을 받으려면 어떤 정보가 필요한가요?',
    a: '공간 면적(㎡)·천장고·용도·전원 조건(단상/3상)·운전 시간대를 알려주시면 1차 검토가 가능합니다. 평면도 또는 단순 사진이 있으면 더 정확한 예상 용량과 모델을 제시해드립니다. 견적 문의 양식 또는 이메일(master@sunraytec.net)로 보내주세요.',
  },
  {
    category: '견적·구매',
    q: '카탈로그·시방서·일위대가표는 어디에서 받을 수 있나요?',
    a: '공개 카탈로그와 일부 기술 자료는 자료실에서 바로 다운로드할 수 있습니다. 일위대가표·도면 원본·제안서 양식 등 기관 검토용 자료는 패스트트랙 라운지 또는 파트너 포털 승인 후 제공됩니다.',
  },
  {
    category: '견적·구매',
    q: '예산 범위에 맞는 모델 추천이 가능한가요?',
    a: '예산·면적·운영 시간을 함께 알려주시면 SUR 시리즈 내에서 적정 용량과 수량을 추천드립니다. 자료실의 난방 용량 계산기로 사전 추산도 가능합니다.',
  },
  {
    category: '시공·납기',
    q: '평균 납기와 시공 기간은 어느 정도인가요?',
    a: '재고 보유 모델 기준 발주 후 1~2주 이내 출하가 일반적이며, 비표준·맞춤 사양은 협의에 따라 결정됩니다. 시공은 공간 규모와 전기공사 범위에 따라 1일~수일 단위로 진행됩니다.',
  },
  {
    category: '시공·납기',
    q: '기존 설비를 그대로 두고 추가 설치할 수 있나요?',
    a: '많은 현장에서 기존 공조·온풍 설비와 병행하거나, 부분만 복사난방으로 대체하는 형태로 적용됩니다. 작업자 동선 중심·민원실 등 ‘체감 우선’ 구역만 골라 보강하는 것도 가능합니다.',
  },
  {
    category: '시공·납기',
    q: '도면·CAD 자료 제공이 가능한가요?',
    a: '제품별 시방서, 매립형/노출형 시공상세도, 일반 도면 PDF는 자료실에서 다운로드할 수 있습니다. CAD 원본이 필요한 경우 파트너 승인 후 제공됩니다.',
  },
  {
    category: '유지·보증',
    q: '제품 보증 기간은 어떻게 되나요?',
    a: '기본 보증은 출하일 기준 2년이며, 정기 점검 계약을 체결한 현장은 추가 연장이 가능합니다. 발열체·표면 코팅 등 부위별 보증 조건은 시방서에 별도 명시되어 있습니다.',
  },
  {
    category: '유지·보증',
    q: '사후 점검과 부품 교체는 어떻게 진행하나요?',
    a: '본사 기술지원팀과 지역 협력사가 출장 점검·부품 교체를 지원합니다. 정기 점검 일정과 권장 부품 수명은 인계 시 별도로 안내됩니다.',
  },
  {
    category: '유지·보증',
    q: '여름철에는 어떻게 보관·운영하나요?',
    a: '복사패널 자체는 별도 분해·보관이 필요 없으며, 주기적인 표면 청소와 전원부 점검만으로 충분합니다. 욕실·습기 환경은 IP 등급에 맞춰 점검 주기를 단축해 운영합니다.',
  },
  {
    category: '공공조달',
    q: '나라장터에서 바로 구매할 수 있나요?',
    a: '조달청 우수제품(2013·2019·2025 지정)과 MAS 다수공급자 계약 모델을 보유하고 있어 공공기관 구매 방식에 맞춰 검토할 수 있습니다. 모델별 식별번호와 단가는 나라장터 등록 정보와 견적 검토 기준으로 안내드립니다.',
  },
  {
    category: '공공조달',
    q: '혁신시제품 시범구매는 어떻게 진행하나요?',
    a: '혁신제품 관련 도입은 지정 기간과 해당 사업 공고 기준을 확인한 뒤 진행해야 합니다. 공공기관 담당자가 검토할 수 있도록 일위대가표·시방서·인증·시험성적서 자료를 패키지로 제공합니다.',
  },
  {
    category: '공공조달',
    q: '교육·국방·복지시설 적용 사례를 볼 수 있나요?',
    a: '공공·교육 솔루션, 국방·특수 솔루션 페이지에서 적용 흐름을 확인하시고, 시공사례 페이지에서 실제 현장 사진과 카테고리별 사례를 보실 수 있습니다.',
  },
];

const CATEGORIES: FaqCategory[] = ['전체', '제품·기술', '견적·구매', '시공·납기', '유지·보증', '공공조달'];

const CAT_ICON: Record<string, string> = {
  '제품·기술': '⚙️',
  '견적·구매': '💰',
  '시공·납기': '🔧',
  '유지·보증': '🛡',
  '공공조달':  '🏛',
};

const CAT_COLOR: Record<string, string> = {
  '제품·기술': '#3B82F6',
  '견적·구매': '#F59E0B',
  '시공·납기': '#10B981',
  '유지·보증': '#8B5CF6',
  '공공조달':  '#EF4444',
};

const QUICK_FACTS = [
  { icon: '💧', label: 'IP65',      desc: '방진·방수 등급', sub: 'KTR ECU-2024-014357 기준' },
  { icon: '⚡', label: '57%',       desc: '난방비 절감',    sub: '가나에너지 공장 실증 기준' },
  { icon: '🦠', label: '99.9%',     desc: '항균 성능',      sub: '대장균·포도상구균 KFIA' },
  { icon: '📅', label: '2년',       desc: '기본 보증기간',  sub: '출하일 기준 · 연장 가능' },
];

export default function FaqPage() {
  const [active, setActive] = useState<FaqCategory>('전체');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = useMemo(() => {
    if (active === '전체') return FAQS;
    return FAQS.filter((f) => f.category === active);
  }, [active]);

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SubHero
        breadcrumb={[{ label: '고객센터' }, { label: 'FAQ' }]}
        badge="FAQ"
        title="자주 묻는 질문"
        lead={"제품·견적·시공·유지관리·공공조달까지 자주 받는 질문 " + FAQS.length + "개를 카테고리별로 정리했습니다."}
      >
        {/* 빠른 확인 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0', marginTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
          className="faq-quick-grid"
        >
          {QUICK_FACTS.map((f, i) => (
            <div key={f.label} style={{
              padding: '22px 20px', textAlign: 'center',
              borderRight: i < QUICK_FACTS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{f.icon}</div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: i === 1 ? 'var(--red)' : '#fff',
                lineHeight: 1, marginBottom: '4px',
              }}>
                {f.label}
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: '2px' }}>
                {f.desc}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>
                {f.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </SubHero>

      <section style={{ padding: '40px 0 78px' }}>
        <div className="container">
          {/* Filter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, marginRight: '4px' }}>카테고리:</span>
            {CATEGORIES.map((c) => {
              const isActive = c === active;
              const color = c === '전체' ? 'var(--navy)' : (CAT_COLOR[c] || 'var(--navy)');
              const count = c === '전체' ? FAQS.length : FAQS.filter(f => f.category === c).length;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setActive(c); setOpenIdx(null); }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 999,
                    border: `2px solid ${isActive ? color : '#E5E7EB'}`,
                    background: isActive ? color : '#fff',
                    color: isActive ? '#fff' : '#64748B',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                  }}
                >
                  {c !== '전체' && CAT_ICON[c]}
                  {c}
                  <span style={{ opacity: 0.7, fontSize: '11px' }}>{count}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {filtered.map((item, idx) => {
              const isOpen = openIdx === idx;
              const catColor = CAT_COLOR[item.category] || 'var(--red)';
              const catIcon = CAT_ICON[item.category] || '❓';
              return (
                <motion.article
                  key={`${item.category}-${item.q}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  style={{
                    background: '#fff',
                    border: `1px solid ${isOpen ? catColor + '44' : '#E5E7EB'}`,
                    borderLeft: `4px solid ${isOpen ? catColor : '#E5E7EB'}`,
                    borderRadius: 12,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '18px 22px',
                      background: isOpen ? catColor + '06' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                      transition: 'background 0.2s',
                    }}
                  >
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      padding: '2px 9px',
                      background: catColor + '18',
                      color: catColor,
                      borderRadius: 999, fontSize: 10, fontWeight: 900,
                      letterSpacing: 0.3, flexShrink: 0, marginTop: 3,
                    }}>
                      {catIcon} {item.category}
                    </span>
                    <h2 style={{ flex: 1, color: 'var(--navy)', fontSize: '0.97rem', fontWeight: 700, lineHeight: 1.55 }}>
                      Q. {item.q}
                    </h2>
                    <span style={{
                      color: isOpen ? catColor : '#94A3B8',
                      fontSize: 18,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform .2s, color .2s',
                      flexShrink: 0,
                    }}>＋</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 22px 20px 22px', borderTop: `1px dashed ${catColor}33` }}>
                      <p style={{ color: '#374151', lineHeight: 1.9, marginTop: 14, fontSize: '0.92rem' }}>
                        <span style={{ color: catColor, fontWeight: 900, marginRight: 6 }}>A.</span>
                        {item.a}
                      </p>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>

          <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', padding: '12px 22px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              문의하기
            </Link>
            <Link to="/resources/heating-load-calculator" style={{ display: 'inline-flex', padding: '12px 22px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              난방 용량 계산기
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .faq-quick-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}
