# 🛠️ Claude Code 작업 지시서 v2.0 — Sunraytec 홈페이지 고도화

> **작성**: Claude × 박이사님 (2026.05)  
> **저장소**: `jsdigm-cpu/sunraytec`  
> **배포**: `https://sunraytec.vercel.app`  
> **문서 버전**: v2.0 (실측 현황 반영 — v1 대비 완료 항목 업데이트, 신규 긴급 PHASE 추가)

---

## ⚠️ Claude Code에게 — 시작 전 필수 준수사항

```
박이사다~ 아래 작업 지시서를 받았어.

작업 시작 전에 반드시 다음을 지켜줘:

1. 절대 한 번에 여러 STEP을 동시에 진행하지 말 것
2. 각 STEP 완료 시 "박이사님, STEP-N 완료. 확인 부탁드립니다" 라고 보고
3. 파일 수정 전에는 항상 "이 파일을 이렇게 수정하겠습니다" 미리 알려줄 것
4. Header/Footer 같은 공용 컴포넌트는 수정 전 추가 확인 받을 것
5. 새 의존성(npm install) 추가 전 사유와 함께 미리 알려줄 것
6. 박이사님은 비개발자임 — 기술 용어는 쉽게 풀어서 설명
7. 모든 응답은 한글로
8. 큰 변경(파일 삭제·구조 변경) 시 git stash 또는 백업 후 진행

처음 시작할 때는 "박이사님, 작업 지시서 v2를 확인했습니다.
현재 실측 기준 완성도 83%입니다. PHASE 0 긴급 수정부터 시작하겠습니다." 로 시작.
```

---

## 📋 v2 문서의 달라진 점

- **✅ 완료 표시**: GitHub 코드 직접 확인 후 이미 완성된 항목에 체크
- **🆕 PHASE 0 추가**: 박이사님이 직접 지적한 긴급 UI/UX 버그 모음
- **기존 PHASE 1~5**: 완료 항목 정리, 미완 항목 우선순위 재정비

---

# ✅ 완료 현황 요약 (코드 직접 확인)

| 항목 | 상태 |
|------|------|
| Supabase DB/Storage/Auth 연동 | ✅ 완료 |
| 관리자 대시보드 (/admin) + 전체 CRUD | ✅ 완료 |
| 제품 페이지 전체 (목록·상세·카테고리별) | ✅ 완료 |
| 기술·솔루션 페이지 6종 | ✅ 완료 |
| 회사소개 서브페이지 6종 | ✅ 완료 |
| 시공사례 목록·상세 (UI) | ✅ 완료 |
| 자료실·계산기 (UI) | ✅ 완료 |
| 고객센터·FAQ·공지 | ✅ 완료 |
| 파트너 포털 | ✅ 완료 |
| SEO 메타태그·JSON-LD | ✅ 완료 |
| sitemap.xml + robots.txt | ✅ 완료 |
| 이미지 최적화 (sharp, lazy loading) | ✅ 완료 |
| 라우트 lazy loading | ✅ 완료 |
| 404 페이지 | ✅ 완료 |
| 제품 사진 17개 업로드 | ✅ 완료 |

---

# 📍 PHASE 0 — 긴급 UI/UX 버그픽스 (박이사님 직접 지적)

> **목표**: 박이사님이 직접 불편하다고 하신 4가지 문제를 먼저 해결.

## STEP 0-1. 시공사례 페이지 레이아웃 대수술

```
박이사다~ 시공사례 페이지가 너무 어둡고, 사진 보러 스크롤을 너무 많이 해야 돼.

현재 문제:
- SubHero 아래 진한 어두운 배경(#0D1B2E) 섹션이 2개 연속으로 나옴
  1. KPI 수치 바 (어두운 섹션)
  2. 대표 실증 사례 2건 (어두운 섹션)
- 이걸 다 지나야 비로소 시공 사진 그리드가 나옴
- 결과적으로 화면 4~5개 분량 스크롤해야 사진 볼 수 있음

원하는 방향:
1. 페이지 들어가면 바로 카테고리 탭 + 사례 사진이 보여야 함
2. KPI 수치는 SubHero 안에 작게 넣거나, 사진 그리드 상단 슬림한 바로 통합
3. Spotlight(대표 실증 사례)는 갤러리 아래쪽으로 이동
4. 전체적으로 밝고 깔끔한 느낌 (어두운 섹션 최소화)

수정 대상 파일:
- src/pages/CasesPage.tsx

작업 순서:
1. 먼저 수정 계획을 설명해줘 (레이아웃 순서 어떻게 바꿀지)
2. 박이사님 OK하면 코드 수정
3. 수정 후 어떻게 확인하면 되는지 안내
```

