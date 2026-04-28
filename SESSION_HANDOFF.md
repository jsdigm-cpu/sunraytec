# SESSION HANDOFF

마지막 업데이트: 2026-04-28

이 파일은 세션이 중단되거나 다른 AI로 넘어갈 때 바로 이어서 작업하기 위한 인수인계 메모입니다. 실제 코드와 문서가 다르면 항상 코드가 정답입니다.

---

## 직전 세션 목표

박이사님은 직전 세션의 인수인계를 이어 `/technology/principle` 복사난방 원리 페이지를 신설하고, Header의 준비중 링크를 실제 페이지로 전환해줄 것을 요청했습니다.

---

## 이번 세션 (2026-04-28) 작업 요약

- 2026-04-28 추가 진행:
  - 메인 히어로 현장 배지를 2줄 구조로 정리해 긴 현장명이 한 줄에 붙어 보이는 문제 완화
  - `/fasttrack` 패스트트랙 라운지 페이지 신설 및 배너 버튼 연결
  - 회사소개 coming-soon 링크 제거용 초안 페이지 추가: `/about/ceo-message`, `/about/media`, `/about/clients`, `/about/location`
  - 제품 하위 coming-soon 링크 제거용 초안 페이지 추가: `/products/special`, `/products/personal-bath`, `/products/smart-control`, `/products/compare`
  - 시공사례 전국 지도 초안 `/cases-map` 추가. 실제 지도 API 전 단계로 `case_studies`를 권역별 목록으로 표시
  - 고객센터 초안 페이지 추가: `/support/faq`, `/support/notice`, `/support/dealers`, `/support/chatbot`
  - 정책 초안 페이지 추가: `/policy/privacy`, `/policy/terms`
  - `Header.tsx`, `Footer.tsx`, `routes.tsx` 링크를 신규 페이지로 업데이트
  - `npm run lint`, `npm run build` 성공
  - Playwright로 신규 15개 경로 모바일/데스크톱 순회 검증: 콘솔 오류 없음, 400 이상 응답 없음, 가로 넘침 없음

- 신규 페이지 `src/pages/technology/PrinciplePage.tsx` 추가 (Sub-Hero, 복사 vs 대류 비교표, 4단계 원리, 6대 강점, 적용분야, CTA, 모바일 대응 포함)
- `src/app/routes.tsx`에 `/technology/principle` 라우트 추가
- `src/components/layout/Header.tsx`에서 `복사난방 원리` 링크를 `/coming-soon?section=solutions`에서 `/technology/principle`로 교체하고 `comingSoon` 플래그 제거
- 상위 `기술·솔루션` 메뉴 자체 링크도 `/technology/principle`로 변경
- `npm run lint`, `npm run build` 모두 성공 확인 (PrinciplePage 청크 13.17 kB)
- 브랜치 `claude/nostalgic-payne-6b67a5`로 commit `20f3dc4`, push 완료
- Vercel preview URL은 박이사님이 모바일에서 확인 예정

남은 핵심 작업은 `NEXT_TASK.md` 기준으로 신규 초안 페이지 실제 자료 보강, 파트너 자료실 통합, 제품 상세 자료 연결 순서입니다.

---

## 이전 세션에서 확인한 내용

