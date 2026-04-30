import { Link } from 'react-router-dom';
import SubHero from '../../components/layout/SubHero';

interface Section {
  title: string;
  body: string;
  items?: string[];
}

const SECTIONS: Section[] = [
  {
    title: '제1조 (목적)',
    body: '(주)썬레이텍(이하 “회사”)은 정보주체의 개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법령을 준수하기 위해 본 개인정보처리방침을 수립·공개합니다. 본 방침은 회사가 운영하는 공식 홈페이지, 자료실, 파트너 포털을 통해 수집되는 개인정보의 처리 기준을 정합니다.',
  },
  {
    title: '제2조 (수집하는 개인정보 항목)',
    body: '회사는 서비스 제공에 필요한 최소한의 개인정보를 수집합니다.',
    items: [
      '회원가입·로그인: 이메일, 비밀번호(암호화 저장), 이름, 연락처, 회사명, 직책',
      '견적·자료 문의: 이름, 연락처, 이메일, 회사·기관명, 문의 내용, 첨부 자료',
      '파트너 신청: 사업자 정보, 담당자 정보, 영업·시공 실적 자료',
      '서비스 이용 기록: 접속 일시, 서비스 이용 기록, 접속 IP, 쿠키, 자료실 다운로드 이력',
    ],
  },
  {
    title: '제3조 (개인정보의 수집 및 이용 목적)',
    body: '수집한 개인정보는 아래 목적 외의 용도로는 이용되지 않습니다.',
    items: [
      '회원 식별 및 본인 확인, 부정 이용 방지',
      '제품·기술 상담, 견적 검토, 자료 제공',
      '파트너 자격 검증, 권한 부여 및 회수',
      '공지사항·자료 업데이트 안내, 서비스 운영 정보 제공',
      '서비스 품질 개선과 통계 분석',
    ],
  },
  {
    title: '제4조 (개인정보의 보유 및 이용 기간)',
    body: '회사는 정보주체로부터 개인정보를 수집할 때 동의받은 기간 또는 관계 법령이 정한 기간 동안 개인정보를 보유·이용합니다. 보유 기간 경과 시 또는 처리 목적 달성 시 지체 없이 파기합니다.',
    items: [
      '회원 정보: 회원 탈퇴 시까지 (관계 법령에 따른 일부 기록은 별도 보존)',
      '문의·견적 기록: 처리 완료 후 3년',
      '파트너 신청·승인 기록: 자격 종료일로부터 5년',
      '전자상거래법 등 관계 법령 별도 규정이 있는 경우 그 기간',
    ],
  },
  {
    title: '제5조 (개인정보의 제3자 제공)',
    body: '회사는 정보주체의 개인정보를 본 방침에서 명시한 범위를 넘어 사용하거나 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다.',
    items: [
      '정보주체로부터 별도의 동의를 받은 경우',
      '법령에 특별한 규정이 있거나 수사기관의 적법한 요청이 있는 경우',
      '통계 작성, 학술 연구 등의 목적으로 특정 개인을 식별할 수 없는 형태로 가공하여 제공하는 경우',
    ],
  },
  {
    title: '제6조 (개인정보 처리의 위탁)',
    body: '회사는 원활한 서비스 제공을 위해 일부 업무를 외부 전문 업체에 위탁할 수 있습니다. 위탁 시 위탁업무 내용과 수탁자, 위탁 기간을 본 방침에 명시하며 「개인정보 보호법」 제26조에 따라 안전하게 관리하도록 감독합니다.',
    items: [
      '서비스 인프라(데이터베이스·인증·스토리지): Supabase, Vercel 등 클라우드 인프라 제공자',
      '이메일 알림 발송: EmailJS 등 메시지 전송 서비스',
    ],
  },
  {
    title: '제7조 (정보주체의 권리·의무 및 행사 방법)',
    body: '정보주체는 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수 있습니다. 권리 행사는 회사에 서면, 이메일, 고객센터 문의 등을 통해 요청할 수 있으며 회사는 지체 없이 조치합니다.',
  },
  {
    title: '제8조 (쿠키 등 자동 수집 도구의 운영)',
    body: '회사는 서비스 이용 편의 향상을 위해 쿠키를 사용합니다. 정보주체는 웹 브라우저 설정을 통해 쿠키 저장을 허용·차단할 수 있으며, 쿠키 저장을 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.',
  },
  {
    title: '제9조 (개인정보의 안전성 확보 조치)',
    body: '회사는 개인정보의 안전한 처리를 위해 다음과 같은 조치를 취하고 있습니다.',
    items: [
      '내부 관리계획 수립·시행 및 정기적인 자체 감사',
      '비밀번호 등 중요 정보의 암호화 저장 및 전송',
      '접근 권한 최소화 및 접근통제 시스템 운영',
      '해킹·바이러스 등을 대비한 보안 프로그램 운영',
    ],
  },
  {
    title: '제10조 (개인정보 보호책임자)',
    body: '회사는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 정보주체의 개인정보 처리와 관련한 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정합니다.',
    items: [
      '소속: (주)썬레이텍 운영팀',
      '연락처: 1688-2520',
      '이메일: master@sunraytec.net',
    ],
  },
  {
    title: '제11조 (개인정보처리방침의 변경)',
    body: '본 개인정보처리방침은 시행일로부터 적용되며, 법령 또는 회사 정책 변경에 따라 내용이 추가·삭제·수정될 경우 시행일 7일 전부터 홈페이지 공지사항을 통해 사전 안내합니다.',
  },
];

const META = {
  effective: '2026-04-28',
  version: 'v1.0 (운영팀 초안 — 법무 검토 전)',
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            <SubHero
        breadcrumb={[{ label: '개인정보처리방침' }]}
        badge="Privacy Policy"
        title="개인정보처리방침"
        
      />

      <section style={{ padding: '52px 0 80px' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <article style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '32px 36px', boxShadow: '0 8px 22px rgba(15,34,65,0.05)' }}>
            <div style={{ display: 'grid', gap: 26 }}>
              {SECTIONS.map((s) => (
                <section key={s.title}>
                  <h2 style={{ color: 'var(--navy)', fontSize: '1.1rem', fontWeight: 900, marginBottom: 10 }}>{s.title}</h2>
                  <p style={{ color: '#334155', lineHeight: 1.95 }}>{s.body}</p>
                  {s.items && (
                    <ul style={{ marginTop: 10, paddingLeft: 20, display: 'grid', gap: 6 }}>
                      {s.items.map((it) => (
                        <li key={it} style={{ color: '#475569', lineHeight: 1.8, listStyleType: 'disc' }}>{it}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>

          <p style={{ marginTop: 18, color: '#94A3B8', fontSize: 13 }}>
            ※ 본 문서는 운영팀이 작성한 초안이며 외부 법무 검토를 거친 후 정식 시행됩니다. 검토 의견은 master@sunraytec.net 으로 보내주시기 바랍니다.
          </p>

          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/policy/terms" style={{ display: 'inline-flex', padding: '11px 18px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
              이용약관 보기
            </Link>
            <Link to="/contact" style={{ display: 'inline-flex', padding: '11px 18px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
