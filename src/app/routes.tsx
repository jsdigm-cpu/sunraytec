import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import type React from 'react';
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
const FastTrackPage        = lazy(() => import('../pages/FastTrackPage'));
const CasesPage            = lazy(() => import('../pages/CasesPage'));
const CaseDetailPage       = lazy(() => import('../pages/CaseDetailPage'));
const CasesMapPage         = lazy(() => import('../pages/CasesMapPage'));
const CatalogPage          = lazy(() => import('../pages/resources/CatalogPage'));
const ResourceToolsPage    = lazy(() => import('../pages/resources/ResourceToolsPage'));
const FaqPage              = lazy(() => import('../pages/support/FaqPage'));
const DealersPage          = lazy(() => import('../pages/support/DealersPage'));
const NoticePage           = lazy(() => import('../pages/support/NoticePage'));
const ChatbotPage          = lazy(() => import('../pages/support/ChatbotPage'));
const PrivacyPolicyPage    = lazy(() => import('../pages/policy/PrivacyPolicyPage'));
const TermsPage            = lazy(() => import('../pages/policy/TermsPage'));
const CertificationsPage   = lazy(() => import('../pages/about/CertificationsPage'));
const HistoryPage          = lazy(() => import('../pages/about/HistoryPage'));
const CeoMessagePage       = lazy(() => import('../pages/about/CeoMessagePage'));
const LocationPage         = lazy(() => import('../pages/about/LocationPage'));
const ClientsPage          = lazy(() => import('../pages/about/ClientsPage'));
const MediaPage            = lazy(() => import('../pages/about/MediaPage'));
const PrinciplePage        = lazy(() => import('../pages/technology/PrinciplePage'));
const TechnologySolutionPage = lazy(() => import('../pages/technology/TechnologySolutionPage'));
const ProductGuidePage     = lazy(() => import('../pages/products/ProductGuidePage'));
// 인증
const LoginPage            = lazy(() => import('../pages/auth/LoginPage'));
const SignupPage            = lazy(() => import('../pages/auth/SignupPage'));
const SignupVerifiedPage    = lazy(() => import('../pages/auth/SignupVerifiedPage'));
// 파트너 전용
const PartnerPortalPage    = lazy(() => import('../pages/partner/PartnerPortalPage'));
const PartnerPendingPage   = lazy(() => import('../pages/partner/PartnerPendingPage'));
const PartnerSignupGuidePage = lazy(() => import('../pages/partner/PartnerSignupGuidePage'));

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
      { path: 'fasttrack',             element: <S><FastTrackPage /></S> },
      { path: 'cases',                 element: <S><CasesPage /></S> },
      { path: 'cases/:id',             element: <S><CaseDetailPage /></S> },
      { path: 'cases-map',             element: <S><CasesMapPage /></S> },
      { path: 'resources/catalog',     element: <S><CatalogPage /></S> },
      { path: 'resources/heating-load-calculator', element: <S><ResourceToolsPage pageId="heating-load" /></S> },
      { path: 'resources/energy-roi-calculator', element: <S><ResourceToolsPage pageId="energy-roi" /></S> },
      { path: 'resources/spec-cad',     element: <S><ResourceToolsPage pageId="cad" /></S> },
      { path: 'resources/videos',       element: <S><ResourceToolsPage pageId="videos" /></S> },
      { path: 'about/certifications',  element: <S><CertificationsPage /></S> },
      { path: 'about/history',         element: <S><HistoryPage /></S> },
      { path: 'about/ceo-message',     element: <S><CeoMessagePage /></S> },
      { path: 'about/media',           element: <S><MediaPage /></S> },
      { path: 'about/clients',         element: <S><ClientsPage /></S> },
      { path: 'about/location',        element: <S><LocationPage /></S> },
      { path: 'products/special',      element: <S><ProductGuidePage pageId="special" /></S> },
      { path: 'products/personal-bath', element: <S><ProductGuidePage pageId="personal-bath" /></S> },
      { path: 'products/smart-control', element: <S><ProductGuidePage pageId="smart-control" /></S> },
      { path: 'products/compare',      element: <S><ProductGuidePage pageId="compare" /></S> },
      { path: 'support/faq',           element: <S><FaqPage /></S> },
      { path: 'support/notice',        element: <S><NoticePage /></S> },
      { path: 'support/dealers',       element: <S><DealersPage /></S> },
      { path: 'support/chatbot',       element: <S><ChatbotPage /></S> },
      { path: 'policy/privacy',        element: <S><PrivacyPolicyPage /></S> },
      { path: 'policy/terms',          element: <S><TermsPage /></S> },
      { path: 'technology/principle',  element: <S><PrinciplePage /></S> },
      { path: 'technology/zero',       element: <S><TechnologySolutionPage pageId="zero" /></S> },
      { path: 'solutions/public-edu',  element: <S><TechnologySolutionPage pageId="public-edu" /></S> },
      { path: 'solutions/industrial-logistics', element: <S><TechnologySolutionPage pageId="industrial-logistics" /></S> },
      { path: 'solutions/defense-special', element: <S><TechnologySolutionPage pageId="defense-special" /></S> },
      { path: 'solutions/iot-control', element: <S><TechnologySolutionPage pageId="iot-control" /></S> },

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
      { path: 'partner/signup-guide',  element: <S><PartnerSignupGuidePage /></S> },
    ],
  },
  // 인증 페이지 (App 레이아웃 밖 — Header/Footer 없음)
  { path: '/login',  element: <S><LoginPage /></S> },
  { path: '/signup', element: <S><SignupPage /></S> },
  { path: '/signup/verified', element: <S><SignupVerifiedPage /></S> },
]);
