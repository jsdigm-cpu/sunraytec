import type { CSSProperties } from 'react';
interface Props {
  tab: 'products' | 'content';
  onTab: (tab: 'products' | 'content') => void;
}

export default function Sidebar({ tab, onTab }: Props) {
  const itemStyle = (active: boolean): CSSProperties => ({
    width: '100%',
    textAlign: 'left',
    border: '1px solid #4b5563',
    background: active ? '#4b5563' : 'transparent',
    color: '#f9fafb',
    borderRadius: 10,
    padding: '0.7rem 0.8rem',
    marginBottom: '0.6rem',
  });

  return (
    <aside style={{ width: 260, background: '#374151', color: '#fff', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>관리자 대시보드</h2>
      <button style={itemStyle(tab === 'products')} onClick={() => onTab('products')}>
        Manage Products
      </button>
      <button style={itemStyle(tab === 'content')} onClick={() => onTab('content')}>
        Edit Content
      </button>
    </aside>
  );
}
