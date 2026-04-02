import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { initialProducts } from '../data/products';
import { initialSiteContent } from '../data/siteContent';
import type { Product } from '../types/product';
import type { SiteContent } from '../types/cms';

const STORAGE_KEY = 'sunraytec-cms-state-v1';

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [content, setContent] = useState<SiteContent>(initialSiteContent);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.content) setContent(parsed.content);
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, content }));
  }, [products, content]);

  return (
    <>
      <Header />
      <main>
        <Outlet context={{ products, content, setProducts, setContent }} />
      </main>
      <Footer />
    </>
  );
}
