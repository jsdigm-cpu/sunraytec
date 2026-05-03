import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SubHero from '../../components/layout/SubHero';

interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  links?: Array<{ label: string; to: string }>;
  timestamp: Date;
}

interface QuickReply {
  label: string;
  payload: string;
}

// 썬레이텍 FAQ 응답 시스템
function getBotResponse(input: string): { text: string; links?: Array<{ label: string; to: string }>; quickReplies?: QuickReply[] } {
  const q = input.trim().toLowerCase();

  // 인사말
  if (/안녕|반가워|hi|hello|처음/.test(q)) {
    return {
      text: '안녕하세요! 썬레이텍 AI 상담 챗봇입니다 😊\n\n복사난방 제품, 시공 사례, 견적 문의 등 궁금한 점을 자유롭게 물어보세요.\n아래 자주 묻는 질문도 참고해보세요!',
      quickReplies: [
        { label: '제품 종류가 궁금해요', payload: '제품 종류' },
        { label: '복사난방이 뭔가요?', payload: '복사난방이란' },
        { label: '우리 시설에 맞는 제품은?', payload: '제품 추천' },
        { label: '견적 문의하기', payload: '견적 문의' },
      ],
    };
  }

  // 복사난방 원리
  if (/복사난방|원적외선|원리|작동|어떻게 작동/.test(q)) {
    return {
      text: '복사난방(Radiant Heating)은 태양처럼 열선을 사람과 표면에 직접 전달하는 방식입니다.\n\n✅ 공기를 덥히는 대류난방과 달리 \n• 바람·소음 없음 (무기류·무소음)\n• 천장이 높은 공간에서도 따뜻함\n• 에너지 소비 약 39.4% 절감 (KTR 시험)\n• 원적외선 방사율 0.91 (KTR 시험성적서)\n\n공장·학교·군부대 등 고천장 공간에 특히 효과적입니다.',
      links: [{ label: '복사난방 원리 자세히 보기', to: '/technology/principle' }],
      quickReplies: [
        { label: '어떤 제품이 있나요?', payload: '제품 종류' },
        { label: '에너지 절감 얼마나 돼요?', payload: '에너지 절감' },
      ],
    };
  }

  // 제품 종류
  if (/제품|모델|종류|라인업|시리즈/.test(q)) {
    return {
      text: '썬레이텍의 주요 제품 라인업입니다:\n\n🏅 조달청 우수제품 (나라장터 납품용)\n  • SUR 시리즈 — 공공기관·학교·관공서\n\n📋 MAS 다수공급자계약 제품\n  • 중소형 공간용 패널히터\n\n⚡ 방폭·특수 제품\n  • 위험물·화학·군사 시설 전용 (IP65)\n\n🏠 개인용·욕실형\n  • 가정용 욕실, 개인 공간 전용\n\n📡 스마트 제어 시스템\n  • 128회로 IoT 중앙제어 솔루션',
      links: [
        { label: '전체 제품 보기', to: '/products' },
        { label: '조달청 우수제품', to: '/products/excellence' },
      ],
      quickReplies: [
        { label: '공장에 맞는 제품은?', payload: '공장 제품' },
        { label: '학교에 맞는 제품은?', payload: '학교 제품' },
        { label: '가격 문의', payload: '가격 견적' },
      ],
    };
  }

  // 에너지 절감
  if (/절감|에너지|전기요금|난방비|비용/.test(q)) {
    return {
      text: '실증 데이터 기준 절감 효과입니다:\n\n📊 KTR 공인 시험 결과\n  • 소비전력 절감: 약 39.4%\n  • 원적외선 방사율: 0.91\n  • 항균 성능: 99.9%\n\n🏭 실제 사례 — ㈜가나에너지 공장\n  • 온풍기 교체 후 난방비 57% 절감\n  • 연간 1,130만 원 → 576만 원\n  • 200평 · 천장고 5m 기준\n\n에너지 ROI 계산기로 직접 계산해보실 수 있습니다!',
      links: [
        { label: '에너지 ROI 계산기', to: '/resources/energy-roi-calculator' },
        { label: '시공사례 보기', to: '/cases?category=industrial' },
      ],
    };
  }

  // 공장/산업 관련
  if (/공장|창고|물류|산업|고천장|높은 천장/.test(q)) {
    return {
      text: '공장·물류창고 같은 고천장 공간에 복사난방이 가장 효과적입니다!\n\n✅ 공장 적용 장점\n  • 천장 높이 5~12m 공간도 작업자 위치에 직접 열 전달\n  • 온풍기 대비 난방비 50~57% 절감\n  • IP65 방진방수 등급으로 가혹 환경에도 안정 운영\n  • 구역별 개별 제어로 사용 공간만 가동\n\n추천: 산업·물류 솔루션 + SUR 방폭·방수 시리즈',
      links: [
        { label: '산업·물류 솔루션 보기', to: '/solutions/industrial-logistics' },
        { label: '방폭·특수 제품', to: '/products/special' },
        { label: '현장 견적 문의', to: '/contact' },
      ],
    };
  }

  // 학교/공공기관
  if (/학교|교육|공공|청사|행정|복지관|도서관/.test(q)) {
    return {
      text: '학교·공공기관에는 조달청 우수제품으로 바로 납품 가능합니다!\n\n✅ 공공기관 납품 장점\n  • 조달청 나라장터 등록 — 수의계약·입찰 모두 가능\n  • 혁신제품 지정으로 우선구매 적용 가능\n  • 급식실 위생 환경 (기류 없음, 먼지 미발생)\n  • 고령자 복지시설 특화 (무소음·무기류)\n\n우수제품 번호는 제품 페이지에서 확인하세요.',
      links: [
        { label: '조달청 우수제품 보기', to: '/products/excellence' },
        { label: '공공·교육 솔루션', to: '/solutions/public-edu' },
        { label: '나라장터 바로가기', to: 'https://www.g2b.go.kr' },
      ],
    };
  }

  // 군부대/국방
  if (/군|군부대|군인|경계초소|국방|방폭/.test(q)) {
    return {
      text: '국방·특수 시설 전문 제품을 공급하고 있습니다!\n\n🏆 주요 납품 실적\n  • 지상작전사령부 수요자 제안형 혁신제품 선정\n  • 전방 12개 사단 경계초소 시범 납품\n  • 사용자 만족도 96점 달성\n  • 탄약고 결로방지 항온 시스템 납품\n\n방폭 인증 제품 (EX emb II T1)으로 위험물 취급 시설도 안전하게 적용됩니다.',
      links: [
        { label: '국방·특수 솔루션', to: '/solutions/defense-special' },
        { label: '방폭·특수 제품', to: '/products/special' },
      ],
    };
  }

  // 가격/견적
  if (/가격|견적|얼마|비용|예산/.test(q)) {
    return {
      text: '제품 가격은 공간 조건(면적·천장고·설치 방식)에 따라 달라집니다.\n\n💡 견적 진행 방법\n1. 온라인 견적 문의 양식 작성 (면적·용도 입력)\n2. 담당자 검토 후 24시간 내 연락드림\n3. 현장 방문 or 도면·사진 검토 → 최종 견적서 발송\n\n📞 전화 상담: 1688-2520 (평일 09~18시)\n\n먼저 난방 용량 계산기로 대략 용량을 파악해보세요!',
      links: [
        { label: '견적 문의 바로가기', to: '/contact' },
        { label: '난방 용량 계산기', to: '/resources/heating-load-calculator' },
      ],
    };
  }

  // 시공/설치
  if (/시공|설치|납기|공사기간|AS|사후/.test(q)) {
    return {
      text: '설치 관련 안내입니다:\n\n🔧 설치 과정\n1. 현장 실측 or 도면 검토\n2. 설치 방식 결정 (천장형/벽부형/매립형)\n3. 자재 납품 + 자체 시공팀 or 협력사 시공\n4. 테스트 운전 + 사용 교육\n\n⏱️ 납기: 소규모 1~2주 / 대형 현장 3~6주\n📋 A/S: 제품 보증기간 내 무상, 이후 유상\n\n시공 현장 사례도 함께 확인해보세요!',
      links: [
        { label: '시공사례 보기', to: '/cases' },
        { label: '견적 문의', to: '/contact' },
      ],
    };
  }

  // 인증/자격
  if (/인증|우수제품|특허|MAS|혁신제품|CE|방폭|ISO/.test(q)) {
    return {
      text: '썬레이텍 주요 인증·지정 현황입니다:\n\n🏆 조달 관련\n  • 조달청 우수제품 (2013·2019·2025년) — 3회 지정\n  • MAS 다수공급자계약 등록\n  • 혁신제품 지정 (지상작전사령부 수요자 제안)\n\n🌍 품질·안전\n  • ISO 9001 / ISO 14001\n  • 방폭 인증 (EX emb II T1)\n  • K마크 성능인증\n  • CE · RoHS 유럽 인증\n  • KTR 원적외선 방사율 시험 (0.91)',
      links: [{ label: '인증서·특허 보기', to: '/about/certifications' }],
    };
  }

  // 계산기
  if (/계산|면적|얼마짜리|몇 대|몇대|평수/.test(q)) {
    return {
      text: '면적과 천장 높이를 입력하면 필요 용량과 제품 수량을 바로 계산해드립니다!\n\n난방 용량 계산기를 사용해보세요 👇',
      links: [
        { label: '난방 용량 계산기 열기', to: '/resources/heating-load-calculator' },
        { label: '에너지 ROI 계산기', to: '/resources/energy-roi-calculator' },
      ],
    };
  }

  // 카탈로그/자료
  if (/카탈로그|자료|도면|CAD|PDF|다운/.test(q)) {
    return {
      text: '각종 자료는 자료실에서 다운로드하실 수 있습니다:\n\n📥 제공 자료\n  • 제품 카탈로그 (PDF)\n  • 시방서·설치 도면\n  • 스펙·CAD 파일\n  • 인증서·시험성적서\n  • 동영상 자료',
      links: [{ label: '자료실 바로가기', to: '/resources/catalog' }],
    };
  }

  // 연락처/위치
  if (/연락|전화|주소|위치|사무실|찾아오/.test(q)) {
    return {
      text: '📞 대표 전화: 1688-2520\n⏰ 운영시간: 평일 09:00~18:00 (점심 12:00~13:00)\n\n온라인 견적 문의도 가능하며, 24시간 내 답변드립니다.',
      links: [
        { label: '견적 문의 양식', to: '/contact' },
        { label: '찾아오시는 길', to: '/about/location' },
      ],
    };
  }

  // 파트너/대리점
  if (/파트너|대리점|총판|협력|계약/.test(q)) {
    return {
      text: '파트너사 모집에 관심 가져주셔서 감사합니다!\n\n썬레이텍은 전국 대리점·협력사와 함께합니다.\n• 조달청 등록 지원\n• 교육 및 기술 지원\n• 마케팅 자료 제공\n\n자세한 내용은 파트너 포털에서 확인하세요.',
      links: [
        { label: '파트너 포털 바로가기', to: '/partner/signup-guide' },
        { label: '대리점 모집 안내', to: '/support/dealers' },
      ],
    };
  }

  // 기본 답변
  return {
    text: '죄송합니다, 해당 질문에 대한 정확한 답변을 준비 중입니다.\n더 자세한 상담이 필요하시면 견적 문의나 전화 상담을 이용해 주세요.',
    links: [{ label: '견적 문의 바로가기', to: '/contact' }],
    quickReplies: [
      { label: '복사난방이 뭔가요?', payload: '복사난방이란' },
      { label: '제품 종류 알고싶어요', payload: '제품 종류' },
      { label: '에너지 절감 효과는?', payload: '에너지 절감' },
      { label: '견적 문의하기', payload: '견적 문의' },
    ],
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 0,
    role: 'bot',
    text: '안녕하세요! 썬레이텍 상담 챗봇입니다 😊\n\n복사난방 제품, 시공 사례, 납품 실적, 견적 문의 등 궁금한 점을 물어보세요.',
    links: undefined,
    timestamp: new Date(),
  },
];

