import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-premium">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><AlertTriangle className="h-8 w-8" /></div>
        <h1 className="mt-6 text-3xl font-black text-slate-900">Página no encontrada</h1>
        <p className="mt-3 text-sm text-slate-500">La ruta solicitada no existe en el frontend.</p>
        <Link to="/dashboard" className="btn-primary mt-6">Volver al dashboard</Link>
      </div>
    </div>
  );
}
