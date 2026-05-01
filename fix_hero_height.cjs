/**
 * 히어로 섹션 높이 통일 스크립트
 * 1) children을 사용하던 페이지들: children 제거 → keywords로 전환 or 본문으로 이동
 * 2) 높이 부족 페이지: keywords 추가
 * 3) 기술 페이지: SubHero 적용
 */
const fs = require('fs');
const path = require('path');

function norm(s) { return s.replace(/\r\n/g, '\n'); }
function write(file, content) { fs.writeFileSync(file, content, 'utf8'); }

// ─── CeoMessagePage.tsx: KPI children → keywords ───
{
  const file = path.join(__dirname, 'src/pages/about/CeoMessagePage.tsx');
  let c = norm(fs.readFileSync(file, 'utf8'));
  
  // Replace SubHero with children → SubHero with keywords
  const old = `      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: 'CEO 메시지' }]}
        badge="CEO Message"
        title="원적외선 복사난방의 기준을 세우는 기업"
        lead="(주)썬레이텍은 2009년 법인 설립 이후 원적외선 복사난방 한 분야에 집중해 온 전문기업입니다. 2002년부터 이어진 기술개발 경험과 공공·산업·교육·국방 현장 적용 경험을 바탕으로 '바람 없이 따뜻한 공간'을 만들고 있습니다."
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 32, paddingBottom: 32 }}>
          {KPIS.map((k) => (
            <div key={k.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>{k.value}</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{k.label}</span>
            </div>
          ))}
        </div>
      </SubHero>`;

  const rep = `      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: 'CEO 메시지' }]}
        badge="CEO Message"
        title="원적외선 복사난방의 기준을 세우는 기업"
        lead="(주)썬레이텍은 2009년 법인 설립 이후 원적외선 복사난방 한 분야에 집중해 온 전문기업입니다. 2002년부터 이어진 기술개발 경험과 공공·산업·교육·국방 현장 적용 경험을 바탕으로 '바람 없이 따뜻한 공간'을 만들고 있습니다."
        keywords={['2009년 법인 설립', '2002년 기술개발 시작', '우수제품 3회 지정', '등록 특허 10건']}
      />`;

  if (c.includes(old)) {
    c = c.replace(old, rep);
    write(file, c);
    console.log('✅ CeoMessagePage.tsx');
  } else {
    console.log('⚠️ CeoMessagePage.tsx — 매칭 실패');
  }
}

// ─── CertificationsPage.tsx: CERT_METRICS children → keywords + 본문 섹션 추가 ───
{
  const file = path.join(__dirname, 'src/pages/about/CertificationsPage.tsx');
  let c = norm(fs.readFileSync(file, 'utf8'));
  
  // Remove children block from SubHero
  const oldSubHero = /      <SubHero\n        breadcrumb=\{\[\{ label: '회사소개' \}, \{ label: '인증·특허' \}\]\}\n        badge="Certifications & Patents"\n        title="인증 · 특허"\n        lead="조달청 우수제품 3회 지정, 10건 등록 특허, ISO·CE·KC·방폭 인증까지. 원적외선 복사난방 기술력을 수치로 입증합니다."\n      >\n[\s\S]*?      <\/SubHero>/;
  
  const newSubHero = `      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: '인증·특허' }]}
        badge="Certifications & Patents"
        title="인증 · 특허"
        lead="조달청 우수제품 3회 지정, 10건 등록 특허, ISO·CE·KC·방폭 인증까지. 원적외선 복사난방 기술력을 수치로 입증합니다."
        keywords={['우수제품 3회 지정', '등록 특허 10건', 'ISO 국제인증 2종', '인증·시험성적서 15건+']}
      />

      {/* 핵심 수치 바 (히어로에서 본문으로 이동) */}
      <section style={{ background: '#0D1B2E', padding: 0 }}>
        <div className="container">
          <div className="cert-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {CERT_METRICS.map((m, i) => (
              <div key={m.label} style={{
                padding: '28px 20px',
                borderRight: i < CERT_METRICS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  color: m.color,
                  lineHeight: 1, marginBottom: '6px',
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '3px' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`;

  if (c.match(oldSubHero)) {
    c = c.replace(oldSubHero, newSubHero);
    write(file, c);
    console.log('✅ CertificationsPage.tsx');
  } else {
    console.log('⚠️ CertificationsPage.tsx — 매칭 실패');
  }
}

