import { Link, useOutletContext } from 'react-router-dom';
import PageSEO from '../../components/seo/PageSEO';
import SubHero from '../../components/layout/SubHero';
import type { CmsState } from '../../types/cms';

export default function ComparePage() {
  const { products } = useOutletContext<CmsState>();
  
  // Exclude personal products if needed, or sort them
  const compareProducts = products.filter(p => p.productLine !== 'personal');

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <PageSEO 
        title="제품 비교 매트릭스"
        description="썬레이텍 복사난방패널 제품군을 면적, 설치방식, 천장고에 따라 비교합니다."
        canonical="/products/compare"
      />
      <SubHero
        breadcrumb={[{ label: '제품안내' }, { label: '제품 비교' }]}
        badge="Product Comparison"
        title="제품 선택 매트릭스"
        lead="공간 면적과 천장 높이, 계약 조건에 따라 적합한 모델을 한눈에 비교해 보세요."
        keywords={['제품 비교표', '복사난방 용량', 'MAS 제품 비교', '설치 방식']}
      />

      <section style={{ padding: '52px 0 78px' }}>
        <div className="container">
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', overflowX: 'auto', boxShadow: '0 12px 34px rgba(15,34,65,0.07)' }}>
            <table className="compare-table" style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F1F5F9', borderBottom: '2px solid #CBD5E1' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 900, color: 'var(--navy)' }}>모델명</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 900, color: 'var(--navy)' }}>분류</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 900, color: 'var(--navy)' }}>소비전력</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 900, color: 'var(--navy)' }}>설치 방식</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 900, color: 'var(--navy)' }}>권장 난방면적</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 900, color: 'var(--navy)' }}>상세보기</th>
                </tr>
              </thead>
              <tbody>
                {compareProducts.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '16px', fontWeight: 700 }}>{product.name}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        background: product.productLine === 'mas' ? 'rgba(41, 128, 185, 0.1)' : 'rgba(212,172,13,0.1)', 
                        color: product.productLine === 'mas' ? '#2980B9' : '#D4AC0D', 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 
                      }}>
                        {product.category}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{product.specs.powerW.toLocaleString()}W</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      {product.installationType === 'embedded' ? '매립형' : 
                       product.installationType === 'exposed' ? '노출형' : '벽걸이형'}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>{product.specs.heatingArea}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <Link to={`/products/${product.id}`} className="btn" style={{ padding: '6px 12px', fontSize: '0.85rem', border: '1px solid var(--border)' }}>
                        보기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: 26, textAlign: 'center' }}>
            <Link to="/contact" style={{ display: 'inline-flex', padding: '13px 24px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              현장 조건 상담하기
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .compare-table th, .compare-table td {
          vertical-align: middle;
        }
        .compare-table tbody tr:hover {
          background-color: #F8FAFC;
        }
      `}</style>
    </main>
  );
}
