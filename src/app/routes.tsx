import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import ExcellenceProductsPage from '../pages/products/ExcellenceProductsPage';
import MasProductsPage from '../pages/products/MasProductsPage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import ComingSoonPage from '../pages/ComingSoonPage';
import ContactPage from '../pages/ContactPage';
import CasesPage from '../pages/CasesPage';
import CatalogPage from '../pages/resources/CatalogPage';
import CertificationsPage from '../pages/about/CertificationsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductPage /> },
      { path: 'products/excellence', element: <ExcellenceProductsPage /> },
      { path: 'products/mas', element: <MasProductsPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: 'coming-soon', element: <ComingSoonPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'cases', element: <CasesPage /> },
      { path: 'resources/catalog', element: <CatalogPage /> },
      { path: 'about/certifications', element: <CertificationsPage /> },
    ],
  },
]);
