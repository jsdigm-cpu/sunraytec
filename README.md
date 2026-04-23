# 썬레이텍 (Sunraytec) 공식 홈페이지

주식회사 썬레이텍의 공식 웹사이트 프론트엔드 프로젝트입니다.
React(Vite), TypeScript 기반의 최신 스택으로 구축되었으며, Supabase 백엔드와 연동되어 라이브 운영 중입니다.

## 🚀 실시간 라이브 URL
- **Production**: [https://sunraytec.vercel.app](https://sunraytec.vercel.app)

## 🛠 기술 스택
- **Frontend**: React 19, Vite 6, TypeScript
- **Routing**: React Router v6 (Lazy Loading 적용)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Backend / DB**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel 자동 배포

## 📦 로컬 실행 가이드

1. **저장소 클론 및 패키지 설치**
   ```bash
   git clone https://github.com/jsdigm-cpu/sunraytec.git
   cd sunraytec
   npm install
   ```

2. **환경 변수 설정**
   루트 디렉토리에 `.env.local` 파일을 생성하고 Supabase 키를 입력하세요.
   ```text
   VITE_SUPABASE_URL=당신의_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY=당신의_SUPABASE_ANON_KEY
   ```

3. **로컬 개발 서버 실행**
   ```bash
   npm run dev
   ```

## 📁 주요 폴더 구조
- `/src/pages`: 개별 라우트 페이지 컴포넌트
- `/src/components`: 레이아웃, 재사용 가능한 UI 컴포넌트
- `/src/lib/supabase.ts`: Supabase 클라이언트 초기화
- `/src/contexts`: 전역 상태 관리 (AuthContext 등)

## 🤖 AI 협업 문서 (Workspace Documents)
프로젝트의 아키텍처 및 작업 상태는 아래 마크다운 파일들을 통해 관리됩니다.
- `PROJECT_STATUS.md`: 프로젝트 전체 상태, 구조 및 DB 현황 (Single Source of Truth)
- `MENU_STATUS.md`: 웹사이트 전체 메뉴 구조 및 신호등 진척도(대기중/진행중/완료)
- `NEXT_TASK.md`: 대기 중인 우선순위 작업 목록
- `SESSION_HANDOFF.md`: AI 세션 간 인수인계 노트
- `AI_HANDOFF_PROMPTS.md`: AI 에이전트들을 위한 공통 작업 규칙 및 프롬프트
- `CERT_INVENTORY.md`: 인증서/특허 목록 데이터 베이스
