/**
 * @file AnimatedHero.tsx
 * @description Organismo que constituye la sección de bienvenida principal (Hero) con altas dosis de animación visual.
 * En la arquitectura de Diseño Atómico, es un Organismo porque unifica múltiples elementos estructurales,
 * texto fluido, componentes atómicos de acción (Buttons) y orquesta el fondo atmosférico Cyberpunk interactivo.
 *
 * Brandon, esta es la tarjeta de presentación técnica e intelectual más importante de tu portafolio.
 * El uso coordinado de delays en Framer Motion guía la atención del visitante secuencialmente desde tu rol técnico,
 * pasando por tu nombre, hasta el call-to-action final.
 */

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../atoms/Button';

const AnimatedHero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/*
        Abstract Background Elements:
        Capa dedicada a renderizar esferas de neón difusas (Blur) que orbitan e interactúan en el fondo.
        Esto crea profundidad espacial y una atmósfera inmersiva sin sobrecargar el hilo principal del navegador.
      */}
      <div className="absolute inset-0 z-0">
        {/* Esfera Neón Púrpura */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyber-purple/20 rounded-full blur-[120px]"
        />
        {/* Esfera Neón Cian */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-cyber-cyan/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Bloque 1: Badge de Rol Profesional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-white/20 rounded-full bg-white/5 backdrop-blur-sm text-cyber-cyan">
            Software Architect & Full-Stack Developer
          </span>
        </motion.div>

        {/* Bloque 2: Nombre Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          // delay: 0.2 hace que aparezca sutilmente después del badge de rol
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter"
        >
          Brandon <span className="text-gradient">Daza.</span>
        </motion.h1>

        {/* Bloque 3: Propuesta de Valor y Empresa */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-text max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Fundador de <span className="text-premium-white font-semibold">ChopCode Solutions</span>.
          Transformo ideas complejas en experiencias digitales fluidas y escalables.
        </motion.p>

        {/* Bloque 4: Botones de Acción Atómicos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="#projects" className="!bg-white !text-black !rounded-full !px-10 !py-4 text-lg">
            Explorar Proyectos
          </Button>
          <Button href="#contact" className="!bg-transparent !border !border-white/20 !text-white !rounded-full !px-10 !py-4 text-lg hover:!bg-white/5">
            Hablemos
          </Button>
        </motion.div>
      </div>

      {/*
        Scroll Indicator:
        Icono animado de mouse al fondo que indica al usuario de forma intuitiva que puede hacer scroll.
        Utiliza un rebote infinito en el eje Y (`y: [0, 10, 0]`).
      */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedHero;
