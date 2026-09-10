import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/templates/MainLayout';
import ProjectCard from '../components/organisms/ProjectCard';
import Loader from '../components/atoms/Loader';
import Button from '../components/atoms/Button';
import { useProjects } from '../hooks/useProjects';

const ArchivePage: React.FC = () => {
  const { projects, loading, error } = useProjects();

  return (
    <MainLayout>
      <section className="pt-40 pb-20 bg-space-black">
        <div className="container mx-auto px-6">
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

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-cyber-orange text-center p-10 font-mono">{error}</div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
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
