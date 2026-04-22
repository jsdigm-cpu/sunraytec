# SESSION HANDOFF

마지막 업데이트: 2026-04-22 (저녁 세션)

이 파일은 세션이 갑자기 종료되거나 AI를 바꿔야 할 때
바로 이어서 작업하기 위한 인계 메모입니다.

---

## 현재 세션 상태
- 상태: **Supabase DB 연동 완료** (로컬 환경 + 클라우드 모두)
- 배포 상태: https://sunraytec.vercel.app ✅ 운영 중
- 현재 활성 작업: Supabase 프론트엔드 연동 시작 단계
- 현재 기준 문서:
  - PROJECT_STATUS.md (현황 전체)
  - NEXT_TASK.md (지금 할 일)
  - DECISIONS.md (결정 기록)
  - SESSION_HANDOFF.md (이 파일, 인수인계)
  - SUPABASE_PLAN.md (DB 설계)

---

## 방금 끝낸 것 (2026-04-22 저녁)

### Supabase DB 연동 완료 ✅
1. **Vercel CLI 로컬 로그인 완료** (npx vercel link → jsdigm-cpus-projects/sunraytec 연결)
2. **.env.local 환경변수 설정 완료**
   - `VITE_SUPABASE_URL=https://dpyvabbxjgkxypafdrrp.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=sb_publishable_FbU38FsKNWADLALwq3kucg_VurLdupO`
3. **Supabase 테이블 4개 생성 완료** (supabase_schema.sql 실행)
   - `products` - 제품 데이터
   - `site_content` - 사이트 콘텐츠
   - `case_studies` - 시공사례
   - `inquiries` - 견적 문의
4. **RLS 정책 설정 완료** (anon 키로 읽기/쓰기 허용)
5. **시드(Seed) 데이터 업로드 완료**
   - products: 17개 제품 모두 업로드 완료
   - site_content: Hero 데이터 업로드 완료
6. **seedSupabase.ts 필드명 버그 수정 완료**
   - productLine → `p.productLine` (카멜케이스로 수정)
   - specs.powerW → `p.specs?.powerW` 로 수정

---

## 아직 진행 중인 것 (다음 세션에서 시작)

### 🔴 프론트엔드 Supabase 연결 (아직 안 함!)
- **현재 상태**: 앱이 여전히 `products.ts`, `siteContent.ts` 정적 파일에서 데이터를 읽고 있음
- **해야 할 것**: DB에서 읽어오도록 코드 교체

### 다음 세션 작업 우선순위 (다음 AI에게 질문한 내용)
1. ① **제품 목록을 Supabase에서 읽기** → `/products` 페이지가 DB 기반으로 동작
2. ② **견적 문의 폼 → DB 저장** → `/contact` 폼 실제 저장 완성 (수주 직결!)
3. ③ **Hero 콘텐츠 → DB에서 읽기** → Admin CMS 수정사항이 DB에 저장

> ⚠️ **중요**: 어느 것부터 할지 사용자에게 먼저 확인해야 함!
> 추천 순서: ② 견적 문의 저장 → ① 제품 DB 연동 → ③ Hero DB 연동

---

## 마지막으로 확인한 핵심 파일
- src/lib/supabase.ts → Supabase 클라이언트 (환경변수 기반)
- src/data/seedSupabase.ts → 시드 스크립트 (수정 완료)
- src/data/products.ts → 현재 정적 데이터 (Supabase 연동 후 대체 예정)
- src/data/siteContent.ts → Hero 등 정적 콘텐츠 (연동 후 대체 예정)
- src/app/App.tsx → 현재 products/content 상태 보관 중
- .env.local → Supabase 키 포함 (로컬 전용, git에 올라가지 않음)
- supabase_schema.sql → DB 스키마 초기 SQL (참고용)

---

## 다음 AI가 바로 해야 할 작업
**사용자에게 먼저 확인: 어느 것부터 할지?**

```
①번: 제품 목록 Supabase 연동
→ src/app/App.tsx에서 initialProducts 대신 supabase.from('products').select() 로 교체
→ 로딩 상태(loading) 추가
→ 에러 처리 추가

②번: 견적 문의 폼 DB 저장 (추천!)
→ src/pages/ContactPage.tsx 에서 폼 submit 시
  supabase.from('inquiries').insert({...}) 호출
→ 성공/실패 메시지 처리
→ Supabase 대시보드에서 실시간 확인 가능

③번: Hero 콘텐츠 DB 연동
→ App.tsx에서 site_content 읽어오기
→ Admin 수정 시 supabase.from('site_content').upsert() 저장
```

---

## 다음 작업 시작 전 체크
1. PROJECT_STATUS.md에서 살아있는 라우트 목록 확인
2. DECISIONS.md에서 스타일/구조 원칙 확인
3. Header.tsx / Footer.tsx 절대 수정 금지
4. Tailwind CSS만 사용 (별도 CSS 파일 생성 금지)
5. 완료 후 이 파일(SESSION_HANDOFF.md) 업데이트

---

## 남은 리스크 / 주의점
- `.env.local`은 git에 포함되지 않아 로컬에서만 동작 (Vercel에는 별도 설정 필요)
- Vercel 환경변수 대시보드에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 추가 필요!
  → 현재 Vercel 프로덕션에는 키가 없어서 배포된 사이트에서 Supabase 연동이 안 될 수 있음
- 빌드 번들 500kB 경고 존재 (나중에 lazy loading으로 처리)
- README에 AI Studio/Gemini 흔적 남아있음
