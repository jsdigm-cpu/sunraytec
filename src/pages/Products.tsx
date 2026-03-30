import { motion } from 'motion/react';
import { Package } from 'lucide-react';

const products = [
  {
    id: 'sur-3600',
    name: 'SUR-3600',
    type: '천장형 (노출)',
    power: '3,600W',
    size: '1510 x 375 x 48 mm',
    area: '약 6~9평',
    desc: '대형공간 및 야외난방 (공장, 체육관, 물류센터 등)'
  },
  {
    id: 'sur-2400',
    name: 'SUR-2400',
    type: '천장형 (매립/노출)',
    power: '2,400W',
    size: '1510 x 300 x 48 mm',
    area: '약 4~6평',
    desc: '중/대형공간 난방 (학교, 교실, 사무실, 식당 등)'
  },
  {
    id: 'sur-1800',
    name: 'SUR-1800',
    type: '천장형 (매립/노출)',
    power: '1,800W',
    size: '1200 x 300 x 48 mm',
    area: '약 3~5평',
    desc: '중/소형공간 난방 (사무실, 가정, 업소 등)'
  },
  {
    id: 'sur-1200',
    name: 'SUR-1200',
    type: '천장형 (매립/노출)',
    power: '1,200W',
    size: '1200 x 300 x 48 mm',
    area: '약 2~3평',
    desc: '소규모 공간 난방 (사무실, 가정, 업소 등)'
  },
  {
    id: 'sur-600',
    name: 'SUR-600',
    type: '천장형/벽걸이형',
    power: '600W',
    size: '600 x 300 x 48 mm',
    area: '약 1~1.5평',
    desc: '소규모 공간 및 개인용 난방 (화장실, 샤워실 등)'
  },
  {
    id: 'sur-d300a',
    name: 'SUR-D300A',
    type: '책상형 (개인용)',
    power: '300W',
    size: '500 x 580 x 28 mm',
    area: '개인용',
    desc: '책상 하부 부착형 개인 난방기'
  }
];

export default function Products() {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">제품 안내</h1>
          <p className="text-lg text-slate-600">
            정부조달 우수제품으로 지정된 '양지처럼'의 다양한 라인업을 확인하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-slate-100 flex items-center justify-center border-b border-slate-100">
                <Package className="h-16 w-16 text-slate-300" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-orange-600 mb-2 tracking-wider">{product.type}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{product.name}</h3>
                <div className="space-y-2 text-sm text-slate-600 mb-6">
                  <div className="flex justify-between">
                    <span className="font-medium">소비전력</span>
                    <span>{product.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">사이즈</span>
                    <span>{product.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">난방능력</span>
                    <span>{product.area}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                  {product.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
