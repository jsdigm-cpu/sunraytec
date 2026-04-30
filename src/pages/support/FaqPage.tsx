import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';
import { supabase } from '../../lib/supabase';
import type { Faq } from '../../types/faq';
import { FAQ_CATEGORIES, FAQ_CAT_COLOR, FAQ_CAT_ICON } from '../../types/faq';

type FilterCategory = '전체' | typeof FAQ_CATEGORIES[number];

const QUICK_FACTS = [
  { icon: '💧', label: 'IP65',  desc: '방진·방수 등급',  sub: 'KTR ECU-2024-014357 기준' },
  { icon: '⚡', label: '57%',   desc: '난방비 절감',     sub: '가나에너지 공장 실증 기준' },
  { icon: '🦠', label: '99.9%', desc: '항균 성능',       sub: '대장균·포도상구균 KFIA' },
  { icon: '📅', label: '2년',   desc: '기본 보증기간',   sub: '출하일 기준 · 연장 가능' },
];

const STATIC_FAQS: Faq[] = [
  { id: 's1', category: '제품·기술', question: '복사난방은 일반 온풍·대류식 난방과 무엇이 다른가요?', answer: '공기를 데우는 대류식과 달리, 원적외선 복사패널은 사람·바닥·벽 등 피사체에 직접 열을 전달합니다. 바람·먼지가 일어나지 않고, 결로가 거의 없으며, 켜자마자 따뜻함이 느껴진다는 차이가 있습니다.', sort_order: 1, published: true, created_at: '', updated_at: '' },
  { id: 's2', category: '제품·기술', question: '에너지 절감 폭은 어느 정도인가요?', answer: '2024년 KTR 난방성능 시험에서는 SUR-1800-D가 기존제품 대비 20℃에서 30℃ 도달시간 36분(기존 59분), 소비전력량 1,060Wh(기존 1,749Wh)로 확인되었습니다.', sort_order: 2, published: true, created_at: '', updated_at: '' },
  { id: 's3', category: '견적·구매', question: '견적을 받으려면 어떤 정보가 필요한가요?', answer: '공간 면적(㎡)·천장고·용도·전원 조건·운전 시간대를 알려주시면 1차 검토가 가능합니다.', sort_order: 3, published: true, created_at: '', updated_at: '' },
  { id: 's4', category: '공공조달', question: '나라장터에서 바로 구매할 수 있나요?', answer: '조달청 우수제품(2013·2019·2025 지정)과 MAS 다수공급자 계약 모델을 보유하고 있습니다.', sort_order: 4, published: true, created_at: '', updated_at: '' },
];

const ALL_CATEGORIES: FilterCategory[] = ['전체', ...FAQ_CATEGORIES];

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>(STATIC_FAQS);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<FilterCategory>('전체');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('faqs')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) setFaqs(data as Faq[]);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() =>
    active === '전체' ? faqs : faqs.filter(f => f.category === active),
  [faqs, active]);

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SubHero
        breadcrumb={[{ label: '고객센터' }, { label: 'FAQ' }]}
        badge="FAQ"
        title="자주 묻는 질문"
        lead={`제품·견적·시공·유지관리·공공조달까지 자주 받는 질문 ${faqs.length}개를 카테고리별로 정리했습니다.`}
        keywords={['제품·기술', '견적·구매', '시공·납기', '유지·보증', '공공조달']}
      />

      {/* 빠른 확인 수치 바 */}
      <section style={{ background: '#0D1B2E', padding: 0 }}>
        <div className="container">
          <div className="faq-quick-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {QUICK_FACTS.map((f, i) => (
              <div key={f.label} style={{ padding: '22px 20px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: i === 1 ? 'var(--red)' : '#fff', lineHeight: 1, marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: 2 }}>{f.desc}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 78px' }}>
        <div className="container">
          {/* 카테고리 필터 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600, marginRight: 4 }}>카테고리:</span>
            {ALL_CATEGORIES.map(c => {
              const isActive = c === active;
              const color = c === '전체' ? 'var(--navy)' : (FAQ_CAT_COLOR[c as typeof FAQ_CATEGORIES[number]] || 'var(--navy)');
              const count = c === '전체' ? faqs.length : faqs.filter(f => f.category === c).length;
              return (
                <button key={c} onClick={() => { setActive(c); setOpenId(null); }}
                  style={{ padding: '6px 14px', borderRadius: 999, border: `2px solid ${isActive ? color : '#E5E7EB'}`, background: isActive ? color : '#fff', color: isActive ? '#fff' : '#64748B', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {c !== '전체' && FAQ_CAT_ICON[c as typeof FAQ_CATEGORIES[number]]}
                  {c}
                  <span style={{ opacity: 0.7, fontSize: 11 }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ 아코디언 */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>불러오는 중…</div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {filtered.map(item => {
                const isOpen = openId === item.id;
                const catColor = FAQ_CAT_COLOR[item.category] || 'var(--red)';
                const catIcon = FAQ_CAT_ICON[item.category] || '❓';
                return (
                  <motion.article key={item.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
                    style={{ background: '#fff', border: `1px solid ${isOpen ? catColor + '44' : '#E5E7EB'}`, borderLeft: `4px solid ${isOpen ? catColor : '#E5E7EB'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}
                  >
                    <button onClick={() => setOpenId(isOpen ? null : item.id)}
                      style={{ width: '100%', textAlign: 'left', padding: '18px 22px', background: isOpen ? catColor + '06' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'flex-start', transition: 'background 0.2s' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px', background: catColor + '18', color: catColor, borderRadius: 999, fontSize: 10, fontWeight: 900, letterSpacing: 0.3, flexShrink: 0, marginTop: 3 }}>
                        {catIcon} {item.category}
                      </span>
                      <h2 style={{ flex: 1, color: 'var(--navy)', fontSize: '0.97rem', fontWeight: 700, lineHeight: 1.55 }}>
                        Q. {item.question}
                      </h2>
                      <span style={{ color: isOpen ? catColor : '#94A3B8', fontSize: 18, transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .2s, color .2s', flexShrink: 0 }}>＋</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 22px 20px', borderTop: `1px dashed ${catColor}33` }}>
                        <p style={{ color: '#374151', lineHeight: 1.9, marginTop: 14, fontSize: '0.92rem' }}>
                          <span style={{ color: catColor, fontWeight: 900, marginRight: 6 }}>A.</span>
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', padding: '12px 22px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>문의하기</Link>
            <Link to="/resources/heating-load-calculator" style={{ display: 'inline-flex', padding: '12px 22px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>난방 용량 계산기</Link>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 640px) { .faq-quick-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </main>
  );
}
