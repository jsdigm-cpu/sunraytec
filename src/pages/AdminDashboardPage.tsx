import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Sidebar from '../components/admin/Sidebar';
import ProductForm from '../components/admin/ProductForm';
import ProductListEditor from '../components/admin/ProductListEditor';
import ContentEditor from '../components/admin/ContentEditor';
import type { CmsState, SiteContent } from '../types/cms';
import type { Product } from '../types/product';

interface AdminContext extends CmsState {
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setContent: Dispatch<SetStateAction<SiteContent>>;
  saveCmsState: () => void;
  lastSavedAt: string | null;
}

export default function AdminDashboardPage() {
  const { products, content, setProducts, setContent, saveCmsState, lastSavedAt } = useOutletContext<AdminContext>();
  const [tab, setTab] = useState<'products' | 'content'>('products');

  const upsertProduct = (incoming: Product) => {
    setProducts((prev) => {
      const exists = prev.some((item) => item.id === incoming.id);
      if (exists) return prev.map((item) => (item.id === incoming.id ? incoming : item));
      return [...prev, incoming];
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '70vh' }}>
      <Sidebar tab={tab} onTab={setTab} />
      <section style={{ flex: 1, padding: '1rem' }}>
        {tab === 'products' ? (
          <div className="admin-grid" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            <ProductForm onSubmit={upsertProduct} />
            <ProductListEditor products={products} onDelete={(id) => setProducts((prev) => prev.filter((p) => p.id !== id))} />
          </div>
        ) : (
          <ContentEditor content={content} onChange={setContent} onSave={saveCmsState} lastSavedAt={lastSavedAt} />
        )}
      </section>
    </div>
  );
}
