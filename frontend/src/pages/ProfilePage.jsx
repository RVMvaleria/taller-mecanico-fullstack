import { useState } from 'react';
import { CalendarDays, Mail, ShieldCheck, UserRound } from 'lucide-react';
import DynamicForm from '../components/forms/DynamicForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatDate } from '../utils/formatters.js';

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);

  const fields = [
    { name: 'nombre', label: 'Nombre', required: true, minLength: 3 },
    { name: 'email', label: 'Correo electrónico', type: 'email', required: true }
  ];

  const submit = async (payload) => {
    try {
      await updateProfile(payload);
      showToast('Perfil actualizado correctamente.', 'success');
      setEditing(false);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div><h1 className="text-3xl font-black text-slate-900">Perfil</h1><p className="mt-1 text-sm text-slate-500">Información de la cuenta.</p></div>
      <div className="card overflow-hidden">
        <div className="bg-navy p-8 text-white"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10"><UserRound className="h-10 w-10" /></div><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Usuario actual</p><h2 className="mt-2 text-3xl font-black">{user?.nombre}</h2><p className="text-slate-300">{user?.email}</p></div></div></div>
        <div className="grid gap-4 p-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4"><Mail className="h-5 w-5 text-steel" /><p className="mt-3 text-xs font-bold uppercase text-slate-500">Email</p><p className="truncate font-semibold text-slate-900">{user?.email}</p></div>
          <div className="rounded-2xl bg-slate-50 p-4"><ShieldCheck className="h-5 w-5 text-steel" /><p className="mt-3 text-xs font-bold uppercase text-slate-500">Rol</p><p className="font-semibold uppercase text-slate-900">{user?.rol}</p></div>
          <div className="rounded-2xl bg-slate-50 p-4"><CalendarDays className="h-5 w-5 text-steel" /><p className="mt-3 text-xs font-bold uppercase text-slate-500">Alta</p><p className="font-semibold text-slate-900">{formatDate(user?.fecha_creacion)}</p></div>
        </div>
      </div>
      <div className="card p-6">
        <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-black text-slate-900">Editar datos</h2><p className="text-sm text-slate-500">Nombre y correo.</p></div>{!editing ? <button className="btn-primary" onClick={() => setEditing(true)}>Editar</button> : null}</div>
        {editing ? <DynamicForm fields={fields} initialData={user} loading={loading} submitLabel="Guardar cambios" onSubmit={submit} onCancel={() => setEditing(false)} /> : <p className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">Presiona editar para actualizar tu perfil.</p>}
      </div>
    </section>
  );
}
