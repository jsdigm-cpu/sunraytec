import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { School, Factory, PenTool, ArrowRight } from 'lucide-react';

const segments = [
  {
    id: 'public',
    title: '공공기관 · 교육시설',
    subtitle: '조달청 우수제품 & MAS 등록',
    desc: '학교 급식실, 교실, 관공서 청사 등 신뢰가 필요한 공공 공간을 위한 최적의 난방 솔루션을 제안합니다.',
    icon: School,
    color: 'var(--blue)',
    link: '/solutions/public-edu',
    badge: '조달청 우수제품'
  },
  {
    id: 'industrial',
    title: '산업 · 물류 · 군부대',
    subtitle: '대형 공간 에너지 절감 57%',
    desc: '높은 층고의 공장, 물류센터, GOP 초소 등 가혹한 환경에서도 결로 방지와 쾌적한 난방을 보장합니다.',
    icon: Factory,
    color: 'var(--red)',
    link: '/solutions/industrial-logistics',
    badge: '에너지 절감 57%'
  },
  {
    id: 'architect',
    title: '설계 · 감리 · 파트너',
    subtitle: 'CAD 도면 및 시방서 지원',
    desc: '전문가를 위한 상세 기술 자료, 설계 도면, 설치 시방서를 제공하여 완벽한 설계를 돕습니다.',
    icon: PenTool,
    color: 'var(--amber)',
    link: '/resources/spec-cad',
    badge: '전문가 자료실'
  }
];

export default function SegmentEntrySection() {
  return (
    <section style={{ padding: '100px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '20px', color: 'var(--navy)' }}
          >
            누구에게나 꼭 맞는 <span style={{ color: 'var(--red)' }}>난방 솔루션</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}
          >
            방문하신 목적에 따라 최적화된 기술 정보와 조달 가이드를 제공해 드립니다.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {segments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                background: '#F8FAFC',
                borderRadius: '24px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                background: `${segment.color}15`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '32px'
              }}>
                <segment.icon size={32} color={segment.color} />
              </div>

              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '100px',
                background: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                color: segment.color,
                border: `1px solid ${segment.color}30`,
                marginBottom: '16px',
                alignSelf: 'flex-start'
              }}>
                {segment.badge}
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: 'var(--navy)' }}>{segment.title}</h3>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: segment.color, marginBottom: '20px' }}>{segment.subtitle}</p>
              
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: '32px', flex: 1 }}>
                {segment.desc}
              </p>

              <Link 
                to={segment.link} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: 'var(--navy)', 
                  fontWeight: 700, 
                  textDecoration: 'none',
                  fontSize: '1rem'
                }}
              >
                자세히 보기 <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
