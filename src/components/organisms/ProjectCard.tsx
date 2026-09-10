import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Code2, Cpu, Smartphone, Globe, Layers, ExternalLink, Play } from 'lucide-react';
import { Project } from '../../models/Project';
import Button from '../atoms/Button';
import ProjectModal from './ProjectModal';
import { useCarousel } from '../../hooks/useCarousel';
import { useAnalytics } from '../../hooks/useAnalytics';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { currentIndex, next, prev } = useCarousel(project.images.length);
  const { trackProjectView } = useAnalytics();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = () => {
    trackProjectView(project.id);
    setIsModalOpen(true);
  };

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
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass-card overflow-hidden flex flex-col h-full hover:border-cyber-purple/40 hover:shadow-[0_20px_50px_rgba(139,92,246,0.1)] transition-all duration-500"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Image Engine */}
      <div className="relative h-64 overflow-hidden bg-black">
        <motion.div
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="flex h-full"
        >
          {project.images.map((img, i) => (
            <img key={i} src={img} alt={project.title} className="w-full h-full object-cover flex-shrink-0 opacity-50 group-hover:opacity-80 transition-all duration-1000" />
          ))}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prev} className="p-2 bg-black/50 rounded-full text-white backdrop-blur-md hover:bg-cyber-purple transition-all">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <button onClick={next} className="p-2 bg-black/50 rounded-full text-white backdrop-blur-md hover:bg-cyber-purple transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-4 left-4 p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-cyber-purple group-hover:text-cyber-cyan group-hover:shadow-neon-purple transition-all">
          {getIcon()}
        </div>
      </div>

      <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10">
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4 gap-4 h-14">
            <h3 className="text-xl font-bold text-white group-hover:text-cyber-purple transition-colors leading-tight tracking-tight uppercase italic line-clamp-2">
              {project.title}
            </h3>
            {project.status === 'in_progress' && (
              <span className="flex items-center gap-1.5 text-[7px] bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/40 px-3 py-1 rounded-full uppercase font-black tracking-widest shrink-0 shadow-neon-purple">
                <span className="w-1 h-1 bg-cyber-purple rounded-full animate-ping" />
                Live build
              </span>
            )}
          </div>
          <div className="h-20 mb-4">
            <p className="text-white/50 text-[13px] md:text-sm leading-relaxed line-clamp-3 font-light">
              {project.description}
            </p>
          </div>
        </div>

        {project.status === 'in_progress' && project.progress !== undefined ? (
          <div className="mb-6 space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5 h-24">
            <div className="flex justify-between text-[9px] font-mono text-cyber-purple uppercase tracking-[0.4em] font-bold">
              <span>Syncing Core</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                className="h-full bg-gradient-to-r from-cyber-purple to-cyber-cyan shadow-neon-purple"
              />
            </div>
          </div>
        ) : (
          <div className="mb-6 h-24 flex items-center justify-center border border-dashed border-white/5 rounded-2xl opacity-20">
             <span className="text-[8px] font-mono uppercase tracking-widest">Protocol: Verified Stable</span>
          </div>
        )}

        <div className="mt-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-cyber-purple/10 border border-cyber-purple/20 rounded-xl flex items-center justify-center text-cyber-purple hover:bg-cyber-purple hover:text-white hover:shadow-neon-purple transition-all"
                  title="Visitar Web"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-xl flex items-center justify-center text-cyber-cyan hover:bg-cyber-cyan hover:text-black hover:shadow-neon-cyan transition-all"
                  title="Ver en Play Store"
                >
                  <Smartphone className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-end max-w-[150px] h-10 overflow-hidden items-center">
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
            className="w-full !py-4 !text-[10px] uppercase tracking-[0.4em] font-black shadow-xl"
          >
            Análisis Técnico
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <ProjectModal
        project={isModalOpen ? project : null}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default ProjectCard;
