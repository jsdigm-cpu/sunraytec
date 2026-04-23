import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import { initialProducts } from '../data/products';
import { initialSiteContent } from '../data/siteContent';
import type { Product, ProductLine, InstallationType } from '../types/product';
import type { SiteContent } from '../types/cms';
import { supabase } from '../lib/supabase';

// Supabase DB row (snake_case) → Product (camelCase) 변환
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbRowToProduct(row: Record<string, any>): Product {
  return {
    id:                row.id,
    name:              row.name,
    category:          row.category,
    summary:           row.summary ?? '',
    applications:      Array.isArray(row.applications) ? row.applications : [],
    specs: {
      powerW:      row.power_w     ?? 0,
      sizeMm:      row.size_mm     ?? '',
      voltage:     row.voltage     ?? '',
      heatingArea: row.heating_area ?? '',
    },
    productLine:       (row.product_line     as ProductLine)      ?? undefined,
    installationType:  (row.installation_type as InstallationType) ?? undefined,
    procurementId:     row.procurement_id    ?? undefined,
    thumbnailImage:    row.thumbnail_image   ?? undefined,
    detailImage:       row.detail_image      ?? undefined,
    detailDescription: row.detail_description ?? undefined,
    featureBullets:    Array.isArray(row.feature_bullets) ? row.feature_bullets : undefined,
  };
}

const STORAGE_KEY = 'sunraytec-cms-state-v1';
const PRODUCTS_SCHEMA_VERSION = '2026-04-21-products-v4';

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [content, setContent] = useState<SiteContent>(initialSiteContent);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const persistCmsState = async (nextProducts: Product[], nextContent: SiteContent) => {
    // 1. Save to Local Storage as a resilient fallback
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        products: nextProducts,
        productsSchemaVersion: PRODUCTS_SCHEMA_VERSION,
        content: nextContent,
      }),
    );
    setLastSavedAt(new Date().toISOString());

    // 2. Try to save to Supabase if connected
    if (supabase) {
      try {
        await supabase.from('site_content').upsert(
          { section_key: 'hero', payload: nextContent.hero },
          { onConflict: 'section_key' }
        );
        // Note: Products upsert logic would require looping through all products
        // and mapping all properties exactly to match the DB columns. 
        // For admin sync, usually specialized API calls are used, but we save hero for now.
      } catch (error) {
        console.warn('Failed to save to Supabase:', error);
      }
    }
  };

  useEffect(() => {
    async function hydrate() {
      let loadedFromSupabase = false;

      // 1. Try Supabase Network Fetch
      if (supabase) {
        try {
          const [{ data: pData, error: pErr }, { data: cData, error: cErr }] = await Promise.all([
            supabase.from('products').select('*').order('sort_order', { ascending: true }),
            supabase.from('site_content').select('*')
          ]);

          if (!pErr && !cErr && pData && cData) {
            // Mapping DB products to state (snake_case → camelCase)
            if (pData.length > 0) {
              setProducts(pData.map(dbRowToProduct));
            }

            // Mapping DB site_content to state
            if (cData.length > 0) {
              const newContent = { ...initialSiteContent };
              cData.forEach(row => {
                if (row.section_key === 'hero') {
                  newContent.hero = { ...newContent.hero, ...row.payload };
                }
              });
              setContent(newContent);
            }
            loadedFromSupabase = true;
            console.log('Successfully hydrated from Supabase ✅');
          }
        } catch (error) {
          console.warn('Failed to fetch from Supabase. Falling back to local storage...', error);
        }
      }

      // 2. Fallback to Local Storage if Supabase Failed / Disconnected
      if (!loadedFromSupabase) {
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
          } catch {
            console.warn('Failed to parse localStorage CMS state');
          }
        }
        console.log('Hydrated from LocalStorage (Fallback) 📦');
      }

      setIsHydrated(true);
      setLastSavedAt(new Date().toISOString());
    }

    hydrate();
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
