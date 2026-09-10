import React from 'react';
import Button from '../atoms/Button';

const Hero: React.FC = () => {
  return (
    <header id="home" className="pt-40 pb-20 px-[5%] text-center bg-gradient-to-br from-hacker-bg to-hacker-card text-white mt-[60px] border-b-2 border-hacker-blue h-[600px] flex flex-col justify-center items-center max-md:pt-32 max-md:pb-16 max-md:h-auto max-md:min-h-[500px]">
      <h1 className="text-6xl mb-8 text-hacker-orange shadow-hacker-orange drop-shadow-[0_0_10px_rgba(247,140,108,0.8)] max-md:text-4xl">
        Brandon Daza
      </h1>
      <p className="text-xl max-w-[800px] mx-auto mb-8 text-hacker-text max-md:text-base">
        Fundador de <span className="neon-text">ChopCode Solutions</span> | Desarrollador Full-Stack & Arquitecto de Soluciones Digitales.
      </p>
      <Button href="#projects">Ver mi Trabajo</Button>
    </header>
  );
};

export default Hero;
