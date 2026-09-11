/**
 * @file TechMarquee.tsx
 * @description Molécula que genera una marquesina (Marquee) horizontal infinita con las tecnologías del stack.
 * Categorizada como molécula porque combina múltiples nodos de texto estilizados en una sola unidad animada.
 * Utiliza Framer Motion para lograr un desplazamiento infinitamente continuo sin saltos ni cortes.
 *
 * Brandon, duplicar la lista de tecnologías (`[...techs, ...techs]`) en combinación con la propiedad
 * `repeat: Infinity` y el ajuste fino de traslación en X es la técnica estándar en la industria para crear
 * el efecto visual de bucle sin fin.
 */

import React from 'react';
import { motion } from 'framer-motion';

const techs = [
  'React', 'TypeScript', 'Node.js', 'Firebase', 'Java', 'Android', 'Tailwind',
  'Spring Boot', 'SQLite', 'Git', 'Vite', 'Python', 'FastAPI', 'Framer Motion'
];

const TechMarquee: React.FC = () => {
  return (
    <div className="py-20 overflow-hidden bg-space-black/50 border-y border-white/5">
      <div className="flex whitespace-nowrap">
        {/*
          motion.div: Contenedor que desplaza horizontalmente las tecnologías de forma lineal.
          animate: Mueve el componente desde la posición X inicial 0 hasta -1000 píxeles.
          transition: ease: "linear" asegura que la velocidad sea constante y nunca desacelere,
                      y duration: 20 controla el ritmo idóneo para una lectura cómoda.
        */}
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center px-10"
        >
          {/* Mapeamos el arreglo duplicado para poblar la marquesina y rellenar el ancho de pantalla */}
          {[...techs, ...techs].map((tech, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-black text-white/10 hover:text-white/40 transition-colors cursor-default select-none"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;
