import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface CaseItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image_url: string;
  images: string[];
  summary: string;
  description: string;
  installed_at: string;
}

const CATEGORIES = [
  '교육 및 공공 복지',
  '국방 및 특수 시설',
  '산업 및 물류 거점',
  '스마트 시티 솔루션',
  '주거 및 라이프 스타일',
  '상업 및 서비스 공간',
];

const inputStyle = {
  width: '100%',
  border: '1px solid #D1D5DB',
  borderRadius: '6px',
  padding: '8px 10px',
  fontSize: '0.875rem',
  color: '#1F2937',
  background: '#fff',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 700,
  color: '#6B7280',
  marginBottom: '4px',
  marginTop: '14px',
};

export default function CaseEditor() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [selected, setSelected] = useState<CaseItem | null>(null);
  const [form, setForm] = useState<Partial<CaseItem>>({});
  const [newImageUrl, setNewImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('case_studies')
      .select('id,title,category,location,image_url,images,summary,description,installed_at')
      .order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setCases(data as CaseItem[]); });
  }, []);

  function selectCase(item: CaseItem) {
    setSelected(item);
    setForm({
      title: item.title,
      category: item.category,
      location: item.location,
      summary: item.summary ?? '',
      description: item.description ?? '',
      installed_at: item.installed_at ?? '',
      images: item.images ?? [],
    });
    setNewImageUrl('');
    setSavedMsg('');
  }

  function addImage() {
    const url = newImageUrl.trim();
    if (!url) return;
    setForm((f) => ({ ...f, images: [...(f.images ?? []), url] }));
    setNewImageUrl('');
  }

  function removeImage(idx: number) {
    setForm((f) => ({ ...f, images: (f.images ?? []).filter((_, i) => i !== idx) }));
  }

  async function save() {
    if (!supabase || !selected) return;
    setSaving(true);
    const payload = {
      title: form.title,
      category: form.category,
      location: form.location,
      summary: form.summary,
      description: form.description,
      installed_at: form.installed_at || null,
      images: form.images ?? [],
    };
    const { error } = await supabase.from('case_studies').update(payload).eq('id', selected.id);
    setSaving(false);
    if (error) {
      setSavedMsg('❌ 저장 실패: ' + error.message);
    } else {
      setSavedMsg('✅ 저장됐습니다!');
      setCases((prev) => prev.map((c) => c.id === selected.id ? { ...c, ...payload } as CaseItem : c));
      setSelected((s) => s ? { ...s, ...payload } as CaseItem : s);
      setTimeout(() => setSavedMsg(''), 3000);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '16px', height: '100%' }}>

      {/* 좌측: 사례 목록 */}
      <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E7EB', fontWeight: 700, fontSize: '0.875rem', color: '#374151', background: '#F9FAFB' }}>
          시공사례 목록 ({cases.length}건)
        </div>
        <div style={{ overflowY: 'auto', maxHeight: '70vh' }}>
          {cases.map((item) => (
            <button
              key={item.id}
              onClick={() => selectCase(item)}
              style={{
                width: '100%', textAlign: 'left', padding: '10px 14px',
                border: 'none', borderBottom: '1px solid #F3F4F6',
                background: selected?.id === item.id ? '#EFF6FF' : '#fff',
                cursor: 'pointer',
                borderLeft: selected?.id === item.id ? '3px solid var(--navy)' : '3px solid transparent',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#1F2937', marginBottom: '3px' }}>{item.title}</div>
              <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{item.category}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 우측: 편집 폼 */}
      <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', background: '#fff', overflow: 'hidden' }}>
        {!selected ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9CA3AF', fontSize: '0.875rem' }}>
            ← 좌측 목록에서 사례를 선택하세요
          </div>
        ) : (
          <div style={{ overflowY: 'auto', maxHeight: '75vh' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', fontWeight: 700, fontSize: '0.9rem', color: '#374151', background: '#F9FAFB' }}>
              ✏️ {selected.title} 편집
            </div>
            <div style={{ padding: '16px 20px' }}>

              <label style={labelStyle}>제목</label>
              <input style={inputStyle} value={form.title ?? ''} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />

              <label style={labelStyle}>카테고리</label>
              <select style={inputStyle} value={form.category ?? ''} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              <label style={labelStyle}>위치</label>
              <input style={inputStyle} value={form.location ?? ''} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />

              <label style={labelStyle}>시공 시기 (YYYY-MM-DD)</label>
              <input style={inputStyle} type="date" value={form.installed_at ?? ''} onChange={(e) => setForm((f) => ({ ...f, installed_at: e.target.value }))} />

              <label style={labelStyle}>한줄 요약 (목록 카드에 표시)</label>
              <input style={inputStyle} value={form.summary ?? ''} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} />

              <label style={labelStyle}>상세 설명 (상세 페이지 본문)</label>
              <textarea
                style={{ ...inputStyle, minHeight: '140px', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }}
                value={form.description ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="시공 내용, 사용 제품, 설치 환경, 효과 등을 자유롭게 입력하세요."
              />

              {/* 추가 사진 URL */}
              <label style={labelStyle}>추가 사진 URL 목록</label>
              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                {(form.images ?? []).length === 0 && (
                  <p style={{ fontSize: '0.78rem', color: '#9CA3AF', margin: 0 }}>추가된 사진이 없습니다. (대표 사진은 기본 포함)</p>
                )}
                {(form.images ?? []).map((url, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <img src={url} alt="" style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E5E7EB', flexShrink: 0 }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }} />
                    <span style={{ flex: 1, fontSize: '0.75rem', color: '#6B7280', wordBreak: 'break-all' }}>{url}</span>
                    <button onClick={() => removeImage(i)} style={{ flexShrink: 0, background: '#FEE2E2', border: 'none', color: '#EF4444', borderRadius: '4px', padding: '3px 8px', cursor: 'pointer', fontSize: '12px' }}>삭제</button>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <input
                    style={{ ...inputStyle, flex: 1, marginTop: 0 }}
                    placeholder="https://... 이미지 URL 입력"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImage(); } }}
                  />
                  <button onClick={addImage} style={{ background: 'var(--navy)', color: '#fff', border: 'none', borderRadius: '6px', padding: '0 14px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>추가</button>
                </div>
              </div>

              {/* 저장 버튼 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                <button
                  onClick={save}
                  disabled={saving}
                  style={{ background: saving ? '#9CA3AF' : 'var(--red)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 28px', fontWeight: 700, fontSize: '0.9rem', cursor: saving ? 'not-allowed' : 'pointer' }}
                >
                  {saving ? '저장 중...' : '💾 저장'}
                </button>
                {savedMsg && <span style={{ fontSize: '0.875rem', color: savedMsg.startsWith('✅') ? '#059669' : '#EF4444', fontWeight: 600 }}>{savedMsg}</span>}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