## STEP 0-2. 전국 시공 지도 — 실제 지도 구현

```
박이사다~ '전국 시공 지도' 메뉴가 있는데 들어가면 지도가 없고 텍스트만 나와.
실제로 지도 위에 우리 시공 현장들이 핀으로 찍혀 있어야 해.

구현 방법:
- 카카오맵 JavaScript API 사용 (무료, 하루 30만건 호출 가능)
- 지도에 카테고리별 색깔 마커 표시
- 마커 클릭 시 팝업: 현장명, 카테고리, 지역, 시공사례 링크

필요한 것:
- 카카오 개발자 계정에서 JavaScript API 키 발급 (박이사님이 직접)
  접속: https://developers.kakao.com → 내 애플리케이션 → JavaScript 키
- 박이사님이 API 키 알려주시면 코드에 반영

현장 위치 데이터:
- Supabase case_studies 테이블에 lat(위도), lng(경도) 컬럼 추가
- 현재 더미 데이터 10건에 위경도 좌표 직접 입력 (나중에 관리자에서 편집 가능)

수정 대상 파일:
- src/pages/CasesMapPage.tsx (전면 재작성)

시작 전 박이사님께 확인:
1. 카카오맵 API 키 발급 가능 여부
2. 표시하고 싶은 주요 현장 목록 (주소 알려주시면 좌표 변환해드림)
```

## STEP 0-3. 모바일 서브메뉴 아코디언 방식으로 변경

```
박이사다~ 모바일에서 햄버거 메뉴 누르면 서브메뉴가 전부 한꺼번에 펼쳐져서
너무 길어. 클릭해서 펼치는 방식(아코디언)으로 바꿔줘.

현재 문제:
- 모바일 메뉴 열면 6개 카테고리 × 6개 서브메뉴 = 36개 항목 한번에 나열
- 원하는 메뉴 찾기 불편, 스크롤 많음

원하는 방식:
- 메인 카테고리(회사소개, 제품안내, 기술·솔루션...)만 먼저 보임
- 카테고리 누르면 서브메뉴 열리고, 다시 누르면 닫힘 (아코디언)
- 현재 보고 있는 페이지 카테고리는 기본으로 열려 있음
- ChevronDown 화살표가 회전하면서 열림/닫힘 표시

수정 대상 파일:
- src/components/layout/Header.tsx (모바일 드롭다운 부분만)

⚠️ Header는 공용 컴포넌트라 수정 전 박이사님 확인 필수
데스크탑 메뉴는 절대 건드리지 말 것
```

## STEP 0-4. 기술 솔루션 페이지 로딩 버그 수정 + 컨텐츠 보강

```
박이사다~ 기술·솔루션 메뉴에서 "현장에서 먼저 해결해야 할 문제" 부분이
가끔 안 보여. 새로고침하면 나오는데.

【버그 수정】
원인: motion/react의 애니메이션 뷰포트 감지 타이밍 문제

수정 내용:
- src/pages/technology/TechnologySolutionPage.tsx 의 Problem Map 섹션
- viewport={{ once: true, amount: 0.15 }} 
  → viewport={{ once: true, amount: 0.05, margin: "0px 0px -50px 0px" }}
- 감지 임계값을 낮춰서 더 빨리, 확실하게 트리거되게 함

【컨텐츠 보강】 (박이사님 요청)
현재 5개 솔루션 페이지가 "형식적"이라고 하셨는데,
각 페이지별로 차별화된 요소 추가:

1. 공공·교육 솔루션: 조달 프로세스 인포그래픽 추가
   (나라장터 검색 → 수의계약 → 납품 흐름도)

2. 산업·물류 솔루션: 절감액 계산 인터랙션 추가
   (면적·층고 입력 → 예상 절감액 실시간 계산)

3. 국방·특수 솔루션: 방폭 인증 마크 이미지 + 혁신제품 지정 배지 표시

4. IoT 중앙제어: 128회로 제어 시스템 다이어그램 개선

수정 대상 파일:
- src/pages/technology/TechnologySolutionPage.tsx

작업 순서: 버그 수정 먼저 → 확인 → 컨텐츠 보강 제안 → 박이사님 승인 후 적용
```

