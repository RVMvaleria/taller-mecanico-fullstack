import { Bike, Car, Layers3, Shield, Settings2, Wrench } from 'lucide-react';
import { catalogServices } from '../services/resourceService.js';
import { formatCurrency, getId } from './formatters.js';

export const entityConfigs = {
  vehiculos: {
    key: 'vehiculos',
    path: '/vehiculos',
    title: 'Vehículos',
    singular: 'Vehículo',
    description: 'Registro de vehículos asociados a la cuenta actual.',
    icon: Car,
    service: catalogServices.vehiculos,
    permissions: { create: 'auth', update: false, delete: 'ownerOrAdmin' },
    searchKeys: ['marca', 'modelo', 'motor', 'anio', 'vin', 'placas'],
    columns: [
      { key: 'marca', label: 'Marca' },
      { key: 'modelo', label: 'Modelo' },
      { key: 'motor', label: 'Motor' },
      { key: 'anio', label: 'Año' },
      { key: 'vin', label: 'VIN' },
      { key: 'placas', label: 'Placas' }
    ],
    fields: [
      { name: 'marca', label: 'Marca', type: 'select', required: true, source: 'marcas' },
      { name: 'modelo', label: 'Modelo', type: 'select', required: true, source: 'modelos', dependsOn: 'marca' },
      { name: 'motor', label: 'Motor', type: 'select', required: true, source: 'motores', dependsOn: 'modelo' },
      { name: 'anio', label: 'Año', type: 'number', required: true, min: 1920, max: new Date().getFullYear() + 1 },
      { name: 'vin', label: 'VIN', required: true, exactLength: 17, pattern: /^[A-HJ-NPR-Z0-9]+$/i, patternMessage: 'VIN inválido. No debe contener I, O ni Q.', placeholder: '17 caracteres' },
      { name: 'placas', label: 'Placas', required: true, placeholder: 'Ej. ABC123A' }
    ]
  },
  servicios: {
    key: 'servicios',
    path: '/servicios',
    title: 'Servicios',
    singular: 'Servicio',
    description: 'Catálogo de servicios ofrecidos por el taller.',
    icon: Wrench,
    service: catalogServices.servicios,
    permissions: { create: 'admin', update: false, delete: false },
    searchKeys: ['nombre', 'costo_base', 'es_comun'],
    columns: [
      { key: 'nombre', label: 'Servicio' },
      { key: 'costo_base', label: 'Costo base', render: (row) => formatCurrency(row.costo_base) },
      { key: 'es_comun', label: 'Tipo', render: (row) => row.es_comun ? 'Común' : 'Especializado' }
    ],
    fields: [
      { name: 'nombre', label: 'Nombre del servicio', required: true, placeholder: 'Ej. Cambio de aceite' },
      { name: 'costo_base', label: 'Costo base', type: 'number', min: 0, step: 0.01, required: true },
      { name: 'es_comun', label: 'Servicio común', type: 'checkbox', defaultValue: true, help: 'Marca esta opción cuando sea un servicio frecuente.' }
    ]
  },
  marcas: {
    key: 'marcas',
    path: '/marcas',
    title: 'Marcas',
    singular: 'Marca',
    description: 'Catálogo maestro de marcas automotrices.',
    icon: Shield,
    service: catalogServices.marcas,
    permissions: { create: 'admin', update: false, delete: false },
    searchKeys: ['nombre'],
    columns: [{ key: 'nombre', label: 'Nombre' }],
    fields: [{ name: 'nombre', label: 'Nombre de la marca', required: true, minLength: 2, pattern: /^[a-zA-Z0-9\s]+$/, patternMessage: 'Solo letras, números y espacios.' }]
  },
  modelos: {
    key: 'modelos',
    path: '/modelos',
    title: 'Modelos',
    singular: 'Modelo',
    description: 'Modelos relacionados con una marca.',
    icon: Layers3,
    service: catalogServices.modelos,
    permissions: { create: 'admin', update: false, delete: false },
    searchKeys: ['nombre', 'marca.nombre'],
    columns: [
      { key: 'nombre', label: 'Modelo' },
      { key: 'marca', label: 'Marca', render: (row) => row.marca?.nombre || '—' },
      { key: 'motores', label: 'Motores', render: (row) => Array.isArray(row.motores) && row.motores.length ? row.motores.map((m) => m.motor?.nombre).filter(Boolean).join(', ') : 'Sin motores asignados' }
    ],
    fields: [
      { name: 'nombre', label: 'Nombre del modelo', required: true, placeholder: 'Ej. Sentra' },
      { name: 'marca', label: 'Marca', type: 'select', required: true, source: 'marcas', storeId: true },
      { name: 'motores', label: 'Motores disponibles', type: 'multiselect', source: 'motores', help: 'Selecciona los motores compatibles con este modelo', omitWhenEmpty: true },
      { name: 'anio_inicio', label: 'Año de inicio', type: 'number', min: 1920, max: new Date().getFullYear() + 1, required: false, help: 'Año desde el que este modelo está disponible' },
      { name: 'anio_fin', label: 'Año de fin', type: 'number', min: 1920, max: new Date().getFullYear() + 1, required: false, help: 'Año hasta el que este modelo está disponible' }
    ]
  },
  motores: {
    key: 'motores',
    path: '/motores',
    title: 'Motores',
    singular: 'Motor',
    description: 'Catálogo técnico de motores.',
    icon: Settings2,
    service: catalogServices.motores,
    permissions: { create: 'admin', update: false, delete: false },
    searchKeys: ['nombre', 'desplazamiento'],
    columns: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'desplazamiento', label: 'Desplazamiento', render: (row) => `${row.desplazamiento} L` }
    ],
    fields: [
      { name: 'nombre', label: 'Nombre del motor', required: true, placeholder: 'Ej. HR16DE' },
      { name: 'desplazamiento', label: 'Desplazamiento', type: 'number', min: 0.1, max: 10, step: 0.1, required: true, help: 'Valor en litros. Ej. 1.6' }
    ]
  }
};

export const dashboardCards = [
  { key: 'vehiculos', label: 'Vehículos registrados', icon: Car },
  { key: 'citas', label: 'Citas activas', icon: Bike },
  { key: 'servicios', label: 'Servicios', icon: Wrench },
  { key: 'marcas', label: 'Marcas', icon: Shield }
];

export function buildFieldOptions(field, lookups, values = {}) {
  if (field.type !== 'select' && field.type !== 'multiselect') return field;
  
  let list = lookups[field.source] || [];
  
  // Filter by dependent field if specified
  if (field.dependsOn && values[field.dependsOn]) {
    const dependentValue = values[field.dependsOn];
    
    if (field.source === 'modelos' && field.dependsOn === 'marca') {
      // Filter modelos by selected marca
      list = (lookups.modelosByMarca?.[dependentValue] || []);
    } else if (field.source === 'motores' && field.dependsOn === 'modelo') {
      // Filter motores by selected modelo
      list = (lookups.motoresByModelo?.[dependentValue] || []);
    }
  }
  
  return {
    ...field,
    options: list.map((item) => ({ 
      value: getId(item), 
      label: item.nombre || item.placas || item.email || getId(item),
      object: item
    }))
  };
}
