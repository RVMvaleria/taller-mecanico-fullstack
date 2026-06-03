import { Link } from 'react-router-dom';
import { Wrench, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient.js';

export default function PublicFooter() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await apiClient.get('/servicios/comunes');
        setServicios(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      }
    };

    fetchServicios();
  }, []);

  return (
    <footer className="bg-navy text-white">
      <div className="border-t border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <Link to="/inicio" className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-steel">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-300">Taller mecánico</p>
                  <h3 className="font-black text-sm">TM Premium</h3>
                </div>
              </Link>
              <p className="text-sm text-slate-400">
                Servicios mecánicos de excelencia con profesionales altamente calificados.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Navegación</h4>
              <nav className="space-y-2 text-sm">
                <Link to="/inicio" className="block text-slate-400 hover:text-white transition">
                  Inicio
                </Link>
                <Link to="/nuestros-servicios" className="block text-slate-400 hover:text-white transition">
                  Servicios
                </Link>
                <Link to="/contactanos" className="block text-slate-400 hover:text-white transition">
                  Contacto
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Servicios</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {servicios.map((servicio) => (
                  <li key={servicio._id}>
                    <Link to="/nuestros-servicios" className="hover:text-white transition">
                      {servicio.nombre}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/nuestros-servicios" className="hover:text-white transition">
                    Ver todos →
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm">Síguenos</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-blue-300 hover:bg-steel transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-blue-300 hover:bg-steel transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-blue-300 hover:bg-steel transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2026 TM Premium - SoftCloud - Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