- 2026-04-27 최종 확인: `supabase_storage_uploads_delta.sql` 운영 DB 적용 성공.
- 2026-04-27 최종 확인: 관리자 자료실에서 한글 파일명 업로드 시 Storage key 오류가 있었고, 내부 저장 경로를 영문 안전 slug로 변환하도록 수정했습니다.
- 2026-04-27 최종 확인: 공개 자료실 `/resources/catalog`는 `resource_documents` 공개 자료를 표시하고, 이미지 파일은 썸네일로 표시합니다.
- 2026-04-27 최종 확인: 제품/시공사례/자료실 관리자 목록은 분류 필터, 작성일 표시, 위/아래 이동, 좌표 기반 드래그 정렬까지 배포 후 사용자 확인 완료.
- 2026-04-27 최종 확인: HTML5 drag/drop 방식은 운영 화면에서 안정적으로 작동하지 않아 pointer 좌표 기반 정렬 방식으로 대체했습니다.
- 2026-04-27 추가 확인: 웹 검토 중 회원가입에서 `profiles` RLS insert 오류가 발생했습니다.
- 2026-04-27 추가 확인: Admin Hero 문구/폰트/굵기 변경이 현재 세션에서는 보이나 로그아웃/재접속 후 이전 상태로 돌아갔습니다.
- 원인: `profiles` 생성과 `site_content` upsert가 Supabase RLS에 막혀 DB에 영구 저장되지 않았습니다.
- 2026-04-27 추가 확인: 이메일 인증 후 관리자 회원 목록에 가입 신청이 보이지 않는 사례가 있었습니다. trigger 적용 전 생성된 Auth 사용자를 복구하기 위해 `supabase_fix_auth_cms_policies.sql`에 backfill 쿼리를 추가했습니다.
- 2026-04-27 추가 확인: 관리자 제품 목록은 DB에서 로드된 목록이므로, 목록 클릭 시 좌측 폼에 값을 불러와 수정할 수 있도록 개선했습니다.
- 2026-04-27 추가 확인: 가입 신청이 Auth/profile 생성 전 단계에서 유실되어 관리자 화면에 보이지 않는 문제가 있어 `partner_signup_requests` 접수 대장 테이블과 관리자 표시 로직을 추가했습니다.
- 2026-04-27 추가 확인: 관리자 회원 관리에 탈퇴/삭제 메뉴가 필요하여, 일반 파트너 Auth 계정 삭제 RPC와 접수 대장 삭제 기능을 추가했습니다.
- 2026-04-27 추가 확인: 회원 가입자 상세 정보에는 조직(부서명), 직책(직위), 관심 사항, 로그인 횟수, 파트너 자료실 방문 횟수가 필요합니다.
- 2026-04-27 추가 확인: 파트너 전용 자료실에는 가입자가 본인 정보와 비밀번호를 수정할 수 있는 `내 정보` 영역이 필요합니다.
- 2026-04-27 추가 확인: 관리자 제품 수정 폼은 placeholder만 보여 항목명이 입력값에 묻히므로, 라벨을 입력칸 밖에 표시해야 합니다.
- 2026-04-27 다음 작업 요청: 제품/시공사례/자료실의 이미지·파일 입력은 URL 방식이 아니라 Supabase Storage 파일 업로드 방식으로 전환해야 합니다.
- 2026-04-27 다음 작업 요청: 제품/시공사례/자료실의 관리자 목록은 리스트/상세/수정/삭제와 함께 드래그앤드롭 노출 순서 관리가 필요합니다.
- 회원가입은 Supabase Auth 가입 후 `profiles` 생성 실패를 확인하지 않아 가입 성공처럼 보일 수 있었습니다.
- 로그인은 프로필 조회 실패 시 사용자에게 안내 없이 멈춘 것처럼 보일 수 있었습니다.
- 관리자 제품 관리는 기존에 React state만 바꾸고 Supabase `products` 테이블에 저장하지 않았습니다.
- 회원 승인 메일은 EmailJS 환경변수 누락 시 콘솔에만 실패가 남는 구조였습니다.
- 로그인/파트너 포털 로고 경로가 실제 로고 파일 경로와 달랐습니다.
- `npm run lint` 실행 전 Vite env 타입 선언과 일부 `React.*` 타입 import가 누락되어 있었습니다.

---

## 이번 세션에서 수정한 코드

- `src/pages/about/AboutInfoPage.tsx`
  - CEO 메시지, 수상·언론보도, 주요 납품처, 찾아오시는 길 공통 초안 페이지 추가
- `src/pages/products/ProductGuidePage.tsx`
  - 방폭·특수 제품, 개인용·욕실형, 스마트 제어, 제품 비교 공통 초안 페이지 추가
- `src/pages/support/SupportPage.tsx`
  - FAQ, 공지사항, 대리점 모집, AI 상담 챗봇, 개인정보처리방침, 이용약관 공통 초안 페이지 추가
- `src/pages/CasesMapPage.tsx`
  - `case_studies` 위치 텍스트 기반 권역별 시공사례 목록 페이지 추가
- `src/pages/FastTrackPage.tsx`
  - 공공기관 자료 라운지 초안 페이지 추가
- `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/app/routes.tsx`
  - 신규 페이지 라우트와 메뉴/푸터 링크 연결
- `src/components/home/HeroSection.tsx`
  - 현장 배지를 고정 라벨과 현장 설명 2줄로 분리
- `src/components/home/FastTrackBanner.tsx`
  - `/fasttrack` 라우터 링크 연결

- `src/lib/storageUploads.ts`
  - Supabase Storage 공개 URL 업로드 헬퍼 추가
