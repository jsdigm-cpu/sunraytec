import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ChevronDown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

interface NavSubItem {
  label: string;
  icon: string;
  to?: string;
  external?: string;
  comingSoon?: boolean;
}

interface NavItem {
  to?: string;
  label: string;
  subs?: NavSubItem[];
}

// 현재 실제 라우트 기준으로만 클릭 가능한 메뉴를 노출합니다.
const NAV_ITEMS = [
  {
    to: '/about/history',
    label: '회사소개',
    subs: [
      { to: '/coming-soon?section=company', label: 'CEO 메시지', icon: '👤', comingSoon: true },
      { to: '/about/history', label: '회사 연혁', icon: '📅' },
      { to: '/about/certifications', label: '인증서·특허', icon: '🏆' },
      { to: '/coming-soon?section=company', label: '수상·언론보도', icon: '📰', comingSoon: true },
      { to: '/coming-soon?section=company', label: '주요 납품처', icon: '🤝', comingSoon: true },
      { to: '/coming-soon?section=company', label: '찾아오시는 길', icon: '📍', comingSoon: true },
    ],
  },
  {
    to: '/products',
    label: '제품안내',
    subs: [
      { to: '/products/excellence', label: '조달청 우수제품', icon: '🏅' },
      { to: '/products/mas', label: 'MAS 다수공급자', icon: '📋' },
      { to: '/coming-soon?section=special', label: '방폭·특수 제품', icon: '⚡', comingSoon: true },
      { to: '/coming-soon?section=products', label: '개인용·욕실형', icon: '🏠', comingSoon: true },
      { to: '/coming-soon?section=products', label: '스마트 제어 시스템', icon: '📡', comingSoon: true },
      { to: '/coming-soon?section=products', label: '제품 비교', icon: '⚖️', comingSoon: true },
    ],
  },
  {
    to: '/coming-soon?section=solutions',
    label: '기술·솔루션',
    subs: [
      { to: '/coming-soon?section=solutions', label: '복사난방 원리', icon: '☀️', comingSoon: true },
      { to: '/coming-soon?section=solutions', label: '4대 ZERO 기술', icon: '🔬', comingSoon: true },
      { to: '/coming-soon?section=solutions', label: '공공·교육 솔루션', icon: '🏛️', comingSoon: true },
      { to: '/coming-soon?section=solutions', label: '산업·물류 솔루션', icon: '🏭', comingSoon: true },
      { to: '/coming-soon?section=solutions', label: '국방·특수 솔루션', icon: '⚔️', comingSoon: true },
      { to: '/coming-soon?section=solutions', label: 'IoT 중앙제어', icon: '📡', comingSoon: true },
    ],
  },
  {
    to: '/cases',
    label: '시공사례',
    subs: [
      { to: '/cases', label: '전체 포트폴리오', icon: '🗂️' },
      { to: '/cases', label: '공공·교육 사례', icon: '🏛️' },
      { to: '/cases', label: '산업·물류 사례', icon: '🏭' },
      { to: '/cases', label: '국방·특수 사례', icon: '⚔️' },
      { to: '/cases', label: '상업·라이프스타일', icon: '🏢' },
      { to: '/coming-soon?section=cases', label: '전국 시공 지도', icon: '🗺️', comingSoon: true },
    ],
  },
  {
    to: '/resources/catalog',
    label: '자료실',
    subs: [
      { to: '/coming-soon?section=resources', label: '난방 용량 계산기', icon: '🧮', comingSoon: true },
      { to: '/coming-soon?section=resources', label: '에너지 ROI 계산기', icon: '💰', comingSoon: true },
      { to: '/resources/catalog', label: '카탈로그 다운로드', icon: '📥' },
      { to: '/coming-soon?section=resources', label: '스펙·도면 CAD', icon: '📐', comingSoon: true },
      { to: '/about/certifications', label: '인증서·시험성적서', icon: '📄' },
      { to: '/coming-soon?section=resources', label: '동영상 자료', icon: '🎬', comingSoon: true },
    ],
  },
  {
    to: '/contact',
    label: '고객센터',
    subs: [
      { to: '/contact', label: '견적 문의', icon: '📋' },
      { to: '/coming-soon?section=contact', label: 'FAQ', icon: '❓', comingSoon: true },
      { to: '/coming-soon?section=contact', label: '공지사항', icon: '📢', comingSoon: true },
      { to: '/coming-soon?section=contact', label: '대리점 모집', icon: '🤝', comingSoon: true },
      { external: 'https://www.g2b.go.kr', label: '나라장터 바로가기', icon: '🏛️' },
      { to: '/coming-soon?section=contact', label: 'AI 상담 챗봇', icon: '🤖', comingSoon: true },
    ],
  },
] satisfies NavItem[];

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSection = new URLSearchParams(location.search).get('section');

  const isItemActive = (item: NavItem) => {
    if (!item.to) return false;

    if (item.to.startsWith('/coming-soon')) {
      const targetSection = item.to.split('section=')[1] ?? '';
      return location.pathname === '/coming-soon' && currentSection === targetSection;
    }

    return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 마우스가 메뉴→드롭다운으로 이동할 때 바로 닫히지 않도록 딜레이 처리
  const handleMouseEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#fff',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* 상단 레드 그라디언트 라인 */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, var(--red-dark), var(--red), var(--amber))' }} />

      {/* Top Utility Bar (회원가입, 로그인 등) */}
      <div style={{ 
        background: '#F8FAFC', 
        borderBottom: '1px solid var(--border)', 
        height: '34px', 
        display: 'flex', 
        alignItems: 'center',
        display: mobileOpen ? 'none' : 'flex' // 모바일 메뉴 열렸을땐 숨김 처리
      }} className="desktop-utility-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', gap: '14px' }}>
          
          <Link to="/partner" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: '#475569', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red)'} onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
            <span style={{ color: 'var(--red)' }}>♣</span> 파트너·협력회사 회원가입 안내
            <span style={{ 
              border: '1px solid #CBD5E1', background: '#fff', padding: '1px 5px', 
              borderRadius: '3px', fontSize: '10px', color: '#64748B', fontWeight: 600, marginLeft: '2px' 
            }}>클릭</span>
          </Link>

          <div style={{ width: '1px', height: '12px', background: '#CBD5E1' }} />

          {!user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/signup" style={{ 
                fontSize: '11.5px', color: '#475569', fontWeight: 600,
                border: '1px solid #CBD5E1', background: '#fff', padding: '2px 8px', borderRadius: '4px', transition: 'all 0.2s'
              }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#475569'; }}>
                회원가입
              </Link>
              <Link to="/login" style={{ 
                fontSize: '11.5px', color: '#475569', fontWeight: 600,
                border: '1px solid #CBD5E1', background: '#fff', padding: '2px 8px', borderRadius: '4px', transition: 'all 0.2s'
              }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.color = 'var(--navy)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#475569'; }}>
                Login
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {profile?.role && (
                  <span style={{ 
                    background: profile.role === 'admin' ? '#4F46E5' : '#10B981', 
                    color: 'white', padding: '2px 5px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 
                  }}>
                    {profile.role === 'admin' ? '관리자' : '파트너'}
                  </span>
                )}
                <span style={{ fontWeight: 600, fontSize: '12px', color: 'var(--navy)' }}>
                  {profile?.full_name || user.email?.split('@')[0]}님
                </span>
              </div>
              <button
                onClick={async () => {
                  await signOut();
                  window.location.href = '/';
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '3px',
                  background: '#fff', border: '1px solid #CBD5E1',
                  padding: '2px 8px', borderRadius: '4px', fontSize: '11.5px', fontWeight: 600,
                  cursor: 'pointer', color: '#475569', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.borderColor = '#FECACA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
              >
                <LogOut size={12} />
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Header (로고, 메뉴, 견적문의) */}
      <div
        className="container header-shell"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', gap: '12px', borderBottom: '1px solid var(--border)' }}
      >
        {/* 로고 */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: 0 }} className="header-logo-link">
          <img
            src="/images/copmany_logo.png"
            alt="썬레이텍 로고"
            style={{ height: '46px', width: 'auto', display: 'block', maxWidth: '100%' }}
            className="header-logo"
          />
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0' }} className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => item.subs && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {/* 메인 메뉴 항목 */}
              <Link
                to={item.to ?? '#'}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.9rem',
                  fontWeight: isItemActive(item) || activeDropdown === item.label ? 700 : 500,
                  color: isItemActive(item) || activeDropdown === item.label ? 'var(--red)' : 'var(--text)',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <>
                  {item.label}
                  {item.subs && (
                    <motion.span
                      animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <ChevronDown size={13} />
                    </motion.span>
                  )}
                  {/* 언더라인 */}
                  <motion.span
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: '0.8rem',
                      right: '0.8rem',
                      height: '2px',
                      background: 'var(--red)',
                      borderRadius: '1px',
                    }}
                    animate={{
                      scaleX: isItemActive(item) || activeDropdown === item.label ? 1 : 0,
                      opacity: isItemActive(item) || activeDropdown === item.label ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </>
              </Link>

              {/* 드롭다운 패널 */}
              <AnimatePresence>
                {item.subs && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '220px',
                      background: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                    }}
                  >
                    {/* 드롭다운 상단 컬러 바 */}
                    <div style={{ height: '3px', background: 'var(--red)' }} />

                    <div style={{ padding: '8px' }}>
                      {item.subs.map((sub) => (
                        sub.to ? (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            onClick={() => setActiveDropdown(null)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '9px 12px',
                              borderRadius: '8px',
                              fontSize: '13.5px',
                              color: 'var(--text)',
                              fontWeight: 500,
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget;
                              el.style.background = '#FDECEA';
                              el.style.color = 'var(--red)';
                              el.style.paddingLeft = '16px';
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget;
                              el.style.background = 'transparent';
                              el.style.color = 'var(--text)';
                              el.style.paddingLeft = '12px';
                            }}
                          >
                            <span style={{ fontSize: '15px', flexShrink: 0 }}>{sub.icon}</span>
                            {sub.label}
                            {sub.comingSoon && <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--red)' }}>준비중</span>}
                          </Link>
                        ) : sub.external ? (
                          <a
                            key={sub.label}
                            href={sub.external}
                            target={sub.external.startsWith('http') ? '_blank' : undefined}
                            rel={sub.external.startsWith('http') ? 'noopener noreferrer' : undefined}
                            onClick={() => setActiveDropdown(null)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '9px 12px',
                              borderRadius: '8px',
                              fontSize: '13.5px',
                              color: 'var(--text)',
                              fontWeight: 500,
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget;
                              el.style.background = '#FDECEA';
                              el.style.color = 'var(--red)';
                              el.style.paddingLeft = '16px';
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget;
                              el.style.background = 'transparent';
                              el.style.color = 'var(--text)';
                              el.style.paddingLeft = '12px';
                            }}
                          >
                            <span style={{ fontSize: '15px', flexShrink: 0 }}>{sub.icon}</span>
                            {sub.label}
                          </a>
                        ) : null
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* 구분선 */}
          <div style={{ width: '1px', height: '18px', background: 'var(--border)', margin: '0 0.5rem 0 0.25rem' }} />

          {/* 전화번호 */}
          <a
            href="tel:16882520"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.85rem',
              fontWeight: 800,
              color: 'var(--navy)',
              whiteSpace: 'nowrap',
              marginRight: '0.6rem',
            }}
          >
            <Phone size={13} color="var(--red)" />
            1688-2520
          </a>

          {/* 견적문의 CTA (사이즈 축소) */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                background: 'var(--red)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(200,57,43,0.25)',
              }}
            >
              🚀 견적문의
            </Link>
          </motion.div>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            cursor: 'pointer',
            color: 'var(--navy)',
            padding: '9px',
            minWidth: '46px',
            minHeight: '46px',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            flexShrink: 0,
          }}
          className="mobile-menu-btn"
          aria-label="메뉴 열기"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ background: '#fff', borderTop: '1px solid var(--border)', maxHeight: '80vh', overflowY: 'auto' }}
            className="mobile-menu"
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} style={{ borderBottom: '1px solid var(--border)' }}>
                {/* 모바일 메인 메뉴 */}
                <Link
                  to={item.to ?? '#'}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.85rem 1.25rem',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: isItemActive(item) ? 'var(--red)' : 'var(--text)',
                    background: isItemActive(item) ? '#FDECEA' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
                {/* 모바일 서브메뉴 */}
                {item.subs && (
                  <div style={{ background: 'var(--off)', padding: '6px 12px' }}>
                    {item.subs.map((sub) => (
                      sub.to ? (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '7px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: 'var(--gray)',
                            fontWeight: 500,
                          }}
                        >
                          <span>{sub.icon}</span>
                          {sub.label}
                          {sub.comingSoon && <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--red)' }}>준비중</span>}
                        </Link>
                      ) : sub.external ? (
                        <a
                          key={sub.label}
                          href={sub.external}
                          target={sub.external.startsWith('http') ? '_blank' : undefined}
                          rel={sub.external.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '7px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: 'var(--gray)',
                            fontWeight: 500,
                          }}
                        >
                          <span>{sub.icon}</span>
                          {sub.label}
                        </a>
                      ) : null
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* 로그인 상태 표시 및 로그아웃 (모바일) */}
            {user && (
              <div style={{ 
                margin: '0.5rem 1rem', padding: '0.75rem', 
                background: 'var(--off)', borderRadius: '8px', 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {profile?.role && (
                    <span style={{ 
                      background: profile.role === 'admin' ? '#4F46E5' : '#10B981', 
                      color: 'white', padding: '3px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 
                    }}>
                      {profile.role === 'admin' ? '관리자' : '파트너'}
                    </span>
                  )}
                  <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>
                    {profile?.full_name || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    await signOut();
                    window.location.href = '/';
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    background: '#fff', border: '1px solid var(--border)',
                    padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', color: 'var(--gray)', transition: 'all 0.2s'
                  }}
                >
                  <LogOut size={14} />
                  로그아웃
                </button>
              </div>
            )}

            {/* 모바일 하단 버튼 */}
            <div style={{ padding: '1rem', display: 'flex', gap: '8px' }}>
              <a
                href="tel:16882520"
                style={{
                  flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px',
                  padding: '0.7rem', borderRadius: '8px', border: '1.5px solid var(--border)',
                  color: 'var(--navy)', fontWeight: 700, fontSize: '0.875rem',
                }}
              >
                <Phone size={14} /> 1688-2520
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  flex: 1, display: 'flex', justifyContent: 'center', padding: '0.7rem',
                  borderRadius: '8px', background: 'var(--red)', color: '#fff', fontWeight: 700, gap: '6px', fontSize: '0.875rem',
                }}
              >
                🚀 견적문의
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
          .header-shell { height: 76px !important; }
          .header-logo { height: 44px !important; }
        }
        @media (max-width: 820px) {
          .header-logo { height: 40px !important; }
        }
        @media (max-width: 640px) {
          .header-shell { gap: 10px !important; }
          .header-logo { height: 36px !important; }
        }
      `}</style>
    </header>
  );
}
