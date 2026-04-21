# PROJECT STATUS

마지막 업데이트: 2026-04-21

## 프로젝트 한줄 설명
썬레이텍 회사 홈페이지를 React + Vite + TypeScript로 구축 중이며, 현재는 초기 프론트 구조와 콘텐츠/제품 CMS 흐름을 정리하는 단계입니다.

## 기술 스택
- Frontend: React 19, Vite 6, TypeScript
- Routing: React Router
- Animation/UI: motion, lucide-react, CSS 파일 기반 스타일링
- 데이터 상태: 현재 로컬 상태 + `localStorage` 임시 저장
- 배포 예정: GitHub + Vercel
- 데이터/인증 예정: Supabase

## 현재 구현 완료 항목
- 메인 페이지 섹션 구조 구현
  - Hero
  - KPI
  - ZERO
  - 비교 섹션
  - 솔루션 섹션
  - 제품 라인업
  - 사례 섹션
  - 인증 섹션
  - 계산기
  - 패스트트랙 배너
  - CTA
- 제품 목록 페이지 구현
- 조달청 우수제품 전용 페이지 구현
- MAS 다수공급자 전용 페이지 구현
- 제품 상세 페이지 초안 구현
- 엑셀 데이터 기반 제품 라인업 재정리 완료
  - 우수제품과 MAS 제품을 같은 공통 데이터 소스에서 관리
  - `SUR-2400T/D` 같은 묶음 표기를 개별 모델로 분리
  - 매립형/노출형/벽걸이형을 제품 페이지와 스펙 표에서 구분 표시
- 관리자 대시보드 초안 구현
  - 제품 추가/삭제
  - 히어로 콘텐츠 편집 UI
  - Hero 문구 공개 페이지 반영 연결 완료
  - Hero 카피 줄바꿈/폰트/크기/굵기/강조색 편집 가능
- 기본 레이아웃 구현
  - Header
  - Footer
  - 공통 App shell
- 현재 구현된 라우트 기준으로 Header/Footer/홈 CTA 안전 정리 완료
- 우수제품 페이지를 공통 `products` 소스 기반으로 통합 완료
- 공통 `준비중 안내 페이지` 추가 완료
- 타입 검사 통과
- 프로덕션 빌드 통과 확인

## 현재 살아있는 라우트
- `/`
- `/products`
- `/products/excellence`
- `/products/mas`
- `/products/:productId`
- `/admin`
- `/coming-soon`

## 현재 핵심 데이터 구조
- `src/app/App.tsx`
  - `products`, `content` 상태를 보관
  - `localStorage` 키 `sunraytec-cms-state-v1` 사용
- `src/types/product.ts`
  - 제품 기본 스키마 정의
  - 제품군(`excellent`, `mas`, `personal`)과 설치 방식 정보 포함
  - 상세 설명, 포인트, 이미지 URL 등 상세 페이지 확장 필드 포함
- `src/types/cms.ts`
  - Hero/인증/사례 중심의 CMS 스키마 정의
- `src/data/products.ts`
  - 공통 제품 초기 데이터
  - 우수제품, MAS, 개인용 모델 포함
  - `product_data` 엑셀 시트 기준 조달 식별번호 반영
- `src/data/siteContent.ts`
  - Hero 및 일부 사이트 콘텐츠 초기 데이터

## 현재 임시 구현 사항
- CMS 데이터 저장은 Supabase가 아니라 `localStorage` 기반 임시 구현
- Hero 외 홈 섹션 다수는 아직 하드코딩 비중이 큼
- 제품 데이터는 엑셀 시트를 수동 반영한 정적 파일 상태이며 자동 동기화는 아직 없음
- 제품 상세 페이지는 구현됐지만 이미지/문서/다운로드 링크는 아직 기본 필드 중심
- 상단 메인 메뉴는 전체 IA 구조를 다시 노출하고, 미구현 메뉴는 공통 `준비중 안내 페이지`로 연결됨
- README와 Vite 설정에는 AI Studio/Gemini 기반 흔적이 남아 있음

## 현재 확인된 주요 이슈
- Admin 콘텐츠 편집은 현재 Hero 영역 중심으로만 연결됨
- Hero는 스타일 편집까지 가능하지만 다른 홈 섹션은 아직 CMS 미연결
- 제품 데이터는 우수제품과 MAS까지 정리됐고 상세 페이지 초안도 연결됐지만 다운로드/문서 연계는 아직 없음
- Footer 정책 링크와 일부 정보성 메뉴는 아직 준비중 상태
- Supabase 계정은 준비되었지만 현재 앱과 연결되어 있지 않음
- 프로덕션 빌드 시 번들 크기 500kB 경고가 남아 있음

## 다음 연결 예정 시스템 상태
- GitHub: 계정 있음, 코드 저장소 운용 가능
- Vercel: 계정 있음, 배포 연결 가능
- Supabase: 계정 있음, 현재 프로젝트 코드에는 본격 연동 전

## 최근 결정사항 요약
- 기획 기준 문서는 `sunraytec_website_plan_v2.html`
- 현재 우선순위는 Supabase 연동보다 프론트 구조/라우팅/데이터 흐름 안정화
- AI 협업 기준은 채팅 기록이 아니라 현재 코드와 공유 문서
- 현재 없는 페이지는 링크로 노출하지 않고 `준비중` 또는 대체 CTA로 처리
- Admin 콘텐츠 반영은 Hero부터 연결하고, 다른 섹션은 단계적으로 확장
- 제품 데이터는 공통 `Product` 타입을 중심으로 관리하고 조달 필드는 선택 속성으로 확장
- 제품소개 페이지는 제품 데이터 시트를 기준으로 우수제품/MAS를 개별 모델 단위로 분리해 표시한다
- 제품안내 메인 페이지는 전체 허브 역할을 하고, 각 카드의 `제품 보기`는 개별 상세 페이지로 연결한다
- 미구현 메뉴는 공통 `ComingSoonPage`로 안내하고, 대신 바로 갈 수 있는 핵심 경로를 함께 제공

## 작업 시작 전 확인 규칙
1. `PROJECT_STATUS.md`로 현재 구현 범위를 확인한다.
2. `NEXT_TASK.md`로 지금 해야 할 작업 1개를 고른다.
3. `DECISIONS.md`로 기존 결정과 충돌이 없는지 확인한다.
4. 실제 코드와 문서가 다르면 코드 기준의 현재 상태를 먼저 요약한다.

## 세션 중단 대비 규칙
- 작업이 한 단계 끝날 때마다 `SESSION_HANDOFF.md`를 짧게 업데이트한다.
- 갑자기 대화가 중단되더라도 다음 AI는 `PROJECT_STATUS.md`와 `SESSION_HANDOFF.md`를 먼저 읽는다.
- 중단 직전 작업 중이던 파일, 완료된 내용, 다음 한 단계만 명확히 남긴다.
