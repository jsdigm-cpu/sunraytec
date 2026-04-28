# CONTINUE HERE — 다음 AI 인수인계

마지막 업데이트: 2026-04-28 (Claude Sonnet 4.6 세션 종료)

이 문서는 박이사님의 토큰 한도 도달로 세션이 끊겼을 때 **다른 AI가 바로 이어받기 위한 단일 진입점**입니다. 다른 AI에게는 아래 "사용자가 복사할 시작 프롬프트" 섹션의 텍스트를 그대로 전달하세요.

---

## 사용자가 복사할 시작 프롬프트 (다른 AI에게 그대로 붙여넣기)

```text
당신은 (주)썬레이텍 공식 홈페이지 프로젝트를 이어서 작업하는 AI입니다.
박이사님(비개발자, 한국어 응답)은 이전 Claude 세션의 토큰 한도가 도달하여
당신에게 이어서 진행하도록 요청합니다.

작업 시작 전 반드시 아래 순서로 읽으세요:
1. CONTINUE_HERE.md  ← 가장 먼저 (가장 최신 상태)
2. NEXT_TASK.md      ← 다음 우선 작업
3. PROJECT_STATUS.md ← 전체 상태
4. MENU_STATUS.md    ← 메뉴별 진척도
5. SESSION_HANDOFF.md← 직전 세션 이력
6. AI_HANDOFF_PROMPTS.md ← 공통 규칙

문서와 실제 코드가 다르면 항상 코드가 진실입니다.

이번 세션 작업 방식:
- 한국어로 응답
- 변경 전 항상 박이사님께 확인
- NEXT_TASK.md의 최우선 작업 1개만 끝내기
- 작업 후 npm run lint && npm run build 통과 확인
- 커밋 + 푸시 후 핸드오프 문서(NEXT_TASK, MENU_STATUS, SESSION_HANDOFF, PROJECT_STATUS) 갱신

현재 브랜치: claude/nostalgic-payne-6b67a5
워크트리 경로: C:\projects\sunraytec\.claude\worktrees\nostalgic-payne-6b67a5

이전 세션이 막 끝낸 작업: /technology/principle 복사난방 원리 페이지 신설 완료
다음 최우선 작업: 파트너 전용 자료실(/partner)과 관리자 resource_documents 통합

먼저 위 문서들을 읽고 어떻게 진행할지 박이사님께 한국어로 확인하고 시작하세요.
```

---

## 직전 세션 (2026-04-28) 작업 요약

### 완료된 것
- **`/technology/principle` 복사난방 원리 페이지 신설**
  - 신규 파일: `src/pages/technology/PrinciplePage.tsx`
  - Sub-Hero (브레드크럼)
  - 복사 vs 대류 비교표 (8개 항목, 모바일 2단)
  - 4단계 작동 원리 (전기→복사→흡수→재방출)
  - 6대 핵심 강점
  - 적용 분야 (공공·산업·국방·상업)
  - CTA (제품/문의 연결)
- 라우트 추가: `src/app/routes.tsx`에 `path: 'technology/principle'`
- Header 링크 변경: `src/components/layout/Header.tsx`에서 `/coming-soon?section=solutions` → `/technology/principle`, `comingSoon` 플래그 제거
- 핸드오프 문서 4종 갱신: `NEXT_TASK.md`, `MENU_STATUS.md`, `SESSION_HANDOFF.md`, `PROJECT_STATUS.md`

### 검증 완료
- `npm run lint` ✅ (tsc --noEmit 통과)
- `npm run build` ✅ (PrinciplePage 청크 13.17 kB)

### 커밋 (이번 세션)
- `20f3dc4` Add radiant heating principle page
- `9f9c47a` Update handoff docs after principle page launch

### 푸시
- `origin/claude/nostalgic-payne-6b67a5` 동기화 완료
- Vercel preview URL은 박이사님이 모바일에서 확인 예정

---

## 다음 AI가 시작할 작업 — 파트너 자료실 통합

### 목표
관리자 화면(`자료실 관리` = `resource_documents`)과 파트너 포털(`/partner`이 조회 중인 `partner_files`)의 데이터 구조를 하나로 통합한다.

