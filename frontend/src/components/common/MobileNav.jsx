import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import apiClient from '../../services/apiClient.js';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);

  useEffect(() => {
    if (showServices && services.length === 0) {
      fetchServices();
    }
  }, [showServices, services.length]);

  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const response = await apiClient.get('/servicios/comunes');
      setServices(response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  };

  const navLinks = [
    { to: '/inicio', label: 'Inicio' },
    { to: '/contactanos', label: 'Contacto' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:bg-blue-700 rounded-lg transition"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg z-50 w-56 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => {
                  setIsOpen(false);
                  setShowServices(false);
                }}
                className="px-4 py-3 text-slate-900 hover:bg-slate-100 hover:text-yellow-600 first:rounded-t-lg transition border-b border-slate-200 font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown for Mobile */}
            <div className="border-b border-slate-200">
              <button
                onClick={() => setShowServices(!showServices)}
                className="w-full px-4 py-3 text-slate-900 hover:bg-slate-100 hover:text-yellow-600 transition font-medium flex items-center justify-between"
              >
                Servicios
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    showServices ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {showServices && (
                <div className="bg-slate-50 border-t border-slate-200">
                  {loadingServices ? (
                    <div className="px-4 py-2 text-center text-sm text-slate-600">
                      Cargando...
                    </div>
                  ) : services.length === 0 ? (
                    <div className="px-4 py-2 text-center text-sm text-slate-600">
                      No hay servicios
                    </div>
                  ) : (
                    <ul>
                      {services.map((service, index) => (
                        <li key={service.id || `service-${index}`}>
                          <Link
                            to={`/nuestros-servicios#${service.id}`}
                            onClick={() => {
                              setIsOpen(false);
                              setShowServices(false);
                            }}
                            className="block px-6 py-2 text-steel hover:text-black hover:bg-blue-50 transition text-sm font-medium"
                          >
                            {service.nombre}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/login"
              onClick={() => {
                setIsOpen(false);
                setShowServices(false);
              }}
              className="px-4 py-3 bg-steel text-white hover:bg-blue-800 rounded-b-lg transition font-semibold text-center"
            >
              Ingresar
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
