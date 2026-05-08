import { Link } from 'react-router-dom';
import { ShieldCheck, Flame, Wind, Droplets, Sparkles, Ruler, Zap, Award } from 'lucide-react';
import SubHero from '../../components/layout/SubHero';
import ScrollReveal from '../../components/ui/ScrollReveal';
import PageSEO from '../../components/seo/PageSEO';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import { motion } from 'motion/react';

const SPECS = [
  { model: 'SUR-1200', size: '174 × 1,750 × 77', power: '1.2 kW',  voltage: '220 V',          current: '5.5 A',  heat: '1,032 ㎉', weight: '7.5 kg', area: '6.6 ~ 9.9 ㎡' },
  { model: 'SUR-1800', size: '274 × 1,450 × 77', power: '2.4 kW',  voltage: '220 V',          current: '10.9 A', heat: '2,064 ㎉', weight: '12 kg',  area: '13.2 ~ 19.8 ㎡' },
  { model: 'SUR-3600', size: '374 × 1,750 × 77', power: '3.6 kW',  voltage: '220 V (380 V)', current: '16.3 A', heat: '3,096 ㎉', weight: '17 kg',  area: '29.7 ~ 49.5 ㎡' },
];

const PERFORMANCE = [
  { icon: Sparkles, label: '원적외선 분광방사율', value: '91% 이상',     note: '6 ~ 14 μm 파장범위 / 중심파장 9.4 μm' },
  { icon: Flame,    label: '복사패널 전면 온도',  value: '300 ~ 400 ℃', note: '실내온도 18℃ · 220V 공급조건 ±5%' },
  { icon: ShieldCheck, label: '복사패널 후면 온도', value: '90 ℃ 이내',  note: '천장 부착 환경에서도 안전 운용' },
  { icon: Ruler,    label: '발열량 오차범위',     value: '± 3% 이내',    note: '모델별 정격 발열량 대비' },
];

const SAFETY_FEATURES = [
  { icon: Flame,    title: '화재·폭발·화상 위험 ZERO화', desc: '비화염 전기식 발열 + 한국가스안전공사 방폭 인증으로 위험물·인화성 시설 설치 가능.' },
  { icon: Droplets, title: '결로 방지',                   desc: '피사체에 직접 복사열 도달. 공기 가열 방식의 결로·습기 문제 없음.' },
  { icon: Wind,     title: '모터·바람·소음·진동·먼지 無', desc: '대류식이 아닌 복사식 가열. 분진이 떠다니지 않아 정밀 시설에도 적합.' },
  { icon: ShieldCheck, title: '항균·탈취 인증',           desc: '대장균·포도상구균 99.9% / 암모니아 가스 88.8% 감소 (공인기관 시험성적).' },
];

