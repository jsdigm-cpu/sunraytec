import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Sidebar, { type AdminTab } from '../components/admin/Sidebar';
import ProductForm from '../components/admin/ProductForm';
import ProductListEditor from '../components/admin/ProductListEditor';
import ContentEditor from '../components/admin/ContentEditor';
import InquiryList from '../components/admin/InquiryList';
import CaseEditor from '../components/admin/CaseEditor';
import ResourceDocumentEditor from '../components/admin/ResourceDocumentEditor';
import MemberManager from '../components/admin/MemberManager';
import HeroThemeEditor from '../components/admin/HeroThemeEditor';
import NoticeEditor from '../components/admin/NoticeEditor';
import type { CmsState, SiteContent } from '../types/cms';
import type { Product } from '../types/product';
import { supabase } from '../lib/supabase';

interface AdminContext extends CmsState {
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setContent: Dispatch<SetStateAction<SiteContent>>;
  saveCmsState: () => Promise<string | null>;
  lastSavedAt: string | null;
  lastSaveError: string | null;
}

export default function AdminDashboardPage() {
  const { products, content, setProducts, setContent, saveCmsState, lastSavedAt, lastSaveError } = useOutletContext<AdminContext>();
  const [tab, setTab] = useState<AdminTab>('products');
  const [newInquiryCount, setNewInquiryCount] = useState(0);
  const [productNotice, setProductNotice] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('inquiries')
      .select('id', { count: 'exact' })
      .eq('status', 'new')
      .then(({ count }) => setNewInquiryCount(count ?? 0));
  }, []);

  const productToDbRow = (product: Product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    product_line: product.productLine,
    installation_type: product.installationType,
    summary: product.summary,
    detail_description: product.detailDescription,
    applications: product.applications,
    power_w: product.specs.powerW,
    size_mm: product.specs.sizeMm,
    voltage: product.specs.voltage,
    heating_area: product.specs.heatingArea,
    weight_kg: product.specs.weightKg,
    current_a: product.specs.currentA,
    calorific_value_kcal: product.specs.calorificValueKcal,
    heating_temp_c: product.specs.heatingTempC,
    procurement_id: product.procurementId || null,
    thumbnail_image: product.thumbnailImage || null,
    detail_image: product.detailImage || null,
    image_gallery: product.imageGallery ?? [],
    feature_bullets: product.featureBullets ?? [],
    sort_order: product.sortOrder ?? products.length,
    updated_at: new Date().toISOString(),
  });

  const upsertProduct = async (incoming: Product) => {
    setProductNotice('');
    if (supabase) {
      const { error } = await supabase
        .from('products')
        .upsert(productToDbRow(incoming), { onConflict: 'id' });

      if (error) {
        setProductNotice(`제품 저장 실패: ${error.message}`);
        return `제품 저장 실패: ${error.message}`;
      }
    }

    setProducts((prev) => {
      const exists = prev.some((item) => item.id === incoming.id);
      if (exists) return prev.map((item) => (item.id === incoming.id ? incoming : item));
      return [...prev, incoming];
    });
    setProductNotice('제품 정보가 저장됐습니다.');
    return null;
  };

  const deleteProduct = async (id: string) => {
    setProductNotice('');
    if (supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        setProductNotice(`제품 삭제 실패: ${error.message}`);
        return `제품 삭제 실패: ${error.message}`;
      }
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (selectedProduct?.id === id) setSelectedProduct(null);
    setProductNotice('제품이 삭제됐습니다.');
    return null;
  };

  const saveProductOrder = async (ordered: Product[]) => {
    setProductNotice('');
    const nextProducts = ordered.map((item, index) => ({ ...item, sortOrder: index }));

    if (supabase) {
      const { error } = await supabase
        .from('products')
        .upsert(nextProducts.map(productToDbRow), { onConflict: 'id' });

      if (error) {
        setProductNotice(`제품 순서 저장 실패: ${error.message}`);
        return `제품 순서 저장 실패: ${error.message}`;
      }
    }

    setProducts(nextProducts);
    setProductNotice('제품 노출 순서가 저장됐습니다.');
    return null;
  };

  return (
    <div style={{ display: 'flex', minHeight: '70vh' }}>
      <Sidebar tab={tab} onTab={setTab} newInquiryCount={newInquiryCount} />
      <section style={{ flex: 1, padding: '1rem', minWidth: 0 }}>
        {tab === 'products' && (
          <>
            {productNotice && (
              <div
                style={{
                  marginBottom: '1rem',
                  border: productNotice.includes('실패') ? '1px solid #FCA5A5' : '1px solid #A7F3D0',
                  background: productNotice.includes('실패') ? '#FEF2F2' : '#ECFDF5',
                  color: productNotice.includes('실패') ? '#B91C1C' : '#047857',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                }}
              >
                {productNotice}
              </div>
            )}
            <div className="admin-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
              <ProductForm onSubmit={upsertProduct} selectedProduct={selectedProduct} onClearSelection={() => setSelectedProduct(null)} />
              <ProductListEditor
                products={products}
                selectedId={selectedProduct?.id ?? null}
                onSelect={setSelectedProduct}
                onDelete={deleteProduct}
                onSaveOrder={saveProductOrder}
              />
            </div>
          </>
        )}
        {tab === 'content' && (
          <ContentEditor content={content} onChange={setContent} onSave={saveCmsState} lastSavedAt={lastSavedAt} lastSaveError={lastSaveError} />
        )}
        {tab === 'cases' && (
          <CaseEditor />
        )}
        {tab === 'resources' && (
          <ResourceDocumentEditor />
        )}
        {tab === 'members' && (
          <MemberManager />
        )}
        {tab === 'notices' && (
          <NoticeEditor />
        )}
        {tab === 'hero-theme' && (
          <HeroThemeEditor />
        )}
        {tab === 'inquiries' && (
          <InquiryList />
        )}
      </section>
    </div>
  );
}
