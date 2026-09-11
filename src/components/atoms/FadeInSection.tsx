/**
 * @file FadeInSection.tsx
 * @description Átomo estructural que implementa animaciones fluidas basadas en el scroll del usuario.
 * Utiliza Framer Motion combinando 'useScroll' y 'useTransform' para crear efectos cinemáticos de opacidad y escala.
 *
 * ¡Brillante uso de animaciones basadas en scroll, Brandon! Esto eleva el engagement visual de la aplicación,
 * brindando una experiencia premium de navegación en tu portafolio.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = '', id }) => {
  // Referencia al elemento del DOM para calcular su posición relativa en la pantalla
  const containerRef = useRef<HTMLElement>(null);

  // useScroll: Hook avanzado de Framer Motion que rastrea el progreso del scroll de esta sección específica.
  // "start end" significa cuando el inicio de la sección entra por el fondo de la pantalla.
  // "end start" significa cuando el final de la sección sale por la parte superior de la pantalla.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // useTransform: Mapea el progreso del scroll (de 0 a 1) a valores específicos de opacidad y escala.
  // La opacidad sube al entrar (0 -> 0.2), se mantiene al 100% en el centro (0.2 -> 0.8), y baja al salir (0.8 -> 1)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // El escalado da profundidad tridimensional (95% al entrar/salir, 100% perfecto en el centro del viewport)
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      id={id}
      ref={containerRef}
      style={{ opacity, scale }}
      // 'will-change-transform' le avisa al navegador que optimice el renderizado mediante aceleración por hardware GPU
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default FadeInSection;
