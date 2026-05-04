import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  {
    title: '바로가기',
    links: [
      { label: '홈', to: '/' },
      { label: '전체 제품 보기', to: '/products' },
      { label: '조달청 우수제품', to: '/products/excellence' },
      { label: 'MAS 제품', to: '/products/mas' },
      { label: '전화 문의', href: 'tel:16882520' },
    ],
  },
  {
    title: '주요 메뉴',
    links: [
      { label: 'CEO 메시지', to: '/about/ceo-message' },
      { label: '시공사례', to: '/cases' },
      { label: '전국 시공 지도', to: '/cases-map' },
      { label: '자료실', to: '/resources/catalog' },
    ],
  },
  {
    title: '조달 안내',
    links: [
      { label: '나라장터 바로가기', href: 'https://www.g2b.go.kr' },
      { label: 'MAS 제품', to: '/products/mas' },
      { label: '방폭·특수 제품', to: '/products/special' },
      { label: '공공기관 문의', href: 'tel:16882520' },
    ],
  },
  {
    title: '정책',
    links: [
      { label: '개인정보처리방침', to: '/policy/privacy' },
      { label: '이용약관', to: '/policy/terms' },
      { label: '운영 문서', to: '/admin' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ 
      background: 'linear-gradient(to bottom, #0F172A 0%, #020617 100%)', 
      color: 'rgba(255,255,255,.55)',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      {/* 상단 링크 영역 */}
      <div className="container" style={{ padding: '56px 0 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: '40px',
          }}
          className="footer-grid"
        >
          {/* 회사 정보 */}
          <div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.8rem',
                letterSpacing: '2px',
                color: 'var(--blue)',
                marginBottom: '12px',
                lineHeight: 1,
              }}
            >
              SUNRAYTEC
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.9, marginBottom: '20px' }}>
              대한민국 복사난방의 기준.<br />
              원적외선 기술로 더 따뜻하고<br />
              안전한 공간을 만듭니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12.5px' }}>
              <span>📞 1688-2520</span>
              <span>📧 master@sunraytec.net</span>
              <span>📍 서울 서초구 능안말길 40 2층</span>
            </div>
          </div>

          {/* 메뉴 링크들 */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#fff',
                  marginBottom: '14px',
                }}
              >
                {group.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    {'to' in link && link.to ? (
                      <Link
                        to={link.to}
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255,255,255,.5)',
                          transition: 'color 0.15s',
                        }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,.5)')}
                      >
                        {link.label}
                        {'comingSoon' in link && link.comingSoon ? ' (준비중)' : ''}
                      </Link>
                    ) : 'href' in link && link.href ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          fontSize: '13px',
                          color: 'rgba(255,255,255,.5)',
                          transition: 'color 0.15s',
                        }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,.5)')}
                      >
                        {link.label}
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,.08)',
        }}
      >
        <div
          className="container"
          style={{
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '12px',
          }}
        >
          <span>© {new Date().getFullYear()} (주)썬레이텍 SUNRAYTEC Co., Ltd. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/policy/privacy" style={{ color: 'rgba(255,255,255,.4)' }}>개인정보처리방침</Link>
            <Link to="/policy/terms" style={{ color: 'rgba(255,255,255,.4)' }}>이용약관</Link>
            <a
              href="https://www.g2b.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,.4)' }}
            >
              나라장터 바로가기 ↗
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