- `src/types/product.ts`, `src/app/App.tsx`
  - 제품 `imageGallery`, `sortOrder` 매핑 추가
- `src/pages/AdminDashboardPage.tsx`
  - 제품 `image_gallery`, `sort_order` 저장 추가
  - 제품 노출 순서 저장 함수 추가
  - 자료실 관리 탭 연결
- `src/components/admin/ProductForm.tsx`
  - URL 입력 대신 여러 이미지 파일 업로드 방식 추가
  - 첫 번째 이미지를 썸네일/상세 대표 이미지로 자동 사용
  - 이미지 미리보기, 삭제, 위/아래 순서 변경 추가
- `src/components/admin/ProductListEditor.tsx`
  - 분류 필터, 작성일 표시, 위/아래 버튼, 좌표 기반 드래그 정렬로 제품 노출 순서 변경
  - `순서 저장` 버튼 추가
- `src/components/admin/CaseEditor.tsx`
  - 시공사례 이미지 URL 입력을 Storage 파일 업로드 방식으로 전환
  - 첫 이미지가 `image_url` 대표 이미지로 저장되도록 보강
  - 목록을 우측으로 배치하고 분류 필터, 작성일 표시, 좌표 기반 드래그 정렬 추가
- `src/components/admin/Sidebar.tsx`, `src/components/admin/ResourceDocumentEditor.tsx`
  - 관리자 `자료실 관리` 탭 추가
  - 자료 파일 업로드, 추가/수정/삭제, 공개 여부, 위/아래 정렬, 좌표 기반 드래그 정렬 구현
- `src/pages/resources/CatalogPage.tsx`
  - `resource_documents` 공개 자료를 Supabase에서 읽어 표시하고 파일 URL 다운로드 연결
  - 이미지 파일은 카드에 썸네일 미리보기 표시
- `src/pages/products/ProductDetailPage.tsx`
  - 제품 상세에서 다중 이미지 갤러리 표시
- `supabase_schema.sql`
  - `products.image_gallery`, `case_studies.images/description/installed_at/sort_order`, `resource_documents` 추가
  - `product-images`, `case-images`, `resource-files` Storage 버킷 및 관리자 정책 추가
- `supabase_storage_uploads_delta.sql`
  - Supabase SQL Editor에 바로 붙여넣을 수 있는 이번 변경분 전용 SQL 추가
  - 2026-04-27 운영 DB 적용 성공 확인

- `src/contexts/AuthContext.tsx`
  - 운영 콘솔 로그 정리
  - 로그인/세션 변경 시 프로필 로딩 상태 보강
  - 회원가입 시 `profiles` insert 오류를 반환하도록 수정
  - 가입 신청 메타데이터에 조직/직책/관심 사항 추가
  - 로그인 횟수 추적 RPC 호출 추가
- `src/pages/auth/SignupPage.tsx`
  - 연락처 형식 검증 추가
  - 입력값 trim 처리
  - 가입 완료 안내에 승인 전 자료실 제한 문구 추가
  - 조직(부서명), 직책(직위), 관심 사항 풀다운 필드 추가
- `src/pages/auth/LoginPage.tsx`
  - 프로필 누락 시 안내 메시지 표시
  - 로고 경로를 `/images/copmany_logo.png`로 수정
- `src/components/auth/ProtectedRoute.tsx`
  - 관리자도 파트너 보호 라우트 접근 가능하도록 보정
- `src/pages/AdminDashboardPage.tsx`
  - 제품 추가/수정/삭제를 Supabase `products` upsert/delete와 연결
  - 저장/삭제 성공 및 실패 안내 추가
- `src/components/admin/ProductForm.tsx`
  - 필수값 검증 메시지, 저장 중 상태, 저장 결과 메시지 추가
  - 각 필드 라벨을 입력칸 밖에 고정 표시하도록 개선
- `src/components/admin/ProductListEditor.tsx`
  - 삭제 확인창과 삭제 실패 안내 추가
- `src/components/admin/MemberManager.tsx`
  - 회원 목록/상태 변경 실패 안내 추가
  - EmailJS 환경변수 누락 시 화면 안내
- `src/components/admin/CaseEditor.tsx`
  - 추가 이미지 URL 형식 검증 추가
- `src/pages/partner/PartnerPortalPage.tsx`
  - Supabase 미설정 시 로딩 고착 방지
  - 로고 경로 수정
  - `내 정보` 탭 추가
  - 파트너 본인 정보 수정, 비밀번호 변경, 로그인/자료실 방문 카운트 표시 추가
