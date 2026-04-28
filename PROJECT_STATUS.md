# PROJECT STATUS

마지막 업데이트: 2026-04-27

## 프로젝트 한줄 설명

썬레이텍 공식 홈페이지를 React + Vite + TypeScript + Supabase로 구축 중입니다. 현재 주요 사용자 페이지, Supabase 연동, 인증/관리자 기능 일부가 구현되어 있고, Codex가 개발 총괄을 맡아 Claude CLI 및 Antigravity와 협업합니다.

## 현재 배포 주소

- Production: https://sunraytec.vercel.app

---

## 기술 스택

| 영역 | 현재 상태 |
|---|---|
| Frontend | React 19, Vite 6, TypeScript |
| Routing | React Router v7 계열, lazy loading 적용 |
| Styling | Tailwind v4, `src/styles` 공통 CSS, 컴포넌트 인라인 스타일 혼용 |
| Animation | `motion`, 일부 `framer-motion` import 잔존 |
| Icons | lucide-react |
| Backend / DB | Supabase PostgreSQL, Auth, Storage |
| Deployment | GitHub `jsdigm-cpu/sunraytec` → Vercel 자동 배포 |

## 주요 기준 파일

- 총괄 운영: `CODEX_COMMAND_CENTER.md`
- 라우팅: `src/app/routes.tsx`
- 앱 레이아웃/데이터 주입: `src/app/App.tsx`
- Header 메뉴: `src/components/layout/Header.tsx`
- Footer 링크: `src/components/layout/Footer.tsx`
- Supabase 클라이언트: `src/lib/supabase.ts`

---

## AI 협업 체계

| AI | 역할 |
|---|---|
| Codex | 총괄 지휘, 코드 점검, 문서/작업 큐 관리, 최종 검증 |
| Claude CLI | 복잡한 구현, Supabase/인증/Storage/DB 작업 보조 |
| Antigravity | UI 보강, 단순 페이지 구현, 반복 컴포넌트 작업 |
| Claude Web | 기획 리뷰, 카피/정보구조 검토, 작업 요청서 작성 |

상세 규칙은 `CODEX_COMMAND_CENTER.md`와 `AI_HANDOFF_PROMPTS.md`를 기준으로 합니다.

---

## 완료된 구현 요약

### 메인 페이지 `/`

- Hero 슬라이드 10장, 현장별 캡션, 도트 네비게이터
- KPI, 4대 ZERO, 복사/대류 비교, 업종별 솔루션
- 제품 라인업, 시공사례, 인증·특허, 계산기 미리보기, CTA
- Hero 텍스트 일부 CMS 연동

### 제품

- `/products`: Supabase `products` 테이블 기반 목록
- `/products/excellence`: 조달청 우수제품 페이지
- `/products/mas`: MAS 다수공급자 페이지
- `/products/:productId`: 상세 페이지 UI 및 다중 이미지 갤러리 연결

### 시공사례

- `/cases`: Supabase `case_studies` 기반 목록과 카테고리 필터
- `/cases/:id`: 상세 보기, 이미지 슬라이드/라이트박스/이전·다음 구조
- 상세 설명과 추가 현장 사진은 데이터 보강 필요

### 인증·회사소개

- `/about/history`: 연혁 페이지
- `/about/certifications`: 특허 10건 중심 반영
- `CERT_INVENTORY.md`: 인증·특허·시험성적서 관리 대장 작성

### 파트너/인증/관리자

- `/signup`, `/login`: Supabase Auth 기반 회원가입/로그인, 프로필 생성/조회 오류 안내 보강
- `/partner`: 승인된 파트너 또는 관리자 보호 라우트
- `/partner/pending`: 승인 대기 페이지
- `/admin`: 관리자 보호 라우트, 제품/콘텐츠/문의/회원/시공사례/자료실 관리
- 관리자 제품 추가/수정/삭제: Supabase `products` upsert/delete 연결 및 결과 안내
- 관리자 제품 이미지: Supabase Storage 업로드 방식, 여러 장 이미지, 첫 이미지 썸네일/상세 대표 이미지 구조 구현
- 관리자 제품 정렬: 분류별 필터, 작성일 표시, 위/아래 버튼, 좌표 기반 드래그 정렬, `sort_order` 저장 구현
- 관리자 제품 수정 폼: 각 입력 필드 라벨을 입력칸 밖에 고정 표시
- 관리자 시공사례: 이미지 파일 업로드, 대표 이미지 저장, 분류별 필터, 작성일 표시, 좌표 기반 드래그 정렬 구현
- 관리자 자료실: `resource_documents` 기반 파일 업로드/수정/삭제/정렬, 이미지 썸네일 표시, 공개 자료 연동 구현
- 회원 승인 관리: EmailJS 환경변수 누락/발송 실패 안내 보강
- 회원 상세 관리: 조직, 직책, 관심 사항, 로그인 횟수, 자료실 방문 횟수 확인 가능
- 파트너 전용 자료실: 본인 정보 수정, 비밀번호 변경 탭 추가
- Header 유틸리티 바에 로그인 상태, 권한 배지, 로그아웃 반영

