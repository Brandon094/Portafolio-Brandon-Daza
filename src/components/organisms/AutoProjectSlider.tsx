import React from 'react';
import { Project } from '../../models/Project';
import ProjectCard from './ProjectCard';

interface AutoProjectSliderProps {
  projects: Project[];
  direction?: 'left' | 'right';
  speed?: number;
}

const AutoProjectSlider: React.FC<AutoProjectSliderProps> = ({
  projects,
  direction = 'left'
}) => {
  // Duplicamos el array para que el scroll parezca infinito
  const displayProjects = [...projects, ...projects];

  return (
    <div className="relative overflow-hidden py-10 group">
      {/* Degradados de profundidad laterales */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-space-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-space-black to-transparent z-10 pointer-events-none" />

      <div className={`
        flex w-fit gap-8 px-4 pause-on-hover
        ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}
      `}>
        {displayProjects.map((project, idx) => (
          <div
            key={`${project.id}-${idx}`}
            className="w-[300px] md:w-[450px] shrink-0"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoProjectSlider;
