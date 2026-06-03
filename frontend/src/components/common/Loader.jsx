export default function Loader({ label = 'Cargando información' }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-steel" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
