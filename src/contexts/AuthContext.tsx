import { createContext, useContext, useEffect, useState } from 'react';
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
    console.log('[Auth] fetchProfile start for userId:', userId);
    
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      
      console.log('[Auth] fetchProfile result:', data, 'error:', error);
      console.log('[Auth] role:', data?.role, 'status:', data?.status);
      setProfile(data as Profile | null);
    } catch (err) {
      console.error('[Auth] fetchProfile exception:', err);
    }
  }

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[Auth] getSession user:', session?.user?.email ?? 'none');
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => {
          setLoading(false);
          console.log('[Auth] loading set to false from getSession fetchProfile');
        });
      } else {
        setLoading(false);
        console.log('[Auth] loading set to false from getSession (no user)');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Auth] onAuthStateChange event:', event, 'user:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // 절대 await 하지 않음 (Deadlock 방지)
        fetchProfile(session.user.id).finally(() => {
          setLoading(false);
          console.log('[Auth] loading set to false from onAuthStateChange fetchProfile');
        });
      } else {
        setProfile(null);
        setLoading(false);
        console.log('[Auth] loading set to false from onAuthStateChange (no user)');
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
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return error.message;
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        full_name: meta.full_name,
        company_name: meta.company_name,
        phone: meta.phone,
        role: 'partner',
        status: 'pending',
      });
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
