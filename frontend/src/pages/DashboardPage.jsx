import { Link } from 'react-router-dom';
import { CalendarPlus, Car, Clock3, Plus, ShieldCheck, Wrench } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Loader from '../components/common/Loader.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { catalogServices } from '../services/resourceService.js';
import { dashboardCards } from '../utils/entityConfigs.js';
import { formatCurrency, formatDateTime } from '../utils/formatters.js';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [data, setData] = useState({ vehiculos: [], citas: [], servicios: [], marcas: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      catalogServices.vehiculos.list(),
      catalogServices.citas.list(),
      catalogServices.servicios.list(),
      catalogServices.marcas.list()
    ]).then((results) => {
      setData({
        vehiculos: results[0].status === 'fulfilled' ? results[0].value : [],
        citas: results[1].status === 'fulfilled' ? results[1].value : [],
        servicios: results[2].status === 'fulfilled' ? results[2].value : [],
        marcas: results[3].status === 'fulfilled' ? results[3].value : []
      });
    }).finally(() => setLoading(false));
  }, []);

  const activeCitas = useMemo(() => data.citas.filter((c) => c.estado !== 'COMPLETADO'), [data.citas]);
  const recent = useMemo(() => [...data.citas].sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora)).slice(0, 5), [data.citas]);
  const projected = useMemo(() => data.servicios.reduce((sum, item) => sum + Number(item.costo_base || 0), 0), [data.servicios]);

  if (loading) return <Loader label="Preparando dashboard" />;

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-3xl bg-navy text-white shadow-premium">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.4fr_0.6fr] lg:p-10">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-slate-200">Operación del taller</span>
            <h1 className="mt-5 text-3xl font-black md:text-5xl">Bienvenido, {user?.nombre}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Panel empresarial para administrar vehículos, citas y catálogos técnicos.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/citas" className="btn-primary bg-white text-navy hover:bg-slate-100"><CalendarPlus className="h-4 w-4" />Agendar cita</Link>
              <Link to="/vehiculos" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/20"><Car className="h-4 w-4" />Ver vehículos</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <p className="text-sm font-semibold text-slate-300">Rol activo</p>
            <div className="mt-4 flex items-center gap-3"><ShieldCheck className="h-10 w-10 text-blue-300" /><div><p className="text-2xl font-black uppercase">{user?.rol}</p><p className="text-sm text-slate-300">{isAdmin ? 'Acceso administrativo' : 'Acceso cliente'}</p></div></div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map(({ key, label, icon: Icon }) => (
          <div key={key} className="card p-6">
            <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-2 text-4xl font-black text-slate-900">{key === 'citas' ? activeCitas.length : data[key]?.length || 0}</p></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-steel"><Icon className="h-7 w-7" /></div></div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <div className="flex items-center justify-between"><div><h2 className="text-xl font-black text-slate-900">Actividad reciente</h2><p className="text-sm text-slate-500">Últimas citas registradas o actualizadas.</p></div><Clock3 className="h-5 w-5 text-slate-400" /></div>
          <div className="mt-5 space-y-3">
            {recent.length ? recent.map((cita) => (
              <div key={cita._id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="font-bold text-slate-900">{cita.servicio?.nombre || 'Servicio por definir'}</p><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{cita.estado}</span></div>
                <p className="mt-1 text-sm text-slate-500">{formatDateTime(cita.fecha_hora)} · {cita.vehiculo?.marca} {cita.vehiculo?.modelo}</p>
              </div>
            )) : <p className="rounded-2xl bg-slate-50 p-6 text-sm text-slate-500">No hay actividad reciente.</p>}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-steel"><Wrench className="h-6 w-6" /></div><div><h2 className="text-xl font-black text-slate-900">Resumen financiero base</h2><p className="text-sm text-slate-500">Suma de costos base de servicios disponibles.</p></div></div>
          <p className="mt-8 text-4xl font-black text-slate-900">{formatCurrency(projected)}</p>
          <p className="mt-2 text-sm text-slate-500">Valor informativo del catálogo; el costo final de una cita lo actualiza el administrador.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2"><Link to="/servicios" className="btn-secondary"><Wrench className="h-4 w-4" />Catálogo</Link>{isAdmin ? <Link to="/servicios" className="btn-primary"><Plus className="h-4 w-4" />Nuevo servicio</Link> : null}</div>
        </div>
      </div>
    </section>
  );
}
