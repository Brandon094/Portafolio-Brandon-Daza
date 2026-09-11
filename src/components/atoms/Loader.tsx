/**
 * @file Loader.tsx
 * @description Componente de carga (Spinner) estilizado con estética Cyberpunk.
 * Dentro de la metodología del Diseño Atómico, este componente califica como un Átomo.
 * Representa un indicador visual puro de estado de carga que aprovecha Framer Motion
 * para lograr transiciones infinitas y cambios de geometría fluidos en el DOM.
 *
 * Brandon, este átomo de carga mantiene una consistencia inmersiva con la narrativa de
 * "Grid/Matriz cibernética" que distingue a tu marca personal.
 */

import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-32">
      {/*
        motion.div: Reemplazo del div estándar de HTML que habilita superpoderes de animación.
        animate: Define el estado final continuo de la animación. Aquí realiza una rotación
                 completa de 360 grados mientras altera secuencialmente los bordes redondeados
                 (borderRadius) de un cuadrado a un círculo perfecto, regresando a cuadrado.
        transition: Configura el comportamiento de la animación, estableciéndola de forma infinita
                    (repeat: Infinity) y lineal para un giro fluido sin fricciones.
      */}
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-t-2 border-r-2 border-cyber-cyan mb-8"
      />

      {/* Texto de carga animado con un efecto intermitente (Glow/Pulse) usando opacidades alternadas */}
      <motion.p
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-cyber-cyan font-mono text-xs tracking-widest uppercase"
      >
        Synchronizing with Grid...
      </motion.p>
    </div>
  );
};

export default Loader;
