import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type React from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface Profile {
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
  refreshProfile: () => Promise<Profile | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    if (!supabase) {
      setProfile(null);
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        setProfile(null);
        return null;
      }

      const nextProfile = data as Profile | null;
      setProfile(nextProfile);
      return nextProfile;
    } catch (err) {
      console.error('[Auth] fetchProfile exception:', err);
      setProfile(null);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    let alive = true;

    async function syncSession(nextSession: Session | null) {
      if (!alive) return;

      setLoading(true);
      setSession(nextSession);
      setProfile(null);

      if (!nextSession) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (!alive) return;

      if (error || !data.user) {
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(data.user);
      await fetchProfile(data.user.id);
      if (alive) setLoading(false);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      syncSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        setSession(session);
        return;
      }

      syncSession(session);
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

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
    setSession(null);
    setUser(null);
    setProfile(null);
  }

  const isAdmin = profile?.role === 'admin';
  const isApprovedPartner = profile?.status === 'approved';
  const refreshProfile = async () => {
    if (!user) return null;
    return fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, isAdmin, isApprovedPartner, signIn, signUp, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
