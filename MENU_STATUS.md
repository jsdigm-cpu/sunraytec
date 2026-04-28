# MENU STATUS

마지막 업데이트: 2026-04-28

이 문서는 홈페이지의 전체 메뉴 구조와 개발 진척도를 한눈에 파악하기 위한 현황판입니다. 기능 구현 계획의 상세 설명은 `PROJECT_STATUS.md`, 다음 작업은 `NEXT_TASK.md`, 총괄 운영 원칙은 `CODEX_COMMAND_CENTER.md`를 기준으로 합니다.

## 상태 범례

- 대기중: 아직 작업하지 않았거나 준비중 페이지로 연결됨
- 진행중: UI는 있으나 실제 데이터/파일/세부 기능이 부족함
- 완료: 운영 가능한 수준으로 구현됨

---

## 1. 홈 & 공통

| 메뉴 / 기능 | 경로 | 상태 | 비고 |
|---|---|:---:|---|
| 메인 홈페이지 | `/` | 완료 | Hero, KPI, 제품, 사례, 인증, CTA 등 구성 |
| 상단 네비게이션 | 공통 | 완료 | Header 유틸리티 바, 로그인/로그아웃, 드롭다운 |
| 하단 정보 | 공통 | 완료 | 회사 정보 및 주요 링크 |
| 공통 준비중 페이지 | `/coming-soon` | 완료 | 미구현 메뉴 임시 연결 |

## 2. 회사소개

| 메뉴 / 기능 | 경로 | 상태 | 비고 |
|---|---|:---:|---|
| CEO 메시지 | `/coming-soon?section=company` | 대기중 | Header 기준 |
| 회사 연혁 | `/about/history` | 완료 | |
| 인증서·특허 | `/about/certifications` | 완료 | 실제 PDF 다운로드는 대기 |
| 수상·언론보도 | `/coming-soon?section=company` | 대기중 | |
| 주요 납품처 | `/coming-soon?section=company` | 대기중 | |
| 찾아오시는 길 | `/coming-soon?section=company` | 대기중 | |

## 3. 제품안내

| 메뉴 / 기능 | 경로 | 상태 | 비고 |
|---|---|:---:|---|
| 제품 목록 | `/products` | 완료 | Supabase 제품 테이블 연동 |
| 조달청 우수제품 | `/products/excellence` | 완료 | |
| MAS 다수공급자 | `/products/mas` | 완료 | |
| 제품 상세 페이지 | `/products/:productId` | 진행중 | 이미지 갤러리 연결, 상세자료 다운로드 연결 대기 |
| 방폭·특수 제품 | `/coming-soon?section=special` | 대기중 | |
| 개인용·욕실형 | `/coming-soon?section=products` | 대기중 | |
| 스마트 제어 시스템 | `/coming-soon?section=products` | 대기중 | |
| 제품 비교 | `/coming-soon?section=products` | 대기중 | |

## 4. 기술·솔루션

| 메뉴 / 기능 | 경로 | 상태 | 비고 |
|---|---|:---:|---|
| 복사난방 원리 | `/technology/principle` | 완료 | 애니메이션 원리도·비교표·현장 적용 CTA 구성 |
| 4대 ZERO 기술 | `/technology/zero` | 완료 | 공통 솔루션 템플릿 기반 |
| 공공·교육 솔루션 | `/solutions/public-edu` | 완료 | 공통 솔루션 템플릿 기반 |
| 산업·물류 솔루션 | `/solutions/industrial-logistics` | 완료 | 공통 솔루션 템플릿 기반 |
| 국방·특수 솔루션 | `/solutions/defense-special` | 완료 | 공통 솔루션 템플릿 기반 |
| IoT 중앙제어 | `/solutions/iot-control` | 완료 | 공통 솔루션 템플릿 기반 |

## 5. 시공사례

