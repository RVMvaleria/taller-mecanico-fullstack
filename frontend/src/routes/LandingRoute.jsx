import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import FullPageLoader from '../components/common/FullPageLoader.jsx';

export default function LandingRoute() {
  const { isAuthenticated, booting } = useAuth();
  const navigate = useNavigate();

  //console.log('[LandingRoute] Rendering: booting=', booting, 'isAuthenticated=', isAuthenticated);

  useEffect(() => {
    //console.log('[LandingRoute] Effect running: booting=', booting, 'isAuthenticated=', isAuthenticated);
    if (!booting) {
      const destination = isAuthenticated ? '/dashboard' : '/inicio';
      //console.log('Yendo a:', destination);
      navigate(destination, { replace: true });
    }
  }, [booting, isAuthenticated, navigate]);

  return <FullPageLoader message="Cargando..." />;
}
