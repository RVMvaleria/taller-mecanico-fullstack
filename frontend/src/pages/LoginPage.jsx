import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Mail, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { validateEmail } from '../utils/validators.js';

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) return <Navigate to={location.state?.from?.pathname || '/dashboard'} replace />;

  const submit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!validateEmail(values.email)) nextErrors.email = 'Ingresa un correo válido.';
    if (!values.password || values.password.length < 6) nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      await login({ email: values.email, password: values.password });
      showToast('Inicio de sesión correcto.', 'success');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_0.9fr]">
      <div className="hidden bg-navy p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <button onClick={() => navigate('/inicio')} className="flex items-center gap-3 hover:opacity-80 transition"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-steel"><Wrench className="h-7 w-7" /></div><div className="text-left"><p className="text-sm text-slate-300">Taller mecánico</p><h1 className="text-xl font-black">TM Premium</h1></div></button>
        <div><p className="text-sm font-black uppercase tracking-[0.3em] text-blue-200">   </p><h2 className="mt-5 max-w-xl text-5xl font-black leading-tight">Control profesional para clientes, servicios y citas.</h2><p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">   </p></div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-400">   </p>
          <button onClick={() => navigate('/inicio')} className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition font-medium">
            ← Volver
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-premium">
          <div className="mb-8 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white"><LockKeyhole className="h-7 w-7" /></div><h2 className="mt-5 text-3xl font-black text-slate-900">Iniciar sesión</h2><p className="mt-2 text-sm text-slate-500">Acceda con su cuenta.</p></div>
          <form onSubmit={submit} className="space-y-5">
            <div><label className="label">Correo electrónico</label><div className="relative mt-2"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-10" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="usuario@correo.com" /></div>{errors.email ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p> : null}</div>
            <div><label className="label">Contraseña</label><div className="relative mt-2"><input className="input pr-12" type={showPassword ? 'text' : 'password'} value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder="••••••••" /><button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-slate-100">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>{errors.password ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.password}</p> : null}</div>
            <label className="flex items-center gap-3 text-sm text-slate-600"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-steel" checked={values.remember} onChange={(e) => setValues({ ...values, remember: e.target.checked })} />Recordar sesión en este navegador</label>
            <button className="btn-primary w-full" disabled={loading}>{loading ? 'Validando...' : 'Entrar al sistema'}</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">¿No tienes cuenta? <Link className="font-bold text-steel hover:underline" to="/register">Crear cuenta</Link></p>
        </div>
      </div>
    </div>
  );
}
