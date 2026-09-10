import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Code2, ShieldCheck, Zap, Globe, Smartphone, Server, Activity, Search } from 'lucide-react';
import { Project } from '../../models/Project';
import Button from '../atoms/Button';

interface ProjectModalProps { project: Project | null; onClose: () => void; }

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  if (!project) return null;

  const getIcon = () => {
    const techs = project.technologies.join(' ').toLowerCase();
    if (techs.includes('android')) return <Smartphone className="w-8 h-8 text-cyber-purple" />;
    if (techs.includes('react')) return <Globe className="w-8 h-8 text-cyber-purple" />;
    if (techs.includes('flutter')) return <Cpu className="w-8 h-8 text-cyber-purple" />;
    return <Cpu className="w-8 h-8 text-cyber-purple" />;
  };

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-8 overflow-hidden">
        {/* OVERLAY SÓLIDO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#050505]/98 backdrop-blur-2xl"
          onClick={onClose}
        />

        {/* Modal Main Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl h-full md:h-auto max-h-[100vh] md:max-h-[90vh] bg-[#0A0A0A] border-y md:border border-white/10 md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row z-[10001] shadow-[0_0_150px_rgba(0,0,0,1)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* BOTÓN CERRAR MOBILE */}
          <button onClick={onClose} className="absolute top-6 right-6 z-[10005] p-3 bg-white/5 rounded-full border border-white/10 md:hidden"><X className="w-5 h-5 text-white/60" /></button>

          {/* VISUAL PANEL */}
          <div className="lg:w-[45%] h-64 lg:h-auto relative shrink-0 overflow-hidden bg-black flex items-center justify-center border-r border-white/5">
             <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover opacity-30" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent lg:bg-gradient-to-r" />

             {/* Indicators */}
             <div className="absolute bottom-8 left-8 hidden lg:block space-y-3">
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl p-3 rounded-2xl border border-white/5 shadow-2xl">
                   <Activity className="w-4 h-4 text-cyber-purple" />
                   <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">Live Environment</span>
                </div>
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl">
                   <Server className="w-4 h-4 text-cyber-cyan" />
                   <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">Protocol V4.5_CORE</span>
                </div>
             </div>
          </div>

          {/* CONTENT PANEL */}
          <div className="lg:w-[55%] p-8 md:p-16 overflow-y-auto no-scrollbar relative flex flex-col bg-[#0A0A0A]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-purple/[0.05] blur-[100px] pointer-events-none" />

            <header className="mb-12 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 w-fit">
                  {getIcon()}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-cyber-purple font-mono text-[9px] tracking-[0.5em] uppercase block mb-2 font-black">Audit Report</span>
                  <div className="overflow-hidden">
                    <h2 className="text-2xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-none whitespace-nowrap">
                      {project.title.split(' - ')[0]}
                    </h2>
                  </div>
                  {project.title.includes(' - ') && (
                    <div className="overflow-hidden mt-1 flex">
                      <div className="flex animate-marquee whitespace-nowrap pause-on-hover">
                        <h2 className="text-xl md:text-4xl font-black tracking-tighter text-gradient uppercase italic leading-none pr-10">
                          {project.title.split(' - ')[1]}
                        </h2>
                        <h2 className="text-xl md:text-4xl font-black tracking-tighter text-gradient uppercase italic leading-none pr-10">
                          {project.title.split(' - ')[1]}
                        </h2>
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={onClose} className="hidden md:flex p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group"><X className="w-5 h-5 text-white/20 group-hover:text-white" /></button>
              </div>

              {/* ICON-ONLY ACTION BUTTONS - VIBRANT & STEALTH */}
              <div className="flex gap-4 mb-10 border-b border-white/5 pb-10">
                {project.liveUrl && (
                  <Button
                    href={project.liveUrl}
                    variant="primary"
                    className="!p-5 shadow-neon-purple group transition-all"
                    title="Visitar Proyecto Live"
                  >
                    <Globe className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </Button>
                )}
                {project.playStoreUrl && (
                  <Button
                    href={project.playStoreUrl}
                    variant="secondary"
                    className="!p-5 group transition-all"
                    title="Descargar App"
                  >
                    <Smartphone className="w-6 h-6 text-cyber-cyan group-hover:scale-110 transition-transform" />
                  </Button>
                )}
              </div>
            </header>

            <div className="space-y-16 relative z-10">
              <section>
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  <Search className="w-4 h-4 text-cyber-purple" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Abstract Analysis</h3>
                </div>
                <p className="text-white/80 leading-relaxed text-lg font-light italic">
                  "{project.description}"
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-8 opacity-40">
                  <ShieldCheck className="w-4 h-4 text-cyber-purple" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Engineering Pillars</h3>
                </div>
                <div className="space-y-4">
                  {project.keyPoints.map((point, i) => (
                    <div key={i} className="flex gap-6 items-center p-6 rounded-[2rem] bg-black border border-white/5 hover:border-cyber-purple/30 transition-all group shadow-inner">
                      <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                        <Zap className="w-5 h-5 text-cyber-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                      </div>
                      <span className="text-sm md:text-base text-white/90 font-medium leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  <Code2 className="w-4 h-4 text-cyber-purple" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Core Technology Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-1.5 bg-black border border-white/5 rounded-lg text-[9px] font-mono text-cyber-purple font-black tracking-widest uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-cyber-emerald rounded-full animate-pulse shadow-[0_0_10px_#10B981]" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.4em]">Status: Verified Deployed</span>
               </div>
               <span className="text-[9px] font-mono uppercase tracking-[0.4em]">Audit_Ref: 0x{project.id.slice(0, 8).toUpperCase()}</span>
            </footer>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.getElementById('modal-root')!);
};

export default ProjectModal;