---

# 📍 PHASE 1 — 메인페이지 폴리싱

## ✅ STEP 1-1. 프로젝트 상태 점검 — 완료

> 실측 결과: React 19, Vite 6, Tailwind 4, Supabase 연동, 라우트 50개+, 빌드 정상

## ✅ STEP 1-2. 모바일 반응형 가독성 검증 — 부분 완료

> 대부분 반응형 처리됨. 미완 항목은 STEP 0-3(모바일 메뉴) 및 아래 1-3에서 처리.

## STEP 1-3. KPI 시각 위계 + Hero 슬로건 모바일 변형

```
박이사다~ 메인페이지 KPI 수치 부분 손봐줘.

수정 내용:
1. KPI 섹션 (src/components/home/KpiSection.tsx)
   - 숫자 본체는 더 크고 굵게 (text-5xl font-extrabold)
   - 단위(%, 년, 개)는 60~70% 크기로 (시각 대비 강화)
   - 모바일에서 grid-cols-2 / 데스크탑 grid-cols-4 명확히 분리

2. Hero 슬로건 (src/components/home/HeroSection.tsx)
   - 모바일(375px)에서 현재 슬로건이 어색하게 줄바꿈되는지 확인
   - 필요시 모바일 전용 짧은 슬로건 추가
   - 후보: "복사난방의 기준" / "8m 고천장도 따뜻하게" / "Made in Korea, 전국 납품"
   - 박이사님이 맘에 드는 거 선택해주시면 적용

작업 순서: 코드 수정안 보여주기 → 박이사님 선택 → 적용
```

## STEP 1-4. 접근성 (a11y) 일괄 보강

```
박이사다~ 검색엔진과 장애인 접근성 기준을 충족하기 위해 보강이 필요해.

작업 내용:
1. 모든 <img>에 의미있는 alt 속성 확인·추가
2. 아이콘 버튼에 aria-label 추가
   - 햄버거 메뉴: 이미 aria-label="메뉴 열기" 있음 ✅
   - 기타 아이콘 버튼 점검
3. 키보드 탭 이동 시 포커스 테두리 표시
4. 색상 대비(contrast ratio) 기준 미달 텍스트 수정

컴포넌트 하나씩 진행하면서 보고.
```

## ✅ STEP 1-5. Core Web Vitals 성능 최적화 — 완료

> Hero 이미지 sharp 압축 완료 (평균 52% 감소), lazy loading 적용, 라우트 분할 완료.  
> 추가 개선: WebP 변환은 선택적으로 검토.

---

# 📍 PHASE 2 — 서브 페이지 완성

## ✅ STEP 2-1. /contact 견적 문의 페이지 — 완료

> ContactPage.tsx 완성. Supabase inquiries 테이블 연동, 패스트트랙 자동 감지, 첨부파일 처리.

## ✅ STEP 2-2. /products 제품 목록 + 상세 페이지 — 완료

> 전체 제품 목록, 카테고리별(우수·MAS·방폭·특수), 상세 페이지, 관리자 CRUD 완성.

## ✅ STEP 2-3. /cases 시공사례 목록 + 상세 — UI 완료, 데이터 미완

> UI/코드 완성. 단, 실제 시공사례 데이터 미등록 (→ STEP 2-8에서 처리)

## ✅ STEP 2-4. /resources/catalog 자료실 — 완료

> CatalogPage, ResourceToolsPage 완성. 계산기 UI 완료, 실제 동작은 PHASE 5에서.

