import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type React from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

const ADMIN_TIMEOUT_MS = 30 * 60 * 1000; // 30분

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  organization: string | null;
  position: string | null;
  interest_area: string | null;
  login_count: number | null;
  last_login_at: string | null;
  portal_visit_count: number | null;
  last_portal_visited_at: string | null;
  role: 'admin' | 'partner';
  status: 'pending' | 'approved' | 'rejected';
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  isApprovedPartner: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string, meta: { full_name: string; company_name: string; phone: string; organization: string; position: string; interest_area: string }) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function fetchProfile(userId: string) {
    if (!supabase) return;

    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

      if (error) {
        setProfile(null);
        return;
      }

      setProfile(data as Profile | null);
    } catch (err) {
      console.error('[Auth] fetchProfile exception:', err);
      setProfile(null);
    }
  }

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setLoading(true);
        // 절대 await 하지 않음 (Deadlock 방지)
        fetchProfile(session.user.id).finally(() => {
          setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string): Promise<string | null> {
    if (!supabase) return '서버 연결 오류';
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) supabase.rpc('track_profile_login').then(({ error: rpcError }) => {
      if (rpcError) console.warn('[Auth] track_profile_login failed:', rpcError.message);
    });
    return error ? error.message : null;
  }

  async function signUp(
    email: string,
    password: string,
    meta: { full_name: string; company_name: string; phone: string; organization: string; position: string; interest_area: string }
  ): Promise<string | null> {
    if (!supabase) return '서버 연결 오류';
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/signup/verified`,
        data: {
          full_name: meta.full_name,
          company_name: meta.company_name,
          phone: meta.phone,
          organization: meta.organization,
          position: meta.position,
          interest_area: meta.interest_area,
          role: 'partner',
          status: 'pending',
        },
      },
    });
    if (error) return error.message;

    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return '이미 가입된 이메일입니다. 기존 계정으로 로그인하거나 비밀번호 재설정을 이용해 주세요.';
    }

    const signupRequest = {
      auth_user_id: data.user?.id ?? null,
      email,
      full_name: meta.full_name,
      company_name: meta.company_name,
      phone: meta.phone,
      organization: meta.organization,
      position: meta.position,
      interest_area: meta.interest_area,
      status: 'pending',
    };
    let { error: requestError } = await supabase.from('partner_signup_requests').insert(signupRequest);

    if (requestError?.code === 'PGRST204' || requestError?.message.includes('schema cache')) {
      const { error: fallbackError } = await supabase.from('partner_signup_requests').insert({
        auth_user_id: signupRequest.auth_user_id,
        email: signupRequest.email,
        full_name: signupRequest.full_name,
        company_name: signupRequest.company_name,
        phone: signupRequest.phone,
        status: signupRequest.status,
      });
      if (!fallbackError) return null;
      requestError = fallbackError;
    }

    if (requestError) {
      if (requestError.code === '23505') {
        return '이미 가입 신청이 접수된 이메일입니다. 메일함을 확인하거나 관리자에게 문의해 주세요.';
      }
      return `가입 신청 접수 저장 실패: ${requestError.message}`;
    }

    return null;
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  const isAdmin = profile?.role === 'admin';
  const isApprovedPartner = profile?.status === 'approved';

  // 관리자 전용 — 30분 비활동 시 자동 로그아웃
  useEffect(() => {
    if (!isAdmin) return;

    const handleTimeout = async () => {
      if (supabase) await supabase.auth.signOut();
      window.location.href = '/login?reason=timeout';
    };

    const resetTimer = () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(handleTimeout, ADMIN_TIMEOUT_MS);
    };

    const EVENTS = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'] as const;
    EVENTS.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      EVENTS.forEach(e => window.removeEventListener(e, resetTimer));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [isAdmin]);

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, isAdmin, isApprovedPartner, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
