import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, Clock } from 'lucide-react';

type InquiryType = 'public' | 'industrial' | 'commercial' | 'document' | null;

interface FormState {
  orgName: string;
  contactName: string;
  phone: string;
  email: string;
  spaceType: string;
  area: string;
  ceilingHeight: string;
  desiredDate: string;
  details: string;
  agreePrivacy: boolean;
}

const inquiryTypes = [
  {
    id: 'public' as InquiryType,
    icon: '🏛️',
    title: '공공기관 조달',
    desc: '나라장터 우수제품·MAS 견적',
  },
  {
    id: 'industrial' as InquiryType,
    icon: '🏭',
    title: '기업·산업시설',
    desc: '공장·물류센터·특수시설',
  },
  {
    id: 'commercial' as InquiryType,
    icon: '🏠',
    title: '상업·가정',
    desc: '사무실·매장·가정집',
  },
  {
    id: 'document' as InquiryType,
    icon: '📋',
    title: '기술 자료 요청',
    desc: '카탈로그·도면·시방서',
  },
];

const spaceTypeOptions = [
  '학교·공공기관',
  '공장·창고·물류',
  '사무실',
  '가정·상가',
  '특수시설',
  '기타',
];

const formTitleMap: Record<string, string> = {
  public: '공공기관 조달 견적 문의',
  industrial: '기업·산업시설 견적 문의',
  commercial: '상업·가정 견적 문의',
  document: '기술 자료 요청',
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState<InquiryType>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    orgName: '',
    contactName: '',
    phone: '',
    email: '',
    spaceType: '',
    area: '',
    ceilingHeight: '',
    desiredDate: '',
    details: '',
    agreePrivacy: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const canSubmit =
    form.orgName && form.contactName && form.phone && form.email && form.agreePrivacy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const formTitle = selectedType ? formTitleMap[selectedType] : '견적 문의';

  return (
    <main className="min-h-screen bg-white">
      {/* ① Sub-Hero */}
      <section className="bg-gradient-to-r from-[#0F2241] to-[#1A3A6B] py-24">
        <motion.div
          className="max-w-6xl mx-auto px-6 text-white"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="text-sm text-blue-300 mb-4">
            홈 &gt; 고객센터 &gt; 견적 문의
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">견적 문의</h1>
          <p className="text-lg text-blue-200">전문가가 직접 상담해 드립니다</p>
        </motion.div>
      </section>

      {/* ② 문의 유형 선택 */}
      <section className="bg-[#F1F5F9] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-xl font-semibold text-gray-700 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            문의 유형을 선택해 주세요
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {inquiryTypes.map(item => (
              <motion.button
                key={item.id}
                variants={cardVariant}
                onClick={() => setSelectedType(item.id)}
                className={`rounded-2xl border-2 p-6 text-left transition-all duration-200 cursor-pointer
                  ${selectedType === item.id
                    ? 'border-[#C0392B] bg-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-[#C0392B]/50 hover:shadow-md'
                  }`}
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ③ 폼 or ④ 완료 */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* 메인 폼 영역 */}
            <div className="flex-1">
              {submitted ? (
                /* ④ 전송 완료 화면 */
                <motion.div
                  className="flex flex-col items-center text-center py-20"
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    문의가 접수되었습니다!
                  </h2>
                  <p className="text-gray-500 mb-10">
                    담당자가 1~2 영업일 내 연락드리겠습니다
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/"
                      className="px-8 py-3 rounded-xl border-2 border-[#0F2241] text-[#0F2241] font-semibold hover:bg-[#0F2241] hover:text-white transition-colors"
                    >
                      메인으로 돌아가기
                    </Link>
                    <Link
                      to="/products"
                      className="px-8 py-3 rounded-xl bg-[#C0392B] text-white font-semibold hover:bg-[#9B2C1F] transition-colors"
                    >
                      제품 보러가기
                    </Link>
                  </div>
                </motion.div>
              ) : (
                /* ③ 문의 폼 */
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-8">{formTitle}</h2>
                  <form onSubmit={handleSubmit} className="max-w-3xl">
                    {/* 2열 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* 좌측 */}
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            기관명 / 회사명 <span className="text-[#C0392B]">*</span>
                          </label>
                          <input
                            type="text"
                            name="orgName"
                            value={form.orgName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B]"
                            placeholder="예: (주)썬레이텍"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            담당자 이름 <span className="text-[#C0392B]">*</span>
                          </label>
                          <input
                            type="text"
                            name="contactName"
                            value={form.contactName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B]"
                            placeholder="홍길동"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            연락처 <span className="text-[#C0392B]">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B]"
                            placeholder="010-0000-0000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            이메일 <span className="text-[#C0392B]">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B]"
                            placeholder="example@email.com"
                          />
                        </div>
                      </div>

                      {/* 우측 */}
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            설치 공간 종류
                          </label>
                          <select
                            name="spaceType"
                            value={form.spaceType}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B] bg-white"
                          >
                            <option value="">선택해 주세요</option>
                            {spaceTypeOptions.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            면적 (㎡)
                          </label>
                          <input
                            type="number"
                            name="area"
                            value={form.area}
                            onChange={handleChange}
                            min={0}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B]"
                            placeholder="예: 200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            천장 높이 (m)
                            <span className="text-gray-400 ml-1 font-normal">선택</span>
                          </label>
                          <input
                            type="number"
                            name="ceilingHeight"
                            value={form.ceilingHeight}
                            onChange={handleChange}
                            min={0}
                            step={0.1}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B]"
                            placeholder="예: 3.5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            희망 납기일
                            <span className="text-gray-400 ml-1 font-normal">선택</span>
                          </label>
                          <input
                            type="date"
                            name="desiredDate"
                            value={form.desiredDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 전체 너비: 세부 문의사항 */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        세부 문의사항
                      </label>
                      <textarea
                        name="details"
                        value={form.details}
                        onChange={handleChange}
                        rows={5}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]/40 focus:border-[#C0392B] resize-none"
                        placeholder="설치 환경, 요청 사항, 기타 궁금한 점을 자유롭게 적어주세요. 더 정확한 견적을 드릴 수 있습니다."
                      />
                    </div>

                    {/* 개인정보 동의 */}
                    <div className="mb-8">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreePrivacy"
                          checked={form.agreePrivacy}
                          onChange={handleChange}
                          className="w-4 h-4 accent-[#C0392B]"
                        />
                        <span className="text-sm text-gray-600">
                          개인정보 수집·이용에 동의합니다
                        </span>
                      </label>
                    </div>

                    {/* 전송 버튼 */}
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={`w-full py-4 rounded-xl text-white font-semibold text-base transition-colors duration-200
                        ${canSubmit
                          ? 'bg-[#C0392B] hover:bg-[#9B2C1F] cursor-pointer'
                          : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                      📋 견적 문의 전송하기
                    </button>
                  </form>
                </motion.div>
              )}
            </div>

            {/* ⑤ 사이드 연락처 정보 */}
            <aside className="lg:w-72">
              <motion.div
                className="bg-[#0F2241] text-white rounded-2xl p-8 sticky top-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-4">
                  직접 문의하기
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 text-blue-300 shrink-0" />
                    <div>
                      <p className="text-xs text-blue-300 mb-0.5">전화</p>
                      <p className="font-semibold text-lg">1688-2520</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5 text-blue-300 shrink-0" />
                    <div>
                      <p className="text-xs text-blue-300 mb-0.5">이메일</p>
                      <p className="font-semibold text-sm break-all">master@sunraytec.net</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-0.5 text-blue-300 shrink-0" />
                    <div>
                      <p className="text-xs text-blue-300 mb-0.5">영업시간</p>
                      <p className="font-semibold text-sm">평일 09:00 ~ 18:00</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