## ✅ STEP 2-5. /tech 기술·솔루션 페이지 — 완료

> PrinciplePage + TechnologySolutionPage 5종 완성. 컨텐츠 보강은 STEP 0-4에서 진행.

## ✅ STEP 2-6. /about 회사 소개 페이지 — 완료

> CEO 메시지·연혁·인증·언론·납품처·오시는 길 6개 서브페이지 완성.

## ✅ STEP 2-7. 파트너 포털 — 완료 (v1 문서에 없던 기능)

> /partner 파트너 포털, 파트너 회원가입 안내, 대기 페이지 완성.

## STEP 2-8. 실제 시공사례 데이터 DB 등록 (긴급)

```
박이사다~ 시공사례 페이지에 실제 우리 납품 사례를 등록해야 해.
현재는 임시 더미 데이터 10건이 들어 있어.

방법:
1. https://sunraytec.vercel.app/login 에서 관리자 로그인
2. /admin 접속 → 시공사례 탭
3. 각 사례 추가: 제목, 카테고리, 지역, 요약, 사진, 특이점

박이사님이 제공해주실 정보:
- 기아자동차 광주공장 (도장부스) 정보
- 김포TG 정보
- 연무초등학교 정보
- 볼보 관련 정보
- 신연중 정보
- 기타 주요 납품처 5~10건

Claude Code 역할:
- 박이사님이 정보 주시면 Supabase에 직접 데이터 INSERT 스크립트 작성
- 시공사례 사진 Supabase Storage 업로드 자동화 (npm run upload 방식)
```

---

# 📍 PHASE 3 — Supabase 연동 + 관리자 모드

## ✅ STEP 3-1. Supabase 클라이언트 설정 — 완료

> src/lib/supabase.ts, src/lib/storageUploads.ts 완성.

## ✅ STEP 3-2. DB 스키마 생성 — 완료

> supabase_schema.sql + 추가 마이그레이션 파일들 적용 완료.  
> 테이블: products, case_studies, documents, inquiries, settings, faqs, notices, profiles, signup_requests.

## ✅ STEP 3-3. Storage 버킷 설정 — 완료

> products, cases, documents 버킷 생성, RLS 정책 설정 완료.

## ✅ STEP 3-4. 더미 → 실제 DB 마이그레이션 — 완료 (제품 한정)

> 제품 17개 모델 Supabase 완전 이관 완료.  
> 시공사례는 STEP 2-8에서 별도 진행.

## ✅ STEP 3-5. 관리자 인증 + /admin 라우트 — 완료

> AuthContext, ProtectedRoute, LoginPage, /admin 라우트 완성.

## ✅ STEP 3-6. 관리자 CRUD — 제품 관리 — 완료

> ProductForm, ProductListEditor 완성. 이미지 드래그앤드롭, Storage 연동.

## ✅ STEP 3-7. 관리자 CRUD — 사례/자료/문의/설정 — 완료

> CaseEditor, ResourceDocumentEditor, InquiryList, NoticeEditor, FaqEditor, HeroThemeEditor, MemberManager 전체 완성.

## STEP 3-8. RLS 보안 강화 (부분 완료)

```
박이사다~ 보안 점검이 필요한 항목이 있어. 아직 미완인 부분 처리하자.

미완 항목:
1. 문의 폼 Rate Limiting
   - 같은 IP에서 1시간 5건 이상 문의 차단
   - Supabase Edge Function 또는 간단한 서버사이드 체크

2. 보안 점검 체크리스트 실행
   - service_role key 코드 노출 여부 grep 확인
   - .env.local이 git에 커밋 안됐는지 확인
   - 모든 INSERT/UPDATE RLS 보호 확인

3. 관리자 세션 타임아웃 설정
   - 30분 비활동 시 자동 로그아웃

완료 후 보안 점검 결과 보고서 작성해줘.
```

---

# 📍 PHASE 4 — SEO · 도메인 · 운영

## ✅ STEP 4-1. SEO 메타태그 일괄 적용 — 완료

