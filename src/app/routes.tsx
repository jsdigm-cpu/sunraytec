import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductPage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
    ],
  },
]);
