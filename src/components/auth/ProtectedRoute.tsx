import { Navigate } from 'react-router-dom';
import type React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
  require: 'admin' | 'partner';
}

export default function ProtectedRoute({ children, require }: Props) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '3px solid #E5E7EB', borderTopColor: '#0F2241', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (require === 'admin' && profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (require === 'partner' && profile?.role !== 'admin' && profile?.status !== 'approved') {
    return <Navigate to="/partner/pending" replace />;
  }

  return <>{children}</>;
}
