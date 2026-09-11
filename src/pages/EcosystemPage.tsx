/**
 * @file EcosystemPage.tsx
 * @description Componente de nivel Página (Page) enfocado en exponer el 'Ecosistema Go' (RutaGo, AgroGo, CargoGo).
 * Consolida la visión corporativa entrelazando múltiples bloques informativos estructurados en un grid responsivo.
 *
 * Brandon, como Líder y Fundador, esta página es el pilar maestro de tu portafolio empresarial.
 * Define la sinergia de tus productos de software aplicando una composición limpia de datos estructurados (`pillars`)
 * y animaciones cruzadas para guiar el flujo de lectura hacia tu llamado a la inversión final.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Navigation, Leaf, Zap, Database, Fingerprint, Cloud, Smartphone, ChevronRight } from 'lucide-react';
import MainLayout from '../components/templates/MainLayout';
import FadeInSection from '../components/atoms/FadeInSection';

// Arreglo de datos estructurados para renderizar declarativamente los pilares estratégicos de la empresa
const pillars = [
  {
    id: 'rutago',
    title: 'RutaGo',
    subtitle: 'Smart Mobility Engine',
    desc: 'Motor de reservas atómico con transacciones ACID. Digitalización integral del transporte intermunicipal.',
    icon: Navigation,
    color: 'text-cyber-purple',
    status: 'v1.1.6 Deployed'
  },
  {
    id: 'agrogo',
    title: 'AgroGo',
    subtitle: 'Agricultural ERP',
    desc: 'Administración total de fincas con estrategia Offline-First. Gestión de lotes GPS y trazabilidad del café.',
    icon: Leaf,
    color: 'text-cyber-cyan',
    status: 'Active Lab'
  },
  {
    id: 'cargago',
    title: 'CargoGo',
    subtitle: 'Logistics & Auction',
    desc: 'El puente operativo entre producción y movilidad. Sistema de subasta ciega para transporte de carga.',
    icon: Truck,
    color: 'text-cyber-emerald',
    status: 'Planning'
  }
];

const EcosystemPage: React.FC = () => {
  return (
    <MainLayout>
      {/* SECCIÓN HERO - INTRODUCCIÓN AL ECOSISTEMA */}
      <section className="pt-48 pb-20 relative overflow-hidden bg-space-black">
        {/* Auras dinámicas de iluminación con órbita continua */}
        <div className="absolute top-0 left-0 w-full h-full">
           <motion.div
             animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
             transition={{ duration: 10, repeat: Infinity }}
             className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyber-purple/20 blur-[150px] rounded-full"
           />
           <motion.div
             animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -50, 0] }}
             transition={{ duration: 15, repeat: Infinity, delay: 2 }}
             className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-cyber-cyan/15 blur-[150px] rounded-full"
           />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-[10px] font-mono tracking-[0.4em] uppercase mb-10 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <Zap className="w-3 h-3 fill-cyber-purple" /> Master Plan v1.9.10
            </div>
            <h1 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic leading-none text-white">
              Ecosistema <span className="text-gradient drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">Go.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light italic">
              "Ingeniería diseñada para orquestar la <span className="text-white font-medium">productividad rural y urbana</span> de la región bajo un mismo núcleo tecnológico."
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOQUE HORIZONTAL: CARACTERÍSTICAS DE LA ARQUITECTURA */}
      <FadeInSection className="py-12 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-center lg:flex-row gap-4 max-w-5xl mx-auto">
            {[
              { icon: Fingerprint, t: 'Identidad Única', d: 'Firebase SSO Core', color: 'text-cyber-purple' },
              { icon: Database, t: 'Data Híbrida', d: 'RTDB + Cloud Firestore', color: 'text-cyber-purple' },
              { icon: Cloud, t: 'Hub Central', d: '360° Ops Control', color: 'text-cyber-purple' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 md:flex-none lg:flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-2xl transition-all group flex items-center justify-center md:justify-start gap-4"
              >
                <item.icon className={`w-5 h-5 ${item.color} opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] transition-all`} />
                <div className="hidden md:block text-left">
                  <h3 className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none mb-1 group-hover:text-cyber-purple transition-colors">{item.t}</h3>
                  <p className="text-white/40 text-[8px] uppercase tracking-tighter">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* GRID DE PILARES DE NEGOCIO */}
      <FadeInSection className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-white/[0.01] border border-white/5 p-10 flex flex-col items-center text-center group rounded-[2.5rem] hover:bg-white/[0.03] hover:border-cyber-purple/30 transition-all duration-700"
              >
                <div className={`p-6 bg-white/[0.03] rounded-3xl mb-8 ${pillar.color} opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 border border-white/5 shadow-inner`}>
                  <pillar.icon className="w-10 h-10" />
                </div>
                <span className={`text-[9px] font-mono tracking-[0.5em] uppercase mb-3 ${pillar.color} opacity-60`}>{pillar.subtitle}</span>
                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">{pillar.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-10 flex-1 font-light italic">
                  "{pillar.desc}"
                </p>
                <div className={`px-5 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[8px] font-black uppercase tracking-[0.3em] ${pillar.color}`}>
                   {pillar.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* PIPELINE / HITOS DE DESARROLLO FUTURO */}
      <FadeInSection className="py-32 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-purple/5 blur-[100px] -z-10" />
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-16 uppercase tracking-widest text-white italic">Próximos <span className="text-gradient">Hitos.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
             {[
               { t: 'RutaGo In-Car', d: 'Módulo Android Auto v1.0', icon: Smartphone, color: 'text-cyber-cyan' },
               { icon: Zap, t: 'Ciclo Transaccional', d: 'Gateway de Recaudo PSE/Nequi', color: 'text-cyber-purple' }
             ].map((hilo, i) => (
               <div key={i} className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 flex gap-6 items-center hover:bg-white/[0.04] hover:border-cyber-purple/20 transition-all group">
                  <div className={`p-4 bg-white/5 rounded-2xl ${hilo.color} opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all`}>
                    <hilo.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black uppercase tracking-widest text-[11px] mb-1">{hilo.t}</p>
                    <p className="text-white/40 text-[10px] font-light italic">{hilo.d}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </FadeInSection>

      {/* ACCIÓN LLAMADO A LA INVERSIÓN (CTA) */}
      <section className="py-48 text-center px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-purple/10 blur-[120px] rounded-full -z-10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter italic text-white leading-none">
            Iniciativa <span className="text-gradient drop-shadow-[0_0_30px_rgba(139,92,246,0.2)]">Revolution.</span>
          </h2>
          <p className="text-lg text-white/60 mb-16 font-light max-w-xl mx-auto leading-relaxed">
            Unase al ecosistema que definirá el estándar tecnológico del Huila.
          </p>
          <button
            className="px-16 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] text-[11px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            onClick={() => window.location.href = '/contact'}
          >
            Hablemos de Inversión
          </button>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default EcosystemPage;
