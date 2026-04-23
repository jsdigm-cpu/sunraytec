# NEXT TASK

마지막 업데이트: 2026-04-23 (저녁 세션)

## 사용 규칙
- 이 파일에는 "지금 바로 할 일"만 유지합니다.
- 끝난 작업은 PROJECT_STATUS.md에 반영 후 여기서 삭제합니다.
- 실제 코드와 문서가 다르면 코드가 정답입니다.

---

## 🔴 최우선 (지금 바로)

### Admin: 관리자 계정(master@sunraytec.net) 생성 재작업
**담당**: 사용자 (Supabase 대시보드 직접 조작)
**이유**: 이전 작업에서 auth.users 테이블에만 데이터가 들어가고 auth.identities 테이블에 누락되어 로그인이 안되는 현상
**조치 방법**:
1. Supabase 대시보드 -> Authentication -> Users 이동
2. `master@sunraytec.net` 계정 삭제 (Delete user)
3. 삭제 완료 후, 아래 채팅창에 "삭제 완료"라고 남겨주시면 바로 API를 통해 정상 회원가입 및 Admin 권한 부여를 진행하겠습니다.

---

## 🟠 다음 우선순위

### 자료실 PDF 업로드 + CatalogPage 연결 (Phase 2-3)
**담당**: Claude Code (사용자가 실제 PDF 파일 준비 후)
**목표**: Supabase Storage 'downloads' 버킷에 카탈로그 PDF 업로드, CatalogPage 다운로드 링크 연결
**관련 파일**: src/pages/resources/CatalogPage.tsx, CERT_INVENTORY.md
**사전 조건**: 실제 PDF 파일 준비 필요 (사용자 확인 후 진행)

### 제품 상세 페이지 이미지 연결 (Phase 3-3)
**담당**: Claude Code
**목표**: Supabase Storage에 제품 이미지 업로드 후 thumbnail_image URL 연결
**관련 파일**: src/pages/products/ProductDetailPage.tsx
**사전 조건**: 제품 이미지 파일 준비 필요

### /technology/principle 페이지 (복사난방 원리)
**담당**: Codex 또는 Claude Code
**목표**: 복사난방 원리 설명 페이지 신규 제작
**현재 상태**: /coming-soon으로 연결 중

---

## 🟡 장기 과제

- Admin에서 Hero 슬라이드 캡션(SLIDE_INFO) 편집 기능
- 인증서 파일 Supabase Storage 업로드 (CERT_INVENTORY.md 기준 41개)
- CertificationsPage에 실제 인증서 PDF 다운로드 링크 연결
- 홈 섹션 (KPI, 업종별 솔루션 등) Admin 편집 가능하도록 확장
- README.md 정리 (Gemini/AI Studio 흔적 제거)

---

## Codex 작업 전 체크리스트
```
□ git pull로 최신화 확인
□ PROJECT_STATUS.md 라우트 목록 확인
□ DECISIONS.md 스타일 원칙 확인
□ Header.tsx / Footer.tsx 절대 수정 금지
□ Tailwind CSS만 사용 (별도 CSS 파일 생성 금지)
□ 작업 완료 후 npm run build 성공 확인
□ 커밋 & 푸시 후 Vercel 자동배포 확인
```
