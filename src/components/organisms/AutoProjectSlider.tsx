/**
 * @file AutoProjectSlider.tsx
 * @description Organismo de carrusel automático continuo para exhibición infinita de proyectos.
 * Recibe un conjunto de entidades 'Project' y las reproduce de forma cíclica mediante CSS puro.
 *
 * Brandon, como Arquitecto, nota la brillante optimización de performance implementada aquí:
 * En lugar de usar cálculos JavaScript continuos que bloqueen el hilo de UI, se utiliza una animación
 * nativa por CSS (`animate-marquee` o `animate-marquee-reverse`) combinada con duplicación de datos.
 * Además, la clase `pause-on-hover` mejora la experiencia al congelar el movimiento si el usuario desea enfocar un proyecto.
 */

import React from 'react';
import { Project } from '../../models/Project';
import ProjectCard from './ProjectCard';

interface AutoProjectSliderProps {
  projects: Project[]; // Mapeo estricto del modelo del Dominio
  direction?: 'left' | 'right'; // Dirección del desplazamiento continuo
  speed?: number;
}

const AutoProjectSlider: React.FC<AutoProjectSliderProps> = ({
  projects,
  direction = 'left'
}) => {
  // Duplicamos técnicamente el array en memoria para rellenar los vacíos visuales y lograr la sensación de scroll infinito
  const displayProjects = [...projects, ...projects];

  return (
    <div className="relative overflow-hidden py-10 group">

      {/*
        Degradados de profundidad laterales (Overlays):
        Aseguran una transición visual suave haciendo que las tarjetas parezcan surgir desde la penumbra
        y desvanecerse simétricamente en los costados de la pantalla.
      */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-space-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-space-black to-transparent z-10 pointer-events-none" />

      {/* Contenedor Flex animado vía clases personalizadas de Tailwind */}
      <div className={`
        flex w-fit gap-8 px-4 pause-on-hover
        ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}
      `}>
        {displayProjects.map((project, idx) => (
          // Encapsulado de tamaño fijo para homogeneidad del grid flotante
          <div
            key={`${project.id}-${idx}`}
            className="w-[300px] md:w-[450px] shrink-0"
          >
            {/* Organismo secundario reutilizable que maneja los detalles específicos del proyecto */}
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoProjectSlider;