// ─── HistoryPage.tsx: metrics children → keywords + 본문 섹션 ───
{
  const file = path.join(__dirname, 'src/pages/about/HistoryPage.tsx');
  let c = norm(fs.readFileSync(file, 'utf8'));
  
  const oldSubHero = /      <SubHero\n        breadcrumb=\{\[\{ label: '회사소개' \}, \{ label: '회사 연혁' \}\]\}\n        badge="Company History"\n        title="회사 연혁"\n        lead="2002년 기술개발 시작, 2009년 법인 설립 이후 조달청 우수제품 3회 지정으로 검증된 20년 이상의 전문 기술 역량"\n      >\n[\s\S]*?      <\/SubHero>/;
  
  const newSubHero = `      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: '회사 연혁' }]}
        badge="Company History"
        title="회사 연혁"
        lead="2002년 기술개발 시작, 2009년 법인 설립 이후 조달청 우수제품 3회 지정으로 검증된 20년 이상의 전문 기술 역량"
        keywords={['2002년 기술개발 시작', '2009년 법인 설립', '우수제품 3회 지정', '등록 특허 10건']}
      />

      {/* 핵심 연혁 수치 바 (히어로에서 본문으로 이동) */}
      <section style={{ background: '#0D1B2E', padding: 0 }}>
        <div className="container">
          <div className="history-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { value: '2002', label: '기술개발 시작', sub: '복사난방 R&D 착수', color: '#fff' },
              { value: '2009', label: '법인 설립',     sub: '2009년 12월 22일', color: '#fff' },
              { value: '3회',  label: '우수제품 지정', sub: '2013·2019·2025년', color: 'var(--red)' },
              { value: '10건', label: '등록 특허',     sub: '특허 9건+디자인 1건', color: '#fff' },
            ].map((m, i) => (
              <div key={m.label} style={{
                padding: '28px 20px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  color: m.color, lineHeight: 1, marginBottom: '6px',
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '3px' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`;

  if (c.match(oldSubHero)) {
    c = c.replace(oldSubHero, newSubHero);
    write(file, c);
    console.log('✅ HistoryPage.tsx');
  } else {
    console.log('⚠️ HistoryPage.tsx — 매칭 실패');
  }
}

// ─── CasesPage.tsx: HERO_STATS children → keywords + 본문 섹션 ───
{
  const file = path.join(__dirname, 'src/pages/CasesPage.tsx');
  let c = norm(fs.readFileSync(file, 'utf8'));
  
  const oldSubHero = /      <SubHero\n        breadcrumb=\{\[\{ label: '시공사례' \}\]\}\n        badge="Delivery Records"\n        title="시공사례"\n        lead="군부대·학교·공장·복지시설까지\. 우수제품 지정 이후 전국 공공·민간 현장에 검증된 납품 실적입니다\."\n      >\n[\s\S]*?      <\/SubHero>/;
  
  const newSubHero = `      <SubHero
        breadcrumb={[{ label: '시공사례' }]}
        badge="Delivery Records"
        title="시공사례"
        lead="군부대·학교·공장·복지시설까지. 우수제품 지정 이후 전국 공공·민간 현장에 검증된 납품 실적입니다."
        keywords={['공공·교육 시설', '국방·특수 환경', '산업·물류 거점', '스마트시티 솔루션']}
      />

      {/* 히어로 KPI 수치 (본문으로 이동) */}
      <section style={{ background: '#0D1B2E', padding: 0 }}>
        <div className="container">
          <div className="hero-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {HERO_STATS.map((s, i) => (
              <div key={s.label} style={{
                padding: '28px 20px',
                borderRight: i < HERO_STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  color: i === 2 ? 'var(--red)' : '#fff',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: '3px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3px' }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`;

  if (c.match(oldSubHero)) {
    c = c.replace(oldSubHero, newSubHero);
    write(file, c);
    console.log('✅ CasesPage.tsx');
  } else {
    console.log('⚠️ CasesPage.tsx — 매칭 실패');
  }
}

