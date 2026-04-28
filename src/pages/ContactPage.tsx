import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Phone, Mail, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

type InquiryType = 'public' | 'industrial' | 'commercial' | 'document' | null;

interface FormState {
  orgName: string;
  contactName: string;
  phone: string;
  email: string;
  spaceType: string;
  area: string;
  ceilingHeight: string;
  desiredDate: string;
  details: string;
  agreePrivacy: boolean;
}

const inquiryTypes = [
  { id: 'public' as InquiryType,     icon: '🏛️', title: '공공기관 조달',  desc: '나라장터 우수제품·MAS 견적' },
  { id: 'industrial' as InquiryType, icon: '🏭', title: '기업·산업시설',  desc: '공장·물류센터·특수시설' },
  { id: 'commercial' as InquiryType, icon: '🏠', title: '상업·가정',       desc: '사무실·매장·가정집' },
  { id: 'document' as InquiryType,   icon: '📋', title: '기술 자료 요청', desc: '카탈로그·도면·시방서' },
];

const spaceTypeOptions = ['학교·공공기관', '공장·창고·물류', '사무실', '가정·상가', '특수시설', '기타'];

const formTitleMap: Record<string, string> = {
  public:     '공공기관 조달 견적 문의',
  industrial: '기업·산업시설 견적 문의',
  commercial: '상업·가정 견적 문의',
  document:   '기술 자료 요청',
};

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const inputCls =
  'w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B]';

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState<InquiryType>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    orgName: '', contactName: '', phone: '', email: '',
    spaceType: '', area: '', ceilingHeight: '', desiredDate: '',
    details: '', agreePrivacy: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const canSubmit = !!(form.orgName && form.contactName && form.phone && form.email && form.agreePrivacy) && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError(null);

    // 세부 내용을 message 필드에 통합
    const messageParts: string[] = [];
    if (form.spaceType)     messageParts.push(`설치 공간: ${form.spaceType}`);
    if (form.area)          messageParts.push(`면적: ${form.area}㎡`);
    if (form.ceilingHeight) messageParts.push(`천장 높이: ${form.ceilingHeight}m`);
    if (form.desiredDate)   messageParts.push(`희망 납기일: ${form.desiredDate}`);
    if (form.details)       messageParts.push(`\n상세 문의:\n${form.details}`);

    const payload = {
      name:         form.contactName,
      company:      form.orgName,
      phone:        form.phone,
      email:        form.email,
      project_type: selectedType ?? 'general',
      space_size:   form.area ? `${form.area}㎡` : null,
      message:      messageParts.join('\n') || null,
      status:       'new',
    };

    if (supabase) {
      const { error } = await supabase.from('inquiries').insert(payload);
      if (error) {
        console.error('Supabase insert error:', error);
        setSubmitError('전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.');
        setIsSubmitting(false);
        return;
      }
    } else {
      // Supabase 미연결 시에도 UI는 성공 처리 (로컬 개발 환경 등)
      console.warn('Supabase not connected. Inquiry not saved to DB.');
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const formTitle = selectedType ? formTitleMap[selectedType] : '견적 문의';

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>

      {/* ① Sub-Hero */}
      <section style={{
        background: 'linear-gradient(160deg, var(--navy) 0%, #152035 60%, #0E1E3A 100%)',
        padding: '56px 0 64px',
      }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '20px' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>홈</Link>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>고객센터</span>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>견적 문의</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              견적 문의
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)' }}>
              전문가가 직접 상담해 드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* ② 문의 유형 선택 */}
      <section style={{ background: '#F1F5F9', padding: '56px 0' }}>
        <div className="container">
          <motion.p
            style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', marginBottom: '24px' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            문의 유형을 선택해 주세요
          </motion.p>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
            className="inquiry-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
          >
            {inquiryTypes.map(item => (
              <motion.button
                key={item.id}
                variants={cardVariant}
                onClick={() => setSelectedType(item.id)}
                style={{
                  borderRadius: '16px',
                  border: `2px solid ${selectedType === item.id ? '#C0392B' : '#E5E7EB'}`,
                  background: '#fff',
                  padding: '24px 20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: selectedType === item.id ? '0 4px 20px rgba(192,57,43,0.15)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
                <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.9rem', marginBottom: '4px' }}>{item.title}</p>
                <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>{item.desc}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ③ 폼 or ④ 완료 */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>

            {/* 메인 영역 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {submitted ? (
                /* ④ 전송 완료 */
                <motion.div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '80px 0' }}
                  initial="hidden" animate="visible" variants={fadeInUp}
                >
                  <CheckCircle style={{ width: 72, height: 72, color: '#22C55E', marginBottom: '24px' }} />
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1F2937', marginBottom: '12px' }}>
                    문의가 접수되었습니다!
                  </h2>
                  <p style={{ color: '#6B7280', marginBottom: '40px' }}>
                    담당자가 1~2 영업일 내 연락드리겠습니다
                  </p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/" className="btn btn-outline" style={{ minWidth: '160px', textAlign: 'center' }}>
                      메인으로 돌아가기
                    </Link>
                    <Link to="/products" className="btn btn-primary" style={{ minWidth: '160px', textAlign: 'center' }}>
                      제품 보러가기
                    </Link>
                  </div>
                </motion.div>
              ) : (
                /* ③ 문의 폼 */
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1F2937', marginBottom: '32px' }}>
                    {formTitle}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    {/* 2열 그리드 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      {/* 좌측 */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                            기관명 / 회사명 <span style={{ color: '#C0392B' }}>*</span>
                          </label>
                          <input type="text" name="orgName" value={form.orgName} onChange={handleChange} required className={inputCls} placeholder="예: (주)썬레이텍" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                            담당자 이름 <span style={{ color: '#C0392B' }}>*</span>
                          </label>
                          <input type="text" name="contactName" value={form.contactName} onChange={handleChange} required className={inputCls} placeholder="홍길동" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                            연락처 <span style={{ color: '#C0392B' }}>*</span>
                          </label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputCls} placeholder="010-0000-0000" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                            이메일 <span style={{ color: '#C0392B' }}>*</span>
                          </label>
                          <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputCls} placeholder="example@email.com" />
                        </div>
                      </div>
                      {/* 우측 */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                            설치 공간 종류
                          </label>
                          <select name="spaceType" value={form.spaceType} onChange={handleChange} className={inputCls} style={{ background: '#fff' }}>
                            <option value="">선택해 주세요</option>
                            {spaceTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                            면적 (㎡)
                          </label>
                          <input type="number" name="area" value={form.area} onChange={handleChange} min={0} className={inputCls} placeholder="예: 200" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                            천장 높이 (m) <span style={{ color: '#9CA3AF', fontWeight: 400 }}>선택</span>
                          </label>
                          <input type="number" name="ceilingHeight" value={form.ceilingHeight} onChange={handleChange} min={0} step={0.1} className={inputCls} placeholder="예: 3.5" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                            희망 납기일 <span style={{ color: '#9CA3AF', fontWeight: 400 }}>선택</span>
                          </label>
                          <input type="date" name="desiredDate" value={form.desiredDate} onChange={handleChange} className={inputCls} />
                        </div>
                      </div>
                    </div>

                    {/* 세부 문의사항 */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                        세부 문의사항
                      </label>
                      <textarea
                        name="details" value={form.details} onChange={handleChange} rows={5}
                        className={inputCls} style={{ resize: 'none' }}
                        placeholder="설치 환경, 요청 사항, 기타 궁금한 점을 자유롭게 적어주세요. 더 정확한 견적을 드릴 수 있습니다."
                      />
                    </div>

                    {/* 개인정보 동의 */}
                    <div style={{ marginBottom: '28px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input type="checkbox" name="agreePrivacy" checked={form.agreePrivacy} onChange={handleChange} style={{ width: '16px', height: '16px', accentColor: '#C0392B' }} />
                        <span style={{ fontSize: '0.875rem', color: '#4B5563' }}>개인정보 수집·이용에 동의합니다</span>
                      </label>
                    </div>

                    {/* 에러 메시지 */}
                    {submitError && (
                      <div style={{
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                        background: '#FEF2F2', border: '1px solid #FECACA',
                        borderRadius: '10px', padding: '14px 16px', marginBottom: '16px',
                      }}>
                        <AlertCircle style={{ width: 18, height: 18, color: '#DC2626', flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontSize: '0.875rem', color: '#DC2626' }}>{submitError}</p>
                      </div>
                    )}

                    {/* 전송 버튼 */}
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      style={{
                        width: '100%', padding: '16px', borderRadius: '12px',
                        background: canSubmit ? '#C0392B' : '#D1D5DB',
                        color: '#fff', fontWeight: 700, fontSize: '1rem',
                        border: 'none', cursor: canSubmit ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      }}
                      onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLButtonElement).style.background = '#9B2C1F'; }}
                      onMouseLeave={e => { if (canSubmit) (e.currentTarget as HTMLButtonElement).style.background = '#C0392B'; }}
                    >
                      {isSubmitting
                        ? <><Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> 전송 중...</>
                        : '📋 견적 문의 전송하기'
                      }
                    </button>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                  </form>
                </motion.div>
              )}
            </div>

            {/* ⑤ 사이드 연락처 */}
            <aside style={{ width: '280px', flexShrink: 0 }}>
              <motion.div
                style={{
                  background: 'var(--navy)', color: '#fff',
                  borderRadius: '20px', padding: '32px',
                  position: 'sticky', top: '100px',
                }}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                  직접 문의하기
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <Phone style={{ width: 18, height: 18, color: '#93C5FD', marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '0.72rem', color: '#93C5FD', marginBottom: '2px' }}>전화</p>
                      <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>1688-2520</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <Mail style={{ width: 18, height: 18, color: '#93C5FD', marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '0.72rem', color: '#93C5FD', marginBottom: '2px' }}>이메일</p>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', wordBreak: 'break-all' }}>master@sunraytec.net</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <Clock style={{ width: 18, height: 18, color: '#93C5FD', marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '0.72rem', color: '#93C5FD', marginBottom: '2px' }}>영업시간</p>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>평일 09:00 ~ 18:00</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </aside>

          </div>
        </div>
      </section>

      {/* 모바일 그리드 반응형 */}
      <style>{`
        @media (max-width: 768px) {
          .inquiry-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}
