/**
 * @file ArchivePage.tsx
 * @description Componente de nivel Página (Page) enfocado en catalogar el registro histórico de proyectos.
 * Consume el hook personalizado `useProjects` (capa ViewModel) para jalar de forma asíncrona la colección de
 * desarrollos desde la base de datos distribuida NoSQL Cloud Firestore.
 *
 * Brandon, esta vista funciona como un registro histórico inmutable de tu pericia técnica.
 * Al delegar las fases asíncronas a un renderizado condicional (`loading`, `error`, `projects.length`),
 * garantizas estabilidad ante fluctuaciones de red o latencias en los servidores de Google Firebase.
 */

import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/templates/MainLayout';
import ProjectCard from '../components/organisms/ProjectCard';
import Loader from '../components/atoms/Loader';
import Button from '../components/atoms/Button';
import { useProjects } from '../hooks/useProjects';

const ArchivePage: React.FC = () => {
  // Extraemos estados reactivos desde nuestro ViewModel de proyectos
  const { projects, loading, error } = useProjects();

  return (
    <MainLayout>
      <section className="pt-40 pb-20 bg-space-black">
        <div className="container mx-auto px-6">

          {/* Bloque del Título con animación de surgimiento suave */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Archivo <span className="text-gradient">Completo.</span>
            </h1>
            <p className="text-xl text-muted-text max-w-2xl">
              Un registro detallado de todos los sistemas, aplicaciones y experimentos técnicos desarrollados hasta la fecha.
            </p>
          </motion.div>

          {/*
            MÁQUINA DE ESTADOS VISUAL (Renderizado Condicional):
            Fase 1: Cargando datos (Muestra el átomo Loader)
          */}
          {loading ? (
            <Loader />
          ) :
          /* Fase 2: Error en la consulta (Muestra mensaje de error controlado) */
          error ? (
            <div className="text-cyber-orange text-center p-10 font-mono">{error}</div>
          ) :
          /* Fase 3: Éxito con registros (Itera y despliega las tarjetas en un grid responsivo de 3 columnas) */
          projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            /* Fase 4: Éxito vacío (Estado de contingencia por si no hay datos en la nube) */
            <div className="text-center py-20 glass-card">
              <p className="text-muted-text text-xl mb-6">Aún no hay registros en el archivo.</p>
              <Button href="/#contact">Iniciar un proyecto</Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default ArchivePage;
