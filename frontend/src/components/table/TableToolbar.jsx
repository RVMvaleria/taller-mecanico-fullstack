import { Plus, Search } from 'lucide-react';

export default function TableToolbar({ title, description, search, onSearchChange, filter, onFilterChange, filters = [], onCreate, canCreate, createLabel = 'Crear registro' }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-3xl font-black text-slate-900">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative block min-w-[260px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-10" placeholder="Buscar..." value={search} onChange={(e) => onSearchChange(e.target.value)} />
        </label>
        {filters.length ? (
          <select className="input min-w-[190px]" value={filter} onChange={(e) => onFilterChange(e.target.value)}>
            <option value="">Todos los estados</option>
            {filters.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        ) : null}
        {canCreate ? <button onClick={onCreate} className="btn-primary"><Plus className="h-4 w-4" />{createLabel}</button> : null}
      </div>
    </div>
  );
}
