/**
 * @file ProjectModal.tsx
 * @description Organismo de pantalla flotante (Modal) avanzado para auditoría detallada de proyectos.
 * Implementa el patrón estructural 'React Portal' mediante `createPortal`, proyectando el árbol visual
 * directamente sobre un nodo independiente en la raíz del documento HTML (`modal-root`). Esto evita
 * conflictos colaterales de apilamiento CSS (z-index) o recortes de desbordamiento (overflow) de componentes padres.
 *
 * Brandon, esta es una de las piezas más sofisticadas de la arquitectura del portafolio. Administra efectos
 * colaterales del DOM (bloqueo de scroll de fondo), carrusel interno con estados circulares y marquesina
 * sincronizada en textos extensos.
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Code2, ShieldCheck, Zap, Globe, Smartphone, Server, Activity, Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { Project } from '../../models/Project';
import Button from '../atoms/Button';

interface ProjectModalProps {
  project: Project | null; // Si es null, el modal se desmonta limpiamente sin ocupar espacio
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Estado local para indexar la imagen seleccionada dentro de la galería interna del proyecto
  const [currentImg, setCurrentImg] = useState(0);

  // useEffect para modular los efectos secundarios sobre el documento global al abrir/cerrar el modal
  useEffect(() => {
    if (project) {
      // Bloqueamos el scroll del sitio base para una experiencia inmersiva libre de saltos de fondo
      document.body.style.overflow = 'hidden';
      setCurrentImg(0); // Reiniciamos el carrusel de capturas
    } else {
      document.body.style.overflow = 'unset'; // Restablecemos el scroll nativo
    }
    // Función de limpieza o de desmontado (Cleanup) para asegurar que el scroll retorne a la normalidad en cualquier escenario
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  // Guardia de renderizado: Si no hay un proyecto asignado, no renderiza absolutamente nada
  if (!project) return null;

  // Lógica matemática circular para navegar las capturas del proyecto
  const nextImg = () => setCurrentImg((prev) => (prev + 1) % project.images.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);

  // Selector condicional para inyectar iconos según la naturaleza del software examinado
  const getIcon = () => {
    const techs = project.technologies.join(' ').toLowerCase();
    if (techs.includes('android')) return <Smartphone className="w-8 h-8 text-cyber-purple" />;
    if (techs.includes('react')) return <Globe className="w-8 h-8 text-cyber-purple" />;
    return <Cpu className="w-8 h-8 text-cyber-purple" />;
  };

  // Definición del nodo visual del modal para ser transportado por el Portal
  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-8 overflow-hidden">
        {/* Fondo oscuro traslúcido con desenfoque de fondo avanzado (backdrop-blur-2xl) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#050505]/98 backdrop-blur-2xl" onClick={onClose} />

        {/* Tarjeta Contenedora Principal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl h-full md:h-auto max-h-[100vh] md:max-h-[90vh] bg-[#0A0A0A] border-y md:border border-white/10 md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row z-[10001] shadow-[0_0_150px_rgba(0,0,0,1)]"
          onClick={(e) => e.stopPropagation()} // Detiene la propagación del clic para evitar que cierre el modal por accidente
        >
          {/* BOTÓN DE CIERRE EN DISPOSITIVOS MÓVILES */}
          <button onClick={onClose} className="absolute top-6 right-6 z-[10005] p-3 bg-white/5 rounded-full border border-white/10 md:hidden"><X className="w-5 h-5 text-white/60" /></button>

          {/* PANEL IZQUIERDO: GALERÍA DE CAPTURAS DE PANTALLA */}
          <div className="lg:w-1/2 h-[45vh] lg:h-auto relative shrink-0 overflow-hidden bg-[#050505] flex items-center justify-center border-r border-white/5 p-4 md:p-8">
             {/* Imagen reflejada al fondo con desenfoque extremo para generar un ambiente cinemático de iluminación (Glow ambient) */}
             <img src={project.images[currentImg]} className="absolute inset-0 w-full h-full object-cover opacity-10 blur-3xl scale-110" alt="bg-blur" />

             {/* Animación cross-fade al conmutar entre capturas de pantalla de la galería */}
             <AnimatePresence mode="wait">
               <motion.img
                 key={currentImg}
                 src={project.images[currentImg]}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.1 }}
                 transition={{ duration: 0.4 }}
                 className="relative z-10 max-w-full max-h-full object-contain rounded-xl shadow-2xl"
               />
             </AnimatePresence>

             {/* Controles de Navegación de Galería */}
             {project.images.length > 1 && (
               <>
                 <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between z-20">
                    <button onClick={prevImg} className="p-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-white hover:bg-cyber-purple hover:border-cyber-purple transition-all shadow-xl active:scale-90"><ChevronLeft className="w-6 h-6" /></button>
                    <button onClick={nextImg} className="p-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-white hover:bg-cyber-purple hover:border-cyber-purple transition-all shadow-xl active:scale-90"><ChevronRight className="w-6 h-6" /></button>
                 </div>
                 {/* Contador digital estilizado */}
                 <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 z-20 flex items-center gap-4 shadow-neon-purple">
                    <span className="text-[11px] font-mono text-cyber-purple font-black tracking-widest">{(currentImg + 1).toString().padStart(2, '0')}</span>
                    <div className="w-10 h-[1px] bg-white/10" />
                    <span className="text-[11px] font-mono text-white/20">{project.images.length.toString().padStart(2, '0')}</span>
                 </div>
               </>
             )}
          </div>

          {/* PANEL DERECHO: REPORTE DE AUDITORÍA TÉCNICA */}
          <div className="lg:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar relative flex flex-col bg-[#0A0A0A]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-purple/[0.05] blur-[100px] pointer-events-none" />

            <header className="mb-10 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 w-fit shrink-0">
                  {getIcon()}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-cyber-purple font-mono text-[9px] tracking-[0.5em] uppercase block mb-2 font-black">Audit Report</span>
                  <div className="overflow-hidden">
                    <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase italic leading-none whitespace-nowrap">
                      {project.title.split(' - ')[0]}
                    </h2>
                  </div>
                  {/* Si el título contiene un separador, implementa una marquesina automática para el subtítulo */}
                  {project.title.includes(' - ') && (
                    <div className="overflow-hidden mt-1 flex">
                      <div className="flex animate-marquee whitespace-nowrap pause-on-hover">
                        <h2 className="text-xl md:text-3xl font-black tracking-tighter text-gradient uppercase italic leading-none pr-10">
                          {project.title.split(' - ')[1]}
                        </h2>
                        <h2 className="text-xl md:text-3xl font-black tracking-tighter text-gradient uppercase italic leading-none pr-10">
                          {project.title.split(' - ')[1]}
                        </h2>
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={onClose} className="hidden md:flex p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group"><X className="w-5 h-5 text-white/20 group-hover:text-white" /></button>
              </div>

              {/* Botones de redirección directa a producción o tiendas de aplicaciones */}
              <div className="flex gap-4 mb-10 border-b border-white/5 pb-10">
                {project.liveUrl && <Button href={project.liveUrl} variant="primary" className="!p-5 shadow-neon-purple"><Globe className="w-5 h-5" /></Button>}
                {project.playStoreUrl && <Button href={project.playStoreUrl} variant="secondary" className="!p-5"><Smartphone className="w-5 h-5 text-cyber-cyan" /></Button>}
                <div className="flex-1" />
                <div className="flex flex-col justify-center text-right opacity-40">
                   <p className="text-[8px] font-mono text-white uppercase tracking-widest">Build Status</p>
                   <p className="text-[10px] font-black text-cyber-emerald uppercase">{project.status === 'in_progress' ? 'Active Lab' : 'Verified Stable'}</p>
                </div>
              </div>
            </header>

            {/* SECCIONES DESCRIPTIVAS EXHAUSTIVAS */}
            <div className="space-y-12 relative z-10">
              {/* Resumen ejecutivo */}
              <section>
                <div className="flex items-center gap-3 mb-4 opacity-40">
                  <Search className="w-3 h-3 text-cyber-purple" />
                  <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Abstract</h3>
                </div>
                <p className="text-white/80 leading-relaxed text-base font-light italic">"{project.description}"</p>
              </section>

              {/* Pilares de Ingeniería o hitos técnicos */}
              <section>
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  <ShieldCheck className="w-3 h-3 text-cyber-purple" />
                  <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Engineering Pillars</h3>
                </div>
                <div className="space-y-3">
                  {project.keyPoints.map((point, i) => (
                    <div key={i} className="flex gap-4 items-center p-5 rounded-[1.5rem] bg-black border border-white/5 hover:border-cyber-purple/30 transition-all group shadow-inner">
                      <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                        <Zap className="w-4 h-4 text-cyber-purple drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]" />
                      </div>
                      <span className="text-sm text-white/90 font-medium leading-tight">{point}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Ecosistema de tecnologías (Stack) */}
              <section>
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  <Code2 className="w-3 h-3 text-cyber-purple" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Core Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-1.5 bg-black border border-white/5 rounded-lg text-[9px] font-mono text-cyber-purple font-black tracking-widest uppercase">{tech}</span>
                  ))}
                </div>
              </section>
            </div>

            {/* Metadatos criptográficos simulados para reforzar la identidad digital */}
            <footer className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center text-white/20 relative z-10">
               <span className="text-[8px] font-mono uppercase tracking-[0.4em]">Audit_Ref: 0x{project.id.slice(0, 8).toUpperCase()}</span>
               <span className="text-[8px] font-mono uppercase tracking-[0.4em]">v6.5_PROD</span>
            </footer>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  // Inyección final mediante React Portals en el contenedor global
  return createPortal(modalContent, document.getElementById('modal-root')!);
};

export default ProjectModal;
