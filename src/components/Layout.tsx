import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Phone, Mail, MapPin } from 'lucide-react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // 관리자 페이지는 별도 레이아웃 사용
  if (isAdmin) return <Outlet />;

  const navLinks = [
    { name: '회사소개', path: '/about' },
    { name: '제품정보', path: '/products' },
    { name: '시공사례', path: '/cases' },
    { name: '고객센터', path: '/support' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-tight text-slate-900 leading-none">(주)썬레이텍</h1>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider mt-1">SUNRAYTEC Co., Ltd.</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8 border-b border-slate-800 pb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Sun className="h-8 w-8 text-orange-500" />
                <span className="font-bold text-2xl text-white tracking-tight">(주)썬레이텍</span>
              </div>
              <p className="text-slate-400 max-w-md mb-6 leading-relaxed">
                환경과 건강을 지키는 기업. <br/>
                대한민국 복사난방의 기준, 썬레이텍이 만들어갑니다.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <p>본사: 서울특별시 서초구 능안말길 40 2층 (내곡동 164-9호 2층)</p>
                <p>대표이사: 장선민 | 사업자등록번호: 123-45-67890</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">고객센터</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <span className="text-xl font-bold text-white">1688-2520</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-500">FAX</span>
                  <span>02-6455-0712</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span>master@sunraytec.net</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} SUNRAYTEC Co., Ltd. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/admin" className="hover:text-white transition-colors">관리자 로그인</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