> PageSEO 컴포넌트, JSON-LD (Organization·Product·FAQ·BreadcrumbList) 전 페이지 적용.

## ✅ STEP 4-2. sitemap.xml + robots.txt — 완료

> public/sitemap.xml (50+URL), public/robots.txt 생성 완료.

## STEP 4-3. 도메인 연결 (sunraytec.co.kr)

```
박이사다~ 진짜 도메인 연결하자. 이건 박이사님 도움이 필요해.

작업 순서:
1. Vercel 접속 (vercel.com) → sunraytec 프로젝트 → Settings → Domains
2. sunraytec.co.kr 입력 → Vercel이 DNS 레코드 알려줌
3. 박이사님이 도메인 등록처(가비아/후이즈 등)에서 DNS 변경
   - A 레코드: 76.76.21.21
   - 또는 CNAME: cname.vercel-dns.com
4. DNS 전파 대기 (5분~24시간)
5. Vercel에서 Verified 표시 확인
6. HTTPS 자동 발급 확인

⚠️ 중요: 현재 sunraytec.co.kr에 다른 홈페이지가 연결되어 있다면
변경 시 기존 사이트가 안 보이게 됩니다. 사전에 확인 필수!

www.sunraytec.co.kr → sunraytec.co.kr 리다이렉트도 함께 설정.
```

## STEP 4-4. GA4 + Search Console + 네이버 서치어드바이저

```
박이사다~ 검색·분석 등록 작업해보자.

1. Google Analytics 4
   - https://analytics.google.com 에서 GA4 속성 생성
   - 측정 ID (G-XXXXXXXXXX) 받아서 알려줘
   - src/lib/gtag.ts 작성 (페이지 이동할 때마다 자동 기록)
   - 이벤트: 문의 제출, 카탈로그 다운로드, 전화 클릭

2. Google Search Console
   - https://search.google.com/search-console 접속
   - sunraytec.co.kr 도메인 속성 추가
   - 소유권 확인 코드 → Claude Code가 코드에 반영
   - sitemap 제출

3. 네이버 서치어드바이저
   - https://searchadvisor.naver.com 접속
   - 사이트 등록 → 인증 코드 받기
   - Claude Code가 코드에 반영
   - 사이트맵 제출

박이사님이 각 사이트에서 받은 인증 코드 알려주시면 즉시 반영.
```

## STEP 4-5. OG 이미지 제작

```
박이사다~ 카카오톡에 우리 사이트 링크 공유할 때
이미지 미리보기가 뜨게 해야 해.

필요한 것:
1. 메인 OG 이미지 (1200×630px)
   - 썬레이텍 로고 + 슬로건("복사난방의 기준") + 대표 제품 이미지
   - public/og-default.png 로 저장
   - 이미지 디자인은 박이사님이 Canva로 만들거나,
     Claude Code가 HTML/CSS로 간단히 만들어서 캡처하는 방법도 가능

2. SEO 컴포넌트에 og:image 메타태그 추가 (코드 작업)
   → 이미지 파일만 있으면 Claude Code가 코드 연결

3. 검증: https://opengraph.xyz/ 에서 미리보기 확인
```

---

# 📍 PHASE 5 — 운영·고도화 (지속)

## STEP 5-1. AI 계산기 실제 동작 구현

```
자료실의 계산기 UI는 완성됐지만 실제 계산이 안 돼.

1. 난방 용량 계산기 (/resources/heating-load-calculator)
   - 입력: 면적(㎡), 천장고(m), 단열 수준, 지역 (기온)
   - 출력: 필요 출력(kW), 추천 제품 모델, 필요 대수

2. 에너지 ROI 계산기 (/resources/energy-roi-calculator)
   - 입력: 현재 난방 방식, 면적, 전기요금 단가, 가동시간
   - 출력: 예상 절감율(%), 월 절감액(만원), 투자회수기간(년)

자체 알고리즘으로 구현 (API 없이도 가능).
계산 공식은 박이사님께 받아서 반영.
```

## STEP 5-2. AI 상담 챗봇 실제 구현

