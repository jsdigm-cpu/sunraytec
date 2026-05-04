import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, ClipboardCheck, Truck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: '제품 검색',
    desc: '나라장터 종합쇼핑몰에서 "썬레이텍" 또는 세부품명 "전기히터"를 검색하세요.'
  },
  {
    icon: ShoppingBag,
    title: '장바구니 담기',
    desc: '수요기관 예산 및 필요 규격(3600W~600W)에 맞는 모델을 장바구니에 담습니다.'
  },
  {
    icon: ClipboardCheck,
    title: '납품요구 / 계약',
    desc: '구매 금액에 따라 바로납품요구 또는 2단계경쟁 절차를 통해 계약을 진행합니다.'
  },
  {
    icon: Truck,
    title: '납품 및 설치',
    desc: '계약 체결 후 30일 이내(협의 가능) 지정된 장소에 제품이 인도 및 설치됩니다.'
  }
];

export default function ProcurementGuideSection() {
  return (
    <section style={{ padding: '100px 0', background: '#f1f5f9' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '20px', color: 'var(--navy)' }}
          >
            공공기관 <span style={{ color: 'var(--red)' }}>조달 구매 가이드</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}
          >
            나라장터 종합쇼핑몰을 통해 쉽고 간편하게 썬레이텍의 우수제품과 MAS 제품을 구매하실 수 있습니다.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', position: 'relative' }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0'
              }}>
                <step.icon size={32} color="var(--red)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: 'var(--navy)' }}>{step.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6 }}>{step.desc}</p>
              
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '-15%',
                  width: '30%',
                  height: '2px',
                  background: 'linear-gradient(to right, var(--red) 0%, transparent 100%)',
                  opacity: 0.2,
                  display: 'none' // Hide on smaller screens or use media query
                }} className="step-arrow" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px',
            background: 'var(--navy)',
            borderRadius: '20px',
            padding: '30px 40px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>정확한 조달 절차가 궁금하신가요?</h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>구매 금액과 수요기관 기준에 따라 절차가 다를 수 있습니다. 조달 전담팀이 친절히 안내해 드립니다.</p>
          </div>
          <a 
            href="https://shop.g2b.go.kr" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: 'var(--red)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.95rem'
            }}
          >
            종합쇼핑몰 바로가기
          </a>
        </motion.div>
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .step-arrow { display: block !important; }
        }
      `}</style>
    </section>
  );
}