### 현재 상태
- 공개 자료실 `/resources/catalog` → `resource_documents`와 연동 완료
- 파트너 포털 `/partner` → 아직 별도 `partner_files` 테이블 조회
- 관리자 자료실에 `파트너 자료` 카테고리는 추가됐지만 파트너 포털과 미연동

### 관련 파일
- `src/pages/partner/PartnerPortalPage.tsx`
- `src/components/admin/ResourceDocumentEditor.tsx`
- `src/pages/resources/CatalogPage.tsx`
- `supabase_schema.sql`

### 완료 기준
- 관리자에서 `파트너 전용` 카테고리로 자료 등록 가능
- 승인된 파트너가 `/partner`에서 해당 자료 다운로드 가능
- 공개 자료와 파트너 자료의 노출 범위 분리 (RLS 또는 쿼리 조건)

### 권장 접근
1. `resource_documents` 테이블에 `audience` 컬럼 추가 (`public` / `partner`) — SQL 추가 필요
2. RLS 정책: `audience = 'public'`은 모두 공개, `audience = 'partner'`는 승인 파트너만
3. `PartnerPortalPage`에서 `resource_documents` where `audience = 'partner'` 쿼리
4. `ResourceDocumentEditor`에 `audience` 선택 UI 추가
5. 기존 `partner_files`는 deprecate 또는 마이그레이션 후 제거

---

## 환경 정보

- OS: Windows 11
- Shell: bash (Unix 문법, forward slash 사용)
- 브랜치: `claude/nostalgic-payne-6b67a5`
- 워크트리: `C:\projects\sunraytec\.claude\worktrees\nostalgic-payne-6b67a5`
- 메인: `main`
- Git user: `jsdigm-cpu`
- 사용자 메일: `jsdigm@gmail.com`

### 검증 명령
```bash
npm run lint    # tsc --noEmit
npm run build   # vite build
```

### 커밋 컨벤션
- 영문 메시지, 1줄 요약 + 빈 줄 + 본문
- Co-Authored-By 라인 추가:
  ```
  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```
- (Opus/다른 모델로 작업 시 모델명 교체)

---

## 박이사님 프로필 (auto-memory에서 참조)

- (주)썬레이텍 이사
- 비개발자
- 한국어로 응답
- 변경 전 반드시 확인 요청
- 모바일에서 Vercel preview URL로 검증

---

## 운영 DB 적용 완료된 SQL (참고)

- `supabase_member_profile_enhancements.sql` — 2026-04-27 적용 성공
- `supabase_storage_uploads_delta.sql` — 2026-04-27 적용 성공
- `supabase_fix_auth_cms_policies.sql` — 적용 상태 재확인 필요
- `supabase_create_signup_requests_table.sql` — 적용 상태 재확인 필요

---

## 알려진 미해결 / 대기 작업 (P1 우선순위)

1. **파트너 자료실 통합** ← 다음 작업
2. 제품 상세 자료 다운로드 연결 (카탈로그/시방서/인증서)
3. 카탈로그/지명원 PDF 추가 업로드 (자료 보강 대기)
4. 시공사례 상세 설명·추가 이미지 보강
5. Supabase `products` 관리자 쓰기 RLS 정책 확인

---

## 주요 디렉토리 구조

```
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx          ← 라우트 정의
├── components/
│   ├── admin/              ← 관리자 컴포넌트
│   ├── auth/               ← 인증 가드
│   ├── home/               ← 홈 섹션들
│   └── layout/
│       ├── Header.tsx      ← 메뉴 정의
│       └── Footer.tsx
├── contexts/
│   └── AuthContext.tsx     ← Supabase Auth 래퍼
├── pages/
│   ├── about/              ← 회사소개
│   ├── auth/               ← 로그인/회원가입
│   ├── partner/            ← 파트너 포털
│   ├── products/           ← 제품
│   ├── resources/          ← 자료실
│   └── technology/         ← 기술·솔루션 (PrinciplePage)
└── lib/
    ├── supabase.ts
    └── storageUploads.ts   ← Storage 업로드 헬퍼
```

---

## 마지막으로

박이사님이 이 문서를 다른 AI에게 전달할 때:
1. 새 채팅 시작
2. 위 "사용자가 복사할 시작 프롬프트" 박스의 텍스트 전체 복사
3. 새 AI에게 그대로 붙여넣기
4. AI가 문서를 읽고 한국어로 진행 방향을 확인하면 작업 시작
