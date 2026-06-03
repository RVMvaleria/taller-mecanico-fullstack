import { Wrench } from 'lucide-react';

export default function FullPageLoader({ message = 'Cargando' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 shadow-premium">
        <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-navy text-white">
          <Wrench className="h-7 w-7" />
        </div>
        <p className="text-sm font-semibold text-slate-600">{message}...</p>
      </div>
    </div>
  );
}
