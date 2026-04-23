import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';

// 페이지별 lazy import — 각 페이지가 별도 청크로 분리됨
const HomePage             = lazy(() => import('../pages/HomePage'));
const ProductPage          = lazy(() => import('../pages/ProductPage'));
const ExcellenceProductsPage = lazy(() => import('../pages/products/ExcellenceProductsPage'));
const MasProductsPage      = lazy(() => import('../pages/products/MasProductsPage'));
const ProductDetailPage    = lazy(() => import('../pages/products/ProductDetailPage'));
const AdminDashboardPage   = lazy(() => import('../pages/AdminDashboardPage'));
const ComingSoonPage       = lazy(() => import('../pages/ComingSoonPage'));
const ContactPage          = lazy(() => import('../pages/ContactPage'));
const CasesPage            = lazy(() => import('../pages/CasesPage'));
const CaseDetailPage       = lazy(() => import('../pages/CaseDetailPage'));
const CatalogPage          = lazy(() => import('../pages/resources/CatalogPage'));
const CertificationsPage   = lazy(() => import('../pages/about/CertificationsPage'));
const HistoryPage          = lazy(() => import('../pages/about/HistoryPage'));

// 페이지 전환 시 보여줄 로딩 화면
function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9CA3AF',
      fontSize: '0.9rem',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '32px', height: '32px',
          border: '3px solid #E5E7EB',
          borderTopColor: '#0F2241',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 12px',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

function S({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true,                   element: <S><HomePage /></S> },
      { path: 'products',              element: <S><ProductPage /></S> },
      { path: 'products/excellence',   element: <S><ExcellenceProductsPage /></S> },
      { path: 'products/mas',          element: <S><MasProductsPage /></S> },
      { path: 'products/:productId',   element: <S><ProductDetailPage /></S> },
      { path: 'admin',                 element: <S><AdminDashboardPage /></S> },
      { path: 'coming-soon',           element: <S><ComingSoonPage /></S> },
      { path: 'contact',               element: <S><ContactPage /></S> },
      { path: 'cases',                 element: <S><CasesPage /></S> },
      { path: 'cases/:id',             element: <S><CaseDetailPage /></S> },
      { path: 'resources/catalog',     element: <S><CatalogPage /></S> },
      { path: 'about/certifications',  element: <S><CertificationsPage /></S> },
      { path: 'about/history',         element: <S><HistoryPage /></S> },
    ],
  },
]);
