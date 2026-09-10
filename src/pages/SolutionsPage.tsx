import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Settings, ShoppingCart, Zap, BarChart3, ShieldCheck, ChevronRight } from 'lucide-react';
import MainLayout from '../components/templates/MainLayout';
import FadeInSection from '../components/atoms/FadeInSection';
import Button from '../components/atoms/Button';

const services = [
  {
    title: 'Software a Medida',
    desc: 'Arquitecturas escalables web y móviles diseñadas bajo estándares industriales de alto rendimiento.',
    icon: Code2,
    color: 'text-cyber-purple',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.2)]'
  },
  {
    title: 'Soporte Tech',
    desc: 'Mantenimiento predictivo y optimización de infraestructura para asegurar la continuidad de su negocio.',
    icon: Settings,
    color: 'text-cyber-cyan',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.2)]'
  },
  {
    title: 'Comercio Digital',
    desc: 'Integración de ecosistemas transaccionales optimizados para maximizar la conversión global.',
    icon: ShoppingCart,
    color: 'text-cyber-emerald',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]'
  }
];

const SolutionsPage: React.FC = () => {
  return (
    <MainLayout>
      {/* HERO SECTION - VIBRANT */}
      <section className="pt-48 pb-20 relative overflow-hidden bg-space-black">
        {/* Dynamic Background Auras */}
        <div className="absolute top-0 left-0 w-full h-full">
           <motion.div
             animate={{ scale: [1, 1.4, 1], x: [0, -30, 0], y: [0, 60, 0] }}
             transition={{ duration: 12, repeat: Infinity }}
             className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-cyber-purple/20 blur-[150px] rounded-full"
           />
           <motion.div
             animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -40, 0] }}
             transition={{ duration: 15, repeat: Infinity, delay: 1 }}
             className="absolute bottom-0 -left-[10%] w-[50%] h-[50%] bg-cyber-cyan/15 blur-[150px] rounded-full"
           />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-[10px] font-mono tracking-[0.4em] uppercase mb-10 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Zap className="w-3 h-3 fill-cyber-purple" /> ChopCode Solutions
            </div>
            <h1 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic leading-none text-white">
              Business <span className="text-gradient drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">Architecture.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light italic">
              "Fusionamos la excelencia en ingeniería de software con la visión estratégica necesaria para <span className="text-white font-medium">escalar activos digitales</span> en la era global."
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID - HIGH CONTRAST */}
      <FadeInSection className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="bg-white/[0.01] border border-white/5 p-12 flex flex-col items-center text-center group rounded-[3rem] hover:bg-white/[0.03] hover:border-cyber-purple/30 transition-all duration-700 relative overflow-hidden"
              >
                <div className={`p-6 bg-white/[0.03] rounded-3xl mb-8 ${service.color} opacity-50 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/5 ${service.glow}`}>
                  <service.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight leading-none group-hover:text-cyber-purple transition-colors">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-light italic">"{service.desc}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* VALUE PROP - VIBRANT */}
      <FadeInSection className="py-32 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-purple/5 blur-[120px] -z-10" />

        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">Por qué <span className="text-gradient">elegirnos.</span></h2>
              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, t: 'Calidad Senior', d: 'Arquitecturas validadas bajo estándares internacionales.', color: 'text-cyber-purple' },
                  { icon: Zap, t: 'Velocidad IA', d: 'Desarrollo optimizado por Inteligencia Artificial.', color: 'text-cyber-cyan' },
                  { icon: BarChart3, t: 'ROI Digital', d: 'Código diseñado como un activo financiero estratégico.', color: 'text-cyber-emerald' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className={`p-3 bg-white/5 rounded-xl ${item.color} opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all border border-white/5`}>
                      <item.icon className="w-5 h-5 shrink-0 transition-colors" />
                    </div>
                    <div>
                      <p className="text-white/90 font-bold text-base uppercase tracking-wider mb-1 group-hover:text-white transition-colors">{item.t}</p>
                      <p className="text-white/40 text-sm leading-relaxed font-light italic">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-12 rounded-[3rem] relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-purple/10 blur-[80px] -z-10" />
              <h3 className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] mb-8">// Nuestra Filosofía</h3>
              <p className="text-white/70 italic text-lg leading-relaxed font-light">
                "En <span className="text-white font-medium">ChopCode</span> no escribimos líneas de código; construimos los cimientos digitales sobre los cuales crecen los <span className="text-gradient font-bold">imperios del mañana.</span>"
              </p>
              <div className="mt-10 h-[1px] w-20 bg-gradient-to-r from-cyber-purple to-transparent" />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* FINAL CTA - VIBRANT GLOW */}
      <section className="py-48 text-center px-6 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-purple/10 blur-[150px] rounded-full -z-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-black mb-12 uppercase tracking-tighter italic text-white leading-none">
            Impulse su <span className="text-gradient">Visión.</span>
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block relative group"
          >
            <div className="absolute inset-0 bg-cyber-purple blur-3xl opacity-20 group-hover:opacity-50 transition-opacity rounded-full" />
            <button
              className="relative px-16 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] text-xs hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] transition-all"
              onClick={() => window.location.href = '/contact'}
            >
              Iniciar Proyecto <ChevronRight className="w-4 h-4 inline ml-2" />
            </button>
          </motion.div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default SolutionsPage;
