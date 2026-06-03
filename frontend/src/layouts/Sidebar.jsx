import { NavLink } from 'react-router-dom';
import { CalendarClock, Car, ChevronLeft, Gauge, Layers3, Menu, PackageCheck, Settings2, Shield, UserRound, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Gauge, adminOnly: false },
  { to: '/vehiculos', label: 'Vehículos', icon: Car, adminOnly: false },
  { to: '/citas', label: 'Citas', icon: CalendarClock, adminOnly: false },
  { to: '/servicios', label: 'Servicios', icon: Wrench, adminOnly: true },
  { to: '/marcas', label: 'Marcas', icon: Shield, adminOnly: true },
  { to: '/modelos', label: 'Modelos', icon: Layers3, adminOnly: true },
  { to: '/motores', label: 'Motores', icon: Settings2, adminOnly: true },
  { to: '/perfil', label: 'Perfil', icon: UserRound, adminOnly: false }
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {
  const { user, isAdmin } = useAuth();

  const visibleItems = navItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <>
      <div className={`fixed inset-0 z-30 bg-navy/60 lg:hidden ${mobileOpen ? 'block' : 'hidden'}`} onClick={onCloseMobile} />
      <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-navy text-white transition-all duration-300 lg:static ${collapsed ? 'lg:w-20' : 'lg:w-72'} ${mobileOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:translate-x-0'}`}>
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-steel shadow-lg">
              <PackageCheck className="h-6 w-6" />
            </div>
            {!collapsed && <div><p className="text-sm text-slate-300">TM Premium</p><h1 className="text-lg font-black">Taller Pro</h1></div>}
          </div>
          <button onClick={onToggle} className="hidden rounded-xl p-2 text-slate-300 hover:bg-white/10 lg:block" aria-label="Colapsar menú">
            {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-3 py-5">
          {visibleItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) => `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-white text-navy shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="truncate text-sm font-bold">{user?.nombre || 'Usuario'}</p>
            {!collapsed && <p className="truncate text-xs text-slate-300">{user?.email}</p>}
            {!collapsed && <span className="mt-3 inline-flex rounded-full bg-steel/80 px-3 py-1 text-xs font-bold uppercase tracking-wide">{user?.rol || 'cliente'}</span>}
          </div>
        </div>
      </aside>
    </>
  );
}
