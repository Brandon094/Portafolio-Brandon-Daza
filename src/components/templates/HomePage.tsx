/**
 * @file HomePage.tsx
 * @description Componente de nivel Plantilla (Template) en la jerarquía del Diseño Atómico.
 * Las plantillas definen la estructura general del layout de una página reuniendo organismos complejos.
 * En este caso, actúa como el orquestador cinemático de la experiencia inicial del portafolio,
 * envolviendo al componente interactivo `ScrollStory`.
 *
 * Brandon, aislar tus páginas en plantillas modulares te permite reconfigurar las envolventes globales
 * (como menús o pies de página) con extrema facilidad y limpieza estructural.
 */

import React from 'react';
import MainLayout from './MainLayout';
import ScrollStory from '../organisms/ScrollStory';

const HomePage: React.FC = () => {
  return (
    // Reutilización de la plantilla estructural MainLayout para inyectar Navbar y Footer consistentes
    <MainLayout>
      {/* Contenedor oscuro dedicado a amplificar la inmersión del ScrollStory */}
      <div className="bg-space-black">
        <ScrollStory />
      </div>
    </MainLayout>
  );
};

export default HomePage;
