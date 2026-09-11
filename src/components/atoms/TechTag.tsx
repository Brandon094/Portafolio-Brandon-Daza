/**
 * @file TechTag.tsx
 * @description Átomo visual de etiqueta (Badge) para mostrar habilidades tecnológicas de forma minimalista.
 * En la escala del Diseño Atómico, representa un componente puramente estático y visual,
 * optimizado para ser insertado en tarjetas o listados.
 *
 * Brandon, estructurar elementos sencillos como este en átomos independientes garantiza que
 * si el día de mañana decides cambiar el radio de los bordes o la tipografía, lo harás en un solo lugar.
 */

import React from 'react';

interface TechTagProps {
  children: string; // Exigimos de forma estricta que el contenido interno sea una cadena de texto
}

const TechTag: React.FC<TechTagProps> = ({ children }) => {
  return (
    <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/10 rounded-full bg-white/5 text-muted-text">
      {children}
    </span>
  );
};

export default TechTag;
