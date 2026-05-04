import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';
import { Wind, VolumeX, Sun, CloudOff, ShieldCheck } from 'lucide-react';

const ZERO_ITEMS = [
  {
    icon: Wind,
    title: '무바람 (No Wind)',
    desc: '팬에 의한 강제 공기 순환이 없어 비산 먼지나 기류 발생이 없습니다. 호흡기 건강과 정밀한 환경 유지에 최적입니다.',
    color: '#38BDF8'
  },
  {
    icon: VolumeX,
    title: '무소음 (No Noise)',
    desc: '가열 시 소음이 거의 발생하지 않아 학교 교실, 도서관, 병원 등 정숙함이 필수적인 공간에 매우 적합합니다.',
    color: '#818CF8'
  },
  {
    icon: Sun,
    title: '무빛 (No Light)',
    desc: '야간에도 눈부심이 전혀 없어 숙면을 방해하지 않으며, 군부대 초소 등 야간 보안이 중요한 장소에서 탁월합니다.',
    color: '#FBBF24'
  },
  {
    icon: CloudOff,
    title: '무분진 (No Dust)',
    desc: '공기 가열 방식이 아니므로 실내가 건조해지지 않고, 미세먼지와 세균 확산을 원천적으로 차단합니다.',
    color: '#94A3B8'
  },
  {
    icon: ShieldCheck,
    title: '무가스 (No Gas)',
    desc: '연소 과정이 없는 전기 에너지 기반으로 유해가스 배출이 없으며, 산소 결핍 걱정 없는 청정 난방을 실현합니다.',
    color: '#34D399'
  }
];

export default function ZeroSection() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '100px 0', overflow: 'hidden' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: 'var(--amber2)', marginBottom: '16px', textTransform: 'uppercase' }}>
            Core Philosophy
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
            사람을 향한 <span style={{ color: 'var(--red-light)' }}>5無(No) 원칙</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '16px', fontSize: '1.1rem' }}>
            태양의 원리를 그대로 담아, 더 쾌적하고 건강한 공간을 만듭니다.
          </p>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {ZERO_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                padding: '32px 24px',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: `${item.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                color: item.color
              }}>
                <item.icon size={32} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
