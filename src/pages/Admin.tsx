import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, LayoutDashboard, Package, Image as ImageIcon, LogOut, AlertCircle } from 'lucide-react';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">관리자 로그인</h1>
            <p className="text-slate-500 mt-2">콘텐츠 관리를 위해 로그인해주세요.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>※ Vercel 배포 후 Supabase 환경변수 설정이 필요합니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold">썬레이텍 관리자</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-lg text-white">
            <LayoutDashboard className="h-5 w-5" />
            대시보드
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Package className="h-5 w-5" />
            제품 관리
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <ImageIcon className="h-5 w-5" />
            시공사례 관리
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">대시보드</h1>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold mb-4">환영합니다!</h3>
            <p className="text-slate-600 mb-6">
              이곳에서 홈페이지의 제품 정보와 시공사례를 관리할 수 있습니다. <br/>
              현재는 UI 템플릿 상태이며, Supabase 데이터베이스 테이블(products, cases 등)을 생성한 후 연동하여 사용할 수 있습니다.
            </p>
            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
              <strong>Vercel & Supabase 배포 가이드:</strong>
              <ol className="list-decimal ml-5 mt-2 space-y-1">
                <li>GitHub에 코드를 푸시합니다.</li>
                <li>Vercel에서 해당 GitHub 레포지토리를 연결하여 배포합니다.</li>
                <li>Supabase 프로젝트를 생성하고 URL과 Anon Key를 발급받습니다.</li>
                <li>Vercel 환경변수 설정에 `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY`를 추가합니다.</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
