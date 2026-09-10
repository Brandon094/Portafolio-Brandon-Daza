import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Database, Monitor, Smartphone, Cpu, ChevronRight, Globe } from 'lucide-react';
import Button from '../atoms/Button';
import { useProjects } from '../../hooks/useProjects';

const ScrollStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { projects } = useProjects();

  const inProgressProjects = projects.filter(p => p.status === 'in_progress');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- TRANSFORMS ---
  const nameScale = useTransform(smoothProgress, [0, 0.25], [1, 35]);
  const nameOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const nameBlur = useTransform(smoothProgress, [0, 0.2], ["blur(0px)", "blur(12px)"]);

  const scene2Scale = useTransform(smoothProgress, [0.15, 0.3, 0.4, 0.5], [0.5, 1, 1, 15]);
  const scene2Opacity = useTransform(smoothProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  const scene2Blur = useTransform(smoothProgress, [0.15, 0.3, 0.4], ["blur(24px)", "blur(0px)", "blur(12px)"]);

  const scene3Scale = useTransform(smoothProgress, [0.4, 0.55, 0.65, 0.75], [0.5, 1, 1, 15]);
  const scene3Opacity = useTransform(smoothProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const scene3Y = useTransform(smoothProgress, [0.4, 0.55], [100, 0]);

  const scene4Scale = useTransform(smoothProgress, [0.65, 0.75, 0.85, 0.9], [0.5, 1, 1, 15]);
  const scene4Opacity = useTransform(smoothProgress, [0.65, 0.7, 0.85, 0.9], [0, 1, 1, 0]);

  const scene5Scale = useTransform(smoothProgress, [0.85, 0.95, 1], [0.8, 1, 1]);
  const scene5Opacity = useTransform(smoothProgress, [0.85, 0.92], [0, 1]);

  const bgGlow = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
      "radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 60%)",
      "radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.2) 0%, transparent 60%)",
      "radial-gradient(circle at 30% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 60%)",
      "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)"
    ]
  );

  return (
    <div ref={containerRef} className="relative h-[1200vh] bg-space-black font-sans overflow-clip">
      <motion.div
        style={{ background: bgGlow }}
        className="fixed inset-0 pointer-events-none z-0"
      />
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* ESCENA 1: BIENVENIDA */}
        <motion.div
          style={{ scale: nameScale, opacity: nameOpacity, filter: nameBlur }}
          className="absolute z-50 flex flex-col items-center pointer-events-none"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-cyber-purple font-mono text-[9px] md:text-[10px] tracking-[0.8em] mb-8 uppercase"
          >
            ChopCode Solutions presents
          </motion.span>
          <div className="flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="text-5xl sm:text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.75] text-white select-none text-center"
            >
              BRANDON<br/><span className="text-gradient drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">DAZA.</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }} className="mt-8 md:mt-12 flex flex-col items-center">
              <p className="text-white/60 text-sm md:text-xl font-light tracking-widest italic text-center px-6 max-w-md">"Software Architecture & Digital Visions"</p>
              <div className="h-[1px] w-12 bg-cyber-purple/20 my-8" />
              <p className="text-cyber-purple/40 font-mono text-[8px] tracking-[0.6em] uppercase animate-pulse">Scroll to initialize</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ESCENA 2: FASE 01 */}
        <motion.div style={{ scale: scene2Scale, opacity: scene2Opacity, filter: scene2Blur }} className="absolute max-w-4xl px-6 flex flex-col items-center text-center z-40 pointer-events-none">
          <div className="mb-10 p-5 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/20 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
            <Database className="w-10 h-10 text-cyber-purple" />
          </div>
          <span className="text-cyber-purple font-mono text-[9px] mb-4 tracking-[0.4em] uppercase">Phase 01: Foundations</span>
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tighter text-white uppercase italic">Donde todo <span className="text-gradient">cobró vida.</span></h2>
          <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light">Arquitecturas sólidas que transforman scripts en <span className="text-white/80">soluciones empresariales reales.</span></p>
        </motion.div>

        {/* ESCENA 3: FASE 02 */}
        <motion.div style={{ scale: scene3Scale, opacity: scene3Opacity, y: scene3Y }} className="absolute max-w-5xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-30 pointer-events-none">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-8 p-5 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/20 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
              <Monitor className="w-10 h-10 text-cyber-purple" />
            </div>
            <span className="text-cyber-purple font-mono text-[9px] mb-4 tracking-[0.4em] uppercase">Phase 02: Digital Mastery</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white uppercase italic">UX que <span className="text-gradient">cautiva.</span></h2>
            <p className="text-lg text-white/60 leading-relaxed font-light">Interfaces fluidas diseñadas bajo estándares <span className="text-white/80">WCAG & Performance.</span></p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/5 blur-3xl -z-10" />
             <Globe className="absolute -right-4 -bottom-4 w-32 h-32 text-cyber-purple/10" />
             <p className="text-sm md:text-lg text-white/60 font-light italic leading-relaxed relative z-10">"Optimización masiva y accesibilidad como pilares no negociables."</p>
          </div>
        </motion.div>

        {/* ESCENA 4: FASE 03 */}
        <motion.div style={{ scale: scene4Scale, opacity: scene4Opacity }} className="absolute max-w-5xl px-6 flex flex-col items-center text-center z-25 pointer-events-none">
          <div className="mb-10 flex gap-6">
            <div className="p-4 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]"><Smartphone className="w-10 h-10 text-cyber-purple" /></div>
            <div className="p-4 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/20 opacity-50"><Cpu className="w-10 h-10 text-cyber-purple" /></div>
          </div>
          <span className="text-cyber-purple font-mono text-[9px] mb-4 tracking-[0.4em] uppercase">Phase 03: Scale & Impact</span>
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter text-white uppercase italic">Sistemas que <span className="text-gradient">respiran.</span></h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light">Ecosistemas multiplataforma orquestados bajo arquitecturas <span className="text-white/80">Clean & MVVM.</span></p>
        </motion.div>

        {/* ESCENA 5: FASE 04 */}
        <motion.div
          style={{
            scale: scene5Scale,
            opacity: scene5Opacity,
            pointerEvents: useTransform(smoothProgress, [0.9, 1], ['none', 'auto'])
          }}
          className="absolute max-w-6xl px-6 flex flex-col items-center z-[100] w-full"
        >
          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 md:p-20 text-center backdrop-blur-md w-full relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyber-purple/40 to-transparent" />

            <div className="mb-10 flex justify-center items-center gap-4">
              <Cpu className="w-8 h-8 text-cyber-purple animate-pulse" />
              <span className="text-cyber-purple font-mono text-[9px] tracking-[0.5em] uppercase">Lab: Real-time Operations</span>
            </div>

            <h2 className="text-3xl md:text-6xl font-black mb-12 tracking-tighter uppercase italic text-white leading-none">Construyendo <span className="text-gradient">el futuro.</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-h-[350px] overflow-y-auto no-scrollbar px-2">
              {inProgressProjects.length > 0 ? inProgressProjects.map((p) => (
                <div key={p.id} className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl text-left hover:border-cyber-purple/30 transition-all">
                  <h4 className="text-white/90 font-bold text-base mb-1 uppercase tracking-tight">{p.title}</h4>
                  <p className="text-white/40 text-[11px] mb-5 line-clamp-2 font-light italic">"{p.description}"</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-mono text-cyber-purple uppercase tracking-widest">
                      <span>Status: active_build</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${p.progress}%` }} className="h-full bg-cyber-purple shadow-neon-purple" />
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 py-12 text-center border border-dashed border-white/5 rounded-3xl">
                  <p className="text-cyber-purple/40 text-xs font-mono tracking-widest uppercase italic">Sincronizando nuevos activos...</p>
                </div>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => navigate('/ecosystem')}
                variant="primary"
                className="!px-16 !py-6 !text-[11px] uppercase tracking-[0.4em] font-black"
              >
                Explorar Ecosistema <ChevronRight className="w-4 h-4 ml-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* HUD */}
        <div className="absolute left-10 bottom-10 flex flex-col gap-2 z-[60] opacity-40 hidden md:flex">
          <div className="flex items-center gap-4">
             <div className="w-10 h-[1px] bg-cyber-purple" />
             <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-cyber-purple">Status: Authorized</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-6 h-[1px] bg-white/20" />
             <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Root: Brandon Daza</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollStory;
