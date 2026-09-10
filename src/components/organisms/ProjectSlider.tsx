import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../../models/Project';
import ProjectCard from './ProjectCard';

interface ProjectSliderProps {
  projects: Project[];
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Container with horizontal scroll and snap alignment */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-10 pt-4 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex-none w-[85%] md:w-[45%] lg:w-[31%] snap-center"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Visual Indicator of more content (Shadow gradients) */}
      <div className="absolute left-0 top-0 bottom-10 w-20 bg-gradient-to-r from-space-black to-transparent pointer-events-none z-10 opacity-50" />
      <div className="absolute right-0 top-0 bottom-10 w-20 bg-gradient-to-l from-space-black to-transparent pointer-events-none z-10 opacity-50" />

      {/* Scroll Tip */}
      <div className="flex justify-center mt-4 md:hidden">
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] animate-pulse">
          ← Swipe to explore →
        </span>
      </div>
    </div>
  );
};

export default ProjectSlider;
