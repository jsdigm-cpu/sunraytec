import type { SiteContent } from '../../types/cms';

interface Props {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
}

export default function ContentEditor({ content, onChange }: Props) {
  return (
    <div className="card" style={{ padding: '1rem' }}>
      <h3>히어로 콘텐츠 편집</h3>
      <div style={{ display: 'grid', gap: '0.6rem' }}>
        <input
          value={content.hero.headline}
          onChange={(e) => onChange({ ...content, hero: { ...content.hero, headline: e.target.value } })}
          placeholder="헤드라인"
        />
        <textarea
          value={content.hero.subcopy}
          onChange={(e) => onChange({ ...content, hero: { ...content.hero, subcopy: e.target.value } })}
          rows={4}
          placeholder="서브카피"
        />
        <input
          value={content.hero.primaryCta}
          onChange={(e) => onChange({ ...content, hero: { ...content.hero, primaryCta: e.target.value } })}
          placeholder="1차 CTA"
        />
        <input
          value={content.hero.secondaryCta}
          onChange={(e) => onChange({ ...content, hero: { ...content.hero, secondaryCta: e.target.value } })}
          placeholder="2차 CTA"
        />
      </div>
    </div>
  );
}
