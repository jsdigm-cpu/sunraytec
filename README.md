# 썬레이텍 공식 홈페이지

(주)썬레이텍 공식 홈페이지 프론트엔드 프로젝트입니다. 주력 제품인 원적외선 방사 천장형 복사난방패널의 제품 정보, 기술/인증, 조달 안내, 시공사례, 자료실, 고객 문의 흐름을 한곳에서 운영하기 위한 React/Vite 기반 웹사이트입니다.

## 배포 주소

- Production: https://sunraytec.vercel.app
- Repository: https://github.com/jsdigm-cpu/sunraytec

## 현재 작업 상태

- 회사 및 제품 콘텐츠 사실관계 1차 정정 완료
- 회사 연혁 기준: 2002년 기술개발 시작, 2009년 12월 22일 법인 설립
- 제품/기술 표현 기준: 과장 표현보다 시험성적서, 인증서, 조달 등록 정보에 근거한 표현 사용
- IP 등급 기준: KTR 시험성적서 `ECU-2024-014357`의 `IP65` 결과 반영
- 루트 문서 정리 기준: `README.md`와 `SESSION_HANDOFF.md`만 유지

## 주요 기능

- 메인 홈: 핵심 KPI, 제품 라인업, 기술/솔루션, 인증, 비교 콘텐츠
- 회사소개: CEO 인사말, 연혁, 인증/특허, 보도자료
- 제품안내: 제품 가이드, 사양, 조달/구매 흐름
- 기술/솔루션: 복사난방 기술, 현장 적용 솔루션, 비교 정보
- 시공사례: 학교, 공공기관, 복지시설 등 설치 사례
- 자료실/고객지원: 인증자료, FAQ, 대리점/문의 흐름
- 운영 기반: Supabase 연동 구조와 관리자 기능 확장 기반 포함

## 기술 스택

- Frontend: React 19, Vite 6, TypeScript
- Routing: React Router v7
- Styling: Tailwind CSS v4, 공통 CSS 토큰, 컴포넌트 스타일
- Icons: lucide-react
- Backend 준비: Supabase PostgreSQL, Auth, Storage
- Deployment: Vercel

## 로컬 실행

```bash
npm install
npm run dev
```

개발 서버 기본 주소는 `http://localhost:3000`입니다.

환경 변수가 필요한 기능은 루트의 `.env.local`에 Supabase 값을 설정합니다.

```text
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 검증 명령

```bash
npm run lint
npm run build
```

`npm run lint`는 TypeScript 타입 검사를 실행하고, `npm run build`는 Vite 프로덕션 빌드를 확인합니다.

## 주요 폴더

- `src/pages`: 라우트별 페이지
- `src/components`: 레이아웃, 홈 섹션, 제품/관리자 UI
- `src/contexts`: 인증 등 전역 컨텍스트
- `src/lib`: Supabase 클라이언트와 공통 유틸
- `src/styles`: 전역 스타일, 브랜드 토큰, 공통 컴포넌트 스타일
- `public/images`: 로고, 히어로, 제품 이미지
- `product_data`: 제품 데이터 원본

## 문서 운영 원칙

루트의 Markdown 문서는 두 개만 유지합니다.

- `README.md`: GitHub와 사람을 위한 최신 프로젝트 안내
- `SESSION_HANDOFF.md`: AI가 다음 작업을 이어가기 위한 핵심 인수인계 문서

상세 원천자료는 사내 원본 자료 폴더와 실제 코드 기준으로 확인합니다. 코드와 문서가 다를 경우 실제 코드와 원천자료를 우선합니다.
