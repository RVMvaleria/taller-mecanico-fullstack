import { useEffect, useMemo, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Modal from '../components/common/Modal.jsx';
import Loader from '../components/common/Loader.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import DynamicForm from '../components/forms/DynamicForm.jsx';
import DataTable from '../components/table/DataTable.jsx';
import TableToolbar from '../components/table/TableToolbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { catalogServices } from '../services/resourceService.js';
import { buildFieldOptions } from '../utils/entityConfigs.js';
import { normalizeError } from '../utils/formatters.js';
import { useEntityData } from '../hooks/useEntityData.js';

function hasPermission(permission, user, isAdmin) {
  if (!permission) return false;
  if (permission === 'auth') return Boolean(user);
  if (permission === 'admin') return isAdmin;
  if (permission === 'ownerOrAdmin') return Boolean(user);
  return Boolean(permission);
}

export default function EntityPage({ config }) {
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();
  const data = useEntityData(config);
  const [formOpen, setFormOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [lookups, setLookups] = useState({});

  const canCreate = hasPermission(config.permissions.create, user, isAdmin) && Boolean(config.service.create);
  const canDelete = Boolean(config.service.remove) && hasPermission(config.permissions.delete, user, isAdmin);

  useEffect(() => {
    const needed = [...new Set((config.fields || []).map((f) => f.source).filter(Boolean))];
    if (!needed.length) return;
    Promise.all(needed.map((key) => catalogServices[key]?.list().then((rows) => [key, rows]).catch(() => [key, []])))
      .then((entries) => {
        const baseLoookups = Object.fromEntries(entries);
        // Build a map of modelos by marca for dependent filtering
        const modelosByMarca = {};
        (baseLoookups.modelos || []).forEach((modelo) => {
          const marcaId = modelo.marca?._id || modelo.marca;
          if (!modelosByMarca[marcaId]) modelosByMarca[marcaId] = [];
          modelosByMarca[marcaId].push(modelo);
        });
        // Build a map of motores by modelo for dependent filtering
        const motoresByModelo = {};
        (baseLoookups.modelos || []).forEach((modelo) => {
          const modeloId = modelo._id;
          if (Array.isArray(modelo.motores)) {
            motoresByModelo[modeloId] = modelo.motores.map((m) => m.motor || m);
          }
        });
        setLookups({
          ...baseLoookups,
          modelosByMarca,
          motoresByModelo
        });
      });
  }, [config]);

  const fields = useMemo(() => (config.fields || []).map((field) => buildFieldOptions(field, lookups)), [config.fields, lookups]);

  const handleCreate = async (payload) => {
    if (!config.service.create) return;
    setSubmitting(true);
    try {
      await config.service.create(payload);
      showToast(`${config.singular} creado correctamente.`, 'success');
      setFormOpen(false);
      data.reload();
    } catch (error) {
      showToast(normalizeError(error), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || !config.service.remove) return;
    setSubmitting(true);
    try {
      await config.service.remove(deleteTarget._id);
      showToast(`${config.singular} eliminado correctamente.`, 'success');
      setDeleteTarget(null);
      data.reload();
    } catch (error) {
      showToast(normalizeError(error), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <TableToolbar
        title={config.title}
        description={config.description}
        search={data.search}
        onSearchChange={data.setSearch}
        canCreate={canCreate}
        onCreate={() => setFormOpen(true)}
        createLabel={`Crear ${config.singular.toLowerCase()}`}
      />

      {data.error ? <div className="mb-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><AlertCircle className="h-5 w-5 shrink-0" />{data.error}</div> : null}
      {data.loading ? <Loader /> : (
        <DataTable
          columns={config.columns}
          rows={data.paginated}
          page={data.page}
          pageSize={data.pageSize}
          total={data.total}
          onPageChange={data.setPage}
          onView={setDetail}
          onEdit={() => showToast('Este backend no expone endpoint PUT para editar esta entidad.', 'info')}
          onDelete={setDeleteTarget}
          canEdit={false}
          canDelete={canDelete}
        />
      )}

      <Modal open={formOpen} title={`Crear ${config.singular.toLowerCase()}`} description="Captura la marca del vehículo" onClose={() => setFormOpen(false)}>
        <DynamicForm fields={fields} lookups={lookups} config={config} loading={submitting} onSubmit={handleCreate} onCancel={() => setFormOpen(false)} />
      </Modal>

      <Modal open={Boolean(detail)} title={`Detalle de ${config.singular.toLowerCase()}`} onClose={() => setDetail(null)}>
        <pre className="max-h-[60vh] overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{JSON.stringify(detail, null, 2)}</pre>
      </Modal>

      <ConfirmDialog open={Boolean(deleteTarget)} danger loading={submitting} title="Eliminar registro" message={`¿Deseas eliminar este ${config.singular.toLowerCase()}? Esta acción se enviará al backend y no se puede deshacer desde la interfaz.`} confirmText="Eliminar" onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </section>
  );
}
