import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import apiClient from '../../services/apiClient.js';

export default function MainNav() {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    if (showServicesDropdown && services.length === 0) {
      fetchServices();
    }
  }, [showServicesDropdown, services.length]);

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

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setShowServicesDropdown(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowServicesDropdown(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { to: '/inicio', label: 'Inicio' },
    { to: '/contactanos', label: 'Contacto' }
  ];

  return (
    <nav className="flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-white font-medium transition duration-300 hover:text-yellow-300 hover:scale-105"
        >
          {link.label}
        </Link>
      ))}

      {/* Services Dropdown */}
      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center gap-2 text-white font-medium transition duration-300 hover:text-yellow-300 hover:scale-105">
          Servicios
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              showServicesDropdown ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {showServicesDropdown && (
          <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {loadingServices ? (
              <div className="px-4 py-3 text-center text-steel">
                Cargando...
              </div>
            ) : services.length === 0 ? (
              <div className="px-4 py-3 text-center text-steel text-sm">
                No hay servicios disponibles
              </div>
            ) : (
              <ul className="py-2">
                {services.map((service, index) => (
                  <li
                    key={service.id || `service-${index}`}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <Link
                      to={`/nuestros-servicios#${service.id}`}
                      onClick={() => setShowServicesDropdown(false)}
                      className="block px-4 py-3 text-steel font-medium transition duration-200 hover:text-black hover:bg-blue-50"
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
        className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-steel transition duration-300 hover:bg-blue-50 hover:scale-105"
      >
        Ingresar
      </Link>
    </nav>
  );
}
