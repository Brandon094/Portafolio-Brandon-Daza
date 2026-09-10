import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../config/firebase';
import { Project } from '../models/Project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Apuntamos al nodo 'projects' en la Realtime Database
    const projectsRef = ref(rtdb, 'projects');

    const unsubscribe = onValue(projectsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convertimos el objeto JSON de RTDB a un array compatible con nuestra UI
          const projectsList = Object.keys(data).map(key => ({
            ...data[key],
            id: key
          })) as Project[];
          setProjects(projectsList);
        } else {
          setProjects([]);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching from RTDB:", err);
        setError("Error al sincronizar con el mainframe");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { projects, loading, error };
};
