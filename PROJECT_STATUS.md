# PROJECT STATUS

마지막 업데이트: 2026-04-23 (야간 세션)

## 프로젝트 한줄 설명
썬레이텍 회사 홈페이지를 React + Vite + TypeScript + Supabase로 구축 중.
현재 Supabase 연동 완료, 주요 페이지 Live 운영 중.

## 기술 스택
- Frontend: React 19, Vite 6, TypeScript
- Routing: React Router v6 (lazy loading 적용)
- Styling: Tailwind CSS (CSS 파일 직접 작성 금지)
- Animation: framer-motion (motion/react)
- Icons: lucide-react
- DB/백엔드: Supabase (PostgreSQL + RLS)
- 배포: GitHub (jsdigm-cpu/sunraytec) → Vercel 자동배포

## 현재 배포 주소
- https://sunraytec.vercel.app ✅ 운영 중 (Supabase 연동 완료)

## AI 협업 역할
- Claude Code (CLI): 복잡한 구현, DB 연동, 디버깅, 배포
- Codex / Antigravity: 단순 서브 페이지, 텍스트 교체
- 클로드 채팅앱은 거치지 말고 CLI에 직접 요청 권장 (토큰 절약)

---

## ✅ 완료된 전체 구현 목록 (2026-04-23 기준)

### 🚀 최신 업데이트 내역
- **Admin 인증 버그 완전 해결**: Supabase RLS 무한 루프, gotrue-js Deadlock 버그, 5초 강제 타임아웃 버그 해결. 로그인 후 Admin 대시보드 자동 진입 보장.
- **Header UI 개편**: 상단 유틸리티 바(Utility Bar) 도입. 로그인 유저 상태 표시 및 로그아웃 버튼 추가 (데스크탑/모바일 지원). 견적문의 버튼 사이즈 축소 및 전반적 메뉴 정렬 최적화.

### 메인 페이지 (/)
- Hero: 배경 슬라이드 10장 + 현장별 캡션 + "실제 시공 현장" 고정 배지
- Hero: 슬라이드 전환 fade 애니메이션, 도트 네비게이터
- Hero: CMS 연동 (headline, subcopy, CTA 텍스트 Admin에서 편집 가능)
- KPI, 4대 ZERO, 복사vs대류 비교, 업종별 솔루션
- 제품 라인업, 시공사례 갤러리, 인증·특허
- AI 계산기 미리보기, 공공기관 패스트트랙 배너, 메인 CTA
- framer-motion 애니메이션 전체 적용

### 제품 관련
- /products: 제품 목록 (Supabase products 테이블에서 로드)
- /products/excellence: 우수제품 전용 페이지
- /products/mas: MAS 다수공급자 전용 페이지
- /products/:productId: 제품 상세 페이지 (이미지 미연결 상태)

### 시공사례
- /cases: 갤러리 목록 (Supabase case_studies 연동, 6개 카테고리 필터)
- /cases/:id: 상세 보기 (이미지 슬라이드, 라이트박스, 이전/다음 글, 본문)
- DB 데이터: 10건 실제 현장 정보 (제목, 위치, 카테고리, 설명)
- DB 컬럼: title, category, location, image_url, images[], description, summary, installed_at

### 🟢 진행 완료 (Phase 마일스톤)
- [x] Phase 1: 로컬 정적 데이터 구조 설정 및 컴포넌트화 완료
- [x] Phase 2-1: Supabase 프로젝트 연동 및 스키마/RLS 적용
- [x] Phase 2-2: 기존 목업 데이터 Supabase 마이그레이션 (Seed)
- [x] Phase 2-3: 협력업체 전용 자료실 및 Supabase Auth 회원가입/로그인/로그아웃/뱃지 UI 구현 완료
- [x] Phase 3-1: 견적 문의 폼 Supabase Insert 연결 완료
- [x] Phase 3-2: Admin: 관리자 권한 복구 및 시공사례/회원 관리 탭 추가 완료

### 관리자 (/admin)
- 제품 추가/삭제 UI
- Hero 콘텐츠 편집 (headline, subcopy, CTA, 폰트, 강조색)
- 견적 문의 목록 (InquiryList): 상태 관리, 이메일 답변, 필터

### 기타 페이지
- /contact: 견적 문의 폼 → Supabase inquiries 테이블 저장
- /about/certifications: 실제 특허 10건 번호 반영, KPI 업데이트
- /about/history: 회사 연혁
- /resources/catalog: UI 완성 (실제 PDF 미연결)
- /coming-soon: 미구현 메뉴용

### 인프라 / 성능
- Vercel 환경변수 설정 완료 (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- 번들 최적화: 800kB → 최대 218kB (lazy loading + manualChunks 4개)
- 500kB 경고 완전 제거

---

## 현재 라우트 목록 (13개)
| 경로 | 상태 |
|------|------|
| / | ✅ Live |
| /products | ✅ Supabase 연동 |
| /products/excellence | ✅ Live |
| /products/mas | ✅ Live |
| /products/:productId | ⚠️ 이미지 미연결 |
| /cases | ✅ Supabase 연동, 6개 카테고리 |
| /cases/:id | ✅ 상세 페이지 (설명/추가사진 입력 대기) |
| /admin | ✅ 제품+콘텐츠+문의 관리 |
| /contact | ✅ Supabase inquiries 저장 |
| /about/certifications | ✅ Live |
| /about/history | ✅ Live |
| /resources/catalog | ⚠️ PDF 미연결 |
| /coming-soon | ✅ Live |

---

## Supabase DB 현황

### 테이블
| 테이블 | 행 수 | 비고 |
|--------|-------|------|
| products | 18 | 제품 목록 |
| site_content | 1 | Hero CMS |
| case_studies | 10 | 시공사례, images[]/description 컬럼 추가됨 |
| inquiries | - | 견적 문의 |
| profiles | 1+ | 유저 프로필 및 role(admin/partner) |

### RLS 정책
- profiles: 본인 정보만 SELECT/UPDATE (auth.uid() = id)
- products: SELECT (anon)
- site_content: SELECT (anon)
- case_studies: SELECT + INSERT (anon)
- inquiries: SELECT (admin), INSERT (anon)

---

## 남은 이슈 / 주의
- CERT_INVENTORY.md 파일 있음 (루트), 41개 인증서 관리 목록
- README에 Gemini/AI Studio 흔적 남아있음 (정리 예정)
- Tailwind CSS만 사용 (별도 CSS 파일 생성 금지)
- 작업 전 실제 코드와 문서가 다르면 코드 기준으로 판단
