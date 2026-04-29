# SESSION_HANDOFF

마지막 업데이트: 2026-04-29, Codex

이 문서는 다음 AI 또는 작업자가 바로 이어서 작업하기 위한 단일 인수인계 문서입니다. 루트 Markdown 문서는 `README.md`와 이 파일만 유지합니다.

## 작업 기준

- 사용자: 박진석 이사님, 호칭은 "박이사님"
- 답변 언어: 반드시 한국어
- 말투: 친근하고 애정어린 톤
- 회사: (주)썬레이텍
- 주력 제품: 원적외선 방사 천장형 복사난방패널
- 주요 영업 채널: 조달청 나라장터, MAS 등록 제품 운영 중, 우수제품 제3자단가계약 이후 추가 등록 예정
- 원천자료 폴더: `C:\projects\homepage_low_data`
- 추가 인증/시험자료 폴더: `C:\projects\homepage_low_data\※인증및시험성적서_추가자료`

## 현재 저장소

- 작업 폴더: `C:\projects\sunraytec`
- GitHub: `https://github.com/jsdigm-cpu/sunraytec`
- Production: `https://sunraytec.vercel.app`
- 브랜치: `main`
- 개발 서버 기본 주소: `http://localhost:3000`

## 이번 세션에서 완료한 내용

1. 홈페이지 콘텐츠 사실관계 1차 정정
   - `1994년 설립`, `30년`, `30+` 등 사실과 다른 장기 업력 표현 제거
   - 회사 기준을 `2002년 기술개발 시작`, `2009년 12월 22일 법인 설립`으로 정리
   - `4대 ZERO 기술`을 `4대 검증 기술` 계열 표현으로 조정
   - `100% 해결`, `유일하게`, `수의계약 없이` 등 과장 또는 오해 소지가 있는 문구 제거
   - `IP-55`, `IP55` 표기를 KTR 시험성적서 기준 `IP65`로 갱신

2. 인증/시험자료 반영
   - KTR 시험성적서 `ECU-2024-014357` 확인
   - 시험대상: 원적외선 방사 천장형 복사난방패널
   - 모델/정격: `SUR-1800-D / 220 V~, 60 Hz, 1,800 W`
   - 시험기간: 2024년 9월 24일 ~ 2024년 10월 2일
   - 결과: `IP65`, 기준 규격 `KS C IEC 60529`
   - 주요 성능 표현은 시험성적서 기반 수치로 조정

3. 루트 Markdown 문서 정리
   - GitHub용 최신 안내 문서: `README.md`
   - AI 작업 인수인계 문서: `SESSION_HANDOFF.md`
   - 중복된 과거 작업 문서는 삭제

## 수정된 주요 소스

- `src/components/home/CertSection.tsx`
- `src/components/home/CompareSection.tsx`
- `src/components/home/KpiSection.tsx`
- `src/components/home/ProductLineupSection.tsx`
- `src/components/home/SolutionSection.tsx`
- `src/components/home/ZeroSection.tsx`
- `src/components/layout/Header.tsx`
- `src/pages/CasesPage.tsx`
- `src/pages/about/CeoMessagePage.tsx`
- `src/pages/about/CertificationsPage.tsx`
- `src/pages/about/HistoryPage.tsx`
- `src/pages/about/MediaPage.tsx`
- `src/pages/products/ProductGuidePage.tsx`
- `src/pages/support/DealersPage.tsx`
- `src/pages/support/FaqPage.tsx`
- `src/pages/technology/TechnologySolutionPage.tsx`

## 콘텐츠 기준 사실

- 법인 설립일: 2009년 12월 22일
- 기술개발 시작: 2002년
- 제품 분야: 원적외선 방사 천장형 복사난방패널
- 핵심 표현 방향: 친환경, 안전, 에너지 절감, 유지관리 편의성, 공공조달 적합성
- 조달 표현 방향: MAS 등록은 확정된 범위에서만 표현하고, 우수제품 제3자단가계약 관련 내용은 완료 전까지 예정/준비 표현 사용
- 인증/시험 표현 방향: 인증서, 특허증, 시험성적서에 확인되는 수치와 문구만 사용

## 확인된 핵심 성능/인증 표현

- 방진방수: `IP65` 확인, KTR `ECU-2024-014357`
- 원적외선 방사율: 시험성적서 기준 `0.91`
- 소비전력량 절감: KTR 시험 기준 약 `39.4%` 절감 표현 사용
- 항균 관련 표현: 시험성적서 기준 `99.9%` 범위에서 사용
- 전자파/화재/결로/미세먼지 관련 표현: "Zero" 단정 대신 설계상 저감, 안전성 확보, 관리 부담 완화 등 검증 가능한 문장 사용

## 삭제한 루트 MD

다음 문서는 중복되거나 오래된 AI 세션용 문서라 삭제했습니다. 필요한 핵심 내용은 `README.md`와 이 문서에 통합했습니다.

- `AI_HANDOFF_PROMPTS.md`
- `CERT_INVENTORY.md`
- `CODEX_COMMAND_CENTER.md`
- `CONTENT_CORRECTION_HANDOFF.md`
- `CONTINUE_HERE.md`
- `MENU_STATUS.md`
- `NEXT_TASK.md`
- `PROJECT_STATUS.md`

## 검증 기준

코드 변경 후 아래 명령을 통과해야 합니다.

```bash
npm run lint
npm run build
```

추가로 콘텐츠 정정 후에는 아래 표현이 `src` 안에 남아 있지 않은지 확인합니다.

```text
1994
30년
30+
IP-55
IP55
전자파 Zero
화재위험 Zero
결로 Zero
미세먼지 Zero
100% 해결
수의계약 없이
유일하게
4대 ZERO
```

## 다음 추천 작업

1. 실제 브라우저 화면 QA
   - 홈, 회사소개, 제품안내, 기술/솔루션, 시공사례, 고객지원 메뉴를 PC와 모바일에서 확인
   - 문구 줄바꿈, 버튼 폭, 카드 높이, 이미지 노출 상태 점검

2. 인증/특허/시험자료 2차 정밀 반영
   - 원천 PDF별 보고서 번호, 시험기관, 시험일, 모델명을 표 형태로 정리
   - 홈페이지 자료실 또는 인증 페이지에서 다운로드/열람 구조 확정

3. 조달/구매 문구 최종 검토
   - MAS 등록 현황과 우수제품 제3자단가계약 진행 상태를 최신 기준으로 분리
   - 완료 전 항목은 예정/준비/추진 표현으로 유지

4. 제품 데이터 고도화
   - 모델별 소비전력, 규격, 설치 기준, 조달 식별번호를 구조화
   - 제품 상세 페이지 또는 비교표에 연결

5. 배포 후 최종 검수
   - Vercel 배포 상태 확인
   - GitHub README 표시 확인
   - 실제 문의/자료실 흐름 점검

## 작업 원칙

- 사실관계가 불확실하면 원천자료를 먼저 확인합니다.
- 회사/제품 홍보 문구는 좋게 쓰되, 인증·시험·조달 표현은 단정하지 않습니다.
- 코드와 문서가 다르면 실제 코드와 원천자료를 우선합니다.
- 새 AI가 이어받을 때는 먼저 `git status --short --branch`, `npm run lint`, `npm run build` 상태를 확인합니다.
