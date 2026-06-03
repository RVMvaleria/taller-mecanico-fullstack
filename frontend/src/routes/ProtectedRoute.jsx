import { Outlet, Navigate, useLocation } from 'react-router-dom';
import FullPageLoader from '../components/common/FullPageLoader.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute() {
  const { booting, isAuthenticated } = useAuth();
  const location = useLocation();

  if (booting) return <FullPageLoader message="Validando sesión" />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
