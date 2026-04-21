import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import { initialProducts } from '../data/products';
import { initialSiteContent } from '../data/siteContent';
import type { Product } from '../types/product';
import type { SiteContent } from '../types/cms';

const STORAGE_KEY = 'sunraytec-cms-state-v1';
const PRODUCTS_SCHEMA_VERSION = '2026-04-21-products-v4';

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [content, setContent] = useState<SiteContent>(initialSiteContent);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const persistCmsState = (nextProducts: Product[], nextContent: SiteContent) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        products: nextProducts,
        productsSchemaVersion: PRODUCTS_SCHEMA_VERSION,
        content: nextContent,
      }),
    );
    setLastSavedAt(new Date().toISOString());
  };

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.products) {
          const storedVersion = parsed.productsSchemaVersion as string | undefined;
          setProducts(storedVersion === PRODUCTS_SCHEMA_VERSION ? parsed.products : initialProducts);
        }
        if (parsed.content) {
          setContent({
            ...initialSiteContent,
            ...parsed.content,
            hero: {
              ...initialSiteContent.hero,
              ...parsed.content.hero,
            },
          });
        }
        setLastSavedAt(new Date().toISOString());
      } catch {
        // noop
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    persistCmsState(products, content);
  }, [products, content, isHydrated]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet
          context={{
            products,
            content,
            setProducts,
            setContent,
            saveCmsState: () => persistCmsState(products, content),
            lastSavedAt,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
