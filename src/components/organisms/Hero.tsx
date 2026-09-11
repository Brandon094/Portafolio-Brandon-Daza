/**
 * @file Hero.tsx
 * @description Organismo de cabecera (Hero) alternativo con una estética técnica de alto contraste.
 * Diseñado bajo los preceptos del Diseño Atómico para actuar como la primera impresión visual de la aplicación.
 *
 * Brandon, este componente utiliza una paleta de colores Hacker (Naranja/Azul) que evoca una sensación de control
 * y pericia técnica. Es una excelente opción para secciones que requieren máxima legibilidad y un tono directo.
 */

import React from 'react';
import Button from '../atoms/Button';

const Hero: React.FC = () => {
  return (
    // Estructura semántica de cabecera con un fondo degradado atmosférico y bordes definidos.
    <header id="home" className="pt-40 pb-20 px-[5%] text-center bg-gradient-to-br from-hacker-bg to-hacker-card text-white mt-[60px] border-b-2 border-hacker-blue h-[600px] flex flex-col justify-center items-center max-md:pt-32 max-md:pb-16 max-md:h-auto max-md:min-h-[500px]">

      {/* Título de gran impacto con efectos de sombra paralela (drop-shadow) para simular un brillo neón */}
      <h1 className="text-6xl mb-8 text-hacker-orange shadow-hacker-orange drop-shadow-[0_0_10px_rgba(247,140,108,0.8)] max-md:text-4xl">
        Brandon Daza
      </h1>

      {/* Breve biografía profesional con énfasis en tu marca personal 'ChopCode Solutions' */}
      <p className="text-xl max-w-[800px] mx-auto mb-8 text-hacker-text max-md:text-base">
        Fundador de <span className="neon-text">ChopCode Solutions</span> | Desarrollador Full-Stack & Arquitecto de Soluciones Digitales.
      </p>

      {/* Invocación del átomo Button para guiar al usuario hacia la sección de proyectos */}
      <Button href="#projects">Ver mi Trabajo</Button>
    </header>
  );
};

export default Hero;
