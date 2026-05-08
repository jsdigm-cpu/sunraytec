import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { SiteContent } from '../../types/cms';

interface Props {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
  onSave: () => Promise<string | null>;
  lastSavedAt: string | null;
  lastSaveError: string | null;
}

const FIELD_STYLE: CSSProperties = {
  width: '100%',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  padding: '0.8rem 0.9rem',
  fontSize: '14px',
  background: '#fff',
};

export default function ContentEditor({ content, onChange, onSave, lastSavedAt, lastSaveError }: Props) {
  const [notice, setNotice] = useState('');

  const updateHero = <K extends keyof SiteContent['hero']>(key: K, value: SiteContent['hero'][K]) => {
    onChange({ ...content, hero: { ...content.hero, [key]: value } });
  };

  const saveNow = async () => {
    setNotice('저장 중입니다...');
    const error = await onSave();
    setNotice(error ? `저장 실패: ${error}` : '저장됐습니다. 새로고침/로그아웃 후에도 유지됩니다.');
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
          {lastSaveError && (
            <>
              <br />
              <span style={{ color: '#DC2626', fontWeight: 700 }}>최근 DB 저장 실패: {lastSaveError}</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={saveNow}
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

      {notice && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.75rem 0.9rem',
            borderRadius: '10px',
            background: notice.includes('실패') ? '#FEF2F2' : '#ECFDF5',
            color: notice.includes('실패') ? '#B91C1C' : '#047857',
            border: notice.includes('실패') ? '1px solid #FCA5A5' : '1px solid #A7F3D0',
            fontSize: '0.86rem',
            fontWeight: 700,
          }}
        >
          {notice}
        </div>
      )}

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

        {/* ── 히어로 다이나믹 옵션 ─────────────────────────────────── */}
        <div
          style={{
            marginTop: '0.4rem',
            padding: '1rem 1rem 0.4rem',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            background: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.9rem' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--navy)', background: 'var(--off)', padding: '4px 10px', borderRadius: '999px', border: '1px solid var(--border)' }}>
              ✨ 히어로 다이나믹 옵션
            </span>
            <span style={{ fontSize: '12px', color: 'var(--gray)' }}>변경 즉시 미리보기 반영</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '0.9rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '13px' }}>메인 카피 효과</label>
              <select
                value={content.hero.copyEffect ?? 'none'}
                onChange={(e) => updateHero('copyEffect', e.target.value as SiteContent['hero']['copyEffect'])}
                style={FIELD_STYLE}
              >
                <option value="none">없음 (기본)</option>
                <option value="glow-pulse">글로우 펄스 (강조어 박동)</option>
                <option value="gradient-flow">그라데이션 흐름</option>
                <option value="shimmer">셔머 (반짝임)</option>
                <option value="underline-draw">언더라인 드로우</option>
                <option value="word-reveal">단어별 등장 (라인 stagger)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '13px' }}>배경 오버레이 강도</label>
              <select
                value={content.hero.overlayStrength ?? 'medium'}
                onChange={(e) => updateHero('overlayStrength', e.target.value as SiteContent['hero']['overlayStrength'])}
                style={FIELD_STYLE}
              >
                <option value="light">약하게 (사진 강조)</option>
                <option value="medium">보통</option>
                <option value="dark">진하게 (글자 강조)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '13px' }}>슬라이드 전환 속도</label>
              <select
                value={String(content.hero.slideDurationSec ?? 6)}
                onChange={(e) => updateHero('slideDurationSec', Number(e.target.value) as SiteContent['hero']['slideDurationSec'])}
                style={FIELD_STYLE}
              >
                <option value="4">4초 (빠르게)</option>
                <option value="6">6초 (기본)</option>
                <option value="8">8초</option>
                <option value="10">10초 (천천히)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', marginBottom: '0.4rem' }}>
            {([
              { key: 'autoSlide',      label: '슬라이드 자동 전환' },
              { key: 'showSiteBadge',  label: '좌상단 시공현장 배지 표시' },
              { key: 'showCertBadges', label: '하단 인증 배지(6종) 표시' },
            ] as const).map((toggle) => {
              const active = (content.hero[toggle.key] as boolean | undefined) ?? true;
              return (
                <button
                  key={toggle.key}
                  type="button"
                  onClick={() => updateHero(toggle.key, !active as never)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    padding: '10px 14px',
                    border: '1px solid',
                    borderColor: active ? 'var(--red)' : 'var(--border)',
                    background: active ? 'rgba(220,38,38,0.06)' : '#fff',
                    color: active ? 'var(--navy)' : 'var(--gray)',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span>{toggle.label}</span>
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: '36px',
                      height: '20px',
                      borderRadius: '999px',
                      background: active ? 'var(--red)' : '#CBD5E1',
                      position: 'relative',
                      transition: 'background 0.18s',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '2px',
                        left: active ? '18px' : '2px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#fff',
                        transition: 'left 0.18s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    />
                  </span>
                </button>
              );
            })}
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
            메인 카피는 2~3줄이 가장 안정적입니다. 강조 단어를 비워두면 전체가 같은 색으로 보입니다. 카피 효과 중 "글로우 펄스·그라데이션·셔머·언더라인"은 강조 단어에만 적용되고, "단어별 등장"은 카피 전체에 적용됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
