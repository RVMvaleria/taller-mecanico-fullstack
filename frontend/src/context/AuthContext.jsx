import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { authService } from '../services/authService.js';
import { normalizeError } from '../utils/formatters.js';

const AuthContext = createContext(null);

function normalizeUser(payload) {
  if (!payload) return null;
  return payload.user || payload.usuario || payload.data || payload;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const [loading, setLoading] = useState(false);
  const authVersion = useRef(0);

  const loadProfile = useCallback(async () => {
    const requestVersion = authVersion.current;
    //console.log('[AuthContext] Loading profile...');
    try {
      const profile = await authService.me();
      if (requestVersion !== authVersion.current) return normalizeUser(profile);
      const nextUser = normalizeUser(profile);
      //console.log('[AuthContext] Profile loaded, user:', nextUser);
      setUser(nextUser);
      return nextUser;
    } catch (_error) {
      //console.log('[AuthContext] Profile load failed (expected if no session):', _error.message);
      if (requestVersion === authVersion.current) setUser(null);
      return null;
    } finally {
      if (requestVersion === authVersion.current) {
        //console.log('[AuthContext] Setting booting to false');
        setBooting(false);
      }
    }
  }, []);

  useEffect(() => {
    loadProfile();
    const onExpired = () => {
      authVersion.current += 1;
      setUser(null);
      setBooting(false);
    };
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, [loadProfile]);

  const login = useCallback(async (payload) => {
    setLoading(true);
    authVersion.current += 1;
    try {
      const data = await authService.login(payload);
      const nextUser = normalizeUser(data);
      setUser(nextUser);
      setBooting(false);
      localStorage.setItem('taller_session_hint', 'true');
      return nextUser;
    } catch (error) {
      setUser(null);
      setBooting(false);
      throw new Error(normalizeError(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    authVersion.current += 1;
    try {
      const data = await authService.register(payload);
      const nextUser = normalizeUser(data);
      setUser(nextUser);
      setBooting(false);
      localStorage.setItem('taller_session_hint', 'true');
      return nextUser;
    } catch (error) {
      setUser(null);
      setBooting(false);
      throw new Error(normalizeError(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      authVersion.current += 1;
      setUser(null);
      setBooting(false);
      localStorage.removeItem('taller_session_hint');
    }
  }, []);

  const updateProfile = useCallback(async (payload) => {
    setLoading(true);
    try {
      const data = await authService.updateMe(payload);
      const nextUser = normalizeUser(data);
      setUser(nextUser);
      return nextUser;
    } catch (error) {
      throw new Error(normalizeError(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    user,
    booting,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.rol === 'admin',
    login,
    register,
    logout,
    updateProfile,
    refreshProfile: loadProfile
  }), [user, booting, loading, login, register, logout, updateProfile, loadProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
