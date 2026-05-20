import { Link } from 'react-router-dom';
import { ArrowRight, CloudOff, Gauge, ShieldCheck, VolumeX } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

const POINTS = [
  {
    icon: Gauge,
    title: '높은 천장과 넓은 공간',
    body: '열이 천장에 머무르기 쉬운 공간에서는 필요한 위치의 체감 온도를 안정적으로 만드는 것이 중요합니다.',
  },
  {
    icon: CloudOff,
    title: '바람과 분진 관리',
    body: '팬 바람을 전제로 하지 않아 급식실, 교실, 정밀 작업장처럼 공기 흐름이 민감한 공간에서 검토하기 좋습니다.',
  },
  {
    icon: VolumeX,
    title: '소음과 빛 부담',
    body: '난방 중 붉은 발광을 전제로 하지 않는 방식이라 수업, 근무, 야간 보안 환경에서 오해 없이 사용할 수 있습니다.',
  },
  {
    icon: ShieldCheck,
    title: '자료 기반 검토',
    body: '방사율, 항균·탈취, 방폭, 방진·방수 등 필요한 자료를 확인하고 현장 조건에 맞춰 비교할 수 있습니다.',
  },
];

export default function CompareSection() {
  return (
    <section style={{ background: 'var(--off)', padding: '72px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp}>
          <div className="compare-intro">
            <div>
              <p className="section-eyebrow">핵심 차이</p>
              <h2>복사난방과 대류난방은 열이 움직이는 방식이 다릅니다</h2>
            </div>
            <p>
              모든 난방 방식에는 맞는 현장이 있습니다. 썬레이텍은 높은 천장, 바람과 분진, 소음과 빛 부담이
              중요한 공간에서 복사난방이 왜 검토되는지 차분하게 설명합니다.
            </p>
          </div>

          <div className="compare-diagram" aria-label="복사난방과 대류난방 열 전달 방식 비교">
            <article className="diagram-panel radiant">
              <div className="panel-heading">
                <span>복사난방</span>
                <strong>필요한 위치로 직접 전달</strong>
              </div>
              <div className="room">
                <div className="ceiling-panel" />
                <div className="radiant-rays">
                  <i style={{ ['--x' as string]: '18%', ['--r' as string]: '-18deg' }} />
                  <i style={{ ['--x' as string]: '36%', ['--r' as string]: '-8deg' }} />
                  <i style={{ ['--x' as string]: '50%', ['--r' as string]: '0deg' }} />
                  <i style={{ ['--x' as string]: '64%', ['--r' as string]: '8deg' }} />
                  <i style={{ ['--x' as string]: '82%', ['--r' as string]: '18deg' }} />
                </div>
                <div className="comfort-zone">
                  <span>작업자·학생이 머무는 영역</span>
                </div>
              </div>
              <p>바람보다 체감 온도와 공간 조건에 집중합니다.</p>
            </article>

            <article className="diagram-panel convection">
              <div className="panel-heading">
                <span>대류난방</span>
                <strong>공기를 순환시켜 데우는 방식</strong>
              </div>
              <div className="room">
                <div className="air-unit" />
                <div className="air-loop loop-one" />
                <div className="air-loop loop-two" />
                <div className="warm-layer">따뜻한 공기 상승</div>
                <div className="floor-note">체감 영역까지 도달하려면 조건 검토 필요</div>
              </div>
              <p>공간 구조와 층고에 따라 효율 차이가 생길 수 있습니다.</p>
            </article>
          </div>

          <div className="compare-points">
            {POINTS.map((point) => (
              <article key={point.title}>
                <span>
                  <point.icon size={18} />
                </span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </article>
            ))}
          </div>

          <Link to="/technology/principle" className="summary-link">
            복사난방 원리 자세히 보기 <ArrowRight size={17} />
          </Link>
        </ScrollReveal>
      </div>

      <style>{`
        .compare-intro {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(280px, 0.75fr);
          gap: clamp(24px, 4vw, 56px);
          align-items: end;
          margin-bottom: 32px;
        }

        .section-eyebrow {
          margin-bottom: 10px;
          color: var(--red);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .compare-intro h2 {
          max-width: 760px;
          color: var(--navy);
          font-size: clamp(1.9rem, 3.6vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.045em;
          line-height: 1.18;
          text-wrap: balance;
        }

        .compare-intro p {
          color: #475569;
          font-size: 0.98rem;
          line-height: 1.82;
        }

        .compare-diagram {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .diagram-panel {
          overflow: hidden;
          border-radius: 26px;
          background: #fff;
          border: 1px solid var(--border);
          box-shadow: 0 22px 64px rgba(15,23,42,0.1);
        }

        .panel-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 22px 0;
        }

        .panel-heading span {
          display: inline-flex;
          border-radius: 999px;
          padding: 6px 11px;
          font-size: 12px;
          font-weight: 850;
        }

        .radiant .panel-heading span {
          background: rgba(220,38,38,0.08);
          color: var(--red);
        }

        .convection .panel-heading span {
          background: rgba(37,99,235,0.08);
          color: var(--blue);
        }

        .panel-heading strong {
          color: var(--navy);
          font-size: 1rem;
          font-weight: 850;
          line-height: 1.35;
          text-align: right;
        }

        .room {
          height: 300px;
          position: relative;
          margin: 20px 22px 18px;
          border-radius: 22px;
          border: 1px solid rgba(15,23,42,0.08);
          background:
            linear-gradient(180deg, rgba(248,250,252,0.98), rgba(255,255,255,0.96)),
            linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px);
          background-size: auto, 58px 58px;
        }

        .diagram-panel > p {
          min-height: 48px;
          padding: 0 22px 22px;
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.7;
        }

        .ceiling-panel {
          position: absolute;
          left: 50%;
          top: 30px;
          width: min(220px, 58%);
          height: 16px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: #cbd5e1;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.75);
        }

        .radiant-rays {
          position: absolute;
          inset: 62px 11% 82px;
        }

        .radiant-rays i {
          --x: 50%;
          --r: 0deg;
          position: absolute;
          top: 0;
          left: var(--x);
          width: 2px;
          height: 150px;
          transform-origin: top center;
          transform: translateX(-50%) rotate(var(--r));
          background: linear-gradient(180deg, rgba(245,158,11,0.22), rgba(220,38,38,0.36), rgba(245,158,11,0.04));
          border-radius: 999px;
        }

        .radiant-rays i::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 8px;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          transform: translateX(-50%);
          background: rgba(245,158,11,0.45);
        }

        .comfort-zone {
          position: absolute;
          left: 12%;
          right: 12%;
          bottom: 36px;
          height: 54px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(245,158,11,0.18), rgba(220,38,38,0.18));
          border: 1px solid rgba(245,158,11,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7f1d1d;
          font-size: 13px;
          font-weight: 850;
        }

        .air-unit {
          position: absolute;
          left: 50%;
          top: 34px;
          width: 88px;
          height: 38px;
          transform: translateX(-50%);
          border-radius: 14px;
          background: #e2e8f0;
          border: 1px solid #cbd5e1;
        }

        .air-unit::after {
          content: '';
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 8px;
          height: 4px;
          border-radius: 999px;
          background: #94a3b8;
        }

        .air-loop {
          position: absolute;
          border: 3px dashed rgba(37,99,235,0.38);
          border-radius: 999px;
        }

        .loop-one {
          left: 12%;
          top: 76px;
          width: 46%;
          height: 140px;
          transform: rotate(-18deg);
        }

        .loop-two {
          right: 12%;
          top: 76px;
          width: 46%;
          height: 140px;
          transform: rotate(18deg);
        }

        .warm-layer {
          position: absolute;
          left: 10%;
          right: 10%;
          top: 92px;
          border-radius: 999px;
          padding: 10px 14px;
          background: rgba(37,99,235,0.08);
          color: var(--blue);
          text-align: center;
          font-size: 13px;
          font-weight: 850;
        }

        .floor-note {
          position: absolute;
          left: 12%;
          right: 12%;
          bottom: 36px;
          border-radius: 18px;
          padding: 14px 16px;
          background: rgba(15,23,42,0.86);
          color: rgba(255,255,255,0.82);
          text-align: center;
          font-size: 12px;
          line-height: 1.55;
          font-weight: 700;
        }

        .compare-points {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-top: 20px;
        }

        .compare-points article {
          display: grid;
          grid-template-columns: 38px minmax(0, 1fr);
          gap: 12px;
          padding: 18px;
          border-radius: 18px;
          background: rgba(255,255,255,0.72);
          border: 1px solid var(--border);
        }

        .compare-points article > span {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: rgba(220,38,38,0.08);
          color: var(--red);
        }

        .compare-points h3 {
          margin-bottom: 5px;
          color: var(--navy);
          font-size: 0.94rem;
          font-weight: 850;
          line-height: 1.4;
        }

        .compare-points p {
          color: #64748b;
          font-size: 0.84rem;
          line-height: 1.65;
        }

        .summary-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          color: var(--red);
          font-weight: 850;
        }

        @media (max-width: 980px) {
          .compare-intro,
          .compare-diagram,
          .compare-points {
            grid-template-columns: 1fr;
          }

          .room {
            height: 260px;
          }
        }
      `}</style>
    </section>
  );
}
