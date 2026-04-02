import { Link } from 'react-router-dom';
import type { HeroContent } from '../../types/cms';

interface Props {
  hero: HeroContent;
}

export default function HeroSection({ hero }: Props) {
  return (
    <section style={{ padding: '5rem 0 3rem', background: 'linear-gradient(120deg, #fff7ed, #fff)' }}>
      <div className="container">
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.25, marginBottom: '1rem' }}>{hero.headline}</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: 760 }}>{hero.subcopy}</p>
        <div style={{ marginTop: '1.6rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary">
            {hero.primaryCta}
          </Link>
          <a href="mailto:master@sunraytec.net" className="btn btn-outline">
            {hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
