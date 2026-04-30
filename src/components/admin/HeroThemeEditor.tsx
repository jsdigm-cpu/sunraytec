import { useState } from 'react';
import { useHeroTheme } from '../../context/HeroThemeContext';
import { buildGradient, DEFAULT_HERO_THEME } from '../../types/heroTheme';
import type { HeroTheme, OverlayEffect } from '../../types/heroTheme';

const PRESET_THEMES: Array<{ label: string; theme: HeroTheme }> = [
  {
    label: '기본 (군청)',
    theme: DEFAULT_HERO_THEME,
  },
  {
    label: '딥 네이비',
    theme: { gradientAngle: 135, gradientStart: '#060E1F', gradientMid: '#0A1628', gradientEnd: '#040C1A', accentColor: '#E5483A', overlayEffect: 'grid' },
  },
  {
    label: '슬레이트 블루',
    theme: { gradientAngle: 150, gradientStart: '#1E3A5F', gradientMid: '#152D4A', gradientEnd: '#0D1F35', accentColor: '#38BDF8', overlayEffect: 'none' },
  },
  {
    label: '다크 그린',
    theme: { gradientAngle: 160, gradientStart: '#0D2B1F', gradientMid: '#122A1E', gradientEnd: '#091A12', accentColor: '#34D399', overlayEffect: 'glow' },
  },
  {
    label: '차콜',
    theme: { gradientAngle: 180, gradientStart: '#1C1C1E', gradientMid: '#2C2C2E', gradientEnd: '#141416', accentColor: '#F97316', overlayEffect: 'none' },
  },
];

const OVERLAY_OPTIONS: Array<{ value: OverlayEffect; label: string; desc: string }> = [
  { value: 'none',  label: '없음', desc: '순수 그라디언트' },
  { value: 'glow',  label: '글로우', desc: '코너에 은은한 빛 효과' },
  { value: 'grid',  label: '도트 그리드', desc: '미세 점 패턴 오버레이' },
];

export default function HeroThemeEditor() {
  const { theme, setTheme, saveTheme } = useHeroTheme();
  const [draft, setDraft] = useState<HeroTheme>({ ...theme });
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const update = <K extends keyof HeroTheme>(key: K, value: HeroTheme[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: HeroTheme) => {
    setDraft({ ...preset });
  };

  const handleSave = async () => {
    setSaving(true);
    setNotice('');
    const err = await saveTheme(draft);
    setSaving(false);
    setNotice(err ? `저장 실패: ${err}` : '히어로 테마가 저장되었습니다.');
  };

  const handleReset = () => {
    setDraft({ ...DEFAULT_HERO_THEME });
    setNotice('');
  };

  const previewBg = buildGradient(draft);

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: '#111827' }}>
        히어로 섹션 테마 설정
      </h2>

      {/* 라이브 프리뷰 */}
      <div
        style={{
          background: previewBg,
          borderRadius: 12,
          padding: '36px 32px 28px',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 160,
        }}
      >
        {draft.overlayEffect === 'glow' && (
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 15% 50%, rgba(255,120,60,0.13) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
        )}
        {draft.overlayEffect === 'grid' && (
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
            }}
          />
        )}
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: draft.accentColor, marginBottom: 8 }}>
            BADGE EXAMPLE
          </p>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
            서브 페이지 히어로 제목 미리보기
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', margin: '0 0 16px' }}>
            부연 설명 텍스트가 여기 들어갑니다. 색상과 그라디언트 변화를 확인하세요.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['키워드 A', '키워드 B', '키워드 C'].map((kw) => (
              <span
                key={kw}
                style={{
                  padding: '4px 12px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.08)',
                  border: `1px solid ${draft.accentColor}55`,
                  color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600,
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* 왼쪽: 색상 편집 */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>
            그라디언트 색상
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <ColorRow
              label="시작 색상"
              value={draft.gradientStart}
              onChange={(v) => update('gradientStart', v)}
            />
            <ColorRow
              label="중간 색상"
              value={draft.gradientMid}
              onChange={(v) => update('gradientMid', v)}
            />
            <ColorRow
              label="끝 색상"
              value={draft.gradientEnd}
              onChange={(v) => update('gradientEnd', v)}
            />
            <ColorRow
              label="강조 색상 (배지·태그)"
              value={draft.accentColor}
              onChange={(v) => update('accentColor', v)}
            />
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
              그라디언트 각도: {draft.gradientAngle}°
            </label>
            <input
              type="range"
              min={0}
              max={360}
              value={draft.gradientAngle}
              onChange={(e) => update('gradientAngle', Number(e.target.value))}
              style={{ width: '100%', accentColor: '#374151' }}
            />
          </div>
        </div>

        {/* 오른쪽: 효과 + 프리셋 */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>
            오버레이 효과
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {OVERLAY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('overlayEffect', opt.value)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  border: `2px solid ${draft.overlayEffect === opt.value ? '#374151' : '#E5E7EB'}`,
                  borderRadius: 8,
                  background: draft.overlayEffect === opt.value ? '#F3F4F6' : '#fff',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#111827' }}>{opt.label}</span>
                <span style={{ fontSize: '0.78rem', color: '#6B7280', marginLeft: 8 }}>{opt.desc}</span>
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>
            프리셋
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {PRESET_THEMES.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.theme)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #D1D5DB',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: buildGradient(p.theme),
                    flexShrink: 0,
                  }}
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid #E5E7EB', paddingTop: '1.25rem' }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '10px 24px',
            background: saving ? '#9CA3AF' : '#111827',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? '저장 중…' : '전체 페이지에 적용 · 저장'}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 16px',
            background: 'transparent',
            color: '#6B7280',
            border: '1px solid #D1D5DB',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          기본값으로 초기화
        </button>
        {notice && (
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: notice.includes('실패') ? '#DC2626' : '#047857',
            }}
          >
            {notice}
          </span>
        )}
      </div>
    </div>
  );
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 36, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 2 }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>{label}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            fontSize: '0.8rem',
            fontFamily: 'monospace',
            padding: '3px 6px',
            border: '1px solid #E5E7EB',
            borderRadius: 4,
            color: '#374151',
          }}
        />
      </div>
    </div>
  );
}
