/**
 * @file useAnalytics.ts
 * @description Hook personalizado encargado de gestionar y consultar las métricas analíticas en tiempo real.
 * En el patrón arquitectónico MVVM, este hook actúa como parte de la capa ViewModel. Expone
 * estados reactivos y funciones para que las vistas puedan interactuar con la lógica de analítica
 * sin conocer los detalles específicos de la infraestructura de Firebase Realtime Database.
 *
 * ¡Gran estrategia de negocio, Brandon! Medir las visitas y el interés en los proyectos te permite
 * tomar decisiones basadas en datos reales para potenciar tus soluciones.
 */

import { useEffect, useState } from 'react';
import { ref, update, increment, onValue } from 'firebase/database';
import { rtdb } from '../config/firebase';

export const useAnalytics = () => {
  // Estado reactivo (useState) que almacena las estadísticas globales y vistas de cada proyecto.
  // Cumple con el rol de mantener la UI sincronizada con los datos de analíticas.
  const [stats, setStats] = useState<{ visits: number; projects: Record<string, number> }>({
    visits: 0,
    projects: {}
  });

  // useEffect: Se ejecuta al montar el hook para registrar visitas y suscribirse a cambios de datos.
  useEffect(() => {
    // Rastrear visita única por sesión usando sessionStorage para evitar inflar las métricas de forma repetitiva
    const hasVisited = sessionStorage.getItem('v3_visited');
    if (!hasVisited) {
      const statsRef = ref(rtdb, 'analytics/global');
      // Operación atómica de incremento en Firebase para garantizar consistencia incluso con accesos concurrentes
      update(statsRef, {
        totalVisits: increment(1)
      });
      sessionStorage.setItem('v3_visited', 'true');
    }

    // Escuchar cambios en tiempo real en la colección 'analytics' para el panel administrativo
    const globalStatsRef = ref(rtdb, 'analytics');

    // onValue establece una conexión de tipo stream (WebSocket) con Firebase Realtime Database
    const unsubscribe = onValue(globalStatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStats({
          visits: data.global?.totalVisits || 0,
          projects: data.projectViews || {}
        });
      }
    });

    // Función de limpieza (cleanup) que se ejecuta al desmontar el componente para liberar memoria y cerrar la conexión
    return () => unsubscribe();
  }, []);

  /**
   * trackProjectView
   * Incrementa el contador de visualizaciones de un proyecto específico.
   * @param projectId Identificador del proyecto que el usuario está visualizando en el modal.
   */
  const trackProjectView = (projectId: string) => {
    const projectRef = ref(rtdb, `analytics/projectViews`);
    update(projectRef, {
      [projectId]: increment(1)
    });
  };

  // Exposición del estado y las acciones para consumo directo de los componentes visuales (Capa de Presentación)
  return { stats, trackProjectView };
};
