-- notices 테이블: 공지사항 게시판
CREATE TABLE IF NOT EXISTS public.notices (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category    text NOT NULL DEFAULT '공지',
  tone        text NOT NULL DEFAULT 'gray',
  title       text NOT NULL,
  body        text NOT NULL,
  pinned      boolean NOT NULL DEFAULT false,
  published   boolean NOT NULL DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notices_updated_at
  BEFORE UPDATE ON public.notices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS 활성화
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- 누구나 공개 게시글 조회
CREATE POLICY "notices_public_read"
  ON public.notices FOR SELECT
  USING (published = true);

-- 인증 사용자(관리자)는 전체 조회·수정
CREATE POLICY "notices_auth_all"
  ON public.notices FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 기존 더미 공지 이관
INSERT INTO public.notices (category, tone, title, body, pinned, published, created_at) VALUES
  ('제품',    'red',   '복사난방 원리 페이지 신설',
   '제품 도입 전 검토에 도움이 되도록 복사난방 작동 원리·복사 vs 대류 비교·적용 분야를 정리한 페이지를 새로 열었습니다. 메뉴: 기술·솔루션 → 복사난방 원리.',
   true, true, '2026-04-28'),
  ('자료실',  'navy',  '카탈로그·자료실 다운로드 운영 시작',
   '관리자 자료실에서 등록된 PDF·이미지 자료가 자료실 카탈로그 페이지에서 즉시 다운로드되도록 연동을 마쳤습니다. 신규 자료가 등록되는 즉시 노출됩니다.',
   false, true, '2026-04-27'),
  ('파트너',  'amber', '파트너·협력회사 회원가입 안내 페이지 오픈',
   '대리점·시공사·공공기관 담당자를 위한 회원가입 절차와 권한 부여 흐름을 안내합니다. 파트너 포털 접속 전 확인해 주세요.',
   false, true, '2026-04-25'),
  ('조달',    'red',   '2025 조달청 우수제품 3차 지정 안내',
   '복사난방 분야 단독으로 세 번째 우수제품 지정. 공공기관 수의계약 자격이 갱신되었으며 일위대가표·시방서·도면 자료는 패스트트랙 라운지에서 확인하실 수 있습니다.',
   false, true, '2026-04-20'),
  ('시공사례', 'green', '시공사례 이미지·상세 자료 보강 시작',
   '관리자 등록 자료를 기반으로 메인 페이지·시공사례 페이지의 현장 사진과 설명을 순차적으로 업데이트하고 있습니다.',
   false, true, '2026-04-18'),
  ('공지',    'gray',  '리뉴얼 사이트 공식 오픈',
   '회사소개·제품·기술·시공사례·자료실·파트너 포털·관리자 CMS를 포함한 통합 리뉴얼 사이트를 공개했습니다. 미반영 자료는 순차 업데이트됩니다.',
   false, true, '2026-04-12')
ON CONFLICT DO NOTHING;