| 메뉴 / 기능 | 경로 | 상태 | 비고 |
|---|---|:---:|---|
| 전체 포트폴리오 | `/cases` | 완료 | Supabase 사례 연동, 카테고리 필터 |
| 공공·교육 사례 | `/cases` | 완료 | 현재 목록 필터로 대응 |
| 산업·물류 사례 | `/cases` | 완료 | 현재 목록 필터로 대응 |
| 국방·특수 사례 | `/cases` | 완료 | 현재 목록 필터로 대응 |
| 상업·라이프스타일 | `/cases` | 완료 | 현재 목록 필터로 대응 |
| 시공사례 상세 | `/cases/:id` | 진행중 | 상세 설명/추가 사진 보강 대기 |
| 전국 시공 지도 | `/coming-soon?section=cases` | 대기중 | |

## 6. 자료실·파트너

| 메뉴 / 기능 | 경로 | 상태 | 비고 |
|---|---|:---:|---|
| 파트너 포털 | `/partner` | 진행중 | 보호 라우트 구현, 실제 자료 보강 필요 |
| 파트너·협력회사 회원가입 안내 | `/partner/signup-guide` | 완료 | 공개 안내 페이지, 회원가입/로그인 흐름 연결 |
| 파트너 회원가입 | `/signup` | 완료 | |
| 파트너 승인 대기 | `/partner/pending` | 완료 | |
| 난방 용량 계산기 | `/resources/heating-load-calculator` | 완료 | 면적·천장고·단열·구역 비율 기반 1차 용량 계산 |
| 에너지 ROI 계산기 | `/resources/energy-roi-calculator` | 완료 | 난방비·절감률·설치비 기반 회수 기간 계산 |
| 카탈로그 다운로드 | `/resources/catalog` | 진행중 | 공개 자료 DB 연동 및 다운로드 가능, 자료 보강 대기 |
| 스펙·도면 CAD | `/resources/spec-cad` | 진행중 | 자료 요청 흐름과 제공 항목 안내, 실파일 업로드 대기 |
| 인증서·시험성적서 | `/about/certifications` | 진행중 | 페이지 구현, 파일 다운로드 대기 |
| 동영상 자료 | `/resources/videos` | 진행중 | 영상 카테고리 안내, 실영상 연결 대기 |

## 7. 고객센터

| 메뉴 / 기능 | 경로 | 상태 | 비고 |
|---|---|:---:|---|
| 견적 문의 | `/contact` | 완료 | Supabase `inquiries` 저장 |
| FAQ | `/coming-soon?section=contact` | 대기중 | |
| 공지사항 | `/coming-soon?section=contact` | 대기중 | |
| 대리점 모집 | `/coming-soon?section=contact` | 대기중 | |
| 나라장터 바로가기 | 외부 링크 | 완료 | `https://www.g2b.go.kr` |
| AI 상담 챗봇 | `/coming-soon?section=contact` | 대기중 | |

## 8. 관리자

| 메뉴 / 기능 | 경로 | 상태 | 비고 |
|---|---|:---:|---|
| 로그인 | `/login` | 완료 | Supabase Auth |
| 관리자 대시보드 | `/admin` | 완료 | 보호 라우트 |
| 제품 관리 | `/admin` | 완료 | 추가/수정/삭제, 이미지 업로드, 분류 필터, 작성일, 좌표 기반 정렬 |
| Hero 텍스트 편집 | `/admin` | 완료 | `site_content` 일부 연동 |
| 견적 문의 관리 | `/admin` | 완료 | |
| 회원 관리 | `/admin` | 완료 | |
| 시공사례 관리 | `/admin` | 완료 | 이미지 업로드, 분류 필터, 작성일, 좌표 기반 정렬 |
| 자료실 관리 | `/admin` | 완료 | 파일 업로드/수정/삭제/정렬, 공개 자료 연동 |
| 홈 기타 영역 CMS | `/admin` | 대기중 | KPI 등 Hero 외 섹션 편집 |
