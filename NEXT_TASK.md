# NEXT TASK

마지막 업데이트: 2026-04-27

## 사용 규칙

- 이 파일에는 지금 바로 이어갈 작업만 둡니다.
- 완료된 작업은 `PROJECT_STATUS.md`, 필요 시 `MENU_STATUS.md`, `SESSION_HANDOFF.md`에 반영한 뒤 여기서 삭제합니다.
- 실제 코드와 문서가 다르면 코드가 정답입니다.
- Codex가 작업 큐를 총괄하고, Claude CLI/Antigravity는 지정된 단위 작업을 보조합니다.

---

## 최우선

### 1. Supabase 운영 DB 정책 SQL 적용

- 담당 후보: 사용자 또는 Supabase 관리자 권한이 있는 AI/도구
- 목표: 회원가입 `profiles` 자동 생성과 Admin CMS 쓰기 권한 정상화
- 실행 파일:
  - `supabase_fix_auth_cms_policies.sql`
- 완료 기준:
  - Supabase Dashboard > SQL Editor에서 SQL 전체 실행 성공
  - SQL 실행 전 생성된 Auth 사용자도 `profiles`에 backfill됨
  - `partner_signup_requests` 테이블이 생성되고 신규 가입 신청이 관리자 회원 관리에 표시됨
  - 신규 회원가입 시 `profiles` RLS 오류가 발생하지 않음
  - Admin Hero 폰트/굵기/강조색 저장 후 로그아웃/재접속해도 유지됨

### 2. `/technology/principle` 복사난방 원리 페이지 신설

- 담당 후보: Codex 또는 Antigravity
- 목표: 현재 `/coming-soon?section=solutions`로 연결된 복사난방 원리 메뉴를 실제 페이지로 전환
- 관련 파일:
  - `src/app/routes.tsx`
  - `src/components/layout/Header.tsx`
  - 신규 페이지 `src/pages/technology/PrinciplePage.tsx`
  - `MENU_STATUS.md`
- 완료 기준:
  - `/technology/principle` 라우트 추가
  - Header의 복사난방 원리 링크 변경
  - 모바일/데스크탑 반응형 확인
  - `npm run build` 성공

## 다음 우선순위

### 3. 제품 상세 페이지 이미지 연결

- 담당 후보: Claude CLI
- 전제: 사용자가 제품 이미지 파일 또는 URL 제공
- 목표: 제품별 `thumbnail_image`, `detail_image`를 Supabase 데이터와 연결
- 관련 파일:
  - `src/pages/products/ProductDetailPage.tsx`
  - `src/components/product/ProductGrid.tsx`
  - Supabase `products`

### 4. 자료실 PDF 업로드 및 다운로드 연결

- 담당 후보: Claude CLI
- 전제: 사용자가 카탈로그/지명원/PDF 파일 제공
- 목표: Supabase Storage `downloads` 버킷에 파일 업로드 후 `CatalogPage` 다운로드 연결
- 관련 파일:
  - `src/pages/resources/CatalogPage.tsx`
  - `CERT_INVENTORY.md`

---

## 장기 과제

- 시공사례 상세 설명과 추가 현장 사진 보강
- 인증서/특허/시험성적서 파일 다운로드 연결
- 파트너 전용 자료실 실자료 연결
- Hero 슬라이드 캡션 Admin 편집 기능
- Hero 외 홈 섹션 Admin CMS 확장
- 미사용 패키지 확인 및 정리
- 입력 검증, 에러 모니터링, 테스트 도입
