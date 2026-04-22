# NEXT TASK

마지막 업데이트: 2026-04-22 (저녁 세션)

## 사용 규칙
- 이 파일에는 항상 "지금 바로 할 일"만 1~3개 유지합니다.
- 끝난 작업은 이 파일에서 지우고 PROJECT_STATUS.md에 반영합니다.
- 방향이 바뀌는 작업은 시작 전에 DECISIONS.md를 먼저 업데이트합니다.
- 각 작업에는 반드시 담당 AI를 명시합니다.

---

## ⚠️ 세션 시작 전 필수 확인 사항

> **Supabase 연동 완료** 되었으나, 아직 프론트엔드는 정적 파일에서 데이터를 읽고 있습니다.
> 다음 세션 시작 시 사용자에게 아래 3가지 중 어느 것부터 할지 먼저 확인하세요!

---

## 현재 최우선 작업 (다음 세션에서 선택)

### 선택지 ① 견적 문의 폼 → Supabase 저장 연동 (★ 추천!)
**담당 AI**: Antigravity 또는 Claude Code

**목표**: `/contact` 페이지 폼 제출 시 실제로 DB에 저장되도록 연동

**완료 조건**:
- `src/pages/ContactPage.tsx`에서 폼 submit 시 `supabase.from('inquiries').insert()` 호출
- 성공 시 "문의가 접수되었습니다" 메시지 표시
- 실패 시 에러 메시지 표시
- Supabase 대시보드 `inquiries` 테이블에서 실시간 확인 가능

**구현 전 확인**:
- `src/lib/supabase.ts` 클라이언트 이미 준비됨
- `inquiries` 테이블 스키마: id, name, company, phone, email, project_type, space_size, message, status, created_at
- RLS 정책: anon INSERT 허용 완료

---

### 선택지 ② 제품 목록 → Supabase에서 읽기
**담당 AI**: Claude Code (복잡한 상태 관리 포함)

**목표**: `App.tsx`의 initialProducts 정적 데이터를 Supabase DB에서 읽어오도록 교체

**완료 조건**:
- `supabase.from('products').select()` 결과를 products 상태에 저장
- 로딩 상태(loading spinner) 추가
- 에러 처리 추가
- 기존 정적 파일은 fallback 용도로만 유지

**구현 전 확인**:
- `src/app/App.tsx`의 products 상태 구조 파악 필요
- DB 컬럼명(snake_case) ↔ 프론트 타입(camelCase) 변환 필요

---

### 선택지 ③ Vercel 환경변수 등록 (⚠️ 배포 필수 조건!)
**담당 AI**: 사용자 직접 또는 Antigravity 안내

**목표**: Vercel 프로덕션 배포 시 Supabase 연동이 동작하도록 환경변수 등록

**완료 조건**:
- Vercel 대시보드 → Settings → Environment Variables 에 아래 2개 추가:
  - `VITE_SUPABASE_URL` = `https://dpyvabbxjgkxypafdrrp.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = `sb_publishable_FbU38FsKNWADLALwq3kucg_VurLdupO`
- Vercel 재배포 후 동작 확인

> ⚠️ 이 작업 없이는 배포 사이트에서 Supabase 연동이 동작하지 않습니다!

---

## 보류 작업

### 시공사례 갤러리 페이지 (/cases) 제작
보류 이유: Supabase 연동 안정화 후 `case_studies` 테이블과 함께 진행 예정

### Admin CMS → Hero 외 섹션 확장
보류 이유: Supabase 연동 완료 후 진행 예정

### 카탈로그 다운로드 페이지 (/resources/catalog) 제작
보류 이유: 실제 파일 Storage 업로드 전략 결정 후 진행

### 번들 크기 최적화 (500kB 경고)
보류 이유: 기능 구현 완료 후 lazy loading으로 처리 예정

---

## Codex 작업 전 체크리스트
```
□ GitHub Desktop에서 "No local changes" 확인
□ 필요 시 git pull로 최신화
□ CODEX_RULES.md 먼저 읽기 (Codex에게 전달)
□ 작업 완료 후 변경 파일 목록 확인
□ 브라우저에서 새 페이지 + 메인 페이지 정상 여부 확인
□ GitHub Desktop에서 커밋 & 푸시
□ Vercel 자동 배포 확인
```
