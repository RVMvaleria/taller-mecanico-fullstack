import { useEffect, useState } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import { publicService } from '../../services/publicService';

export default function ServicesSection() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await publicService.getServiciosComunes();
        setServicios(data);
      } catch (err) {
        setError('No se pudieron cargar los servicios. Intenta más tarde.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  return (
    <section className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy">Nuestros Servicios</h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-600">
          El costo de los servicios es el costo inicial y puede variar
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-steel" />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm sm:text-base">{error}</p>
        </div>
      )}

      {!loading && !error && servicios.length === 0 && (
        <div className="text-center text-slate-500 py-8">
          <p>No hay servicios disponibles en este momento.</p>
        </div>
      )}

      {!loading && !error && servicios.length > 0 && (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio) => (
            <div
              key={servicio._id}
              className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-steel"
            >
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">{servicio.nombre}</h3>
              <p className="text-sm text-slate-600">
                Servicio disponible en nuestro taller
              </p>
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-200">
                <span className="text-xl sm:text-2xl font-black text-steel">
                  ${servicio.costo_base.toLocaleString('es-CL')}
                </span>
                <span className="text-xs text-slate-500">costo base</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
