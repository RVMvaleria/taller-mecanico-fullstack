import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, UserRound, UserPlus, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { validateEmail } from '../utils/validators.js';

export default function RegisterPage() {
  const { register: registerUser, isAuthenticated, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [values, setValues] = useState({ nombre: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (values.nombre.trim().length < 2) nextErrors.nombre = 'El nombre debe tener al menos 2 caracteres.';
    if (!validateEmail(values.email)) nextErrors.email = 'Ingresa un correo válido.';
    if (values.password.length < 6) nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (values.password !== values.confirm) nextErrors.confirm = 'Las contraseñas no coinciden.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      await registerUser({ nombre: values.nombre, email: values.email, password: values.password });
      showToast('Cuenta creada correctamente.', 'success');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy via-slate-900 to-steel p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-premium lg:grid-cols-[0.9fr_1fr]">
        <div className="hidden bg-navy p-10 text-white lg:block">
          <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-steel"><Wrench className="h-7 w-7" /></div><h1 className="text-xl font-black">Taller Pro</h1></div>
          <h2 className="mt-24 text-4xl font-black leading-tight">Crea una cuenta cliente y agenda servicios en minutos.</h2>
          <p className="mt-5 text-slate-300">El backend asigna automáticamente el rol cliente. El rol admin se crea desde el setup del servidor.</p>
        </div>
        <div className="p-8 lg:p-10">
          <div className="mb-8"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-steel"><UserPlus className="h-7 w-7" /></div><h2 className="mt-5 text-3xl font-black text-slate-900">Crear cuenta</h2><p className="mt-2 text-sm text-slate-500">Datos compatibles con /api/auth/register.</p></div>
          <form onSubmit={submit} className="space-y-5">
            <div><label className="label">Nombre</label><div className="relative mt-2"><UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-10" value={values.nombre} onChange={(e) => setValues({ ...values, nombre: e.target.value })} placeholder="Nombre completo" /></div>{errors.nombre ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.nombre}</p> : null}</div>
            <div><label className="label">Correo electrónico</label><div className="relative mt-2"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-10" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="correo@ejemplo.com" /></div>{errors.email ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p> : null}</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label">Contraseña</label><div className="relative mt-2"><input type={showPassword ? 'text' : 'password'} className="input pr-10" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} /><button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>{errors.password ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.password}</p> : null}</div>
              <div><label className="label">Confirmar</label><input type={showPassword ? 'text' : 'password'} className="input mt-2" value={values.confirm} onChange={(e) => setValues({ ...values, confirm: e.target.value })} />{errors.confirm ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.confirm}</p> : null}</div>
            </div>
            <button className="btn-primary w-full" disabled={loading}>{loading ? 'Creando...' : 'Registrar usuario'}</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">¿Ya tienes cuenta? <Link className="font-bold text-steel hover:underline" to="/login">Iniciar sesión</Link></p>
        </div>
      </div>
    </div>
  );
}