```
/support/chatbot 페이지 UI는 있지만 AI가 연동 안 돼.

옵션:
A) Claude API 연동 (Anthropic SDK)
   - 썬레이텍 제품/기술 FAQ를 시스템 프롬프트에 포함
   - 견적 문의로 자연스럽게 유도
   
B) Gemini API (Google) — 무료 한도 넉넉

사전 준비:
- API 키 필요 (박이사님이 발급)
- 박이사님이 "이런 질문에는 이렇게 답해줘" 시나리오 작성

Claude Code 역할:
- API 연동 코드 작성
- FAQ DB → 컨텍스트 주입
- 채팅 UI 개선 (스트리밍 응답 등)
```

## STEP 5-3. 영문(EN) 페이지

```
해외 바이어 대응용 영문 페이지.
i18next 라이브러리 사용 (npm install i18next react-i18next).
박이사님 승인 후 진행 (의존성 추가 필요).

우선순위:
1단계: 메인페이지 EN
2단계: 제품 목록 + 상세 EN
3단계: 문의 폼 EN
```

## STEP 5-4. 카카오 알림톡 자동화

```
신규 문의 들어오면 박이사님 카카오톡으로 즉시 알림.

방법:
- Supabase → webhook → Make.com(구 Integromat) → 알림톡
- 또는 Supabase Edge Function → 카카오 API 직접 호출

박이사님 카카오 비즈니스 채널 등록 필요.
Claude Code가 연동 로직 작성.
```

## STEP 5-5. 블로그/뉴스 섹션

```
검색엔진 노출 강화용.

/news 라우트 추가
Supabase posts 테이블 생성
관리자에서 작성·편집·발행
카테고리: 보도자료 / 기술 정보 / 시공기 / 제품 소식
```

## STEP 5-6. 열화상 시뮬레이터 (장기)

```
가장 강력한 영업 무기가 될 기능.
사용자가 도면 이미지 올리면
복사난방 vs 대류난방 온도 분포 시뮬레이션.

WebGL/Canvas 기반.
개발 난이도 높음. 별도 일정 필요.
```

---

# 📋 작업 진행 체크리스트

## Phase 0 — 긴급 UI/UX 버그픽스 (박이사님 지적)
- [x] STEP 0-1. 시공사례 페이지 레이아웃 개선 ✅ (CasesPage 전면 재작성)
- [x] STEP 0-2. 전국 시공 지도 구현 ✅ (SVG 인터랙티브 지도 — 카카오맵 API 키 없이 자체 구현)
- [x] STEP 0-3. 모바일 서브메뉴 아코디언 변환 ✅ (AnimatePresence height animation)
- [x] STEP 0-4. 기술 솔루션 로딩 버그 수정 ✅ (viewport amount 0.05 + margin)

## Phase 1 — 메인페이지 폴리싱
- [x] STEP 1-1. 프로젝트 상태 점검 ✅
- [x] STEP 1-2. 모바일 반응형 가독성 검증 ✅ (부분)
- [x] STEP 1-3. KPI 시각 위계 ✅ (Bebas Neue 숫자 대형화, baseline 정렬)
- [x] STEP 1-4. 접근성 일괄 보강 ✅ (focus-visible, aria-label, aria-current)
- [x] STEP 1-5. Core Web Vitals 성능 최적화 ✅

## Phase 2 — 서브 페이지 완성
- [x] STEP 2-1. /contact 마무리 ✅
- [x] STEP 2-2. /products 목록 + 상세 ✅
- [x] STEP 2-3. /cases 목록 + 상세 ✅ (UI 완료)
- [x] STEP 2-4. /resources/catalog ✅
- [x] STEP 2-5. /tech 기술·솔루션 ✅
- [x] STEP 2-6. /about 회사 소개 ✅
- [x] STEP 2-7. 파트너 포털 ✅ (v1에 없던 기능)
- [ ] STEP 2-8. 실제 시공사례 데이터 DB 등록 (박이사님 데이터 제공 필요)

