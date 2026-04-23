import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Inquiry {
  id: string;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  project_type: string | null;
  space_size: string | null;
  message: string | null;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

const PROJECT_TYPE_LABEL: Record<string, string> = {
  public:     '🏛️ 공공기관 조달',
  industrial: '🏭 기업·산업시설',
  commercial: '🏠 상업·가정',
  document:   '📋 기술 자료 요청',
  general:    '💬 일반 문의',
};

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  new:     { bg: '#FEE2E2', color: '#DC2626', label: '신규' },
  read:    { bg: '#F1F5F9', color: '#64748B', label: '확인' },
  replied: { bg: '#D1FAE5', color: '#059669', label: '답변완료' },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function InquiryList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'전체' | 'new' | 'read' | 'replied'>('전체');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    if (!supabase) { setLoading(false); return; }
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setInquiries(data as Inquiry[]);
    setLoading(false);
  }

  async function updateStatus(id: string, status: Inquiry['status']) {
    if (!supabase) return;
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);
    if (!error) {
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    }
  }

  const filtered = filter === '전체' ? inquiries : inquiries.filter(i => i.status === filter);
  const newCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <div style={{ padding: '1.5rem' }}>

      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1F2937' }}>견적 문의 목록</h2>
          <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#9CA3AF' }}>
            전체 {inquiries.length}건 · 신규 {newCount}건
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          style={{
            padding: '7px 16px', borderRadius: '8px',
            border: '1px solid #E5E7EB', background: '#fff',
            fontSize: '0.82rem', color: '#374151', cursor: 'pointer',
          }}
        >
          🔄 새로고침
        </button>
      </div>

      {/* 필터 탭 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
        {(['전체', 'new', 'read', 'replied'] as const).map(f => {
          const count = f === '전체' ? inquiries.length : inquiries.filter(i => i.status === f).length;
          const label = f === '전체' ? '전체' : STATUS_STYLE[f].label;
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px', borderRadius: '999px',
                border: `1.5px solid ${active ? '#0F2241' : '#E5E7EB'}`,
                background: active ? '#0F2241' : '#fff',
                color: active ? '#fff' : '#6B7280',
                fontSize: '0.8rem', fontWeight: active ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              {label} {count > 0 && <span style={{ opacity: 0.7 }}>({count})</span>}
            </button>
          );
        })}
      </div>

      {/* 로딩 */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF' }}>불러오는 중...</div>
      )}

      {/* 빈 상태 */}
      {!loading && filtered.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px',
          background: '#F8FAFC', borderRadius: '12px',
          border: '1px dashed #E5E7EB', color: '#9CA3AF',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '8px' }}>📭</p>
          <p style={{ fontSize: '0.9rem' }}>문의가 없습니다</p>
        </div>
      )}

      {/* 문의 목록 */}
      {!loading && filtered.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(inq => {
            const st = STATUS_STYLE[inq.status] ?? STATUS_STYLE.read;
            const isOpen = expanded === inq.id;
            return (
              <div
                key={inq.id}
                style={{
                  background: '#fff',
                  border: `1px solid ${inq.status === 'new' ? '#FECACA' : '#E5E7EB'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: inq.status === 'new' ? '0 2px 8px rgba(220,38,38,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* 요약 행 */}
                <div
                  onClick={() => {
                    setExpanded(isOpen ? null : inq.id);
                    if (inq.status === 'new') updateStatus(inq.id, 'read');
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 18px', cursor: 'pointer',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* 상태 배지 */}
                  <span style={{
                    fontSize: '11px', fontWeight: 700,
                    background: st.bg, color: st.color,
                    padding: '2px 9px', borderRadius: '999px', flexShrink: 0,
                  }}>
                    {st.label}
                  </span>

                  {/* 이름·회사 */}
                  <div style={{ flex: 1, minWidth: '120px' }}>
                    <span style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.9rem' }}>{inq.name}</span>
                    {inq.company && (
                      <span style={{ color: '#6B7280', fontSize: '0.82rem', marginLeft: '6px' }}>{inq.company}</span>
                    )}
                  </div>

                  {/* 문의 유형 */}
                  <span style={{ fontSize: '0.78rem', color: '#374151', background: '#F1F5F9', padding: '3px 10px', borderRadius: '6px', flexShrink: 0 }}>
                    {PROJECT_TYPE_LABEL[inq.project_type ?? ''] ?? inq.project_type ?? '-'}
                  </span>

                  {/* 날짜 */}
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF', flexShrink: 0 }}>
                    {formatDate(inq.created_at)}
                  </span>

                  {/* 펼침 화살표 */}
                  <span style={{ color: '#9CA3AF', fontSize: '0.8rem', flexShrink: 0 }}>
                    {isOpen ? '▲' : '▼'}
                  </span>
                </div>

                {/* 상세 내용 */}
                {isOpen && (
                  <div style={{
                    borderTop: '1px solid #F1F5F9',
                    padding: '18px 20px',
                    background: '#FAFAFA',
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px',
                  }}>
                    {/* 연락처 */}
                    <div>
                      <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', fontWeight: 600 }}>연락처</p>
                      <p style={{ fontSize: '0.875rem', color: '#1F2937' }}>{inq.phone ?? '-'}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', fontWeight: 600 }}>이메일</p>
                      <p style={{ fontSize: '0.875rem', color: '#1F2937' }}>{inq.email ?? '-'}</p>
                    </div>

                    {/* 면적 */}
                    {inq.space_size && (
                      <div>
                        <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', fontWeight: 600 }}>면적</p>
                        <p style={{ fontSize: '0.875rem', color: '#1F2937' }}>{inq.space_size}</p>
                      </div>
                    )}

                    {/* 메시지 */}
                    {inq.message && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px', fontWeight: 600 }}>문의 내용</p>
                        <p style={{
                          fontSize: '0.875rem', color: '#374151', lineHeight: 1.6,
                          background: '#fff', border: '1px solid #E5E7EB',
                          borderRadius: '8px', padding: '10px 14px',
                          whiteSpace: 'pre-line',
                        }}>
                          {inq.message}
                        </p>
                      </div>
                    )}

                    {/* 상태 변경 버튼 */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '8px', marginTop: '4px' }}>
                      {(['new', 'read', 'replied'] as const).map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(inq.id, s)}
                          style={{
                            padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600,
                            border: `1.5px solid ${inq.status === s ? STATUS_STYLE[s].color : '#E5E7EB'}`,
                            background: inq.status === s ? STATUS_STYLE[s].bg : '#fff',
                            color: inq.status === s ? STATUS_STYLE[s].color : '#9CA3AF',
                            cursor: 'pointer',
                          }}
                        >
                          {STATUS_STYLE[s].label}
                        </button>
                      ))}
                      <a
                        href={`mailto:${inq.email ?? ''}?subject=썬레이텍 견적 문의 답변`}
                        style={{
                          marginLeft: 'auto', padding: '6px 16px', borderRadius: '8px',
                          background: '#0F2241', color: '#fff',
                          fontSize: '0.78rem', fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        ✉️ 이메일 답변
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
