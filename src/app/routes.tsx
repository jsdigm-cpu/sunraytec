import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// 페이지별 lazy import
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
// 인증
const LoginPage            = lazy(() => import('../pages/auth/LoginPage'));
const SignupPage            = lazy(() => import('../pages/auth/SignupPage'));
// 파트너 전용
const PartnerPortalPage    = lazy(() => import('../pages/partner/PartnerPortalPage'));
const PartnerPendingPage   = lazy(() => import('../pages/partner/PartnerPendingPage'));

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid #E5E7EB', borderTopColor: '#0F2241', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
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
      { path: 'coming-soon',           element: <S><ComingSoonPage /></S> },
      { path: 'contact',               element: <S><ContactPage /></S> },
      { path: 'cases',                 element: <S><CasesPage /></S> },
      { path: 'cases/:id',             element: <S><CaseDetailPage /></S> },
      { path: 'resources/catalog',     element: <S><CatalogPage /></S> },
      { path: 'about/certifications',  element: <S><CertificationsPage /></S> },
      { path: 'about/history',         element: <S><HistoryPage /></S> },

      // 관리자 전용 (admin 로그인 필요)
      {
        path: 'admin',
        element: (
          <S>
            <ProtectedRoute require="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          </S>
        ),
      },

      // 파트너 전용 (approved partner 또는 admin)
      {
        path: 'partner',
        element: (
          <S>
            <ProtectedRoute require="partner">
              <PartnerPortalPage />
            </ProtectedRoute>
          </S>
        ),
      },
      { path: 'partner/pending',       element: <S><PartnerPendingPage /></S> },
    ],
  },
  // 인증 페이지 (App 레이아웃 밖 — Header/Footer 없음)
  { path: '/login',  element: <S><LoginPage /></S> },
  { path: '/signup', element: <S><SignupPage /></S> },
]);