## Phase 3 — Supabase 연동 + 관리자 모드
- [x] STEP 3-1. Supabase 클라이언트 설정 ✅
- [x] STEP 3-2. DB 스키마 생성 ✅
- [x] STEP 3-3. Storage 버킷 설정 ✅
- [x] STEP 3-4. 더미 → 실제 DB 마이그레이션 ✅ (제품)
- [x] STEP 3-5. 관리자 인증 + /admin 라우트 ✅
- [x] STEP 3-6. 관리자 CRUD — 제품 ✅
- [x] STEP 3-7. 관리자 CRUD — 사례/자료/문의/설정 ✅
- [x] STEP 3-8. RLS 보안 강화 ✅ (Rate Limiting 클라이언트, 관리자 세션 타임아웃 30분)

## Phase 4 — SEO · 도메인 · 운영
- [x] STEP 4-1. SEO 메타태그 ✅
- [x] STEP 4-2. sitemap.xml + robots.txt ✅ (62 URL — news 포함 업데이트)
- [ ] STEP 4-3. 도메인 연결 (sunraytec.co.kr) — 박이사님 DNS 변경 필요
- [x] STEP 4-4. GA4 인프라 ✅ (VITE_GA_MEASUREMENT_ID env var만 채우면 활성화)
       ⚠️ 남은 작업: Vercel → Settings → Env Vars → VITE_GA_MEASUREMENT_ID = G-XXXXXX
       ⚠️ Search Console/네이버: index.html 주석 해제 후 인증코드 입력
- [x] STEP 4-5. OG 이미지 ✅ (public/og-default.svg, 1200×630, PageSEO 연동)

## Phase 5 — 운영·고도화 (지속)
- [x] STEP 5-1. AI 계산기 실제 동작 ✅ (난방용량·ROI 계산기 모두 실시간 계산 동작 — useMemo 기반)
- [x] STEP 5-2. AI 챗봇 ✅ (규칙기반 챗봇 15+ 인텐트, API 키 없이 동작)
- [ ] STEP 5-3. 영문 페이지 (i18next 설치 승인 필요)
- [ ] STEP 5-4. 카카오 알림톡 (비즈니스 채널 등록 필요)
- [x] STEP 5-5. 블로그/뉴스 ✅ (/news + /news/:id, 관리자 PostsEditor, supabase_posts.sql)
- [ ] STEP 5-6. 열화상 시뮬레이터 (장기 과제)

---

# 🆘 트러블슈팅 가이드

## Claude Code가 멈추거나 이상한 응답을 할 때
1. `/clear` 명령으로 컨텍스트 초기화
2. 본 문서의 해당 STEP을 다시 붙여넣기
3. "이전 대화 무시하고 STEP X-Y부터 다시 시작" 명시

## 빌드 에러가 발생할 때
1. `git status` 로 변경 파일 확인
2. 에러 메시지를 그대로 Claude Code에 전달
3. `git stash` 로 변경사항 임시 보관 후 결정
4. 절대 `git reset --hard` 같은 파괴적 명령 단독 실행 금지

## Supabase 데이터가 안 보일 때
1. 브라우저 개발자 도구(F12) → Network 탭 → Supabase 요청 확인
2. 401 응답 → RLS 정책 문제
3. 200인데 빈 배열 → 데이터 미등록 또는 is_active=false

## 시공 지도 지도가 안 보일 때
1. 카카오맵 API 키 확인 (발급 → .env.local에 입력했는지)
2. 브라우저 콘솔(F12 → Console)에서 에러 메시지 확인

---

# 📞 의사소통 규칙

- 박이사님 보고 시작은 "박이사님, ..." 으로
- 모든 응답은 한글
- 기술 용어는 풀어서 설명 (예: "RLS = 행 단위 보안 = 누가 어떤 데이터를 볼 수 있는지 제한")
- 파일 수정 전 항상 미리 알리기
- 큰 변경(파일 삭제·구조 변경) 시 백업 후 진행
- 작업 완료 시 "STEP X-Y 완료" + 검증 방법 안내

---

**현재 완성도: 약 83%**  
**남은 핵심 작업: PHASE 0 긴급 4개 → 도메인·GA4·OG이미지 → 데이터 등록 → AI 기능**

*문서 끝. v2.0 — 2026년 5월 기준 실측 반영.*