// ─── FaqPage.tsx: QUICK_FACTS children → keywords + 본문 섹션 ───
{
  const file = path.join(__dirname, 'src/pages/support/FaqPage.tsx');
  let c = norm(fs.readFileSync(file, 'utf8'));
  
  const oldSubHero = /      <SubHero\n        breadcrumb=\{\[\{ label: '고객센터' \}, \{ label: 'FAQ' \}\]\}\n        badge="FAQ"\n        title="자주 묻는 질문"\n        lead=\{"제품·견적·시공·유지관리·공공조달까지 자주 받는 질문 " \+ FAQS\.length \+ "개를 카테고리별로 정리했습니다\."\}\n      >\n[\s\S]*?      <\/SubHero>/;
  
  const newSubHero = `      <SubHero
        breadcrumb={[{ label: '고객센터' }, { label: 'FAQ' }]}
        badge="FAQ"
        title="자주 묻는 질문"
        lead={"제품·견적·시공·유지관리·공공조달까지 자주 받는 질문 " + FAQS.length + "개를 카테고리별로 정리했습니다."}
        keywords={['제품·기술', '견적·구매', '시공·납기', '유지·보증', '공공조달']}
      />

      {/* 빠른 확인 카드 (히어로에서 본문으로 이동) */}
      <section style={{ background: '#0D1B2E', padding: 0 }}>
        <div className="container">
          <div className="faq-quick-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {QUICK_FACTS.map((f, i) => (
              <div key={f.label} style={{
                padding: '22px 20px', textAlign: 'center',
                borderRight: i < QUICK_FACTS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{f.icon}</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: i === 1 ? 'var(--red)' : '#fff',
                  lineHeight: 1, marginBottom: '4px',
                }}>
                  {f.label}
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: '2px' }}>
                  {f.desc}
                </div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>
                  {f.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>`;

  if (c.match(oldSubHero)) {
    c = c.replace(oldSubHero, newSubHero);
    write(file, c);
    console.log('✅ FaqPage.tsx');
  } else {
    console.log('⚠️ FaqPage.tsx — 매칭 실패');
  }
}

// ─── ClientsPage.tsx: TRUST_NUMBERS children → keywords ───
{
  const file = path.join(__dirname, 'src/pages/about/ClientsPage.tsx');
  let c = norm(fs.readFileSync(file, 'utf8'));
  
  const old = `      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: '주요 납품처' }]}
        badge="Reference Clients"
        title="2,000곳 이상의 현장에서 검증된 복사난방"
        lead="학교 교실에서부터 물류센터, 군 시설, 도심 스마트 버스정류장까지. (주)썬레이텍은 공간의 용도와 사용자에 맞춰 복사난방을 설계하고 시공해 왔습니다."
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 30, paddingBottom: 32 }}>
          {TRUST_NUMBERS.map((n) => (
            <div key={n.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: '1.7rem', fontWeight: 900, color: '#fff' }}>{n.value}</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{n.label}</span>
            </div>
          ))}
        </div>
      </SubHero>`;

  const rep = `      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: '주요 납품처' }]}
        badge="Reference Clients"
        title="2,000곳 이상의 현장에서 검증된 복사난방"
        lead="학교 교실에서부터 물류센터, 군 시설, 도심 스마트 버스정류장까지. (주)썬레이텍은 공간의 용도와 사용자에 맞춰 복사난방을 설계하고 시공해 왔습니다."
        keywords={['2,000+ 누적 시공', '13년+ 조달청 공급', 'K마크 6종 인증', '특허·디자인 10건']}
      />`;

  if (c.includes(old)) {
    c = c.replace(old, rep);
    write(file, c);
    console.log('✅ ClientsPage.tsx');
  } else {
    console.log('⚠️ ClientsPage.tsx — 매칭 실패');
  }
}

console.log('\n✅ Phase 1 (children → keywords/본문이동) 완료!');
