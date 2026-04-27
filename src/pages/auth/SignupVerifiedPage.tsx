import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';

export default function SignupVerifiedPage() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      supabase?.auth.signOut();
    }, 800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0A1628 0%, #152035 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ width: '100%', maxWidth: '440px', textAlign: 'center' }}
      >
        <Link to="/" style={{ display: 'inline-block', marginBottom: '28px' }}>
          <img
            src="/images/copmany_logo.png"
            alt="썬레이텍"
            style={{ height: '48px', objectFit: 'contain' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </Link>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '44px 32px', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F2241', marginBottom: '14px' }}>
            이메일 인증이 완료되었습니다
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.75, margin: '0 0 28px' }}>
            협력업체 가입 신청이 정상 접수되었습니다.<br />
            관리자 확인 후 승인이 완료되면<br />
            파트너 전용 자료실을 이용하실 수 있습니다.
          </p>
          <Link
            to="/"
            style={{ display: 'inline-block', width: '100%', padding: '13px 20px', background: 'var(--navy)', color: '#fff', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', boxSizing: 'border-box' }}
          >
            메인 홈페이지로
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
