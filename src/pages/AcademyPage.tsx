/**
 * @file AcademyPage.tsx
 * @description Componente de nivel Página (Page) que da vida a la sección 'ChopCode Academy'.
 * Reúne la plantilla `MainLayout`, componentes atómicos y animaciones por scroll para diagramar la propuesta académica.
 *
 * Brandon, como Líder Estratégico, esta página proyecta tu visión de escalabilidad hacia la educación digital (EdTech).
 * Al incorporar de manera intencional un velo visual de "Sección en Desarrollo" (`Construction`, `Timer`), mantienes
 * informada a tu audiencia sobre lanzamientos futuros mientras resguardas la elegancia y simetría de la interfaz.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code2, Brain, Terminal, ChevronRight, Zap, PlayCircle, Star, Construction, Timer } from 'lucide-react';
import MainLayout from '../components/templates/MainLayout';
import FadeInSection from '../components/atoms/FadeInSection';
import Button from '../components/atoms/Button';

// Mock de datos para poblar de forma estática la estructura curricular de los cursos
const courses = [
  { id: 'py-01', title: 'Python Engine: De Cero a Industrial', lang: 'Python', level: 'Básico', icon: Terminal, color: 'text-yellow-500', desc: 'Domina el lenguaje más versátil para IA y Backend.' },
  { id: 'kt-01', title: 'Kotlin Native: Mobile Architecture', lang: 'Kotlin', level: 'Intermedio', icon: Code2, color: 'text-cyber-purple', desc: 'Construye apps nativas robustas para el ecosistema Android.' },
  { id: 'js-01', title: 'JavaScript Moderno: El Núcleo Web', lang: 'JavaScript', level: 'Intermedio', icon: PlayCircle, color: 'text-yellow-400', desc: 'Deep dive en ES6+, asincronía y el DOM.' },
  { id: 'lg-01', title: 'Lógica & Algoritmos: El ADN Senior', lang: 'Lógica', level: 'Avanzado', icon: Brain, color: 'text-cyber-cyan', desc: 'Resuelve desafíos complejos y optimiza tu pensamiento computacional.' },
];

const AcademyPage: React.FC = () => {
  return (
    <MainLayout>
      {/* SECCIÓN DE BIENVENIDA (HERO ACADÉMICO) */}
      <section className="pt-48 pb-20 relative overflow-hidden bg-space-black">
        {/* Aura de fondo radial para enfoque de luminosidad central */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-cyber-purple/10 to-transparent opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-center gap-6 mb-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-[9px] font-mono tracking-[0.4em] uppercase shadow-neon-purple">
                <BookOpen className="w-3 h-3 fill-cyber-purple" /> Knowledge Base v1.0
              </div>

              {/* BADGE DE AVISO DE CONSTRUCCIÓN ACTIVA */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-orange/10 border border-cyber-orange/20 text-cyber-orange text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                <Construction className="w-4 h-4" /> Sección en Desarrollo
              </div>
            </div>

            <h1 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic leading-none text-white">
              ChopCode <span className="text-gradient">Academy.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light italic">
              "Ingeniería del conocimiento diseñada para formar a la próxima generación de <span className="text-white font-medium">arquitectos de software.</span>"
            </p>
          </motion.div>
        </div>
      </section>

      {/* REPORTE GRID DE CURSOS DISPONIBLES EN LABORATORIO */}
      <FadeInSection className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto relative">

            {/*
              Overlay Flotante de Espera:
              Bloquea la interacción del grid y atenúa visualmente las tarjetas traseras
              mediante clases CSS (`opacity-40 grayscale`) para denotar el estado latente del módulo.
            */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
               <div className="bg-black/60 backdrop-blur-md border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-4 shadow-2xl scale-110">
                  <Timer className="w-6 h-6 text-cyber-purple animate-spin-slow" />
                  <span className="text-xs font-black text-white uppercase tracking-[0.3em]">Cargando Contenido Académico...</span>
               </div>
            </div>

            {/* Mapeo del catálogo modular */}
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[3rem] relative overflow-hidden opacity-40 grayscale"
              >
                <div className="flex items-start justify-between mb-10">
                   <div className={`p-4 bg-white/5 rounded-2xl border border-white/5 ${course.color}`}>
                      <course.icon className="w-8 h-8" />
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">{course.lang}</span>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold text-cyber-cyan uppercase tracking-widest">
                         <Star className="w-2 h-2 fill-cyber-cyan" /> {course.level}
                      </div>
                   </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter italic leading-none">{course.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-10 font-light italic">"{course.desc}"</p>

                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  Próximamente <Timer className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* SECCIÓN SECUNDARIA: LABORATORIO DE ALGORITMOS */}
      <FadeInSection className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase tracking-tighter italic text-white leading-none">
             Laboratorio de <span className="text-gradient">Algoritmos.</span>
           </h2>
           <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 p-10 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl group opacity-60">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-20" />
              <Terminal className="w-16 h-16 text-cyber-purple/20 mx-auto mb-10" />
              <p className="text-white/60 text-lg md:text-xl font-light italic leading-relaxed mb-12">
                "Una terminal interactiva para resolver desafíos de lógica real, optimizados para entrevistas técnicas de alto nivel."
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/20 text-[10px] font-mono tracking-widest uppercase">
                 <Construction className="w-3 h-3" /> Under Construction
              </div>
           </div>
        </div>
      </FadeInSection>

      {/* ACCIÓN ATÓMICA DE ENGAGEMENT */}
      <section className="py-48 text-center px-6">
        <Button href="/contact" variant="primary" className="!px-16 !py-6 !text-[11px] uppercase tracking-[0.4em] font-black shadow-neon-purple">
           Notificarme al Lanzamiento
        </Button>
      </section>
    </MainLayout>
  );
};

export default AcademyPage;
