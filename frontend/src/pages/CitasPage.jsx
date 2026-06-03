import { useEffect, useMemo, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import Loader from '../components/common/Loader.jsx';
import Modal from '../components/common/Modal.jsx';
import DynamicForm from '../components/forms/DynamicForm.jsx';
import DataTable from '../components/table/DataTable.jsx';
import TableToolbar from '../components/table/TableToolbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { catalogServices } from '../services/resourceService.js';
import { formatCurrency, formatDateTime, getId, normalizeError, toDateTimeLocal } from '../utils/formatters.js';

const estadoOptions = [
  { value: 'AGENDADO', label: 'Agendado' },
  { value: 'EN_PROCESO', label: 'En proceso' },
  { value: 'COMPLETADO', label: 'Completado' }
];

export default function CitasPage() {
  const { isAdmin } = useAuth();
  const { showToast } = useToast();
  const [citas, setCitas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');
  const pageSize = 8;

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [citasData, vehiculosData, serviciosData] = await Promise.all([
        catalogServices.citas.list(),
        catalogServices.vehiculos.list(),
        catalogServices.servicios.list()
      ]);
      setCitas(Array.isArray(citasData) ? citasData : []);
      setVehiculos(Array.isArray(vehiculosData) ? vehiculosData : []);
      setServicios(Array.isArray(serviciosData) ? serviciosData : []);
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { setPage(1); }, [search, filter]);

  const fields = useMemo(() => [
    { name: 'vehiculo', label: 'Vehículo', type: 'select', required: true, source: 'vehiculos', options: vehiculos.map((v) => ({ value: getId(v), label: `${v.marca} ${v.modelo} · ${v.placas}` })) },
    { name: 'servicio', label: 'Servicio', type: 'select', omitWhenEmpty: true, options: servicios.map((s) => ({ value: getId(s), label: `${s.nombre} · ${formatCurrency(s.costo_base)}` })) },
    { name: 'fecha_hora', label: 'Fecha y hora', type: 'datetime-local', required: true },
    { name: 'descripcion', label: 'Descripción', type: 'textarea', required: true, fullWidth: true, placeholder: 'Describe el problema o necesidad del vehículo.' }
  ], [vehiculos, servicios]);

  const updateFields = [
    { name: 'estado', label: 'Estado', type: 'select', options: estadoOptions, required: true },
    { name: 'horas_invertidas', label: 'Horas invertidas', type: 'number', min: 0, step: 0.25, required: false, omitWhenEmpty: true },
    { name: 'costo_final', label: 'Costo final', type: 'number', min: 0, step: 0.01, required: false, omitWhenEmpty: true }
  ];

  const columns = [
    { key: 'fecha_hora', label: 'Fecha', render: (row) => formatDateTime(row.fecha_hora) },
    { key: 'vehiculo', label: 'Vehículo', render: (row) => row.vehiculo ? `${row.vehiculo.marca || ''} ${row.vehiculo.modelo || ''} ${row.vehiculo.placas ? `· ${row.vehiculo.placas}` : ''}` : '—' },
    { key: 'servicio', label: 'Servicio', render: (row) => row.servicio?.nombre || 'Sin servicio' },
    { key: 'estado', label: 'Estado', render: (row) => <span className={`rounded-full px-3 py-1 text-xs font-bold ${row.estado === 'COMPLETADO' ? 'bg-emerald-100 text-emerald-700' : row.estado === 'EN_PROCESO' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{row.estado}</span> },
    { key: 'costo_final', label: 'Costo final', render: (row) => formatCurrency(row.costo_final) }
  ];

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return citas.filter((cita) => {
      const statusMatch = !filter || cita.estado === filter;
      const text = [cita.descripcion, cita.estado, cita.vehiculo?.marca, cita.vehiculo?.modelo, cita.vehiculo?.placas, cita.servicio?.nombre, cita.usuario?.nombre, cita.usuario?.email].filter(Boolean).join(' ').toLowerCase();
      return statusMatch && (!term || text.includes(term));
    });
  }, [citas, search, filter]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const createCita = async (payload) => {
    setSubmitting(true);
    try {
      await catalogServices.citas.create(payload);
      showToast('Cita creada correctamente.', 'success');
      setFormOpen(false);
      load();
    } catch (err) {
      showToast(normalizeError(err), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const updateCita = async (payload) => {
    if (!editTarget) return;
    setSubmitting(true);
    try {
      await catalogServices.citas.update(editTarget._id, payload);
      showToast('Cita actualizada correctamente.', 'success');
      setEditTarget(null);
      load();
    } catch (err) {
      showToast(normalizeError(err), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <TableToolbar
        title="Citas"
        description="Agenda y seguimiento operativo de los servicios del taller."
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        filters={estadoOptions}
        canCreate
        onCreate={() => setFormOpen(true)}
        createLabel="Agendar cita"
      />

      {error ? <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div> : null}
      {loading ? <Loader /> : (
        <DataTable
          columns={columns}
          rows={paginated}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onView={setDetail}
          onEdit={setEditTarget}
          canEdit={isAdmin}
          canDelete={false}
        />
      )}

      <Modal open={formOpen} title="Agendar cita" description="El backend valida que el vehículo pertenezca al usuario autenticado." onClose={() => setFormOpen(false)}>
        <DynamicForm fields={fields} loading={submitting} onSubmit={createCita} onCancel={() => setFormOpen(false)} />
      </Modal>

      <Modal open={Boolean(editTarget)} title="Actualizar cita" description="Solo los administradores pueden actualizar estado, horas y costo final." onClose={() => setEditTarget(null)}>
        <DynamicForm fields={updateFields} initialData={editTarget ? { ...editTarget, fecha_hora: toDateTimeLocal(editTarget.fecha_hora) } : {}} loading={submitting} submitLabel="Actualizar" onSubmit={updateCita} onCancel={() => setEditTarget(null)} />
      </Modal>

      <Modal open={Boolean(detail)} title="Detalle de cita" onClose={() => setDetail(null)}>
        <pre className="max-h-[60vh] overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{JSON.stringify(detail, null, 2)}</pre>
      </Modal>
    </section>
  );
}
