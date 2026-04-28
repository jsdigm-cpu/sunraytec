import { Link } from 'react-router-dom';

interface Section {
  title: string;
  body: string;
  items?: string[];
}

const SECTIONS: Section[] = [
  {
    title: '제1조 (목적)',
    body: '본 약관은 (주)썬레이텍(이하 “회사”)이 운영하는 공식 홈페이지, 자료실, 파트너 포털 등 온라인 서비스(이하 “서비스”) 이용에 관한 회사와 이용자 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.',
  },
  {
    title: '제2조 (정의)',
    body: '본 약관에서 사용하는 용어의 정의는 다음과 같습니다.',
    items: [
      '“이용자”란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.',
      '“회원”이란 회사에 개인정보를 제공하여 회원가입을 한 자로서, 회사의 서비스를 지속적으로 이용할 수 있는 자를 말합니다.',
      '“파트너”란 회사가 별도 심사를 통해 권한을 부여한 영업·시공 협력사 및 공공기관 담당자를 말합니다.',
      '“자료”란 회사가 서비스 내에서 제공하는 카탈로그·시방서·도면·인증서·제안서·교육 자료 등을 말합니다.',
    ],
  },
  {
    title: '제3조 (약관의 효력 및 변경)',
    body: '본 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게 공지함으로써 효력이 발생합니다. 회사는 합리적인 사유가 있을 경우 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경된 약관은 적용일자 7일 전부터 공지합니다.',
  },
  {
    title: '제4조 (서비스의 제공 및 변경)',
    body: '회사는 다음과 같은 서비스를 제공합니다.',
    items: [
      '제품·기술 정보 안내, 시공사례·인증 정보 제공',
      '카탈로그·시방서·도면 등 자료 열람 및 다운로드',
      '견적·자료 문의 접수 및 회신',
      '파트너 포털 및 패스트트랙 라운지 등 권한 기반 자료 제공',
      '기타 회사가 정하는 서비스',
    ],
  },
  {
    title: '제5조 (회원가입 및 자격)',
    body: '회원가입은 이용자가 약관 내용에 동의하고 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 회사가 이를 승낙함으로써 체결됩니다. 회사는 다음의 경우 가입을 승낙하지 않거나 사후에 자격을 제한할 수 있습니다.',
    items: [
      '실명이 아니거나 타인 명의를 사용한 경우',
      '회원 정보를 허위로 기재하거나 회사가 요청하는 자료를 제출하지 않은 경우',
      '서비스의 정상적인 운영을 방해할 우려가 있다고 판단되는 경우',
    ],
  },
  {
    title: '제6조 (이용자의 의무)',
    body: '이용자는 다음 행위를 하여서는 안 됩니다.',
    items: [
      '신청 또는 변경 시 허위 내용 등록',
      '타인의 정보 도용',
      '회사가 게시한 정보의 무단 변경 또는 회사가 정한 범위를 넘어선 자료 사용·재배포',
      '회사 또는 제3자의 저작권 등 지식재산권 침해',
      '서비스 운영을 방해하는 행위 및 관계 법령 위반 행위',
    ],
  },
  {
    title: '제7조 (회사의 의무)',
    body: '회사는 안정적인 서비스 제공을 위해 노력하며, 이용자의 개인정보 보호를 위해 보안 시스템을 갖추고 「개인정보 보호법」 및 회사의 개인정보처리방침을 준수합니다.',
  },
  {
    title: '제8조 (자료 이용 및 저작권)',
    body: '회사가 서비스 내에서 제공하는 모든 자료의 저작권은 회사 또는 정당한 권리자에게 귀속됩니다. 이용자는 회사가 정한 목적과 범위 내에서만 자료를 사용할 수 있으며, 사전 승인 없이 다음 행위를 할 수 없습니다.',
    items: [
      '복제, 전송, 출판, 배포, 방송 등 영리 목적 사용',
      '제3자에게 자료 일부 또는 전부의 이전·양도',
      '경쟁 제품 영업 또는 비교 마케팅에 회사 자료를 그대로 활용하는 행위',
    ],
  },
  {
    title: '제9조 (서비스의 중단)',
    body: '회사는 컴퓨터 등 정보통신설비의 보수·점검·교체·고장, 통신두절, 운영상 합리적 사유 등으로 인해 서비스 제공을 일시 중단할 수 있으며, 이로 인해 발생한 손해에 대해서는 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.',
  },
  {
    title: '제10조 (책임 제한)',
    body: '회사는 천재지변, 전쟁, 정전, 통신두절 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다. 또한 회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않으며, 이용자가 게시·제공한 자료의 신뢰도·정확성에 대한 책임은 해당 이용자에게 있습니다.',
  },
  {
    title: '제11조 (분쟁의 해결 및 관할 법원)',
    body: '본 약관 또는 서비스와 관련하여 회사와 이용자 사이에 분쟁이 발생한 경우 양 당사자는 분쟁 해결을 위해 성실히 협의합니다. 협의가 이루어지지 않을 경우 관할 법원은 회사 본점 소재지를 관할하는 법원으로 합니다.',
  },
];

const META = {
  effective: '2026-04-28',
  version: 'v1.0 (운영팀 초안 — 법무 검토 전)',
};

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <section style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #152035 100%)', color: '#fff', padding: '56px 0 64px' }}>
        <div className="container">
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>홈</Link> › 정책 ›{' '}
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>이용약관</span>
          </p>
          <p style={{ color: 'var(--amber2)', fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Terms of Service</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 900, marginBottom: 12 }}>이용약관</h1>
          <p style={{ maxWidth: 720, color: 'rgba(255,255,255,.7)', lineHeight: 1.85 }}>
            본 약관은 썬레이텍 공식 홈페이지·자료실·파트너 포털 등 온라인 서비스 이용에 관한 권리와 의무를 정합니다.
          </p>
          <div style={{ display: 'flex', gap: 24, marginTop: 22, flexWrap: 'wrap', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
            <span>시행일 <strong style={{ color: '#fff', marginLeft: 6 }}>{META.effective}</strong></span>
            <span>버전 <strong style={{ color: '#fff', marginLeft: 6 }}>{META.version}</strong></span>
          </div>
        </div>
      </section>

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
            <Link to="/policy/privacy" style={{ display: 'inline-flex', padding: '11px 18px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
              개인정보처리방침 보기
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
