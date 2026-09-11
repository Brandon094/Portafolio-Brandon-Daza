/**
 * @file ProjectCard.tsx
 * @description Organismo que da forma a la tarjeta contenedora e interactiva de cada Proyecto.
 * Sigue fielmente la arquitectura de Diseño Atómico. Se comunica con el hook `useAnalytics` para registrar
 * visualizaciones técnicas y despliega un `ProjectModal` detallado al activarse mediante un clic.
 *
 * Brandon, las micro-interacciones visuales de esta tarjeta (como el efecto escáner CSS y el medidor de progreso
 * animado por Framer Motion) transmiten de forma inmediata al usuario que está interactuando con software
 * de vanguardia tecnológica bien estructurado.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu, Smartphone, Globe, Layers, Activity } from 'lucide-react';
import { Project } from '../../models/Project';
import Button from '../atoms/Button';
import ProjectModal from './ProjectModal';
import { useAnalytics } from '../../hooks/useAnalytics';

interface ProjectCardProps {
  project: Project; // Recibe de manera acoplada y segura una instancia del modelo 'Project'
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Consumimos el método de trazado de analíticas del ViewModel global
  const { trackProjectView } = useAnalytics();
  // Estado local para abrir o cerrar de manera aislada el modal de auditoría técnica
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Registra el evento en Firebase e inicia el despliegue gráfico del modal
  const handleDetailsClick = () => {
    trackProjectView(project.id);
    setIsModalOpen(true);
  };

  // Función utilitaria estática para seleccionar dinámicamente un icono según el stack registrado
  const getIcon = () => {
    const techs = project.technologies.join(' ').toLowerCase();
    if (techs.includes('android') || techs.includes('kotlin')) return <Smartphone className="w-5 h-5" />;
    if (techs.includes('react') || techs.includes('html')) return <Globe className="w-5 h-5" />;
    if (techs.includes('flutter')) return <Layers className="w-5 h-5" />;
    return <Cpu className="w-5 h-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} // Se anima únicamente la primera vez que entra en pantalla para optimizar scrolls
      whileHover={{ y: -10 }} // Efecto de flotado sofisticado al posarse sobre él
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass-card overflow-hidden flex flex-col h-full hover:border-cyber-purple/40 hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)] transition-all duration-500"
    >
      {/* SECCIÓN SUPERIOR: PREVIEW GRÁFICO */}
      <div className="relative h-64 overflow-hidden bg-black shrink-0">
        <img
          src={project.featureGraphic || project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
        />

        {/*
          CSS SCANNER EFFECT:
          Inyección de una línea horizontal brillante autolocalizada que recorre la imagen
          mediante una animación de fotogramas clave (Keyframes) gatillada por el hover grupal.
        */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="absolute top-0 left-0 w-full h-1 bg-cyber-purple/30 shadow-[0_0_20px_#8B5CF6] animate-scan" />
        </div>

        <div className="absolute top-4 left-4 p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-cyber-purple z-20 group-hover:text-cyber-cyan transition-all">
          {getIcon()}
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-full border border-white/5 z-20 backdrop-blur-md">
           <Activity className="w-3 h-3 text-cyber-emerald animate-pulse" />
           <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Functional analysis active</span>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: DETALLES TEXTUALES */}
      <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10">
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4 gap-4 h-14">
            <h3 className="text-xl font-bold text-white group-hover:text-cyber-purple transition-colors leading-tight tracking-tight uppercase italic line-clamp-2">
              {project.title}
            </h3>
            {/* Render condicional: Si el proyecto sigue activo en laboratorio, muestra un ping interactivo */}
            {project.status === 'in_progress' && (
              <span className="flex items-center gap-1.5 text-[8px] bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/40 px-3 py-1 rounded-full uppercase font-black tracking-widest shrink-0 shadow-neon-purple">
                <span className="w-1 h-1 bg-cyber-purple rounded-full animate-ping" />
                Live build
              </span>
            )}
          </div>
          <div className="h-20 mb-4">
            {/* line-clamp-3 limita los textos excesivos resguardando la homogeneidad del grid */}
            <p className="text-white/50 text-[13px] md:text-sm leading-relaxed line-clamp-3 font-light italic">
              "{project.description}"
            </p>
          </div>
        </div>

        {/* SECCIÓN DE PROGRESO / ESTADO ESTABLE */}
        <div className="mb-6 h-24">
          {project.status === 'in_progress' ? (
            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5 h-full flex flex-col justify-center">
              <div className="flex justify-between text-[9px] font-mono text-cyber-purple uppercase tracking-[0.4em] font-bold">
                <span>Syncing Core</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                {/* Relleno fluido sincronizado con la visibilidad del elemento */}
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${project.progress}%` }} className="h-full bg-gradient-to-r from-cyber-purple to-cyber-cyan shadow-neon-purple" />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border border-dashed border-white/5 rounded-2xl opacity-20">
               <span className="text-[8px] font-mono uppercase tracking-widest">Verified_Stable_Deployment</span>
            </div>
          )}
        </div>

        {/* ACCIONES Y METADATOS FINALES */}
        <div className="mt-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {project.liveUrl && <div className="w-2 h-2 rounded-full bg-cyber-purple shadow-neon-purple animate-pulse" />}
              {project.playStoreUrl && <div className="w-2 h-2 rounded-full bg-cyber-cyan shadow-neon-cyan animate-pulse" />}
            </div>
            <div className="flex flex-wrap gap-2 justify-end items-center">
              {project.technologies.slice(0, 2).map((tech, i) => (
                <span key={i} className="text-[8px] font-mono text-white/30 uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Button
            onClick={handleDetailsClick}
            variant="primary"
            className="w-full !py-4 !text-[10px] font-black uppercase tracking-[0.4em] shadow-xl"
          >
            Análisis Técnico
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* MODAL AUDITOR: Renderizado de forma inteligente mediante React Portals */}
      <ProjectModal
        project={isModalOpen ? project : null}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default ProjectCard;
