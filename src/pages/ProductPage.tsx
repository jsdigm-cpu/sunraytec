import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../components/layout/SubHero';
import SpecTable from '../components/product/SpecTable';
import ScrollReveal from '../components/ui/ScrollReveal';
import { fadeInUp } from '../utils/animations';
import type { CmsState } from '../types/cms';
import type { ProductLine } from '../types/product';

const PRODUCT_LINE_COPY: Record<ProductLine, { title: string; description: string }> = {
  excellent: {
    title: '조달청 우수제품',
    description: '우수제품 지정 라인업입니다. 매립형과 노출형을 개별 모델로 나눠 비교할 수 있습니다.',
  },
  mas: {
    title: 'MAS 다수공급자계약 제품',
    description: '다수공급자계약(MAS) 제품군입니다. 설치 방식에 따라 모델 번호를 분리해서 정리했습니다.',
  },
  personal: {
    title: '개인용 · 특수형',
    description: '책상형, 개인 난방형 등 보조 라인업입니다.',
  },
};

export default function ProductPage() {
  const { products } = useOutletContext<CmsState>();
  const groupedProducts = Object.entries(PRODUCT_LINE_COPY)
    .map(([line, meta]) => ({
      line: line as ProductLine,
      ...meta,
      items: products.filter((product) => product.productLine === line),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <SubHero
        breadcrumb={[{ label: '제품안내' }]}
        badge="Products"
        title="설치 방식과 계약 유형까지 한 번에 보는 제품안내"
        lead="공공조달과 현장 용도에 맞는 복사난방 제품을 한눈에 비교해보세요. 우수제품과 MAS 다수공급자계약 제품을 구분해 정리했으며, 각 모델의 상세 사양과 적용 정보를 바로 확인할 수 있습니다."
      />

      <section style={{ background: 'var(--off)', padding: '64px 0' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.45rem, 3vw, 1.9rem)',
                  fontWeight: 900,
                  color: 'var(--navy)',
                  margin: 0,
                }}
              >
                제품군 빠른 안내
              </h2>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--gray)',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '999px',
                  padding: '3px 12px',
                }}
              >
                총 {products.length}개 모델
              </span>
            </div>
          </ScrollReveal>

          <section className="product-overview-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            {groupedProducts.map((group) => (
              <article
                key={group.line}
                className="card"
                style={{
                  padding: '1.15rem',
                  borderRadius: '18px',
                  background: '#fff',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--navy)' }}>{group.title}</strong>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: group.line === 'mas' ? 'var(--blue)' : group.line === 'excellent' ? 'var(--red)' : 'var(--navy)' }}>
                    {group.items.length}개
                  </span>
                </div>
                <p style={{ color: 'var(--color-text-muted)', margin: '0 0 0.75rem', lineHeight: 1.65 }}>{group.description}</p>
                {group.line === 'excellent' ? (
                  <Link to="/products/excellence" style={{ display: 'inline-block', color: 'var(--red)', fontWeight: 800 }}>
                    우수제품 페이지 →
                  </Link>
                ) : null}
                {group.line === 'mas' ? (
                  <Link to="/products/mas" style={{ display: 'inline-block', color: 'var(--blue)', fontWeight: 800 }}>
                    MAS 다수공급자계약 제품 페이지 →
                  </Link>
                ) : null}
              </article>
            ))}
          </section>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0 80px' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                fontWeight: 900,
                color: 'var(--navy)',
                margin: 0,
              }}
            >
              모델별 제품 비교
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '10px', lineHeight: 1.7 }}>
              우수제품과 MAS 다수공급자계약 제품을 구분해 정리했습니다. 각 모델의 기본 사양을 비교하고 바로 상세보기로 이동할 수 있습니다.
            </p>
          </ScrollReveal>

          <SpecTable products={products} />
        </div>
      </section>
    </div>
  );
}
