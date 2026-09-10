import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = '', id }) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // La opacidad sube al entrar y baja al salir
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  // El escalado da profundidad (90% al entrar/salir, 100% en el centro)
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      id={id}
      ref={containerRef}
      style={{ opacity, scale }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default FadeInSection;
