import { motion } from 'motion/react';
import { ShieldCheck, Wind, Zap, Sun, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000"
            alt="Modern architecture"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-sm font-semibold mb-6">
              <Award className="h-4 w-4" />
              정부조달 우수제품 지정
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              대한민국 복사난방의 기준 <br/>
              <span className="text-orange-500">썬레이텍</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              원적외선 방사 천장형 복사 난방 패널 <strong className="text-white">양지처럼</strong><br/>
              전염병 전파 제로! 미세먼지 제로! 각종 세균 발생 제로!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-colors flex items-center gap-2">
                제품 자세히 보기 <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">왜 '양지처럼' 인가요?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              태양열에 가장 근접한 자연적이며 편안한 난방방식으로 쾌적한 실내 환경을 만듭니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Wind,
                title: "바람 없는 쾌적함",
                desc: "대류 난방과 달리 바람이 없어 먼지 비산이 없고, 건조해지지 않아 호흡기와 피부 건강을 지켜줍니다."
              },
              {
                icon: ShieldCheck,
                title: "항균 및 탈취 효과",
                desc: "원적외선 방사로 대장균, 포도상구균 99.9% 감소 및 암모니아 가스 89% 탈취 효과가 입증되었습니다."
              },
              {
                icon: Zap,
                title: "획기적인 에너지 절감",
                desc: "공기를 가열하지 않고 사물을 직접 가열하여 기존 난방기 대비 30~50% 이상의 난방비를 절감합니다."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Teaser */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">다양한 공간에 최적화된<br/>제품 라인업</h2>
              <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                학교, 관공서, 산업시설부터 개인 사무공간까지. 
                설치 환경과 용도에 맞는 다양한 제품군을 제공합니다.
              </p>
              <ul className="space-y-4 mb-10">
                {['천장형 (매립/노출)', '벽걸이형', '책상형 (개인용)', '스마트 원격제어 시스템'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/products" className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:text-orange-300 transition-colors">
                전체 제품 보기 <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex items-center justify-center">
                {/* Placeholder for product image */}
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
                  alt="Product installation" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700 text-sm font-medium">
                    SUR-3600 천장형 패널
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
