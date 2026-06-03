import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AdminRoute from './routes/AdminRoute.jsx';
import LandingRoute from './routes/LandingRoute.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EntityPage from './pages/EntityPage.jsx';
import CitasPage from './pages/CitasPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { entityConfigs } from './utils/entityConfigs.js';

export default function App() {
  // Filter entity configs based on admin-only status
  const adminOnlyKeys = ['servicios', 'marcas', 'modelos', 'motores'];

  return (
    <Routes>
      {/* Landing route - decides between public and dashboard */}
      <Route path="/" element={<LandingRoute />} />

      {/* Public routes */}
      <Route path="/inicio" element={<HomePage />} />
      <Route path="/nuestros-servicios" element={<ServicesPage />} />
      <Route path="/contactanos" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected dashboard routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/citas" element={<CitasPage />} />
          {Object.values(entityConfigs).map((config) => {
            const isAdminOnly = adminOnlyKeys.includes(config.key);
            
            return (
              <Route
                key={config.key}
                path={config.path}
                element={isAdminOnly ? <AdminRoute><EntityPage config={config} /></AdminRoute> : <EntityPage config={config} />}
              />
            );
          })}
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
