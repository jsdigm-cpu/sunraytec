# PROJECT STATUS

마지막 업데이트: 2026-04-22

## 프로젝트 한줄 설명
썬레이텍 회사 홈페이지를 React + Vite + TypeScript로 구축 중이며,
현재는 서브 페이지 확장과 CMS 연동 범위 정리 단계입니다.

## 기술 스택
- Frontend: React 19, Vite 6, TypeScript
- Routing: React Router v6
- Styling: Tailwind CSS (CSS 파일 직접 작성 금지)
- Animation: framer-motion
- Icons: lucide-react
- 데이터 상태: 현재 로컬 상태 + localStorage 임시 저장
- 배포: GitHub (jsdigm-cpu/sunraytec) + Vercel ✅ 완료
- 데이터/인증 예정: Supabase (계정 준비됨, 연동 전)

## 현재 배포 주소
- https://sunraytec.vercel.app ✅ 운영 중

## AI 협업 역할 분담 (DECISIONS.md 참조)
- Claude 채팅: 기획 / 전략 / 프롬프터 제작 / 문제 상담
- Claude Code (CLI): 복잡한 구현 / 버그 디버깅 / Supabase 연동
- Codex: 단순 서브 페이지 제작 / 템플릿 복제 / 텍스트 교체

## 현재 구현 완료 항목

### 메인 페이지 섹션
- Hero (배경 슬라이드 + 텍스트 CMS 연결)
- KPI
- 4대 ZERO 캠페인
- 복사 vs 대류 비교 (comparison.png 일러스트)
- 업종별 솔루션
- 제품 라인업
- 시공사례 갤러리
- 인증·특허
- AI 계산기 미리보기
- 공공기관 패스트트랙 배너
- 메인 CTA
- framer-motion 애니메이션 전체 적용

### 제품 관련 페이지
- 제품 목록 페이지 (/products)
- 우수제품 전용 페이지 (/products/excellence)
- MAS 다수공급자 전용 페이지 (/products/mas)
- 제품 상세 페이지 초안 (/products/:productId)
- 엑셀 데이터 기반 제품 라인업 재정리 완료
  - 우수제품과 MAS를 공통 데이터 소스에서 관리
  - 매립형/노출형 개별 모델로 분리 표시

### 관리자 (Admin)
- 관리자 대시보드 초안 (/admin)
- 제품 추가/삭제 UI
- Hero 콘텐츠 편집 UI (공개 페이지 반영 연결 완료)
- Hero 카피 줄바꿈/폰트/크기/굵기/강조색 편집 가능

### 공통 레이아웃
- Header (드롭다운 메뉴, 전화번호, 견적문의 CTA)
- Footer
- ComingSoonPage (미구현 메뉴 연결용)

## 현재 살아있는 라우트
- /
- /products
- /products/excellence
- /products/mas
- /products/:productId
- /admin
- /coming-soon
- /contact ✅ 2026-04-22 완성

## 현재 미구현 라우트 (모두 /coming-soon으로 연결)
- /about/* (회사소개 하위 전체)
- /technology/* (기술·솔루션 하위 전체)
- /cases (시공사례)
- /resources/* (자료실 하위 전체)

## 현재 핵심 데이터 구조
- src/app/App.tsx
  - products, content 상태 보관
  - localStorage 키: sunraytec-cms-state-v1
- src/types/product.ts
  - 제품 기본 스키마 정의
  - 제품군(excellent, mas, personal)과 설치 방식 포함
- src/types/cms.ts
  - Hero/인증/사례 중심 CMS 스키마
- src/data/products.ts
  - 공통 제품 초기 데이터 (우수제품, MAS, 개인용 포함)
  - product_data 엑셀 기준 조달 식별번호 반영
- src/data/siteContent.ts
  - Hero 및 사이트 콘텐츠 초기 데이터

## 현재 임시 구현 사항 (Supabase 연동 후 교체 예정)
- CMS 데이터 저장: localStorage 기반
- Hero 외 홈 섹션: 하드코딩 중심
- 제품 데이터: 정적 파일 (자동 동기화 없음)
- 제품 상세 페이지: 이미지/문서/다운로드 링크 미완성

## 현재 확인된 주요 이슈
- Admin CMS 연결: Hero 영역만 연결됨 (다른 섹션 미연결)
- 제품 상세: 다운로드/문서 연계 없음
- Footer 정책 링크 일부 준비중 상태
- Supabase 미연동 (계정 준비됨)
- 프로덕션 빌드 시 번들 500kB 경고 존재
- README에 AI Studio/Gemini 흔적 남아있음 (정리 필요)

## 서브 페이지 구현 우선순위
1. /contact (견적 문의) ← 수주 직결, 최우선
2. /cases (시공사례) ← 신뢰도 핵심
3. /resources/catalog (카탈로그 다운로드)
4. /about/certifications (인증서)
5. /about/history (회사 연혁)
6. /technology/principle (복사난방 원리)

## 작업 시작 전 확인 규칙
1. PROJECT_STATUS.md로 현재 구현 범위 확인
2. NEXT_TASK.md로 지금 해야 할 작업 1개 선택
3. DECISIONS.md로 기존 결정과 충돌 여부 확인
4. 실제 코드와 문서가 다르면 코드 기준으로 판단

## 세션 중단 대비 규칙
- 작업 한 단계 끝날 때마다 SESSION_HANDOFF.md 업데이트
- 다음 AI는 PROJECT_STATUS.md와 SESSION_HANDOFF.md 먼저 읽기
- 중단 직전 작업 파일, 완료 내용, 다음 한 단계만 명확히 기록
