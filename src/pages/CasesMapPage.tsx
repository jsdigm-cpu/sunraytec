import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubHero from '../components/layout/SubHero';
import { supabase } from '../lib/supabase';

interface CaseItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image_url?: string;
}

const REGION_CONFIG: Record<string, { color: string; labelX: number; labelY: number }> = {
  '수도권':   { color: '#3B82F6', labelX: 138, labelY: 90 },
  '강원권':   { color: '#10B981', labelX: 270, labelY: 118 },
  '충청권':   { color: '#F59E0B', labelX: 118, labelY: 215 },
  '영남권':   { color: '#EF4444', labelX: 242, labelY: 308 },
  '호남권':   { color: '#8B5CF6', labelX: 108, labelY: 333 },
  '제주·기타':{ color: '#06B6D4', labelX: 145, labelY: 455 },
};

const REGION_PATHS: Record<string, string> = {
  '수도권': 'M 75,40 L 215,35 L 205,158 L 100,162 L 65,142 Z',
  '강원권': 'M 215,35 L 340,55 L 328,208 L 205,202 L 205,158 Z',
  '충청권': 'M 65,142 L 100,162 L 205,158 L 205,202 L 185,268 L 90,272 L 45,257 L 42,198 Z',
  '영남권': 'M 205,202 L 328,208 L 315,392 L 250,417 L 180,412 L 148,377 L 152,272 L 185,268 Z',
  '호남권': 'M 45,257 L 90,272 L 185,268 L 152,272 L 148,377 L 85,402 L 42,382 L 35,318 Z',
};

const STATIC_CASES: CaseItem[] = [
  { id: 'case-001', title: '초등학교 급식실 복사난방', category: '교육 및 공공 복지', location: '경기도' },
  { id: 'case-002', title: '시군구 행정청사 난방 교체', category: '교육 및 공공 복지', location: '전국 지자체' },
  { id: 'case-003', title: '사회복지관 및 노인정 난방', category: '교육 및 공공 복지', location: '수도권·지방' },
  { id: 'case-004', title: '육군 GOP 경계초소 12개 사단', category: '국방 및 특수 시설', location: '전방 지역' },
  { id: 'case-005', title: '탄약고 결로방지 항온 시스템', category: '국방 및 특수 시설', location: '군 시설' },
  { id: 'case-006', title: '㈜가나에너지 공장 난방 교체', category: '산업 및 물류 거점', location: '경기도' },
  { id: 'case-007', title: '차량 소독소 방수 난방 시스템', category: '산업 및 물류 거점', location: '전국' },
  { id: 'case-008', title: '시내버스 승강장 대기공간 난방', category: '스마트 시티 솔루션', location: '도시 지자체' },
  { id: 'case-009', title: '스포츠센터 탈의실 난방', category: '주거 및 라이프 스타일', location: '수도권' },
  { id: 'case-010', title: '대형 물류센터 작업공간 난방', category: '상업 및 서비스 공간', location: '수도권·지방' },
];

function getRegion(location: string): string {
  if (!location) return '제주·기타';
  if (/서울|인천|경기|수원|부천|양재|영종|수도권/.test(location)) return '수도권';
  if (/대전|충청|천안|논산|세종|충남|충북/.test(location)) return '충청권';
  if (/강원|영월|평창|춘천|원주/.test(location)) return '강원권';
  if (/부산|대구|울산|경남|경북|포항|함안|전방|군 시설/.test(location)) return '영남권';
  if (/광주|전남|전북|호남/.test(location)) return '호남권';
  if (/전국|지자체|도시/.test(location)) return '수도권';
  return '제주·기타';
}

const CATEGORY_COLOR: Record<string, string> = {
  '교육 및 공공 복지':    '#3B82F6',
  '국방 및 특수 시설':    '#EF4444',
  '산업 및 물류 거점':    '#F59E0B',
  '스마트 시티 솔루션':   '#10B981',
  '주거 및 라이프 스타일':'#8B5CF6',
  '상업 및 서비스 공간':  '#06B6D4',
};

