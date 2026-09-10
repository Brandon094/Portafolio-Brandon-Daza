import { useEffect, useState } from 'react';
import { ref, update, increment, onValue } from 'firebase/database';
import { rtdb } from '../config/firebase';

export const useAnalytics = () => {
  const [stats, setStats] = useState<{ visits: number; projects: Record<string, number> }>({
    visits: 0,
    projects: {}
  });

  // Rastrear visita única por sesión (básico)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('v3_visited');
    if (!hasVisited) {
      const statsRef = ref(rtdb, 'analytics/global');
      update(statsRef, {
        totalVisits: increment(1)
      });
      sessionStorage.setItem('v3_visited', 'true');
    }

    // Escuchar cambios para el panel admin
    const globalStatsRef = ref(rtdb, 'analytics');
    const unsubscribe = onValue(globalStatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStats({
          visits: data.global?.totalVisits || 0,
          projects: data.projectViews || {}
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const trackProjectView = (projectId: string) => {
    const projectRef = ref(rtdb, `analytics/projectViews`);
    update(projectRef, {
      [projectId]: increment(1)
    });
  };

  return { stats, trackProjectView };
};
