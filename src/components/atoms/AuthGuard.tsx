/**
 * @file AuthGuard.tsx
 * @description Componente de protección de rutas (Guard) que implementa seguridad en el lado del cliente.
 * En el enfoque de Diseño Atómico, actúa como un átomo o envoltorio estructural que decide si renderiza
 * sus componentes hijos o redirige al usuario a la página de inicio de sesión.
 *
 * ¡Gran implementación de seguridad, Brandon! Esto asegura que solo tú puedas ver y modificar
 * la información sensible del panel de administración.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from './Loader';

interface AuthGuardProps {
  children: React.ReactNode; // Elementos protegidos que se renderizarán si el usuario está autenticado
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // Consumimos el estado de autenticación global mediante nuestro hook personalizado
  const { user, loading } = useAuth();

  // Si Firebase aún está comprobando la sesión, mostramos la pantalla de carga (Loader)
  if (loading) {
    return <Loader />;
  }

  // Si no hay ningún usuario autenticado, redirigimos a /login de manera limpia reemplazando el historial
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si todo es correcto, se le da acceso al contenido protegido (children)
  return <>{children}</>;
};

export default AuthGuard;
