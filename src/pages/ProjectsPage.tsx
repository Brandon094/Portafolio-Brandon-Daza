/**
 * @file ProjectsPage.tsx
 * @description Componente de nivel Página (Page) que despliega la Galería de Ingeniería Completa.
 * Consume `useProjects` para jalar los datos desde Firestore y divide algorítmicamente la colección
 * en dos subgrupos (`completedProjects` e `inProgressProjects`) basándose en el estado de desarrollo (`status`).
 *
 * Brandon, alimentar dos filas independientes de marquesinas automáticas (`AutoProjectSlider`) configuradas en
 * direcciones opuestas (`left` vs `right`) dota de un dinamismo cinemático espectacular al portafolio, emulando la
 * visualización fluida de los tableros de control avanzados de la industria de software.
 */

import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/templates/MainLayout';
import AutoProjectSlider from '../components/organisms/AutoProjectSlider';
import Loader from '../components/atoms/Loader';
import { useProjects } from '../hooks/useProjects';
import { Zap, Code2, ChevronRight, Database } from 'lucide-react';
import Button from '../components/atoms/Button';

const ProjectsPage: React.FC = () => {
  // Extraemos la colección e indicadores asíncronos desde el hook ViewModel centralizado
  const { projects, loading, error } = useProjects();

  // Filtrado computado en tiempo de ejecución para clasificar los despliegues de ingeniería
  const completedProjects = projects.filter(p => p.status === 'completed' || !p.status);
  const inProgressProjects = projects.filter(p => p.status === 'in_progress');

  return (
    <MainLayout>
      <section className="pt-48 pb-20 bg-space-black min-h-screen overflow-hidden relative">

        {/* Auras de neón ambientales en el fondo */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <motion.div
             animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
             transition={{ duration: 10, repeat: Infinity }}
             className="absolute top-[10%] -left-[10%] w-[70%] h-[70%] bg-cyber-purple/20 blur-[150px] rounded-full"
           />
           <motion.div
             animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
             transition={{ duration: 15, repeat: Infinity, delay: 2 }}
             className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-cyber-cyan/15 blur-[150px] rounded-full"
           />
        </div>

        {/* CONTENEDOR TÍTULO PRINCIPAL */}
        <div className="container mx-auto px-6 mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-[9px] font-mono tracking-[0.4em] uppercase mb-10 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
              <Code2 className="w-3 h-3 fill-cyber-purple" /> Technical Repositories
            </div>
            <h1 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic leading-none text-white">
              Galería de <span className="text-gradient drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">Ingeniería.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light italic">
              "Un ecosistema de soluciones robustas diseñadas para escalar procesos. Analice la arquitectura de cada despliegue."
            </p>
          </motion.div>
        </div>

        {/* RENDERING DE CONTROL DE ESTADOS */}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-cyber-orange text-center p-10 font-mono flex flex-col items-center gap-4">
             <Zap className="w-8 h-8 animate-bounce" />
             <p className="tracking-widest uppercase text-xs">Error de Sincronización: {error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="container mx-auto px-6 py-32 text-center relative z-10">
            <div className="bg-white/[0.02] border border-white/5 p-16 rounded-[3rem] backdrop-blur-md max-w-2xl mx-auto">
               <div className="p-5 bg-white/5 rounded-full w-fit mx-auto mb-8">
                  <Database className="w-10 h-10 text-white/10" />
               </div>
               <p className="text-white/40 text-lg mb-10 font-light italic">"El archivo de ingeniería está esperando la inyección de datos estratégicos."</p>
               <Button href="/admin" variant="primary" className="!px-10 !py-4 font-black uppercase tracking-widest text-[10px]">
                 Inicializar Mainframe
               </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-16 pb-32">

            {/* FILA 01: DESPLIEGUES ESTABLES COMPLETADOS (Marquesina hacia la izquierda) */}
            {completedProjects.length > 0 && (
              <div className="relative group/row">
                <div className="container mx-auto px-6 mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-cyber-purple/10 rounded-lg border border-cyber-purple/20">
                      <Zap className="w-4 h-4 text-cyber-purple" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover/row:text-white transition-colors">Stable Deployments</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-8" />
                </div>
                <AutoProjectSlider projects={completedProjects} direction="left" />
              </div>
            )}

            {/* FILA 02: OPERACIONES ACTIVAS EN LABORATORIO (Marquesina hacia la derecha) */}
            {inProgressProjects.length > 0 && (
              <div className="relative group/row pt-10">
                <div className="container mx-auto px-6 mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-cyber-cyan/10 rounded-lg border border-cyber-cyan/20">
                      <Code2 className="w-4 h-4 text-cyber-cyan animate-pulse" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover/row:text-white transition-colors">Active Lab Operations</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-8" />
                </div>
                <AutoProjectSlider projects={inProgressProjects} direction="right" />
              </div>
            )}

          </div>
        )}

        {/* PIE DECORATIVO SIMULADO */}
        <div className="container mx-auto px-6 pt-20 text-center opacity-20 relative z-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />
          <p className="text-white/40 font-mono text-[9px] uppercase tracking-[0.6em] mb-4 italic">
            [ Fin de la Transmisión - ChopCode Engine v4.5 ]
          </p>
          <div className="flex justify-center gap-4">
             <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
             <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-75" />
             <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-150" />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProjectsPage;
