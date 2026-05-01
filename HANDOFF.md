# 핸드오프 문서

> 박이사님이 자리 비운 사이 진행한 작업의 인계 문서. 다음 세션에서 컨텍스트 복원용.

## 최종 업데이트
- 일시: 2026-05-01 (오후 자율 작업 세션)
- 작업자: Claude (Opus 4.7)
- 시작 브랜치: `claude/gracious-einstein-ff21b2`

---

## ✅ 완료된 작업

### 1. 제품 사진 일괄 업로드 시스템 구축 (PR #5 머지됨)
- `src/scripts/uploadProductImages.ts` 추가
- Sharp 라이브러리로 자동 압축 (최대 1600px, JPEG q=82)
- `npm run upload:images` 명령어
- **17개 모델 사진 업로드 완료** (Supabase Storage + DB 자동 연결)
- 평균 압축률: 1MB → 70KB (약 93% 감소)
- `SUR-600-D (벽걸이형)` → `SUR-600-D` 모델명 정리 (카테고리에 이미 표시되어 중복 제거)

### 2. 환경설정
- `.env.local`에 `ADMIN_EMAIL`, `ADMIN_PASSWORD` 추가됨 (RLS 우회 인증용)
- `sharp` npm 의존성 추가

---

## 🔧 박이사님이 보고한 버그 (퇴근 전 화면 캡처)

### Bug #1 + #2: 제품 카드 썸네일 사진 짤림 + 배경 ✅
- **원인 확인**:
  - `aspectRatio: '1'` (정사각형) 컨테이너에 가로로 긴 패널 히터 사진을 `object-fit: cover`로 넣어서 위/아래 잘림
  - 어두운 navy 배경 + 반투명 흰색 박스라 제품이 묻혀 보임
- **수정 1**: `src/components/ui/ExcellenceProductCard.tsx:58-78` (우수제품/MAS 카드)
  - aspect-ratio: `1/1` → `4/3` (가로형 패널에 맞게)
  - object-fit: `cover` → `contain` (전체 제품이 다 보이게)
  - background: 반투명 → `#fff` 솔리드 (제품이 돋보임)
  - shadow + padding 추가로 입체감 강화
- **수정 2**: `src/pages/products/ProductDetailPage.tsx:74-83` (상세 페이지 메인 이미지)
  - 같은 패턴으로 흰 배경 + 그림자 적용
- **수정 3**: `src/components/product/ProductGrid.tsx:55-79` (전체 제품 그리드 84x84 썸네일)
  - 같은 패턴으로 흰 배경 + contain 적용
- **상태**: 수정 완료. lint 통과

### Bug #3: SUR-600-D 모델 사진 안보임 ✅ (사실은 캐시 문제)
- 우수제품 벽걸이형 (`sur-600-wall-excellent`)
- **진단 결과**: 코드/데이터 모두 정상, 단순 캐시 문제로 결론
  - DB 확인: `thumbnail_image` URL 정상 저장됨
  - 익명 읽기 테스트: anon key로 정상 SELECT 가능
  - 이미지 URL 직접 확인: HTTP 200 OK, 93KB 정상 응답
  - ExcellenceProductsPage 필터: `productLine === 'excellent'` 만 체크. `wall-mounted` 제외 안함
- **검증 도구 추가**: `src/scripts/verifyImages.ts` — 전체 제품 이미지 상태 일괄 확인용 (`npx tsx src/scripts/verifyImages.ts`)
- **상태**: 코드 수정 불필요. 박이사님이 사이트 새로고침(Ctrl+F5)하면 정상 표시될 것
- **참고**: `SUR-600 (벽걸이형)` (MAS, id `sur-600-wall-mas`)는 사진 업로드 안됨 (별도 모델). 박이사님이 사진 만들어 추가 업로드 필요

### Bug #4: 상세페이지에 내부 개발 메모 노출 ✅
- "문의 및 운영 메모" 섹션에 "현재는 웹페이지 초안 단계라..." 같은 내부 메모가 외부에 노출
- **수정**: `src/pages/products/ProductDetailPage.tsx:158-168` 내용 교체
  - 제목: `문의 및 운영 메모` → `제품 문의`
  - 내부 메모 문구 → 일반 안내 문구로 교체
  - CTA 버튼 (전화 문의/제품안내) 유지
- **상태**: 수정 완료

---

## 🚀 자율 작업 세션 (2026-05-01 오후)

박이사님이 자리 비우신 동안 SEO/성능 개선 4종 적용. 모든 변경 main에 머지됨.

### Improvement #1: 페이지별 SEO 메타 태그 ✅
- `src/components/seo/PageSEO.tsx` 신규 컴포넌트 추가 (React 19 메타데이터 호이스팅 활용)
- 적용 페이지: HomePage, ProductPage, ExcellenceProductsPage, MasProductsPage, ProductDetailPage(동적), ContactPage
- title, description, keywords, OG, Twitter Card 모두 페이지별 unique
- ProductDetailPage는 모델별로 자동 생성 (모델명·카테고리·용도·식별번호 키워드)
- `index.html` 기본 meta도 보강 (description, OG, robots, theme-color)

### Improvement #2: sitemap.xml + robots.txt ✅
- `public/sitemap.xml`: 50개+ URL (메인 페이지 + 18개 제품 상세 + about/technology/solutions/resources/policy)
- `public/robots.txt`: admin/auth/partner 디렉토리 차단, sitemap 위치 안내
- Google Search Console에 sitemap 등록 시 즉시 인덱싱 시작 가능