const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { label: '복사난방이 뭔가요?', payload: '복사난방이란' },
  { label: '제품 종류 알고싶어요', payload: '제품 종류' },
  { label: '에너지 절감 효과는?', payload: '에너지 절감' },
  { label: '우수제품 인증 현황', payload: '인증 우수제품' },
  { label: '견적 문의하기', payload: '견적 문의' },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(INITIAL_QUICK_REPLIES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setQuickReplies([]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: response.text,
        links: response.links,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      if (response.quickReplies) setQuickReplies(response.quickReplies);
    }, 600 + Math.random() * 400);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SubHero
        breadcrumb={[{ label: '고객센터' }, { label: 'AI 상담 챗봇' }]}
        badge="AI Assistant · Active"
        title="AI 상담 챗봇"
        lead="복사난방 제품 추천, 시공 사례, 견적 문의까지 자유롭게 물어보세요. 24시간 즉시 답변드립니다."
        keywords={['24시간 자동 응답', '제품 사양 안내', '견적 요청 연결', '기술 문의 지원']}
      />

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>

            {/* 채팅 윈도우 */}
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '580px',
            }}>
              {/* 채팅 헤더 */}
              <div style={{
                background: 'var(--navy)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--red) 0%, #E67E22 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', flexShrink: 0,
                }}>
                  ☀️
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '14px' }}>썬레이텍 상담봇</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>온라인 · 즉시 응답</span>
                  </div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <a href="tel:16882520" style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px', padding: '6px 12px',
                    color: '#fff', fontSize: '12px', fontWeight: 700, textDecoration: 'none',
                  }}>
                    📞 1688-2520
                  </a>
                </div>
              </div>

              {/* 메시지 영역 */}
              <div style={{
                flex: 1, overflowY: 'auto', padding: '20px 16px',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: '8px',
                    alignItems: 'flex-start',
                  }}>
                    {msg.role === 'bot' && (
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0A1628 0%, #1A3A6B 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', flexShrink: 0,
                      }}>
                        ☀️
                      </div>
                    )}
                    <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{
                        background: msg.role === 'user' ? 'var(--navy)' : '#F1F5F9',
                        color: msg.role === 'user' ? '#fff' : '#1F2937',
                        borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                        padding: '10px 14px',
                        fontSize: '13.5px',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-line',
                      }}>
                        {msg.text}
                      </div>
                      {msg.links && msg.links.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {msg.links.map(link => (
                            link.to.startsWith('http') ? (
                              <a
                                key={link.label}
                                href={link.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-block', padding: '5px 12px',
                                  borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                                  background: '#fff', border: '1.5px solid var(--navy)',
                                  color: 'var(--navy)', textDecoration: 'none',
                                }}
                              >
                                {link.label} ↗
                              </a>
                            ) : (
                              <Link
                                key={link.label}
                                to={link.to}
                                style={{
                                  display: 'inline-block', padding: '5px 12px',
                                  borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                                  background: '#fff', border: '1.5px solid var(--navy)',
                                  color: 'var(--navy)', textDecoration: 'none',
                                }}
                              >
                                {link.label} →
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* 타이핑 인디케이터 */}
                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0A1628 0%, #1A3A6B 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
                    }}>
                      ☀️
                    </div>
                    <div style={{
                      background: '#F1F5F9', borderRadius: '4px 18px 18px 18px',
                      padding: '12px 16px', display: 'flex', gap: '4px', alignItems: 'center',
                    }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          background: '#94A3B8',
                          display: 'inline-block',
                          animation: 'chatDot 1.2s ease-in-out infinite',
                          animationDelay: `${i * 0.2}s`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* 빠른 답변 */}
              {quickReplies.length > 0 && (
                <div style={{ padding: '8px 16px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {quickReplies.map(qr => (
                    <button
                      key={qr.label}
                      onClick={() => sendMessage(qr.payload)}
                      style={{
                        padding: '6px 13px', borderRadius: '999px',
                        border: '1.5px solid #E2E8F0', background: '#fff',
                        color: 'var(--navy)', fontSize: '12px', fontWeight: 700,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--navy)';
                        (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--navy)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#fff';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--navy)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E8F0';
                      }}
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 입력 영역 */}
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex', gap: '8px', padding: '12px 16px',
                  borderTop: '1px solid #E5E7EB', background: '#fff',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="궁금한 점을 입력하세요..."
                  style={{
                    flex: 1, border: '1.5px solid #E2E8F0', borderRadius: '12px',
                    padding: '10px 14px', fontSize: '13.5px', outline: 'none',
                    fontFamily: 'inherit', transition: 'border-color 0.15s',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--navy)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label="메시지 전송"
                  style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: input.trim() ? 'var(--navy)' : '#E2E8F0',
                    border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s', flexShrink: 0, color: '#fff', fontSize: '16px',
                  }}
                >
                  ↑
                </button>
              </form>
            </div>

            {/* 하단 안내 */}
            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#9CA3AF' }}>
              이 챗봇은 자주 묻는 질문 기반으로 운영됩니다. 복잡한 문의는{' '}
              <Link to="/contact" style={{ color: 'var(--red)', fontWeight: 700 }}>견적 문의</Link>나{' '}
              <a href="tel:16882520" style={{ color: 'var(--red)', fontWeight: 700 }}>전화(1688-2520)</a>를 이용해 주세요.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes chatDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </main>
  );
}
