/**
 * @file useAuth.ts
 * @description Hook especializado en la gestión del estado de autenticación de Firebase.
 * Actúa como un puente entre el servicio de Firebase Auth y la interfaz de usuario,
 * centralizando la lógica para detectar si el usuario (Brandon) ha iniciado sesión como administrador.
 *
 * Este es un componente clave para la seguridad del portafolio, Brandon.
 * Permite proteger las rutas de administración de forma transparente y eficiente.
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = () => {
  // Almacena la información del usuario autenticado (null si no hay sesión activa)
  const [user, setUser] = useState<User | null>(null);

  // Flag de carga para manejar el estado de espera mientras Firebase verifica el token de sesión
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged: Listener que se dispara automáticamente cuando hay cambios en el login o logout
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Actualizamos el estado con el usuario (o null)
      setLoading(false); // La comprobación ha finalizado
    });

    // Función de limpieza para cancelar la escucha cuando el hook ya no esté en uso
    return () => unsubscribe();
  }, []);

  // Retornamos el usuario y el estado de carga para ser usados por componentes como 'AuthGuard'
  return { user, loading };
};
