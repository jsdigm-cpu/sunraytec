# Supabase Plan

마지막 업데이트: 2026-04-21

## 목적

현재 `localStorage` 기반 임시 CMS 상태를 운영형 구조로 전환하기 위해 Supabase를 도입합니다.

## 1차 연동 대상

1. `products`
2. `site_content`
3. `case_studies`
4. `inquiries`

## 권장 테이블 초안

### `products`

- `id` text primary key
- `name` text not null
- `category` text not null
- `product_line` text not null
- `installation_type` text
- `summary` text
- `detail_description` text
- `applications` jsonb
- `power_w` integer
- `size_mm` text
- `voltage` text
- `heating_area` text
- `procurement_id` text
- `thumbnail_image` text
- `detail_image` text
- `feature_bullets` jsonb
- `sort_order` integer default 0
- `created_at` timestamptz default now()
- `updated_at` timestamptz default now()

### `site_content`

- `id` uuid primary key default gen_random_uuid()
- `section_key` text unique not null
- `payload` jsonb not null
- `updated_at` timestamptz default now()

### `case_studies`

- `id` uuid primary key default gen_random_uuid()
- `title` text not null
- `category` text
- `location` text
- `summary` text
- `content` text
- `image_url` text
- `featured` boolean default false
- `created_at` timestamptz default now()
- `updated_at` timestamptz default now()

### `inquiries`

- `id` uuid primary key default gen_random_uuid()
- `name` text not null
- `company` text
- `phone` text
- `email` text
- `project_type` text
- `message` text
- `status` text default 'new'
- `created_at` timestamptz default now()

## Storage 버킷 초안

- `product-images`
- `case-study-images`
- `downloads`

## 프론트 연동 순서

1. 제품 목록/상세를 Supabase 조회로 전환
2. Hero 및 주요 콘텐츠를 `site_content`로 전환
3. 시공사례 페이지 구축 후 `case_studies` 연결
4. 견적문의 페이지 구축 후 `inquiries` 저장 연결

## Vercel 환경변수

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 주의점

- 현재 제품 구조는 이미 Supabase 이전을 고려해 확장된 상태입니다.
- 파일 업로드는 Storage 정책과 공개/비공개 전략을 먼저 정한 뒤 연결하는 것이 좋습니다.
- 관리자 인증이 필요해지면 Supabase Auth를 후속 단계로 도입합니다.
