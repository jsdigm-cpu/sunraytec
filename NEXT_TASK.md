# NEXT TASK

마지막 업데이트: 2026-04-23 (저녁 세션)

## 사용 규칙
- 이 파일에는 "지금 바로 할 일"만 유지합니다.
- 끝난 작업은 PROJECT_STATUS.md에 반영 후 여기서 삭제합니다.
- 실제 코드와 문서가 다르면 코드가 정답입니다.

---

## 🔴 최우선 (지금 바로)

### Admin: 시공사례 관리 탭 추가
**담당**: Claude Code
**목표**: Admin 대시보드에서 각 시공사례의 추가 사진(images[])과 상세 설명(description)을 입력할 수 있는 편집 UI 추가
**관련 파일**:
- src/pages/AdminDashboardPage.tsx
- src/components/admin/Sidebar.tsx (탭 추가)
- src/components/admin/CaseEditor.tsx (신규 생성)
**완료 조건**:
- 시공사례 목록 표시 + 항목 선택
- description 텍스트 편집 + Supabase UPDATE
- images[] URL 추가/삭제 + Supabase UPDATE
- installed_at 날짜 입력

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
