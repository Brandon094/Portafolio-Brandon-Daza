import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../config/firebase';
import { Project } from '../models/Project';

/**
 * Custom Hook: useProjects
 * Este es el "Cerebro" que gestiona los proyectos.
 * En React, un Hook es una función que permite "enganchar" lógica a los componentes.
 */
export const useProjects = () => {
  // useState: Crea una "caja de memoria" para guardar los proyectos.
  // Cuando actualizamos esta caja, la web se vuelve a dibujar sola.
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect: Se ejecuta cuando el componente "nace" (se monta).
  // Es perfecto para conectar cables con bases de datos externas.
  useEffect(() => {
    // ref: Creamos una referencia a la carpeta 'projects' en Firebase.
    const projectsRef = ref(rtdb, 'projects');

    // onValue: Crea una conexión "viva" (Websocket).
    // Si tú cambias algo en el admin, esta función se dispara sola en milisegundos.
    const unsubscribe = onValue(projectsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Firebase nos da un objeto { id1: {...}, id2: {...} }
          // Lo convertimos a un Array [ {...}, {...} ] para que sea fácil de recorrer (map).
          const projectsList = Object.keys(data).map(key => ({
            ...data[key],
            id: key
          })) as Project[];
          setProjects(projectsList);
        } else {
          setProjects([]);
        }
        setLoading(false); // Apagamos el cargador
      },
      (err) => {
        console.error("Error fetching from RTDB:", err);
        setError("Error al sincronizar con el mainframe");
        setLoading(false);
      }
    );

    // Clean-up: Cuando salimos de la página, cortamos la conexión para no gastar recursos.
    return () => unsubscribe();
  }, []);

  // Devolvemos los datos para que cualquier componente los use.
  return { projects, loading, error };
};
