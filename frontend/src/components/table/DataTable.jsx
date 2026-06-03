import { ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from 'lucide-react';
import EmptyState from '../common/EmptyState.jsx';

export default function DataTable({ columns, rows, page, pageSize, total, onPageChange, onView, onEdit, onDelete, canEdit, canDelete }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (!rows.length) return <EmptyState />;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => <th key={column.key} className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">{column.label}</th>)}
              <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row) => (
              <tr key={row._id || row.id} className="transition hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className="max-w-[260px] px-5 py-4 text-sm text-slate-700">
                    <div className="truncate">{column.render ? column.render(row) : row[column.key] ?? '—'}</div>
                  </td>
                ))}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onView(row)} className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100" title="Ver detalle"><Eye className="h-4 w-4" /></button>
                    {canEdit ? <button onClick={() => onEdit(row)} className="rounded-xl border border-blue-200 p-2 text-steel transition hover:bg-blue-50" title="Editar"><Pencil className="h-4 w-4" /></button> : null}
                    {canDelete ? <button onClick={() => onDelete(row)} className="rounded-xl border border-red-200 p-2 text-red-600 transition hover:bg-red-50" title="Eliminar"><Trash2 className="h-4 w-4" /></button> : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Mostrando página <span className="font-bold text-slate-900">{page}</span> de <span className="font-bold text-slate-900">{totalPages}</span> · {total} registros</p>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => onPageChange(page - 1)} disabled={page <= 1}><ChevronLeft className="h-4 w-4" />Anterior</button>
          <button className="btn-secondary" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>Siguiente<ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