- `src/vite-env.d.ts`
  - Vite 환경변수 타입 선언 추가
- `supabase_fix_auth_cms_policies.sql`
  - 회원가입 시 `profiles` 자동 생성을 위한 Auth trigger 추가
  - trigger 적용 전 생성된 Auth 사용자 backfill 추가
  - `partner_signup_requests` 접수 대장 테이블 및 RLS 추가
  - 관리자 CMS 쓰기 권한을 위한 RLS 정책 추가
- `src/app/App.tsx`, `src/components/admin/ContentEditor.tsx`
  - Hero 저장 실패를 관리자 화면에 표시하도록 보강
- `supabase_schema.sql`
  - 운영 DB 정책 기준을 최신 구조로 보강
- `src/components/admin/ProductForm.tsx`, `src/components/admin/ProductListEditor.tsx`, `src/pages/AdminDashboardPage.tsx`
  - 제품 목록 클릭 시 좌측 폼에 제품 정보 로드 및 수정 저장 가능하도록 개선
- `src/contexts/AuthContext.tsx`, `src/pages/auth/LoginPage.tsx`, `src/pages/auth/SignupPage.tsx`
  - 이메일 인증 후 `/login?verified=1`로 돌아오도록 설정하고 안내 문구 보강
  - 가입 신청 정보를 `partner_signup_requests`에도 저장하도록 보강
- `src/components/admin/MemberManager.tsx`
  - `profiles`와 `partner_signup_requests`를 함께 불러와 관리자 회원 관리에 표시
  - 파트너 회원 탈퇴/삭제 및 접수 대장 삭제 버튼 추가
- `supabase_fix_auth_cms_policies.sql`, `supabase_schema.sql`
  - 관리자 전용 `admin_delete_auth_user` RPC 추가
- `supabase_member_profile_enhancements.sql`
  - `profiles`, `partner_signup_requests`에 조직/직책/관심 사항/로그인 횟수/자료실 방문 횟수 관련 컬럼 추가
  - `track_profile_login`, `track_partner_portal_visit`, `update_own_partner_profile` RPC 추가

추가 커밋:
- `d815b9b Enhance partner member profiles`
- `5b94704 Improve product admin form labels`

---

## 이번 세션에서 갱신한 문서

- `SESSION_HANDOFF.md`: 관리자 업로드/정렬/자료실 작업 내역 반영
- `PROJECT_STATUS.md`: 관리자 업로드/정렬/자료실 완료 상태 반영
- `MENU_STATUS.md`: 관리자 자료실/제품/시공사례 상태 반영
- `NEXT_TASK.md`: 다음 작업을 복사난방 원리 페이지와 파트너 자료실 통합으로 정리

---

## 다음 AI가 바로 할 일

1. 다음 최우선 작업은 파트너 전용 자료실(`/partner`)과 관리자 `resource_documents` 구조 통합입니다.
2. 그 다음은 제품 상세 페이지에 카탈로그·시방서·인증서 다운로드 자료 연결입니다.
3. 작업 전 `NEXT_TASK.md`, `PROJECT_STATUS.md`, `MENU_STATUS.md`를 확인하고 코드 기준으로 판단합니다.
4. 작업 완료 후 `npm run lint`, `npm run build`, 커밋, push까지 진행하고 배포된 화면 기준으로 검증합니다.

검증 완료:
- `npm run lint` 성공
- `npm run build` 성공

운영 DB 적용 참고:
- `supabase_member_profile_enhancements.sql`은 2026-04-27 박이사님 화면에서 `Success. No rows returned` 확인됨
- `supabase_storage_uploads_delta.sql`은 2026-04-27 운영 DB 적용 성공 확인됨
- `supabase_fix_auth_cms_policies.sql`, `supabase_create_signup_requests_table.sql` 적용 상태는 다음 세션에서 필요 시 Table Editor/API 동작으로 재확인합니다.

---

## 남은 주요 대기 작업

- 파트너 전용 자료실과 관리자 자료실 관리 통합
- 제품 상세 자료 다운로드 연결
- 카탈로그/지명원 PDF 추가 업로드
- 시공사례 상세 텍스트와 추가 사진 보강
- 인증서/시험성적서 파일 업로드 및 다운로드 연결
- Supabase 대시보드에서 `products` insert/update/delete RLS 정책 확인