### 문의 및 자료실

- `/contact`: 견적 문의 폼, Supabase `inquiries` 저장
- `/resources/catalog`: `resource_documents` 공개 자료 연동, 이미지 파일 썸네일과 다운로드 연결

### 성능/인프라

- Vercel 배포 및 Supabase 환경변수 구성
- 라우트 lazy loading 적용
- 번들 분할 설정 적용

---

## 현재 라우트 목록

| 경로 | 상태 | 메모 |
|---|:---:|---|
| `/` | 완료 | 메인 랜딩 |
| `/products` | 완료 | 제품 목록 |
| `/products/excellence` | 완료 | 우수제품 |
| `/products/mas` | 완료 | MAS 제품 |
| `/products/:productId` | 진행중 | 이미지 갤러리 연결, 상세자료 다운로드 연결 대기 |
| `/cases` | 완료 | 목록/필터 |
| `/cases/:id` | 진행중 | 상세 데이터 보강 대기 |
| `/resources/catalog` | 진행중 | 공개 자료 연동 및 다운로드 가능, 자료 보강 대기 |
| `/about/certifications` | 완료 | 인증·특허 페이지, 파일 다운로드는 대기 |
| `/about/history` | 완료 | 회사 연혁 |
| `/contact` | 완료 | 문의 저장 |
| `/admin` | 완료 | 관리자 보호 라우트, 기능 일부 확장 여지 |
| `/partner` | 진행중 | 보호 라우트와 포털, 실제 자료 보강 필요 |
| `/partner/pending` | 완료 | 승인 대기 |
| `/login` | 완료 | 로그인 |
| `/signup` | 완료 | 회원가입 |
| `/coming-soon` | 완료 | 미구현 메뉴 공통 대기 페이지 |

---

## Supabase DB 현황

| 테이블 | 용도 | 상태 |
|---|---|---|
| `products` | 제품 목록/상세 | 운영 중 |
| `site_content` | Hero CMS 콘텐츠 | 운영 중 |
| `case_studies` | 시공사례 목록/상세 | 운영 중, 데이터 보강 필요 |
| `inquiries` | 견적 문의 | 운영 중 |
| `profiles` | 회원 프로필/권한 | 운영 중 |
| `partner_signup_requests` | 가입 신청 접수 대장 | 운영 중 |
| `resource_documents` | 자료실 파일 목록 | 운영 중 |

주의: RLS 정책은 운영 안정성을 위해 Supabase 대시보드에서 주기적으로 재확인해야 합니다. 특히 관리자 화면에서 `products` insert/update/delete와 Storage 업로드 정책이 실제 운영 DB에서 허용되는지 확인해야 합니다.

---

## 남은 핵심 이슈

| 우선순위 | 이슈 | 상태 |
|---|---|---|
| P1 | 관리자 업로드/정렬/CRUD 구조 재설계 | 완료 |
| P1 | 제품/시공사례/자료실 순서 관리 | 완료 |
| P1 | Supabase Storage 버킷 및 업로드 정책 설계 | 운영 DB 적용 완료 |
| P1 | `/technology/principle` 복사난방 원리 페이지 신설 | 완료 (2026-04-28) |
| P1 | 파트너 전용 자료실 관리 구조 통합 | 대기 |
| P1 | 제품 상세 자료 다운로드 연결 | 대기 |
| P1 | 카탈로그/지명원 PDF 추가 업로드 | 자료 보강 대기 |
| P1 | 시공사례 상세 설명/추가 이미지 보강 | 데이터 보강 대기 |
| P1 | Supabase `products` 관리자 쓰기 RLS 정책 확인 | 대기 |
| P2 | 인증서/시험성적서 PDF 연결 | 파일 대기 |
| P2 | Hero 외 홈 섹션 Admin 편집 기능 | 대기 |
| P2 | `@google/genai` 미사용 여부 확인 후 제거 | 대기 |
| P2 | 추가 입력 검증, 에러 모니터링, 테스트 보강 | 대기 |

---

## 작업 시 주의

- 실제 코드와 문서가 다르면 코드 기준으로 판단합니다.
- Header/Footer/라우팅/인증/DB 변경은 영향 범위가 크므로 관련 파일을 먼저 읽습니다.
- 새 페이지를 만들 때는 `src/app/routes.tsx`, `Header.tsx`, `MENU_STATUS.md`를 함께 갱신합니다.
- 실제 PDF/이미지 파일이 필요한 작업은 사용자가 파일을 제공한 뒤 진행합니다.
- 관리자 정렬 기능은 번호 입력보다 드래그/위아래 버튼을 우선합니다. 현재 좌표 기반 pointer 정렬로 구현되어 있습니다.
- 사용자 화면 노출 순서는 DB의 `sort_order ASC`를 기준으로 통일합니다.
- 코드 변경 후 가능한 경우 `npm run build`를 실행합니다.
