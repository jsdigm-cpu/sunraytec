import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface CaseItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image_url?: string;
}

const REGIONS = ['수도권', '충청권', '강원권', '영남권', '호남권', '제주·기타'];

function getRegion(location: string) {
  if (/서울|인천|경기|수원|부천|양재|영종/.test(location)) return '수도권';
  if (/대전|충청|천안|논산|세종/.test(location)) return '충청권';
  if (/강원|영월|평창/.test(location)) return '강원권';
  if (/부산|대구|울산|경남|경북|포항|함안/.test(location)) return '영남권';
  if (/광주|전남|전북|호남/.test(location)) return '호남권';
  return '제주·기타';
}

export default function CasesMapPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('case_studies')
      .select('id,title,category,location,image_url')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setCases(data as CaseItem[]);
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <section style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #173B68 100%)', color: '#fff', padding: '56px 0 64px' }}>
        <div className="container">
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>홈</Link> › 시공사례
          </p>
          <p style={{ color: 'var(--amber2)', fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Installation Map</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 12 }}>전국 시공 지도</h1>
          <p style={{ maxWidth: 720, color: 'rgba(255,255,255,.68)', lineHeight: 1.8 }}>
            실제 지도 API 연동 전, 시공사례 DB의 위치 정보를 권역별로 정리해 보여주는 지도형 목록 페이지입니다.
          </p>
        </div>
      </section>

      <section style={{ padding: '52px 0 78px' }}>
        <div className="container">
          <div className="case-map-grid">
            {REGIONS.map((region) => {
              const regionCases = cases.filter((item) => getRegion(item.location) === region);
              return (
                <article key={region} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22 }}>
                  <h2 style={{ color: 'var(--navy)', fontSize: '1.2rem', fontWeight: 900, marginBottom: 10 }}>{region}</h2>
                  <p style={{ color: 'var(--red)', fontSize: 12, fontWeight: 900, marginBottom: 14 }}>{regionCases.length}개 현장</p>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {(regionCases.length ? regionCases.slice(0, 5) : [{ id: region, title: '등록 예정 현장', category: '시공사례', location: region }]).map((item) => (
                      <Link key={item.id} to={item.id === region ? '/cases' : `/cases/${item.id}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none', borderTop: '1px solid #EEF2F7', paddingTop: 10 }}>
                        <strong style={{ display: 'block', color: '#1F2937', fontSize: 14, marginBottom: 4 }}>{item.title}</strong>
                        <span style={{ color: '#64748B', fontSize: 12 }}>{item.category} · {item.location}</span>
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .case-map-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 900px) {
          .case-map-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 560px) {
          .case-map-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
