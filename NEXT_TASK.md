# NEXT TASK

마지막 업데이트: 2026-04-27

## 사용 규칙

- 이 파일에는 지금 바로 이어갈 작업만 둡니다.
- 완료된 작업은 `PROJECT_STATUS.md`, 필요 시 `MENU_STATUS.md`, `SESSION_HANDOFF.md`에 반영한 뒤 여기서 삭제합니다.
- 실제 코드와 문서가 다르면 코드가 정답입니다.
- Codex가 작업 큐를 총괄하고, Claude CLI/Antigravity는 지정된 단위 작업을 보조합니다.

---

## 최우선

### 1. 관리자 업로드/정렬/CRUD 구조 재설계

- 담당 후보: Codex 주도, Claude CLI 보조 가능
- 목표: 제품안내, 시공사례, 자료실을 관리자 화면에서 파일 업로드/리스트/상세/수정/삭제/노출 순서 관리까지 일관되게 운영 가능하도록 재설계
- 사용자 요청 핵심:
  - 이미지/자료 파일은 URL 입력이 아니라 파일 첨부 및 Supabase Storage 업로드 방식으로 전환
  - 여러 장 업로드 가능
  - 제품 이미지는 첫 번째 업로드 파일을 썸네일 겸 첫 번째 상세 이미지로 사용
  - 제품, 시공사례, 자료실 모두 관리자 페이지에서 리스트/상세/수정/삭제 가능해야 함
  - 노출 순서는 관리자 목록에서 드래그앤드롭으로 조정
  - 모바일/터치 보조용으로 위/아래 이동 버튼도 고려
- 권장 구현 방향:
  - 드래그앤드롭 라이브러리: `@dnd-kit/core`, `@dnd-kit/sortable`
  - DB 정렬 기준: 각 테이블의 `sort_order ASC`
  - 저장 방식: 화면에서 순서 변경 후 `순서 저장` 버튼으로 Supabase 일괄 업데이트
  - Storage 버킷 후보: `product-images`, `case-images`, `resource-files` 또는 통합 `uploads`
- 먼저 확인할 파일:
  - `src/pages/AdminDashboardPage.tsx`
  - `src/components/admin/ProductForm.tsx`
  - `src/components/admin/ProductListEditor.tsx`
  - `src/components/admin/CaseEditor.tsx`
  - `src/pages/resources/CatalogPage.tsx`
  - `src/app/App.tsx`
  - `supabase_schema.sql`
- 완료 기준:
  - Supabase Storage/DB 설계 SQL 작성
  - 제품 이미지 여러 장 업로드 및 미리보기/삭제 구현
  - 첫 번째 제품 이미지를 썸네일로 자동 사용
  - 제품 목록 드래그앤드롭 순서 변경 및 `sort_order` 저장 구현
  - 시공사례 이미지 업로드/정렬 구조 설계 및 가능하면 구현
  - 자료실 파일 업로드/다운로드 관리 구조 설계 및 가능하면 구현
  - 사용자 화면이 관리자 지정 `sort_order`대로 노출됨
  - `npm run lint`, `npm run build` 성공

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

### 3. Supabase 운영 DB 정책 SQL 상태 최종 확인

- 담당 후보: 사용자 또는 Supabase 관리자 권한이 있는 AI/도구
- 목표: 지금까지 작성/적용된 SQL이 운영 DB에 모두 반영됐는지 확인
- 관련 파일:
  - `supabase_fix_auth_cms_policies.sql`
  - `supabase_create_signup_requests_table.sql`
  - `supabase_member_profile_enhancements.sql`
- 현재 메모:
  - `supabase_member_profile_enhancements.sql`은 2026-04-27 화면상 `Success. No rows returned` 확인됨
- 완료 기준:
  - 신규 회원가입, 이메일 인증, 관리자 회원 상세, 파트너 내 정보 수정, 로그인/자료실 방문 카운트 정상 확인

### 4. 제품 상세 페이지 이미지 연결

- 담당 후보: Claude CLI
- 전제: 1번 업로드/Storage 설계 완료
- 목표: 제품별 대표/상세 이미지가 사용자 제품 카드와 상세 페이지에 반영
- 관련 파일:
  - `src/pages/products/ProductDetailPage.tsx`
  - `src/components/product/ProductGrid.tsx`
  - `src/components/ui/ExcellenceProductCard.tsx`
  - Supabase `products`

### 5. 자료실 PDF 업로드 및 다운로드 연결

- 담당 후보: Claude CLI
- 전제: 1번 업로드/Storage 설계 완료
- 목표: Supabase Storage 파일 업로드 후 `CatalogPage` 다운로드 연결
- 관련 파일:
  - `src/pages/resources/CatalogPage.tsx`
  - `CERT_INVENTORY.md`

---

## 장기 과제

- 시공사례/제품/자료실 파일 업로드 구조 공통화
- 관리자 목록 드래그앤드롭 순서 관리 공통 컴포넌트화
- 시공사례 상세 설명과 추가 현장 사진 보강
- 인증서/특허/시험성적서 파일 다운로드 연결
- 파트너 전용 자료실 실자료 연결
- Hero 슬라이드 캡션 Admin 편집 기능
- Hero 외 홈 섹션 Admin CMS 확장
- 미사용 패키지 확인 및 정리
- 입력 검증, 에러 모니터링, 테스트 도입