### Improvement #3: 이미지 lazy loading ✅
- 제품 카드 썸네일에 `loading="lazy"` + `decoding="async"` 적용
- ExcellenceProductCard, ProductGrid, ProductDetailPage 갤러리, CaseDetailPage 모두 적용
- 상세 페이지 메인 히어로는 `fetchPriority="high"`로 LCP 최적화
- alt 텍스트도 더 의미있게 강화 (모델명+카테고리)

### Improvement #4: 구조화 데이터 (JSON-LD) ✅
- `src/components/seo/JsonLd.tsx` 신규 (Organization, Product, BreadcrumbList 3종)
- HomePage: Organization 스키마 (회사 정보, 주소, 연락처)
- ProductDetailPage: Product 스키마 + BreadcrumbList
- 검색 결과에 풍부한 정보 표시 가능 (별점, 가격, 사양 등)

### Improvement #5: 추가 페이지 SEO 적용 ✅
- CeoMessagePage, HistoryPage, CertificationsPage
- PrinciplePage, TechnologySolutionPage (5종 동적: zero/public-edu/industrial-logistics/defense-special/iot-control)
- CasesPage, FaqPage
- 검색 엔진에 핵심 회사·기술·솔루션 페이지가 모두 노출됨

### Improvement #6: Hero 이미지 최적화 ✅
- `src/scripts/optimizeHeroImages.ts` 추가 (`npm run optimize:hero`)
- 10장 hero 이미지 sharp 압축: 2.6MB → 1.3MB (전체 52% 감소)
  - hero_1.jpg: 630KB → 217KB (-66%)
  - hero_2.jpg: 669KB → 250KB (-63%)
  - 나머지: 평균 -40%
- npm scripts 정리: `verify:images`, `optimize:hero`, `upload:images`

### Improvement #7: 404 페이지 추가 ✅
- `src/pages/NotFoundPage.tsx` 신규
- 라우트 catch-all (`path: '*'`)에 적용
- 잘못된 URL 접근 시 친절한 안내 + 홈/제품/문의 CTA + 전화번호

### Improvement #8: FAQ JSON-LD ✅
- `JsonLd` 컴포넌트에 `faq` 타입 추가 (FAQPage 스키마)
- FaqPage에 자동 적용 (DB에서 FAQ 로드 후 JSON-LD 자동 생성)
- 구글 검색 결과에 FAQ 펼침 상자(rich snippet) 표시 가능 → 클릭률 상승

### Improvement #9: CaseDetailPage SEO + JSON-LD ✅
- 각 시공사례에 동적 PageSEO 적용
  - title: `{사례명} - {지역} 복사난방 시공사례`
  - description, keywords, OG image 모두 사례별 unique
- BreadcrumbList JSON-LD로 검색 결과 빵부스러기 노출
- 지역명 키워드 노출 강화 (예: "인천 복사난방", "대전 물류센터 난방")

---

## 📋 다음 세션 권장 작업

### 단기 (1~2일)
- [ ] Vercel Preview/Production에서 모든 변경 결과 확인
- [ ] Google Search Console (https://search.google.com/search-console)에 sitemap 등록
- [ ] Naver Search Advisor (https://searchadvisor.naver.com)에도 sitemap 등록
- [ ] `SUR-600 (벽걸이형)` MAS 모델 사진 추가 업로드 (사진 미보유)

### 중기 (1주)
- [ ] OG 대표 이미지 별도 제작 (1200x630 권장) — 카톡/페북 공유 시 표시
- [ ] 나머지 보조 페이지(ClientsPage/MediaPage/LocationPage/NoticePage/DealersPage 등) PageSEO 적용
- [ ] favicon.svg → favicon.ico + apple-touch-icon 다양한 사이즈 추가
- [ ] 모바일 반응형 확인 (특히 제품 상세 페이지 갤러리)

### 장기 (1개월)
- [ ] 시공사례 페이지에 case_studies 데이터 연동 + JSON-LD CaseStudy 스키마
- [ ] FAQ 페이지에 JSON-LD FAQ 스키마 적용 (구글 FAQ rich snippet)
- [ ] 제품 상세 페이지에 PDF 카탈로그 다운로드 버튼
- [ ] 다국어 지원 (영문) — B2B 해외 진출 시
- [ ] 관리자 페이지 비밀번호 강화 (현재는 단순 로그인)
- [ ] PWA 지원 (manifest.json, 오프라인) — 모바일 사용자 경험 개선

---

## 🔑 알아두면 좋은 컨텍스트

- **DB 작성 권한**: anon key로는 RLS에 막힘. 관리자 로그인 필요. 스크립트는 `.env.local`의 `ADMIN_EMAIL/PASSWORD`로 자동 로그인.
- **사진 폴더**: `C:\projects\homepage_low_data\product_images\`
- **사진 파일명 규칙**: `{모델명}_{순번}.jpg` (예: `SUR-2400-D_1.jpg`)
- **Vercel 자동 배포**: main 브랜치 push 시 자동 배포

---

## 🗂️ 변경된 파일 (이번 세션 누적)

- `src/scripts/uploadProductImages.ts` (신규)
- `src/data/products.ts` (모델명 1건 수정)
- `package.json` (sharp + upload:images 스크립트)
- `package-lock.json`
- `.env.local` (ADMIN_EMAIL/PASSWORD — 미커밋)
