import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';

const SECTION_COPY: Record<string, { title: string; description: string }> = {
  company: {
    title: '회사소개 페이지 준비중',
    description: '회사 연혁, 인증, 납품처 등 신뢰 정보를 정리해 곧 공개할 예정입니다.',
  },
  solutions: {
    title: '기술·솔루션 페이지 준비중',
    description: '복사난방 원리와 업종별 솔루션을 더 보기 쉽게 정리해 공개할 예정입니다.',
  },
  cases: {
    title: '시공사례 페이지 준비중',
    description: '업종별 사례와 전국 포트폴리오를 별도 페이지로 정리 중입니다.',
  },
  resources: {
    title: '자료실 페이지 준비중',
    description: '카탈로그, 인증서, 도면, 계산기 자료를 한 곳에서 볼 수 있게 준비 중입니다.',
  },
  products: {
    title: '추가 제품 페이지 준비중',
    description: '개인용, 스마트 제어, 제품 비교 등 세부 제품 카테고리를 순차적으로 공개할 예정입니다.',
  },
  mas: {
    title: 'MAS 제품 페이지 준비중',
    description: 'MAS 다수공급자 제품 라인업과 구매 정보를 정리해 추가할 예정입니다.',
  },
  special: {
    title: '방폭·특수 제품 페이지 준비중',
    description: '위험 환경용 방폭·특수 제품 정보를 별도 카테고리로 정리 중입니다.',
  },
  contact: {
    title: '고객센터 페이지 준비중',
    description: '견적 문의, FAQ, 공지사항, AI 상담 흐름을 한 곳에 모아 더 편하게 안내할 예정입니다.',
  },
  policy: {
    title: '정책 페이지 준비중',
    description: '개인정보처리방침과 이용약관 문서를 정리한 뒤 공개할 예정입니다.',
  },
};

const DEFAULT_COPY = {
  title: '페이지 준비중',
  description: '현재 더 좋은 구성으로 페이지를 정리하고 있습니다. 먼저 공개된 핵심 페이지를 이용해주세요.',
};

export default function ComingSoonPage() {
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section') ?? '';
  const copy = SECTION_COPY[section] ?? DEFAULT_COPY;

  return (
    <div>
      <section
        style={{
          background: 'linear-gradient(160deg, var(--navy) 0%, #152035 60%, #0E1E3A 100%)',
          padding: '72px 0 80px',
          color: '#fff',
        }}
      >
        <div className="container" style={{ maxWidth: '880px' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              🚧 준비중 안내
            </div>

            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                lineHeight: 1.15,
                marginBottom: '14px',
              }}
            >
              {copy.title}
            </h1>

            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.8,
                maxWidth: '640px',
              }}
            >
              {copy.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ background: 'var(--off)', padding: '56px 0 72px' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: '28px',
              boxShadow: 'var(--sh)',
              border: '1px solid var(--border)',
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--navy)' }}>
              지금 바로 확인 가능한 페이지
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.7, marginBottom: '20px' }}>
              현재는 핵심 제품 정보와 조달 안내 중심으로 먼저 공개되어 있습니다.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
                marginBottom: '22px',
              }}
            >
              {[
                {
                  title: '전체 제품 보기',
                  desc: '현재 등록된 공통 제품 목록과 스펙을 확인할 수 있습니다.',
                  to: '/products',
                },
                {
                  title: '조달청 우수제품',
                  desc: '공공기관용 우수제품과 조달 절차 안내를 볼 수 있습니다.',
                  to: '/products/excellence',
                },
                {
                  title: '관리자 CMS',
                  desc: '현재 임시 CMS와 콘텐츠 상태를 확인할 수 있습니다.',
                  to: '/admin',
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    background: 'var(--off)',
                    borderRadius: '14px',
                    padding: '18px',
                    border: '1px solid var(--border)',
                    color: 'inherit',
                  }}
                >
                  <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--navy)' }}>{item.title}</strong>
                  <span style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--gray)' }}>{item.desc}</span>
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="tel:16882520"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: 'var(--red)',
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                📞 전화 문의하기
              </a>
              <a
                href="https://www.g2b.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  color: 'var(--navy)',
                  fontWeight: 700,
                  background: '#fff',
                }}
              >
                🏛️ 나라장터 바로가기
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
