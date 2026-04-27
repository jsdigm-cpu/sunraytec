# CODEX COMMAND CENTER

마지막 업데이트: 2026-04-27

이 문서는 썬레이텍 홈페이지 제작의 중앙 관제 문서입니다. 앞으로 Codex가 개발 진행을 총괄하고, Claude CLI와 Antigravity는 작업 성격에 따라 보조 실행자로 협업합니다.

---

## 1. 현재 프로젝트 요약

- 프로젝트: 주식회사 썬레이텍 공식 홈페이지
- 목적: 복사난방 제품, 조달 제품, 시공사례, 인증·자료, 견적 문의, 파트너 기능을 갖춘 운영형 B2B 홈페이지 구축
- 현재 상태: React + Vite + TypeScript + Supabase 기반으로 주요 페이지와 관리자 기능 일부 운영 가능
- 배포: Vercel 운영 주소 `https://sunraytec.vercel.app`
- 기준 원칙: 문서와 코드가 다르면 항상 실제 코드가 정답

---

## 2. 개발 경과 정리

### 초기 기획 단계

- Claude가 `sunraytec_website_plan_v2.html` 기획서를 중심으로 전체 홈페이지 구조, 브랜드 방향, 메뉴 체계, 프롬프트 흐름을 설계했습니다.
- 사용자는 Claude Web, Claude CLI, Codex, Antigravity를 번갈아 사용하며 토큰 한도 안에서 개발을 이어왔습니다.

### 구현 진행 단계

- React/Vite 프로젝트로 전환하고 메인 페이지, 제품 페이지, 시공사례, 자료실, 인증·연혁, 문의, 로그인·회원가입, 관리자 페이지를 순차 구현했습니다.
- Supabase 프로젝트와 연결해 `products`, `site_content`, `case_studies`, `inquiries`, `profiles` 중심의 데이터 흐름을 만들었습니다.
- Vercel 배포와 환경변수 구성을 완료했습니다.

### 최근 안정화 단계

- Supabase Auth와 관리자 진입 문제를 해결했습니다.
- Header에 유틸리티 바, 로그인 상태, 권한 배지, 로그아웃 UI를 반영했습니다.
- 문서가 여러 AI의 관점으로 흩어져 있어, 2026-04-27부터 Codex 총괄 체계로 문서를 재정렬합니다.

---

## 3. AI 협업 체계

### Codex

- 역할: 총괄 지휘, 코드 점검, 문서 갱신, 작업 큐 관리, 최종 검증
- 우선 담당:
  - 코드와 문서 불일치 정리
  - 작은 기능 구현과 리팩터링
  - 빌드/타입 검증
  - 다음 작업을 실행 가능한 단위로 쪼개기

### Claude CLI

- 역할: 복잡한 구현 보조, 긴 문맥이 필요한 기능 개발, Supabase·인증·DB 관련 집중 작업
- 투입 기준:
  - DB 스키마/RLS/Storage 변경이 필요한 작업
  - 큰 페이지 하나를 통째로 구현해야 하는 작업
  - 긴 디버깅 로그 분석이 필요한 작업

### Antigravity

- 역할: 화면 보강, 단순 페이지 제작, UI/텍스트 정리, 반복적인 컴포넌트 작업
- 투입 기준:
  - 준비중 페이지를 실제 페이지로 전환
  - 카드/섹션/목록 UI 확장
  - 문구와 레이아웃 보정

### Claude Web

- 역할: 코드 직접 수정이 아니라 기획 리뷰와 작업 요청서 작성
- 투입 기준:
  - 사업 방향, 카피라이팅, 정보 구조 검토
  - Claude CLI 또는 Antigravity에 넘길 프롬프트 작성

---

## 4. 현재 코드 기준 확인 사항

- 실제 라우팅 파일: `src/app/routes.tsx`
- 앱 레이아웃: `src/app/App.tsx`
- Header 메뉴: `src/components/layout/Header.tsx`
- Footer 링크: `src/components/layout/Footer.tsx`
- 스타일: `src/styles/globals.css`, `src/styles/tokens.css`, `src/styles/components.css` + 컴포넌트 인라인 스타일 혼용
- React Router는 `package.json` 기준 v7 계열입니다.
- Animation 패키지는 `motion`을 주로 쓰며 일부 페이지에 `framer-motion` import가 남아 있습니다.
- `@google/genai`는 현재 명확한 사용처가 확인되지 않아 제거 후보입니다.

---

## 5. 작업 운영 규칙

1. 작업 시작 전 `PROJECT_STATUS.md`, `MENU_STATUS.md`, `NEXT_TASK.md`, `SESSION_HANDOFF.md`, 이 문서를 확인합니다.
2. 코드와 문서가 다르면 코드 기준으로 문서를 수정합니다.
3. 한 번에 최우선 작업 1개를 완료하는 것을 기본으로 합니다.
4. Header/Footer/라우팅/인증/DB는 영향 범위가 크므로 변경 전 반드시 관련 파일을 함께 읽습니다.
5. 기존 `src/styles` 공통 CSS는 유지하되, 새 전역 CSS를 늘리기보다 기존 토큰·컴포넌트 스타일·Tailwind/인라인 스타일을 우선 사용합니다.
6. 작업 완료 후 필요한 경우 `PROJECT_STATUS.md`, `MENU_STATUS.md`, `NEXT_TASK.md`, `SESSION_HANDOFF.md`를 함께 갱신합니다.
7. 코드 변경 후에는 가능한 한 `npm run build`를 실행해 확인합니다.

---

## 6. 다음 개발 방향

현재 우선순위는 “운영 가능한 홈페이지 완성도”를 높이는 것입니다.

1. `/technology/principle` 복사난방 원리 페이지 신설
2. 제품 상세 페이지 이미지와 제품 자료 연결
3. 카탈로그·지명원 PDF 업로드 및 다운로드 연결
4. 시공사례 상세 설명·추가 이미지 보강
5. 파트너 자료실과 관리자 CMS 확장
6. 인증서/특허 파일 업로드 및 다운로드 연결

실제 파일이 필요한 작업은 사용자가 파일을 제공한 뒤 진행합니다. 파일 없이 진행 가능한 첫 작업은 `/technology/principle` 페이지 구현입니다.

