/**
 * @file ProjectSlider.tsx
 * @description Organismo de carrusel manual optimizado para gestos táctiles (Swipe).
 * Facilita una navegación horizontal fluida de las tarjetas de proyectos mediante CSS nativo.
 *
 * Brandon, este componente prefiere las capacidades nativas del navegador (`snap-x`, `snap-mandatory`)
 * sobre librerías pesadas de terceros. Este enfoque de arquitectura limpia garantiza un rendimiento
 * de 60 FPS estables en dispositivos móviles de cualquier gama, minimizando la carga del hilo de ejecución.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../../models/Project';
import ProjectCard from './ProjectCard';

interface ProjectSliderProps {
  projects: Project[]; // Colección de proyectos del dominio
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects }) => {
  // Referencia para inspeccionar o controlar el contenedor de desbordamiento horizontal
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/*
        Contenedor con scroll horizontal táctil:
        - `snap-x snap-mandatory`: Fuerza a que el carrusel se "ajuste" magnéticamente al centro de cada tarjeta.
        - `no-scrollbar`: Oculta la barra de scroll clásica para no romper el minimalismo visual.
      */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-10 pt-4 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project) => (
          // Cada bloque calcula su ancho proporcional según el viewport (Móvil vs Escritorio)
          <div
            key={project.id}
            className="flex-none w-[85%] md:w-[45%] lg:w-[31%] snap-center"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Degradados laterales fijos de atenuación lumínica */}
      <div className="absolute left-0 top-0 bottom-10 w-20 bg-gradient-to-r from-space-black to-transparent pointer-events-none z-10 opacity-50" />
      <div className="absolute right-0 top-0 bottom-10 w-20 bg-gradient-to-l from-space-black to-transparent pointer-events-none z-10 opacity-50" />

      {/* Indicador Tipográfico de ayuda para móviles, animado de forma sutil */}
      <div className="flex justify-center mt-4 md:hidden">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] animate-pulse">
          ← Swipe to explore →
        </span>
      </div>
    </div>
  );
};

export default ProjectSlider;
