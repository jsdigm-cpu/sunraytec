import { Link, useOutletContext, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import type { CmsState } from '../../types/cms';
import type { Product } from '../../types/product';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { products } = useOutletContext<CmsState>();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <h1>제품을 찾을 수 없습니다.</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>요청하신 모델 정보가 아직 등록되지 않았거나 경로가 변경되었습니다.</p>
        <Link to="/products" className="btn btn-primary">제품안내로 돌아가기</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.productLine === product.productLine)
    .slice(0, 3);
  const galleryImages = getProductImages(product);

  return (
    <div>
      <section
        style={{
          background: 'linear-gradient(160deg, var(--navy) 0%, #142641 60%, #0C1A31 100%)',
          padding: '56px 0 72px',
          color: '#fff',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '26px' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>홈</Link>
            <span>›</span>
            <Link to="/products" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>제품안내</Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>{product.name}</span>
          </div>

          <div className="detail-hero" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '28px', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: 'fit-content',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '999px',
                  background: getProductPill(product),
                  color: getProductPillText(product),
                  fontSize: '12px',
                  fontWeight: 800,
                  marginBottom: '1rem',
                }}
              >
                {product.category}
              </span>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.3rem)', lineHeight: 1.05, margin: '0 0 0.85rem' }}>{product.name}</h1>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', maxWidth: '680px', margin: 0 }}>
                {product.detailDescription ?? product.summary}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.2rem' }}>
                <DetailChip label={`소비전력 ${product.specs.powerW.toLocaleString()}W`} />
                <DetailChip label={`설치 방식 ${formatInstallationType(product.installationType)}`} />
                {product.procurementId ? <DetailChip label={`식별번호 ${product.procurementId}`} /> : null}
              </div>
            </div>

            <div
              style={{
                borderRadius: '22px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                padding: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '320px',
              }}
            >
              {galleryImages.length > 0 ? (
                <img
                  src={galleryImages[0]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', maxHeight: '340px', objectFit: 'contain' }}
                />
              ) : (
                <ProductIllustration product={product} large />
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div className="container detail-sections" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px' }}>
          <article className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>제품 개요</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              {product.detailDescription ?? product.summary}
            </p>
            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>주요 포인트</h3>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', lineHeight: 1.9 }}>
              {(product.featureBullets && product.featureBullets.length > 0
                ? product.featureBullets
                : defaultFeatures(product)
              ).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>적용 공간</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {product.applications.map((item) => (
                <span key={item} className="detail-tag">{item}</span>
              ))}
            </div>
          </article>

            <div style={{ display: 'grid', gap: '1rem' }}>
            {galleryImages.length > 1 ? (
              <article className="card" style={{ padding: '1.5rem' }}>
                <h2 style={{ marginTop: 0 }}>제품 이미지</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem' }}>
                  {galleryImages.map((url, index) => (
                    <img
                      key={`${url}-${index}`}
                      src={url}
                      alt={`${product.name} 상세 이미지 ${index + 1}`}
                      style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border)' }}
                    />
                  ))}
                </div>
              </article>
            ) : null}

            <article className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ marginTop: 0 }}>기본 사양</h2>
              <DetailSpecRow label="모델명" value={product.name} />
              <DetailSpecRow label="제품군" value={product.category} />
              <DetailSpecRow label="설치 방법" value={formatInstallationType(product.installationType)} />
              <DetailSpecRow label="소비전력" value={`${product.specs.powerW.toLocaleString()}W`} />
              <DetailSpecRow label="크기" value={`${product.specs.sizeMm} mm`} />
              <DetailSpecRow label="전압" value={product.specs.voltage} />
              <DetailSpecRow label="난방 면적" value={product.specs.heatingArea} />
              {product.procurementId ? <DetailSpecRow label="조달 식별번호" value={product.procurementId} /> : null}
            </article>

            <article className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ marginTop: 0 }}>문의 및 운영 메모</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginTop: 0 }}>
                현재는 웹페이지 초안 단계라 상세 사진과 상세 문구 일부는 기본 데이터로 채워져 있습니다. 이후 관리자 화면 또는 Supabase 연동 시
                모델별 사진, 카탈로그 링크, 상세 설명을 직접 수정할 수 있도록 구조를 열어두었습니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="tel:16882520" className="btn btn-primary" style={{ textAlign: 'center' }}>전화 문의하기</a>
                <Link to="/products" className="btn" style={{ textAlign: 'center', border: '1px solid var(--color-border)' }}>전체 제품안내 보기</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section style={{ background: 'var(--off)', padding: '56px 0 72px' }}>
          <div className="container">
            <h2 style={{ marginTop: 0 }}>같은 제품군의 다른 모델</h2>
            <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
              {relatedProducts.map((item) => (
                <motion.div key={item.id} whileHover={{ y: -4 }}>
                  <Link
                    to={`/products/${item.id}`}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      background: '#fff',
                      borderRadius: '18px',
                      border: '1px solid var(--border)',
                      padding: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                      <div>
                        <strong style={{ display: 'block', marginBottom: '0.35rem' }}>{item.name}</strong>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>{item.category}</span>
                      </div>
                      <span style={{ color: 'var(--red)', fontWeight: 700 }}>보기 →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <style>{`
        .detail-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          background: #FDECEA;
          color: var(--red);
          font-size: 0.86rem;
          font-weight: 700;
        }
        @media (max-width: 900px) {
          .detail-hero,
          .detail-sections,
          .related-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function getProductImages(product: Product) {
  return Array.from(new Set([...(product.imageGallery ?? []), product.detailImage, product.thumbnailImage].filter(Boolean) as string[]));
}

function DetailSpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', padding: '0.7rem 0', borderBottom: '1px solid var(--color-border)' }}>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

function DetailChip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.45rem 0.8rem',
        borderRadius: '999px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        fontSize: '0.88rem',
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}

function ProductIllustration({ product, large }: { product: Product; large?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: large ? '440px' : '280px',
        aspectRatio: '16 / 10',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
        border: '1px solid rgba(255,255,255,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: large ? '2rem' : '1.2rem', fontWeight: 900 }}>{product.name}</div>
        <div style={{ marginTop: '0.45rem', color: 'rgba(255,255,255,0.72)' }}>{formatInstallationType(product.installationType)}</div>
      </div>
    </div>
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

function getProductPill(product: Product) {
  if (product.productLine === 'mas') return 'rgba(41, 128, 185, 0.18)';
  if (product.productLine === 'personal') return 'rgba(255,255,255,0.12)';
  return 'rgba(212,172,13,0.18)';
}

function getProductPillText(product: Product) {
  if (product.productLine === 'mas') return '#D9EAFB';
  if (product.productLine === 'personal') return '#fff';
  return '#F7DA78';
}

function defaultFeatures(product: Product) {
  return [
    `${formatInstallationType(product.installationType)} 기준 모델 구성`,
    `${product.specs.powerW.toLocaleString()}W 출력`,
    `${product.applications.slice(0, 2).join(', ')} 중심 적용`,
  ];
}
