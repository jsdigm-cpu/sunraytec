# AI COLLABORATION RULES & PROMPTS

마지막 업데이트: 2026-04-27

이 문서는 썬레이텍 홈페이지 프로젝트에 투입되는 모든 AI 에이전트(Codex, Claude CLI, Antigravity, Claude Web)가 지켜야 할 공통 작업 규칙과 시작 프롬프트입니다.

현재 운영 원칙은 **Codex 총괄, Claude CLI/Antigravity 보조 실행**입니다.

---

## 핵심 규칙

1. **Code > Docs**: 문서와 실제 구현이 다르면 코드를 진실로 판단하고 문서를 갱신합니다.
2. **Codex가 작업 큐를 관리**합니다: `CODEX_COMMAND_CENTER.md`, `NEXT_TASK.md`, `PROJECT_STATUS.md` 기준으로 다음 작업을 정합니다.
3. **한 번에 하나의 주요 작업**을 끝냅니다. 여러 작업을 동시에 건드려 문맥을 흐리지 않습니다.
4. **라우트와 메뉴는 실제 코드 기준**입니다: `src/app/routes.tsx`, `src/components/layout/Header.tsx`를 확인합니다.
5. **스타일은 기존 체계 존중**: `src/styles`의 토큰/공통 스타일, Tailwind v4, 기존 인라인 스타일 패턴을 우선 사용합니다. 새 전역 CSS 파일은 꼭 필요할 때만 추가합니다.
6. **작업 후 문서 갱신**: 기능 상태가 바뀌면 `PROJECT_STATUS.md`, `MENU_STATUS.md`, `NEXT_TASK.md`, `SESSION_HANDOFF.md` 중 필요한 문서를 업데이트합니다.
7. **검증 우선**: 코드 변경 후 가능한 경우 `npm run build`를 실행합니다.

---

## Codex 시작 프롬프트

```text
이 프로젝트는 썬레이텍 공식 홈페이지입니다.
Codex가 현재 개발 총괄입니다.
작업 전 CODEX_COMMAND_CENTER.md, PROJECT_STATUS.md, MENU_STATUS.md, NEXT_TASK.md, SESSION_HANDOFF.md를 읽고 실제 코드와 비교해 주세요.
문서와 코드가 다르면 코드를 기준으로 판단하고, 현재 NEXT_TASK.md의 최우선 작업 1개를 진행해 주세요.
작업 완료 후 필요한 문서를 갱신하고 npm run build로 검증해 주세요.
```

---

## Claude CLI 작업 요청 프롬프트

```text
이 프로젝트는 썬레이텍 공식 홈페이지입니다.
Codex가 총괄하고 있으며, 당신은 지정된 구현 작업을 맡는 보조 실행자입니다.
작업 전 CODEX_COMMAND_CENTER.md, PROJECT_STATUS.md, NEXT_TASK.md를 읽고 실제 코드와 불일치가 있으면 코드 기준으로 진행하세요.
이번 세션에서는 사용자가 지정한 작업 1개만 구현하세요.
DB, Supabase, 인증, Storage를 수정할 때는 변경한 테이블/정책/환경변수/파일을 SESSION_HANDOFF.md에 반드시 기록하세요.
완료 후 npm run build 결과와 수정 파일 목록을 보고하세요.
```

---

## Antigravity 작업 요청 프롬프트

```text
이 프로젝트는 썬레이텍 공식 홈페이지입니다.
Codex가 총괄하고 있으며, 당신은 UI/페이지 보강 담당입니다.
작업 전 CODEX_COMMAND_CENTER.md, MENU_STATUS.md, NEXT_TASK.md를 읽고 실제 라우트는 src/app/routes.tsx에서 확인하세요.
이번 세션에서는 지정된 페이지 또는 컴포넌트 1개만 작업하세요.
기존 브랜드 컬러, Header/Footer 구조, 반응형 스타일을 유지하고 불필요한 전역 CSS를 추가하지 마세요.
완료 후 바뀐 메뉴 상태가 있으면 MENU_STATUS.md 갱신 내용을 보고하세요.
```

---

## Claude Web 기획 리뷰 프롬프트

```text
이 프로젝트는 썬레이텍 공식 홈페이지입니다.
당신은 코드 구현자가 아니라 기획 리뷰와 작업 요청서 작성 담당입니다.
PROJECT_STATUS.md, CODEX_COMMAND_CENTER.md, NEXT_TASK.md 기준으로 현재 상태를 요약하고,
다음 구현 AI가 바로 실행할 수 있도록 수정 파일, 목표, 완료 기준, 주의사항을 포함한 짧은 작업 요청문을 작성해 주세요.
```

---

## 세션 복구 프롬프트

```text
이전 AI 세션이 중단되었습니다.
먼저 SESSION_HANDOFF.md와 NEXT_TASK.md를 읽고 직전 작업과 남은 이슈를 파악하세요.
그 다음 CODEX_COMMAND_CENTER.md의 운영 규칙에 따라 최우선 작업 1개만 이어서 진행해 주세요.
```

