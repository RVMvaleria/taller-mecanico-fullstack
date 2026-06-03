import { LogOut, Menu, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Navbar({ onOpenMobile }) {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    showToast('Sesión finalizada correctamente.', 'success');
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onOpenMobile} className="rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden" aria-label="Abrir menú">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-steel">Taller mecánico</p>
          <h2 className="text-lg font-black text-slate-900 md:text-2xl">Panel administrativo</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/perfil')} className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-left shadow-sm transition hover:bg-slate-50 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-steel"><UserRound className="h-5 w-5" /></div>
          <div className="max-w-[180px]"><p className="truncate text-sm font-bold text-slate-900">{user?.nombre}</p><p className="truncate text-xs text-slate-500">{user?.rol}</p></div>
        </button>
        <button onClick={handleLogout} className="btn-secondary" title="Cerrar sesión"><LogOut className="h-4 w-4" /><span className="hidden md:inline">Salir</span></button>
      </div>
    </header>
  );
}
