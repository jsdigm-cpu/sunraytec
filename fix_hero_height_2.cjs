/**
 * Phase 2: keywords 추가 + 기술 페이지 SubHero 적용
 */
const fs = require('fs');
const path = require('path');

function norm(s) { return s.replace(/\r\n/g, '\n'); }
function write(f, c) { fs.writeFileSync(f, c, 'utf8'); }

const SRC = path.join(__dirname, 'src/pages');

// ── keywords 추가할 페이지 목록 ──
const keywordsToAdd = [
  {
    file: 'ContactPage.tsx',
    search: `        lead="전문가가 직접 상담해 드립니다"`,
    replace: `        lead="전문가가 직접 상담해 드립니다"\n        keywords={['전문가 직접 상담', '대표전화 1688-2520', '48시간 내 회신', '무료 현장 방문 가능']}`,
  },
  {
    file: 'ProductPage.tsx',
    search: `        lead="공공조달과 현장 용도에 맞는 복사난방 제품을 한눈에 비교해보세요. 우수제품과 MAS 다수공급자계약 제품을 구분해 정리했으며, 각 모델의 상세 사양과 적용 정보를 바로 확인할 수 있습니다."`,
    replace: `        lead="공공조달과 현장 용도에 맞는 복사난방 제품을 한눈에 비교해보세요. 우수제품과 MAS 다수공급자계약 제품을 구분해 정리했으며, 각 모델의 상세 사양과 적용 정보를 바로 확인할 수 있습니다."\n        keywords={['우수제품 3회 지정', 'MAS 다수공급자', '매립형·노출형', '총 18개 모델']}`,
  },
  {
    file: 'support/NoticePage.tsx',
    search: `        lead="제품·자료·조달·전시회·홈페이지 운영과 관련된 주요 안내를 모았습니다."`,
    replace: `        lead="제품·자료·조달·전시회·홈페이지 운영과 관련된 주요 안내를 모았습니다."\n        keywords={['제품 업데이트', '조달 공고 안내', '전시회 일정', '홈페이지 변경사항']}`,
  },
  {
    file: 'support/DealersPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['대리점 모집', '시공사 협력', '교육·지원 프로그램', '파트너 전용 포털']}\n`,
  },
  {
    file: 'support/ChatbotPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['24시간 자동 응답', '제품 사양 안내', '견적 요청 연결', '기술 문의 지원']}\n`,
  },
  {
    file: 'CasesMapPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['전국 시공 현장', '카테고리별 검색', '지역별 납품 현황', '공공·민간 실적']}\n`,
  },
  {
    file: 'FastTrackPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['담당자 전용', '기술 자료 패키지', '일위대가표·시방서', '견적 우선 검토']}\n`,
  },
  {
    file: 'about/LocationPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['충남 천안시 서북구', '본사·공장 일체형', '대표전화 1688-2520', '방문 상담 가능']}\n`,
  },
  {
    file: 'about/MediaPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['언론 보도', '수상 실적', '방송 출연', '전시회 참가']}\n`,
  },
  {
    file: 'policy/TermsPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['서비스 이용', '회원 약관', '책임 및 의무', '기타 규정']}\n`,
  },
  {
    file: 'policy/PrivacyPolicyPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['개인정보 수집', '이용 목적', '보관 기간', '제3자 제공']}\n`,
  },
  {
    file: 'partner/PartnerSignupGuidePage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['파트너 등록 절차', '회원 등급 안내', '자료 열람 권한', '전용 기술 지원']}\n`,
  },
  {
    file: 'products/ExcellenceProductsPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['2013·2019·2025 지정', '조달청 수의계약', '매립형·노출형', '나라장터 검색']}\n`,
  },
  {
    file: 'products/MasProductsPage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['MAS 다수공급자', '종합쇼핑몰 등록', '매립형·노출형', '규격·수량 협의']}\n`,
  },
  {
    file: 'products/ProductGuidePage.tsx',
    search: /lead="[^"]*"\n/,
    addKeywords: `        keywords={['제품 선정 가이드', '설치 방식 비교', '공간별 추천', '용량 산출 기준']}\n`,
  },
];

keywordsToAdd.forEach(({ file, search, replace, addKeywords }) => {
  const filePath = path.join(SRC, file);
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️ ${file} — 파일 없음`);
    return;
  }
  let c = norm(fs.readFileSync(filePath, 'utf8'));
  
  // Skip if already has keywords
  if (c.includes('keywords={')) {
    console.log(`⏭️ ${file} — 이미 keywords 있음`);
    return;
  }

  if (typeof search === 'string' && replace) {
    if (c.includes(search)) {
      c = c.replace(search, replace);
      write(filePath, c);
      console.log(`✅ ${file}`);
    } else {
      console.log(`⚠️ ${file} — 문자열 매칭 실패`);
    }
  } else if (search instanceof RegExp && addKeywords) {
    // Find the lead= line and add keywords after it
    const match = c.match(search);
    if (match) {
      c = c.replace(search, match[0] + addKeywords);
      write(filePath, c);
      console.log(`✅ ${file}`);
    } else {
      console.log(`⚠️ ${file} — regex 매칭 실패`);
    }
  }
});

console.log('\n✅ Phase 2 (keywords 추가) 완료!');
