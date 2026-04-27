import { createContext, useContext, useEffect, useState } from 'react';
import type React from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
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
  signUp: (email: string, password: string, meta: { full_name: string; company_name: string; phone: string }) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
    return error ? error.message : null;
  }

  async function signUp(
    email: string,
    password: string,
    meta: { full_name: string; company_name: string; phone: string }
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
          role: 'partner',
          status: 'pending',
        },
      },
    });
    if (error) return error.message;

    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return '이미 가입된 이메일입니다. 기존 계정으로 로그인하거나 비밀번호 재설정을 이용해 주세요.';
    }

    const { error: requestError } = await supabase.from('partner_signup_requests').insert({
        auth_user_id: data.user?.id ?? null,
        email,
        full_name: meta.full_name,
        company_name: meta.company_name,
        phone: meta.phone,
        status: 'pending',
      });

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
