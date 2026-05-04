import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

interface Props {
  product: Product;
}

export default function ExcellenceProductCard({ product }: Props) {
  const badge = getBadgeMeta(product);

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 56px rgba(0,0,0,0.16)' }}
      transition={{ duration: 0.22 }}
      style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 제품 이미지 영역 (플레이스홀더) */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)',
          padding: '12px 14px 16px', // 전체적으로 균형 잡힌 여백
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* 상단 헤더: 라벨 + 모델 정보 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          {/* 배지 (Absolute가 아닌 Flex 아이템으로 배치) */}
          <div
            style={{
              background: badge.background,
              color: badge.color,
              fontSize: '10px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '20px',
              letterSpacing: '0.5px',
              boxShadow: badge.shadow,
              whiteSpace: 'nowrap'
            }}
          >
            {badge.label}
          </div>

          {/* 모델명 및 면적 정보 */}
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.3px',
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '2px',
                fontWeight: 600
              }}
            >
              {product.specs.heatingArea}
            </div>
          </div>
        </div>

        {/* 제품 이미지 영역 */}
        {product.thumbnailImage || product.detailImage ? (
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9', // 사진을 더 와이드하게 강조
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
            }}
          >
            <img
              src={product.thumbnailImage ?? product.detailImage}
              alt={`${product.name} - ${product.category}`}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        ) : (
          <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'center' }}>
            <PanelHeaterIcon powerW={product.specs.powerW} />
          </div>
        )}
      </div>

      {/* 카드 바디 */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* 설명 */}
        <p
          style={{
            fontSize: '13px',
            color: 'var(--gray)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {product.summary}
        </p>

        {/* 핵심 스펙 - 가로형으로 배치하여 높이 축소 */}
        <div
          style={{
            background: 'var(--off)',
            borderRadius: '10px',
            padding: '10px 12px', // 여백 축소
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr', // 열 비율 조정
            rowGap: '6px', // 줄 간격 촘촘하게
            columnGap: '12px',
          }}
        >
          <SpecItem label="소비전력" value={`${product.specs.powerW.toLocaleString()}W`} />
          <SpecItem label="전압" value={product.specs.voltage.split(' ')[0]} />
          <SpecItem label="크기" value={product.specs.sizeMm} small />
          {product.specs.weightKg ? <SpecItem label="무게" value={`${product.specs.weightKg}Kg`} small /> : <SpecItem label="설치방법" value={formatInstallationType(product.installationType)} small />}
          {product.specs.currentA && <SpecItem label="전류" value={`${product.specs.currentA}A`} small />}
          {product.specs.heatingTempC && <SpecItem label="발열온도" value={product.specs.heatingTempC} small />}
        </div>

        {/* 적용 공간 태그 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {product.applications.map((space) => (
            <span
              key={space}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: '20px',
                background: '#FDECEA',
                color: 'var(--red)',
                border: '1px solid rgba(200,57,43,0.15)',
              }}
            >
              {space}
            </span>
          ))}
        </div>

        {/* 제품식별번호 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px dashed rgba(212,172,13,0.5)',
            background: 'rgba(212,172,13,0.05)',
          }}
        >
          <span style={{ fontSize: '11px', color: 'var(--gray)' }}>조달청 식별번호</span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#8B6914',
              fontFamily: 'monospace',
              marginLeft: 'auto',
            }}
          >
            {product.procurementId ?? '-'}
          </span>
        </div>

        {/* 상세보기 버튼 - 크기 축소 및 밝은 컬러 적용 */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(59,130,246,0.3)' }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            alignSelf: 'flex-end', // 우측 하단 배치
            marginTop: '8px'
          }}
        >
          <Link
            to={`/products/${product.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 20px', // 버튼 크기 대폭 축소
              borderRadius: '24px', // 알약 모양
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', // 밝고 눈에 띄는 블루
              color: '#fff',
              fontSize: '12px',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(37,99,235,0.2)',
              transition: 'all 0.2s',
            }}
          >
            상세보기
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SpecItem({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ 
        fontSize: '10px', 
        color: 'var(--gray)', 
        fontWeight: 600, 
        minWidth: '42px', // 라벨 폭 고정으로 정렬 유지
        flexShrink: 0 
      }}>
        {label}
      </span>
      <span style={{ 
        fontSize: small ? '11px' : '12px', 
        fontWeight: 700, 
        color: 'var(--text)',
        whiteSpace: 'nowrap'
      }}>
        {value}
      </span>
    </div>
  );
}

function PanelHeaterIcon({ powerW }: { powerW: number }) {
  const width = Math.min(160, 80 + powerW / 40);
  return (
    <svg viewBox="0 0 180 70" width={width} style={{ maxWidth: '100%' }}>
      {/* 패널 몸체 */}
      <rect x="10" y="20" width="160" height="32" rx="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      {/* 발열선 줄 */}
      {[30, 50, 70, 90, 110, 130, 150].map((x) => (
        <line key={x} x1={x} y1="26" x2={x} y2="46" stroke="rgba(232,87,74,0.7)" strokeWidth="2" strokeLinecap="round" />
      ))}
      {/* 하단 글로우 */}
      <ellipse cx="90" cy="54" rx="60" ry="6" fill="rgba(232,87,74,0.2)" />
      {/* 마운트 브라켓 */}
      <rect x="35" y="14" width="14" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="131" y="14" width="14" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
      {/* 열선 출력 표시 */}
      <text x="90" y="38" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="700">
        {powerW >= 1000 ? `${powerW / 1000}kW` : `${powerW}W`}
      </text>
    </svg>
  );
}

function formatInstallationType(type?: Product['installationType']) {
  switch (type) {
    case 'embedded':
      return '매립형';
    case 'exposed':
      return '노출형';
    case 'wall-mounted':
      return '벽걸이형';
    case 'desk':
      return '책상형';
    default:
      return '-';
  }
}

function getBadgeMeta(product: Product) {
  if (product.productLine === 'mas') {
    return {
      label: '📋 MAS 제품',
      background: 'linear-gradient(135deg, #2F80ED, #56CCF2)',
      color: '#F4FBFF',
      shadow: '0 2px 8px rgba(47,128,237,0.35)',
    };
  }

  if (product.productLine === 'personal') {
    return {
      label: '🏠 개인용',
      background: 'linear-gradient(135deg, #7F8C8D, #95A5A6)',
      color: '#fff',
      shadow: '0 2px 8px rgba(127,140,141,0.28)',
    };
  }

  return {
    label: '🏅 우수제품',
    background: 'linear-gradient(135deg, #D4AC0D, #F1C40F)',
    color: '#5D4E00',
    shadow: '0 2px 8px rgba(212,172,13,0.4)',
  };
}
