-- ============================================================
-- 뉴스·블로그 posts 테이블
-- Supabase SQL Editor에서 실행하세요.
-- ============================================================

-- 1. 테이블 생성
CREATE TABLE IF NOT EXISTS public.posts (
  id            TEXT        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title         TEXT        NOT NULL,
  category      TEXT        NOT NULL CHECK (category IN ('보도자료', '기술 정보', '시공기', '제품 소식')),
  summary       TEXT        NOT NULL,
  content       TEXT,
  thumbnail_url TEXT,
  published_at  DATE        NOT NULL DEFAULT CURRENT_DATE,
  is_published  BOOLEAN     NOT NULL DEFAULT true,
  author        TEXT,
  tags          TEXT[]      DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at ON public.posts;
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_posts_updated_at();

-- 3. RLS 설정
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 공개된 게시물은 누구나 조회 가능
DROP POLICY IF EXISTS "posts_public_read" ON public.posts;
CREATE POLICY "posts_public_read"
  ON public.posts FOR SELECT
  USING (is_published = true);

-- 관리자만 쓰기 가능
DROP POLICY IF EXISTS "posts_admin_all" ON public.posts;
CREATE POLICY "posts_admin_all"
  ON public.posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- 4. 인덱스
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON public.posts (published_at DESC);
CREATE INDEX IF NOT EXISTS posts_category_idx     ON public.posts (category);
CREATE INDEX IF NOT EXISTS posts_is_published_idx ON public.posts (is_published);

-- 5. 초기 데이터 (정적 fallback과 동일한 6개)
INSERT INTO public.posts (id, title, category, summary, content, published_at, author, tags) VALUES
(
  'post-001',
  '썬레이텍, 2025년 조달청 우수제품 3회 지정 달성',
  '보도자료',
  '2013년, 2019년에 이어 2025년 세 번째 조달청 우수제품으로 지정되었습니다. 복사난방 분야에서 유일하게 3회 지정된 제품으로, 공공기관 납품 경쟁력을 한층 강화했습니다.',
  E'썬레이텍(대표이사 박○○)이 2025년 조달청 우수제품으로 재지정되며 총 3회 지정이라는 기록을 달성했습니다.\n\n조달청 우수제품은 성능·품질·기술 우수성을 공인 받은 제품에게 부여되는 인증으로, 공공기관 수의계약 납품이 가능해집니다.\n\n**주요 사항**\n- 제품명: 원적외선 복사난방 패널히터 SUR 시리즈\n- 지정 번호: 조달청 우수제품 번호 (최신 지정분 참조)\n- 유효 기간: 2025년 ~ 2028년 (3년)\n\n이로써 썬레이텍은 복사난방 분야에서 국내 유일의 3회 우수제품 지정 기업이 되었으며, 전국 지자체·교육청·군부대 등 공공기관 납품 시 수의계약 활용이 가능합니다.\n\n박이사(대표)는 "우수제품 3회 지정은 제품 기술력과 납품 신뢰성에 대한 국가 공인"이라며 "지속적인 R&D 투자로 더 나은 복사난방 솔루션을 공급하겠다"고 밝혔습니다.',
  '2025-03-15',
  '썬레이텍 홍보팀',
  ARRAY['우수제품', '조달청', '공공조달', 'SUR시리즈']
),
(
  'post-002',
  '복사난방 vs 대류난방 — 에너지 효율 비교 분석',
  '기술 정보',
  'KTR 공인 시험 결과를 바탕으로 원적외선 복사난방과 기존 대류난방(온풍기·FCU)의 에너지 소비량, 쾌적성, 설치 비용을 실증 데이터로 비교합니다.',
  E'**복사난방과 대류난방의 근본적 차이**\n\n대류난방(온풍기·FCU·에어컨)은 공기를 먼저 가열해 온도를 높입니다. 반면 원적외선 복사난방은 표면과 사람에게 직접 열을 전달합니다.\n\n**KTR 공인 시험 결과**\n\n| 항목 | 복사난방(SUR) | 대류난방(일반) |\n|------|-------------|--------------|\n| 소비전력 절감 | 약 39.4% | 기준 |\n| 원적외선 방사율 | 0.91 | 해당 없음 |\n| 항균 성능 | 99.9% | 없음 |\n\n**고천장 공간에서의 차이**\n\n천장 높이 5m 이상 공간에서 대류난방은 열이 천장 쪽으로 모여 작업자 위치의 온도가 낮아집니다. 복사난방은 패널에서 바닥·사람·장비 표면에 직접 열을 전달하므로 높이와 무관하게 동일한 쾌적성을 제공합니다.\n\n**실증 사례**\n\n㈜가나에너지 공장 사례에서는 온풍기(45kW×3대) 교체 후 난방비가 연간 1,130만 원에서 576만 원으로 57% 절감되었습니다.',
  '2025-02-20',
  '기술연구소',
  ARRAY['기술 비교', 'KTR 시험', '에너지 절감', '원적외선']
),
(
  'post-003',
  '경기도 초등학교 급식실 복사난방 시공기',
  '시공기',
  '600㎡ 규모의 초등학교 급식실에 원적외선 복사난방 패널 28대를 설치한 과정을 상세히 기록했습니다. 기존 에어컨 냉난방 대비 50% 이상 에너지 절감 효과를 확인했습니다.',
  NULL,
  '2025-01-10',
  '시공팀',
  ARRAY['학교', '급식실', '공공시설', '에너지절감']
),
(
  'post-004',
  '신제품 출시: SUR-4K 방폭 패널히터 국방 특화 모델',
  '제품 소식',
  '군사 시설·위험물 취급 장소에 특화된 방폭 인증 패널히터 SUR-4K를 출시했습니다. EX emb II T1 국제 방폭 인증을 획득, 기존 모델 대비 발열 효율 15% 향상.',
  NULL,
  '2024-12-05',
  '제품개발팀',
  ARRAY['방폭', '국방', 'SUR-4K', '신제품']
),
(
  'post-005',
  '대형 물류센터 고천장 난방 솔루션 가이드',
  '기술 정보',
  '천장 높이 8~12m 물류창고에서 복사난방이 효과적인 이유와 최적 설치 방법을 정리했습니다. 구역별 제어 시스템으로 야간 빈 구역 운용 비용을 최소화하는 방법도 소개합니다.',
  NULL,
  '2024-11-18',
  '기술연구소',
  ARRAY['물류센터', '고천장', '구역제어', '에너지절감']
),
(
  'post-006',
  '육군 GOP 경계초소 12개 사단 납품 완료',
  '보도자료',
  '지상작전사령부 수요자 제안형 혁신제품으로 선정된 경계초소용 복사난방 시스템이 전방 12개 사단에 납품 완료되었습니다. 사용자 만족도 96점으로 추가 확대 납품이 논의 중입니다.',
  NULL,
  '2024-10-30',
  '영업팀',
  ARRAY['국방', 'GOP', '경계초소', '군납']
)
ON CONFLICT (id) DO NOTHING;
