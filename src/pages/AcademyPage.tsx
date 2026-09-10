import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code2, Brain, Terminal, ChevronRight, Zap, PlayCircle, Star } from 'lucide-react';
import MainLayout from '../components/templates/MainLayout';
import FadeInSection from '../components/atoms/FadeInSection';
import Button from '../components/atoms/Button';

const courses = [
  { id: 'py-01', title: 'Python Engine: De Cero a Industrial', lang: 'Python', level: 'Básico', icon: Terminal, color: 'text-yellow-500', desc: 'Domina el lenguaje más versátil para IA y Backend.' },
  { id: 'kt-01', title: 'Kotlin Native: Mobile Architecture', lang: 'Kotlin', level: 'Intermedio', icon: Code2, color: 'text-cyber-purple', desc: 'Construye apps nativas robustas para el ecosistema Android.' },
  { id: 'js-01', title: 'JavaScript Moderno: El Núcleo Web', lang: 'JavaScript', level: 'Intermedio', icon: PlayCircle, color: 'text-yellow-400', desc: 'Deep dive en ES6+, asincronía y el DOM.' },
  { id: 'lg-01', title: 'Lógica & Algoritmos: El ADN Senior', lang: 'Lógica', level: 'Avanzado', icon: Brain, color: 'text-cyber-cyan', desc: 'Resuelve desafíos complejos y optimiza tu pensamiento computacional.' },
];

const AcademyPage: React.FC = () => {
  return (
    <MainLayout>
      <section className="pt-48 pb-20 relative overflow-hidden bg-space-black">
        {/* Dynamic Aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-cyber-purple/10 to-transparent opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-[9px] font-mono tracking-[0.4em] uppercase mb-10 shadow-neon-purple">
              <BookOpen className="w-3 h-3 fill-cyber-purple" /> Knowledge Base v1.0
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

      {/* CURSOS GRID */}
      <FadeInSection className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -5 }}
                className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[3rem] group hover:bg-white/[0.04] hover:border-cyber-purple/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/5 blur-3xl -z-10 group-hover:bg-cyber-purple/10 transition-colors" />

                <div className="flex items-start justify-between mb-10">
                   <div className={`p-4 bg-white/5 rounded-2xl border border-white/5 ${course.color} group-hover:scale-110 transition-transform`}>
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

                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-cyber-purple transition-all">
                  Iniciar Protocolo <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* CHALLENGES SECTION */}
      <FadeInSection className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase tracking-tighter italic text-white leading-none">
             Laboratorio de <span className="text-gradient">Algoritmos.</span>
           </h2>
           <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 p-10 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-20" />
              <Terminal className="w-16 h-16 text-cyber-purple/20 mx-auto mb-10 group-hover:scale-110 transition-transform" />
              <p className="text-white/60 text-lg md:text-xl font-light italic leading-relaxed mb-12">
                "Próximamente: Una terminal interactiva para resolver desafíos de lógica real, optimizados para entrevistas técnicas de alto nivel."
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-[10px] font-mono tracking-widest uppercase">
                 <Zap className="w-3 h-3 fill-cyber-purple" /> Active R&D Protocol
              </div>
           </div>
        </div>
      </FadeInSection>

      <section className="py-48 text-center px-6">
        <Button href="/contact" variant="primary" className="!px-16 !py-6 !text-[11px] uppercase tracking-[0.4em] font-black">
           Solicitar Mentoría 1-to-1
        </Button>
      </section>
    </MainLayout>
  );
};

export default AcademyPage;
