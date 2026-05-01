import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import PageSEO from '../components/seo/PageSEO';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #F8FAFC 0%, #fff 100%)',
        padding: '64px 20px',
      }}
    >
      <PageSEO
        title="페이지를 찾을 수 없습니다 (404)"
        description="요청하신 페이지가 존재하지 않거나 이동되었습니다."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(4rem, 12vw, 7rem)',
            fontWeight: 900,
            color: 'var(--navy)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.4rem, 3.2vw, 1.8rem)',
            fontWeight: 800,
            color: 'var(--navy)',
            margin: '0 0 0.75rem',
          }}
        >
          페이지를 찾을 수 없습니다
        </h1>

        <p
          style={{
            color: 'var(--gray)',
            lineHeight: 1.7,
            fontSize: '1rem',
            margin: '0 0 0.5rem',
          }}
        >
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>

        <div
          style={{
            fontSize: '0.85rem',
            color: '#9CA3AF',
            fontFamily: 'monospace',
            background: '#F3F4F6',
            border: '1px solid #E5E7EB',
            padding: '8px 12px',
            borderRadius: '8px',
            display: 'inline-block',
            marginBottom: '2rem',
            wordBreak: 'break-all',
            maxWidth: '100%',
          }}
        >
          {location.pathname}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 24px',
              borderRadius: '10px',
              background: 'var(--navy)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(10,22,40,0.15)',
            }}
          >
            🏠 홈으로 돌아가기
          </Link>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 24px',
              borderRadius: '10px',
              background: '#fff',
              color: 'var(--navy)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 700,
              border: '1px solid var(--border)',
            }}
          >
            📋 제품안내 보기
          </Link>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 24px',
              borderRadius: '10px',
              background: 'var(--red)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(200,57,43,0.2)',
            }}
          >
            📞 문의하기
          </Link>
        </div>

        <p
          style={{
            marginTop: '2.5rem',
            fontSize: '0.85rem',
            color: '#9CA3AF',
          }}
        >
          오류가 계속 발생하면 <a href="tel:16882520" style={{ color: 'var(--red)', fontWeight: 700, textDecoration: 'none' }}>1688-2520</a>으로 연락 주세요.
        </p>
      </motion.div>
    </main>
  );
}
