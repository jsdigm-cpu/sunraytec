# 썬레이텍 공식 홈페이지

주식회사 썬레이텍의 공식 웹사이트 프론트엔드 프로젝트입니다. React, Vite, TypeScript 기반으로 구축되었으며 Supabase 백엔드와 연동되어 운영형 홈페이지로 확장 중입니다.

## 실시간 배포 주소

- Production: https://sunraytec.vercel.app

## 기술 스택

- Frontend: React 19, Vite 6, TypeScript
- Routing: React Router v7 계열, lazy loading 적용
- Styling: Tailwind v4, `src/styles` 공통 CSS, 컴포넌트 인라인 스타일
- Animation: `motion`, 일부 `framer-motion`
- Icons: lucide-react
- Backend / DB: Supabase PostgreSQL, Auth, Storage 예정
- Deployment: Vercel 자동 배포

## 로컬 실행

1. 패키지 설치

   ```bash
   npm install
   ```

2. 환경 변수 설정

   루트 디렉토리에 `.env.local` 파일을 만들고 Supabase 값을 입력합니다.

   ```text
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. 개발 서버 실행

   ```bash
   npm run dev
   ```

4. 빌드 확인

   ```bash
   npm run build
   ```

## 주요 폴더 구조

- `src/app`: 앱 라우팅과 레이아웃
- `src/pages`: 라우트별 페이지 컴포넌트
- `src/components`: 레이아웃, 홈 섹션, 관리자, 제품 UI
- `src/contexts`: 인증 등 전역 컨텍스트
- `src/lib/supabase.ts`: Supabase 클라이언트
- `src/styles`: 브랜드 토큰, 전역 스타일, 공통 컴포넌트 스타일
- `public/images`: 로고와 Hero 이미지
- `product_data`: 제품 원본 데이터

## AI 협업 문서

이 프로젝트는 여러 AI 도구가 번갈아 작업할 수 있도록 문서 기반으로 관리합니다. 2026-04-27부터 Codex가 개발 총괄을 맡고, Claude CLI와 Antigravity가 작업 성격에 따라 보조합니다.

- `CODEX_COMMAND_CENTER.md`: Codex 총괄 운영판
- `PROJECT_STATUS.md`: 프로젝트 전체 상태와 실제 코드 기준 요약
- `MENU_STATUS.md`: 메뉴별 진행 현황판
- `NEXT_TASK.md`: 바로 이어갈 작업 큐
- `SESSION_HANDOFF.md`: 세션 간 인수인계 메모
- `AI_HANDOFF_PROMPTS.md`: AI별 시작 프롬프트와 공통 작업 규칙
- `CERT_INVENTORY.md`: 인증서·특허·시험성적서 관리 대장
- `sunraytec_website_plan_v2.html`: 초기 통합 기획서

## 작업 원칙

- 실제 코드와 문서가 다르면 코드를 기준으로 판단합니다.
- Header, Footer, 라우팅, 인증, Supabase 변경은 영향 범위를 먼저 확인합니다.
- 기능 상태가 바뀌면 관련 MD 문서도 함께 갱신합니다.
- 코드 변경 후 가능한 경우 `npm run build`로 검증합니다.

