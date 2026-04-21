import type { CSSProperties } from 'react';
import type { SiteContent } from '../../types/cms';

interface Props {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
  onSave: () => void;
  lastSavedAt: string | null;
}

const FIELD_STYLE: CSSProperties = {
  width: '100%',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  padding: '0.8rem 0.9rem',
  fontSize: '14px',
  background: '#fff',
};

export default function ContentEditor({ content, onChange, onSave, lastSavedAt }: Props) {
  const updateHero = <K extends keyof SiteContent['hero']>(key: K, value: SiteContent['hero'][K]) => {
    onChange({ ...content, hero: { ...content.hero, [key]: value } });
  };

  return (
    <div className="card" style={{ padding: '1rem' }}>
      <h3>히어로 콘텐츠 편집</h3>
      <p style={{ marginTop: '0.35rem', marginBottom: '1rem', color: 'var(--gray)' }}>
        메인 카피를 여러 줄로 입력하고, 글자체/크기/굵기/강조 단어 색상까지 바로 조절할 수 있습니다.
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '1rem',
          padding: '0.8rem 0.9rem',
          borderRadius: '12px',
          background: 'var(--off)',
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--gray)' }}>
          자동 저장이 켜져 있습니다.
          <br />
          {lastSavedAt
            ? `마지막 저장: ${new Date(lastSavedAt).toLocaleString('ko-KR')}`
            : '아직 저장 기록이 없습니다.'}
        </div>
        <button
          type="button"
          onClick={onSave}
          style={{
            border: 'none',
            background: 'var(--red)',
            color: '#fff',
            fontWeight: 700,
            borderRadius: '10px',
            padding: '0.8rem 1rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          지금 저장
        </button>
      </div>

      <div style={{ display: 'grid', gap: '0.9rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>메인 카피</label>
          <textarea
            value={content.hero.headline}
            onChange={(e) => updateHero('headline', e.target.value)}
            rows={4}
            placeholder={'메인 카피를 2~3줄로 입력하세요.\n줄바꿈은 Enter로 넣을 수 있습니다.'}
            style={{ ...FIELD_STYLE, lineHeight: 1.6, resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>서브 카피</label>
          <textarea
            value={content.hero.subcopy}
            onChange={(e) => updateHero('subcopy', e.target.value)}
            rows={4}
            placeholder="서브카피 (줄바꿈 가능)"
            style={{ ...FIELD_STYLE, lineHeight: 1.6, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>폰트 스타일</label>
            <select
              value={content.hero.headlineFontFamily}
              onChange={(e) => updateHero('headlineFontFamily', e.target.value as SiteContent['hero']['headlineFontFamily'])}
              style={FIELD_STYLE}
            >
              <option value="display">강한 제목형</option>
              <option value="sans">깔끔한 본문형</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>글자 크기</label>
            <select
              value={content.hero.headlineFontSize}
              onChange={(e) => updateHero('headlineFontSize', e.target.value as SiteContent['hero']['headlineFontSize'])}
              style={FIELD_STYLE}
            >
              <option value="md">보통</option>
              <option value="lg">크게</option>
              <option value="xl">아주 크게</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>글자 굵기</label>
            <select
              value={content.hero.headlineFontWeight}
              onChange={(e) => updateHero('headlineFontWeight', e.target.value as SiteContent['hero']['headlineFontWeight'])}
              style={FIELD_STYLE}
            >
              <option value="bold">굵게</option>
              <option value="black">아주 굵게</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) 120px', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>강조할 핵심 단어</label>
            <input
              value={content.hero.highlightText}
              onChange={(e) => updateHero('highlightText', e.target.value)}
              placeholder="예: 양지처럼"
              style={FIELD_STYLE}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>강조 색상</label>
            <input
              type="color"
              value={content.hero.highlightColor}
              onChange={(e) => updateHero('highlightColor', e.target.value)}
              style={{ ...FIELD_STYLE, padding: '0.3rem', minHeight: '46px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>1차 CTA 문구</label>
            <input
              value={content.hero.primaryCta}
              onChange={(e) => updateHero('primaryCta', e.target.value)}
              placeholder="1차 CTA 문구"
              style={FIELD_STYLE}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>2차 CTA 문구</label>
            <input
              value={content.hero.secondaryCta}
              onChange={(e) => updateHero('secondaryCta', e.target.value)}
              placeholder="2차 CTA 문구"
              style={FIELD_STYLE}
            />
          </div>
        </div>

        <div
          style={{
            background: 'var(--off)',
            border: '1px dashed var(--border)',
            borderRadius: '12px',
            padding: '0.9rem 1rem',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gray)', marginBottom: '0.4rem' }}>편집 팁</div>
          <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.7 }}>
            메인 카피는 2~3줄이 가장 안정적입니다. 강조 단어를 비워두면 전체가 같은 색으로 보입니다.
          </div>
        </div>
      </div>
    </div>
  );
}