export default function SpecialProductsPage() {
  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <PageSEO
        title="방폭·특수 제품 - 한국가스안전공사 Ex e mb Ⅱ T1 인증"
        description="썬레이텍 방폭 복사난방패널. 한국가스안전공사(KGS) Ex e mb Ⅱ T1 인증. SUR-1200/1800/3600 3종. 위험물·화학·도장·LNG 시설 등 방폭 검토가 필요한 현장용 제품."
        keywords={['방폭 난방', '방폭인증', 'Ex e mb II T1', '한국가스안전공사', 'KGS 방폭', '위험물 시설 난방', 'LNG 난방', '도장공장 난방', '복사난방 패널']}
        canonical="/products/special"
      />

      <SubHero
        breadcrumb={[{ label: '제품안내', to: '/products' }, { label: '방폭·특수 제품' }]}
        badge="Explosion-Proof Certified"
        title="방폭·특수 제품"
        lead="화재·폭발 위험 시설에 안전하게 설치 가능한 비화염 전기식 복사난방패널. 한국가스안전공사(KGS) Ex e mb Ⅱ T1 방폭 인증을 보유한 SUR-1200·1800·3600 3종 라인업입니다."
        keywords={['Ex e mb Ⅱ T1', '한국가스안전공사 KGS', '비화염 전기식', '위험물·화학·도장', 'LNG 하역부두 실증']}
      />

      {/* ── 인증 요약 카드 ───────────────────────────────────────── */}
      <section style={{ padding: '56px 0 24px' }}>
        <div className="container">
          <ScrollReveal variants={staggerContainer}>
            <motion.div
              variants={staggerContainer}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
              }}
            >
              {[
                { label: '인증 형식',   value: 'Ex e mb Ⅱ T1' },
                { label: '인증 기관',   value: '한국가스안전공사 (KGS)' },
                { label: '인증 대상',   value: 'SUR-1200 / 1800 / 3600' },
                { label: '최초 인증일', value: '2012-08-02' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  style={{
                    background: '#fff',
                    borderRadius: 14,
                    border: '1px solid #E5E7EB',
                    padding: '20px 22px',
                    boxShadow: '0 8px 22px rgba(15,34,65,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Award size={16} color="var(--red)" />
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--red)', letterSpacing: '0.04em' }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)' }}>{item.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 모델 사양표 ───────────────────────────────────────── */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 900, color: 'var(--navy)', marginBottom: 8 }}>
              방폭 인증 모델 라인업
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.7 }}>
              방폭 환경에서 안전하게 운용 가능한 3종 라인업입니다. 공간 면적과 전원 조건에 따라 선택할 수 있도록 표준화되어 있습니다.
            </p>
          </ScrollReveal>

          <ScrollReveal variants={fadeInUp}>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E5E7EB', boxShadow: '0 12px 30px rgba(15,34,65,0.07)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                  <thead>
                    <tr style={{ background: 'var(--navy)', color: '#fff' }}>
                      {['모델', '크기 (W × L × T, mm)', '전력', '전압', '전류', '발열량', '중량', '난방면적'].map((h) => (
                        <th key={h} style={{ padding: '14px 12px', fontSize: 13, fontWeight: 700, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SPECS.map((row, idx) => (
                      <tr key={row.model} style={{ background: idx % 2 ? '#F8FAFC' : '#fff' }}>
                        <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{row.model}</td>
                        <td style={{ padding: '14px 12px', color: '#334155', whiteSpace: 'nowrap' }}>{row.size}</td>
                        <td style={{ padding: '14px 12px', color: '#334155', whiteSpace: 'nowrap' }}>{row.power}</td>
                        <td style={{ padding: '14px 12px', color: '#334155', whiteSpace: 'nowrap' }}>{row.voltage}</td>
                        <td style={{ padding: '14px 12px', color: '#334155', whiteSpace: 'nowrap' }}>{row.current}</td>
                        <td style={{ padding: '14px 12px', color: '#334155', whiteSpace: 'nowrap' }}>{row.heat}</td>
                        <td style={{ padding: '14px 12px', color: '#334155', whiteSpace: 'nowrap' }}>{row.weight}</td>
                        <td style={{ padding: '14px 12px', color: '#334155', whiteSpace: 'nowrap' }}>{row.area}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: '14px 18px', fontSize: 12, color: '#64748B', borderTop: '1px solid #E5E7EB', background: '#FAFBFD' }}>
                ※ 발열량 오차범위 ±3% 이내 / 분광방사율 91% 이상 / 파장범위 6~14 μm / 중심파장 9.4 μm
              </div>
            </div>
          </ScrollReveal>

          {/* 제품 외관 사진 */}
          <ScrollReveal variants={fadeInUp} style={{ marginTop: 24 }}>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <img
                src="/images/special/product-exterior.jpg"
                alt="방폭형 복사난방패널 외관"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 성능 기준 ───────────────────────────────────────── */}
      <section style={{ padding: '40px 0', background: '#fff', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 900, color: 'var(--navy)', marginBottom: 8 }}>
              성능 기준
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.7 }}>
              실내온도 18℃, 220V 공급조건에서 측정된 표준 운용 기준입니다.
            </p>
          </ScrollReveal>

          <ScrollReveal variants={staggerContainer}>
            <motion.div
              variants={staggerContainer}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 14,
              }}
            >
              {PERFORMANCE.map((p) => (
                <motion.div
                  key={p.label}
                  variants={staggerItem}
                  style={{
                    background: '#F8FAFC',
                    borderRadius: 12,
                    border: '1px solid #E5E7EB',
                    padding: 20,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ display: 'inline-flex', width: 32, height: 32, borderRadius: 8, background: 'var(--navy)', alignItems: 'center', justifyContent: 'center' }}>
                      <p.icon size={16} color="#fff" />
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray)' }}>{p.label}</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--navy)', marginBottom: 6 }}>{p.value}</div>
                  <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, margin: 0 }}>{p.note}</p>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 안전 특징 ───────────────────────────────────────── */}
      <section style={{ padding: '56px 0' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 900, color: 'var(--navy)', marginBottom: 8 }}>
              방폭 환경에서의 안전 특징
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.7 }}>
              일반 난방기는 화염·과열·전자파·먼지 등 위험 요인 때문에 방폭 시설에 설치할 수 없습니다. 썬레이텍 방폭 패널은 5가지 위험 요인을 원천 제거합니다.
            </p>
          </ScrollReveal>

          <ScrollReveal variants={staggerContainer}>
            <motion.div
              variants={staggerContainer}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 14,
              }}
            >
              {SAFETY_FEATURES.map((f) => (
                <motion.article
                  key={f.title}
                  variants={staggerItem}
                  style={{
                    background: '#fff',
                    borderRadius: 14,
                    border: '1px solid #E5E7EB',
                    padding: 22,
                    boxShadow: '0 8px 24px rgba(15,34,65,0.05)',
                  }}
                >
                  <span style={{ display: 'inline-flex', width: 40, height: 40, borderRadius: 10, background: 'rgba(220,38,38,0.08)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <f.icon size={20} color="var(--red)" />
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: '#64748B', lineHeight: 1.7, margin: 0, fontSize: 14 }}>{f.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 설치 사례 ───────────────────────────────────────── */}
      <section style={{ padding: '40px 0', background: 'var(--navy)', color: '#fff' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, alignItems: 'center' }}>
              <div>
                <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', marginBottom: 16 }}>
                  INSTALLATION CASE
                </span>
                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, marginBottom: 14, lineHeight: 1.3 }}>
                  보령 LNG 하역부두 관제실
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, marginBottom: 18 }}>
                  LNG 하역부두 관제실은 인화성 가스 누출 가능성이 있어 일반 난방기 설치가 제한됩니다. 방폭 인증 복사난방패널을 천장에 직접 설치해, 공기 가열 방식 없이 작업자 위치를 직접 데우는 안전 난방을 구축한 사례입니다.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8, color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
                  <li>· 인화성 가스 노출 가능 시설 — 비화염 전기식 발열로 안전</li>
                  <li>· 천장 직착식 설치 — 작업 공간을 침범하지 않음</li>
                  <li>· 결로·습기 문제 해결 — 복사열 직접 전달 방식</li>
                </ul>
              </div>
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
                <img
                  src="/images/special/case-boryeong-lng.jpg"
                  alt="보령 LNG 하역부두 관제실 방폭 복사난방패널 설치 사진"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 인증서 ───────────────────────────────────────── */}
      <section style={{ padding: '56px 0' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 900, color: 'var(--navy)', marginBottom: 8 }}>
              한국가스안전공사 방폭 인증서
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.7 }}>
              한국가스안전공사(KGS)에서 발급한 안전인증 확인 통지서 및 안전인증대상 기계·기구 현황입니다.
            </p>
          </ScrollReveal>

          <ScrollReveal variants={staggerContainer}>
            <motion.div
              variants={staggerContainer}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 18,
              }}
            >
              {[
                { src: '/images/special/cert-kgs-01.jpg', label: '안전인증 확인 통지서' },
                { src: '/images/special/cert-kgs-02.jpg', label: '안전인증대상 기계·기구 현황' },
              ].map((doc) => (
                <motion.a
                  key={doc.label}
                  variants={staggerItem}
                  href={doc.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: '#fff',
                    borderRadius: 14,
                    border: '1px solid #E5E7EB',
                    overflow: 'hidden',
                    boxShadow: '0 12px 30px rgba(15,34,65,0.08)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div style={{ background: '#F8FAFC', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={doc.src}
                      alt={doc.label}
                      style={{ width: '100%', maxHeight: 480, objectFit: 'contain', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '14px 18px', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{doc.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--red)', fontWeight: 700 }}>원본 보기 →</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp}>
            <div style={{
              background: 'linear-gradient(135deg, var(--navy) 0%, #152035 100%)',
              borderRadius: 16,
              padding: '32px 28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 18,
              alignItems: 'center',
              color: '#fff',
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: 'var(--red)', letterSpacing: '0.06em', marginBottom: 10 }}>
                  <Zap size={14} /> SPECIAL ENVIRONMENT
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: 8 }}>현장 방폭 조건이 검토 대상이라면</h3>
                <p style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, margin: 0 }}>
                  공간 규모, 천장고, 위험물 등급, 전원 조건만 알려주시면 적합 모델과 설치 방식을 제안드립니다.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '13px 24px', background: 'var(--red)', color: '#fff',
                  borderRadius: 10, fontWeight: 800, textDecoration: 'none',
                }}>
                  현장 조건 상담하기
                </Link>
                <a href="tel:16882520" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '13px 24px', background: 'rgba(255,255,255,0.1)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, fontWeight: 700, textDecoration: 'none',
                }}>
                  📞 1688-2520
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
