# NEXT TASK

마지막 업데이트: 2026-04-27

## 사용 규칙

- 이 파일에는 지금 바로 이어갈 작업만 둡니다.
- 완료된 작업은 `PROJECT_STATUS.md`, 필요 시 `MENU_STATUS.md`, `SESSION_HANDOFF.md`에 반영한 뒤 여기서 삭제합니다.
- 실제 코드와 문서가 다르면 코드가 정답입니다.
- Codex가 작업 큐를 총괄하고, Claude CLI/Antigravity는 지정된 단위 작업을 보조합니다.

---

## 최우선

### 1. `/technology/principle` 복사난방 원리 페이지 신설

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

### 2. 파트너 전용 자료실 관리 구조 통합

- 담당 후보: Codex 주도
- 목표: 현재 `/partner`가 조회하는 `partner_files`와 관리자 `자료실 관리(resource_documents)`의 관계를 정리
- 현재 메모:
  - 공개 자료실 `/resources/catalog`는 `resource_documents`와 연동 완료
  - 파트너 포털 `/partner`는 아직 별도 `partner_files` 테이블을 조회 중
  - 관리자 자료실에 `파트너 자료` 카테고리는 추가됐지만 파트너 포털과는 미연동
- 관련 파일:
  - `src/pages/partner/PartnerPortalPage.tsx`
  - `src/components/admin/ResourceDocumentEditor.tsx`
  - `src/pages/resources/CatalogPage.tsx`
  - `supabase_schema.sql`
- 완료 기준:
  - 관리자에서 파트너 전용 자료 등록 가능
  - 승인된 파트너가 `/partner`에서 해당 자료 다운로드 가능
  - 공개 자료와 파트너 전용 자료 노출 범위가 분리됨

### 3. Supabase 운영 DB 정책 SQL 상태 최종 확인

- 담당 후보: 사용자 또는 Supabase 관리자 권한이 있는 AI/도구
- 목표: 지금까지 작성/적용된 SQL이 운영 DB에 모두 반영됐는지 확인
- 관련 파일:
  - `supabase_fix_auth_cms_policies.sql`
  - `supabase_create_signup_requests_table.sql`
  - `supabase_member_profile_enhancements.sql`
- 현재 메모:
  - `supabase_member_profile_enhancements.sql`은 2026-04-27 화면상 `Success. No rows returned` 확인됨
  - `supabase_storage_uploads_delta.sql`은 2026-04-27 사용자 화면상 적용 성공 확인됨
- 완료 기준:
  - 신규 회원가입, 이메일 인증, 관리자 회원 상세, 파트너 내 정보 수정, 로그인/자료실 방문 카운트 정상 확인

### 4. 제품 상세 페이지 자료 연결

- 담당 후보: Claude CLI
- 전제: 제품 이미지 업로드/갤러리 구조 완료
- 목표: 제품별 카탈로그, 시방서, 인증서 등 관련 자료 다운로드 연결
- 관련 파일:
  - `src/pages/products/ProductDetailPage.tsx`
  - `src/components/product/ProductGrid.tsx`
  - `src/components/ui/ExcellenceProductCard.tsx`
  - Supabase `products`

### 5. 시공사례 상세 데이터 보강

- 담당 후보: Claude CLI
- 전제: 시공사례 이미지 업로드 구조 완료
- 목표: 사례별 상세 설명, 대표/추가 이미지, 적용 제품, 지역/업종 데이터를 보강
- 관련 파일:
  - `src/components/admin/CaseEditor.tsx`
  - `src/pages/CaseDetailPage.tsx`
  - Supabase `case_studies`

---

## 장기 과제

- 시공사례/제품/자료실 파일 업로드 구조 공통화
- 관리자 목록 정렬 UI 공통 컴포넌트화
- 시공사례 상세 설명과 추가 현장 사진 보강
- 인증서/특허/시험성적서 파일 다운로드 연결
- 파트너 전용 자료실 실자료 연결
- Hero 슬라이드 캡션 Admin 편집 기능
- Hero 외 홈 섹션 Admin CMS 확장
- 미사용 패키지 확인 및 정리
- 입력 검증, 에러 모니터링, 테스트 도입
