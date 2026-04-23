# AI COLLABORATION RULES & PROMPTS

이 문서는 프로젝트에 투입되는 모든 AI 에이전트(Claude, Codex, Antigravity 등)가 지켜야 할 **공통 작업 규칙** 및 **인수인계 프롬프트**입니다.
이 파일 하나로 프로젝트의 작업 표준을 유지합니다.

---

## 🛑 AI 에이전트 핵심 행동 수칙 (CORE RULES)
1. **문서보다 코드가 먼저다 (Code > Docs)**: `PROJECT_STATUS.md` 등의 기획/상태 문서와 실제 코드가 불일치할 경우, **반드시 실제 구현된 코드를 진실(Source of Truth)로 판단**해야 합니다.
2. **미구현 기능을 전제하지 말 것**: 작업 요청 시 존재하지 않는 라우트, DB 테이블, 파일을 이미 있는 것처럼 가정하고 덮어쓰거나 무시하지 마세요.
3. **한 번에 하나의 작업만 (One Task at a Time)**: `NEXT_TASK.md`에 여러 과제가 있더라도, 컨텍스트 손실을 막기 위해 반드시 **가장 최우선(최상단)에 있는 작업 1개**만 처리하고 멈추세요.
4. **Tailwind CSS 엄수**: 커스텀 CSS 파일을 새로 만들지 마세요. 모든 스타일링은 Tailwind 유틸리티 클래스와 인라인 스타일(설정 불가피한 경우)로 해결합니다.
5. **작업 후 상태 업데이트 의무**: 작업을 완료하면 반드시 `PROJECT_STATUS.md`, `MENU_STATUS.md` (메뉴 진행 상태 표), `SESSION_HANDOFF.md` 세 가지 문서를 최신화해야 합니다.

---

## 🛠 AI 에이전트별 초기 설정 프롬프트

사용자(Human)는 새로운 AI 세션을 열 때 아래 텍스트를 복사하여 첫 프롬프트로 입력하세요.

### ➡️ 클로드 채팅 (Claude Web) 용 프롬프트
```text
이 프로젝트는 썬레이텍 공식 홈페이지입니다. 너의 역할은 코드 직접 구현이 아닌 '기획 리뷰 및 작업 요청서 작성'입니다.
작업 전 반드시 `PROJECT_STATUS.md`와 `NEXT_TASK.md`를 기준으로 현재 상태를 요약해주세요.
이후 `NEXT_TASK.md`의 최상단 작업 1개를 다른 코딩 AI(Claude Code, Codex)가 바로 실행할 수 있도록, 수정해야 할 파일명과 요구사항을 아주 명확하고 컴팩트한 작업 요청문으로 만들어주세요.
```

### ➡️ 코드 구현 AI (Claude Code, Codex, Antigravity) 용 프롬프트
```text
이 프로젝트는 썬레이텍 공식 홈페이지입니다 (React 19 + Supabase).
작업 전 `PROJECT_STATUS.md`, `MENU_STATUS.md`, `SESSION_HANDOFF.md`, `NEXT_TASK.md`를 읽고 현재 상태를 파악하세요.
문서와 코드가 다르면 항상 '실제 코드'를 진실로 취급하세요.
현재 `NEXT_TASK.md`에 기재된 [🔴 최우선] 작업 1개만을 진행해 주세요.
작업을 마친 후에는 반드시 변경 사항을 `SESSION_HANDOFF.md`에 기록하고, 특정 기능/메뉴가 완성되었다면 `MENU_STATUS.md`의 신호등 상태(🔴/🟡/🟢)를 변경한 뒤 `NEXT_TASK.md`에서 삭제해 주세요.
```

---

## 🤝 세션 인수인계 프롬프트 (세션이 끊겼을 때)

```text
이전 AI 세션이 중단되었습니다.
가장 먼저 `SESSION_HANDOFF.md`를 읽고 직전 세션에서 어디까지 작업이 진행되었는지, 남아있는 이슈는 무엇인지 파악하세요.
그 후 `NEXT_TASK.md`를 확인하여 멈췄던 작업을 이어서 1개만 진행해 주세요.
```