export default function CasesMapPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) { setCases(STATIC_CASES); return; }
    supabase
      .from('case_studies')
      .select('id,title,category,location,image_url')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setCases(data as CaseItem[]);
        else setCases(STATIC_CASES);
      });
  }, []);

  const allRegions = Object.keys(REGION_CONFIG);

  const regionCounts = Object.fromEntries(
    allRegions.map(region => [region, cases.filter(c => getRegion(c.location) === region).length])
  );

  const selectedCases = selectedRegion
    ? cases.filter(c => getRegion(c.location) === selectedRegion)
    : [];

  const toggleRegion = (region: string) =>
    setSelectedRegion(prev => (prev === region ? null : region));

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SubHero
        breadcrumb={[{ label: '시공사례' }, { label: '전국 시공 지도' }]}
        badge="Installation Map"
        title="전국 시공 지도"
        lead="한반도 권역별로 시공 현장을 확인하세요. 지역을 클릭하면 해당 권역의 납품 사례를 볼 수 있습니다."
        keywords={['전국 시공 현장', '권역별 납품 현황', '공공·민간 실적', '지역별 시공사례']}
      />

      <section style={{ padding: '48px 0 80px' }}>
        <div className="container">
          <div className="map-layout">

            {/* 왼쪽: SVG 지도 + 범례 */}
            <div className="map-left">
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #E5E7EB',
              }}>
                <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px', textAlign: 'center' }}>
                  권역을 클릭하여 시공사례 확인
                </h2>

                {/* SVG 한국 지도 */}
                <svg
                  viewBox="0 0 400 510"
                  style={{ width: '100%', maxWidth: '360px', display: 'block', margin: '0 auto', cursor: 'pointer' }}
                  aria-label="대한민국 권역별 시공 지도"
                >
                  <rect x="0" y="0" width="400" height="510" fill="#EEF6FF" rx="12" />

                  {/* 권역별 폴리곤 */}
                  {Object.entries(REGION_PATHS).map(([region, path]) => {
                    const cfg = REGION_CONFIG[region];
                    const isSelected = selectedRegion === region;
                    const isHovered = hoveredRegion === region;
                    const fillOpacity = isSelected ? 0.9 : isHovered ? 0.72 : 0.52;
                    return (
                      <g key={region}>
                        <path
                          d={path}
                          fill={cfg.color}
                          fillOpacity={fillOpacity}
                          stroke="#fff"
                          strokeWidth={isSelected ? 3 : 1.5}
                          style={{ transition: 'fill-opacity 0.2s, stroke-width 0.2s' }}
                          onClick={() => toggleRegion(region)}
                          onMouseEnter={() => setHoveredRegion(region)}
                          onMouseLeave={() => setHoveredRegion(null)}
                        />
                        <text
                          x={cfg.labelX} y={cfg.labelY - 8}
                          textAnchor="middle"
                          fill={isSelected ? '#fff' : '#1F2937'}
                          fontSize="10" fontWeight="700"
                          style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {region}
                        </text>
                        <circle
                          cx={cfg.labelX} cy={cfg.labelY + 10}
                          r="13"
                          fill={isSelected ? '#fff' : cfg.color}
                          stroke="#fff" strokeWidth="2"
                          style={{ pointerEvents: 'none' }}
                        />
                        <text
                          x={cfg.labelX} y={cfg.labelY + 15}
                          textAnchor="middle"
                          fill={isSelected ? cfg.color : '#fff'}
                          fontSize="9" fontWeight="800"
                          style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {regionCounts[region]}
                        </text>
                      </g>
                    );
                  })}

                  {/* 제주도 (타원) */}
                  {(() => {
                    const region = '제주·기타';
                    const cfg = REGION_CONFIG[region];
                    const isSelected = selectedRegion === region;
                    const isHovered = hoveredRegion === region;
                    const fillOpacity = isSelected ? 0.9 : isHovered ? 0.72 : 0.52;
                    return (
                      <g key={region}>
                        <ellipse
                          cx={145} cy={457} rx={52} ry={20}
                          fill={cfg.color}
                          fillOpacity={fillOpacity}
                          stroke="#fff" strokeWidth={isSelected ? 3 : 1.5}
                          style={{ transition: 'fill-opacity 0.2s', cursor: 'pointer' }}
                          onClick={() => toggleRegion(region)}
                          onMouseEnter={() => setHoveredRegion(region)}
                          onMouseLeave={() => setHoveredRegion(null)}
                        />
                        <text
                          x={cfg.labelX} y={cfg.labelY - 8}
                          textAnchor="middle"
                          fill={isSelected ? '#fff' : '#1F2937'}
                          fontSize="9" fontWeight="700"
                          style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {region}
                        </text>
                        <circle
                          cx={cfg.labelX} cy={cfg.labelY + 8}
                          r="11"
                          fill={isSelected ? '#fff' : cfg.color}
                          stroke="#fff" strokeWidth="2"
                          style={{ pointerEvents: 'none' }}
                        />
                        <text
                          x={cfg.labelX} y={cfg.labelY + 12}
                          textAnchor="middle"
                          fill={isSelected ? cfg.color : '#fff'}
                          fontSize="9" fontWeight="800"
                          style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {regionCounts[region]}
                        </text>
                      </g>
                    );
                  })()}
                </svg>

                {/* 범례 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '20px' }}>
                  {allRegions.map(region => {
                    const cfg = REGION_CONFIG[region];
                    const isActive = selectedRegion === region;
                    return (
                      <button
                        key={region}
                        onClick={() => toggleRegion(region)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '6px 10px', borderRadius: '8px',
                          border: `1.5px solid ${isActive ? cfg.color : '#E5E7EB'}`,
                          background: isActive ? `${cfg.color}18` : 'transparent',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: cfg.color, flexShrink: 0 }} />
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#374151' }}>{region}</span>
                        <span style={{ fontSize: '10px', color: cfg.color, fontWeight: 800, marginLeft: 'auto' }}>
                          {regionCounts[region]}건
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 오른쪽: 사례 목록 패널 */}
            <div className="map-right">
              {!selectedRegion ? (
                <div style={{
                  background: '#fff', borderRadius: '16px', padding: '40px 32px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB',
                  minHeight: '300px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '12px',
                }}>
                  <div style={{ fontSize: '3rem' }}>🗺️</div>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>
                    왼쪽 지도에서 권역을 선택하세요
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#9CA3AF', lineHeight: 1.6 }}>
                    각 권역을 클릭하면 해당 지역의<br />시공사례 목록을 볼 수 있습니다.
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
                    {allRegions.map(r => (
                      <button
                        key={r}
                        onClick={() => setSelectedRegion(r)}
                        style={{
                          padding: '5px 12px', borderRadius: '999px',
                          background: REGION_CONFIG[r].color, color: '#fff',
                          fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer',
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{
                  background: '#fff', borderRadius: '16px', padding: '28px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: `2px solid ${REGION_CONFIG[selectedRegion].color}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        display: 'inline-block', width: '14px', height: '14px', borderRadius: '3px',
                        background: REGION_CONFIG[selectedRegion].color,
                      }} />
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--navy)' }}>
                        {selectedRegion}
                      </h2>
                      <span style={{
                        background: REGION_CONFIG[selectedRegion].color, color: '#fff',
                        fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '999px',
                      }}>
                        {regionCounts[selectedRegion]}개 현장
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedRegion(null)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#9CA3AF' }}
                      aria-label="닫기"
                    >
                      ✕
                    </button>
                  </div>

                  {selectedCases.length === 0 ? (
                    <div style={{ padding: '32px 0', textAlign: 'center', color: '#9CA3AF' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📋</div>
                      <p style={{ fontSize: '0.85rem' }}>해당 권역 사례를 등록 중입니다.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectedCases.map(item => {
                        const catColor = CATEGORY_COLOR[item.category] || '#6B7280';
                        return (
                          <Link
                            key={item.id}
                            to={`/cases/${item.id}`}
                            style={{
                              display: 'block', padding: '14px 16px', borderRadius: '10px',
                              border: '1px solid #F1F5F9', background: '#FAFAFA',
                              textDecoration: 'none', color: 'inherit', transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLAnchorElement).style.background = '#F0F7FF';
                              (e.currentTarget as HTMLAnchorElement).style.borderColor = '#BFDBFE';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLAnchorElement).style.background = '#FAFAFA';
                              (e.currentTarget as HTMLAnchorElement).style.borderColor = '#F1F5F9';
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <span style={{
                                padding: '2px 8px', borderRadius: '4px',
                                background: `${catColor}18`, color: catColor,
                                fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap',
                                marginTop: '1px', flexShrink: 0,
                              }}>
                                {item.category}
                              </span>
                              <div style={{ flex: 1 }}>
                                <strong style={{ display: 'block', color: '#1F2937', fontSize: '0.88rem', lineHeight: 1.4, marginBottom: '3px' }}>
                                  {item.title}
                                </strong>
                                <span style={{ color: '#9CA3AF', fontSize: '11px' }}>📍 {item.location}</span>
                              </div>
                              <span style={{ color: '#D1D5DB', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>›</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '8px', fontWeight: 600 }}>다른 권역 보기</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {allRegions.filter(r => r !== selectedRegion).map(r => (
                        <button
                          key={r}
                          onClick={() => setSelectedRegion(r)}
                          style={{
                            padding: '4px 10px', borderRadius: '999px',
                            background: `${REGION_CONFIG[r].color}15`,
                            border: `1px solid ${REGION_CONFIG[r].color}40`,
                            color: REGION_CONFIG[r].color, fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                          }}
                        >
                          {r} {regionCounts[r]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 전체 현황 요약 */}
              <div style={{
                marginTop: '16px', background: '#fff', borderRadius: '12px',
                padding: '16px 20px', border: '1px solid #E5E7EB',
                display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>전체 시공 현장</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', color: 'var(--navy)', lineHeight: 1 }}>
                    {cases.length}건
                  </div>
                </div>
                <div style={{ width: '1px', height: '36px', background: '#E5E7EB' }} />
                <div style={{ flex: 1, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {allRegions.map(r => (
                    <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: REGION_CONFIG[r].color, display: 'inline-block',
                      }} />
                      <span style={{ fontSize: '11px', color: '#6B7280' }}>
                        {r} <strong style={{ color: REGION_CONFIG[r].color }}>{regionCounts[r]}</strong>
                      </span>
                    </div>
                  ))}
                </div>
                <Link to="/cases" style={{
                  padding: '8px 16px', borderRadius: '8px',
                  background: 'var(--navy)', color: '#fff',
                  fontSize: '12px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
                }}>
                  전체 사례 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .map-layout {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 24px;
          align-items: start;
        }
        .map-left { position: sticky; top: 88px; }
        @media (max-width: 900px) {
          .map-layout { grid-template-columns: 1fr; }
          .map-left { position: static; }
        }
      `}</style>
    </main>
  );
}
