import type { CSSProperties } from 'react';

export type AdminTab = 'products' | 'content' | 'inquiries' | 'cases';

interface Props {
  tab: AdminTab;
  onTab: (tab: AdminTab) => void;
  newInquiryCount?: number;
}

export default function Sidebar({ tab, onTab, newInquiryCount = 0 }: Props) {
  const itemStyle = (active: boolean): CSSProperties => ({
    width: '100%',
    textAlign: 'left',
    border: '1px solid #4b5563',
    background: active ? '#4b5563' : 'transparent',
    color: '#f9fafb',
    borderRadius: 10,
    padding: '0.7rem 0.8rem',
    marginBottom: '0.6rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  });

  return (
    <aside style={{ width: 260, background: '#374151', color: '#fff', padding: '1rem', flexShrink: 0 }}>
      <h2 style={{ marginTop: 0, fontSize: '1rem', marginBottom: '1.2rem' }}>관리자 대시보드</h2>
      <button style={itemStyle(tab === 'products')} onClick={() => onTab('products')}>
        <span>📦 제품 관리</span>
      </button>
      <button style={itemStyle(tab === 'content')} onClick={() => onTab('content')}>
        <span>✏️ 콘텐츠 편집</span>
      </button>
      <button style={itemStyle(tab === 'cases')} onClick={() => onTab('cases')}>
        <span>🏗️ 시공사례 관리</span>
      </button>
      <button style={itemStyle(tab === 'inquiries')} onClick={() => onTab('inquiries')}>
        <span>📋 견적 문의</span>
        {newInquiryCount > 0 && (
          <span style={{
            background: '#EF4444', color: '#fff',
            fontSize: '11px', fontWeight: 700,
            padding: '1px 7px', borderRadius: '999px',
            minWidth: '20px', textAlign: 'center',
          }}>
            {newInquiryCount}
          </span>
        )}
      </button>
    </aside>
  );
}
