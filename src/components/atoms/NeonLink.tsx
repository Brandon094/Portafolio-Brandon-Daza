/**
 * @file NeonLink.tsx
 * @description Átomo de enlace personalizado con efectos interactivos de brillo neón.
 * Sigue los principios del Diseño Atómico para proveer un comportamiento homogéneo
 * en las etiquetas de hipervínculo <a> del proyecto.
 *
 * Brandon, este átomo demuestra atención al detalle tipográfico y de micro-interacciones,
 * reforzando el estilo Hacker/Cyberpunk del portafolio mediante transiciones CSS nativas.
 */

import React from 'react';

interface NeonLinkProps {
  children: React.ReactNode; // Contenido interno del enlace (texto o iconos)
  href: string; // URL de destino de la navegación
  className?: string; // Clases opcionales para extender estilos desde el exterior
  target?: string; // Control de apertura de pestaña (e.g. '_blank')
  onClick?: () => void; // Manejador de evento clic opcional
}

const NeonLink: React.FC<NeonLinkProps> = ({ children, href, className = '', target, onClick }) => {
  return (
    <a
      href={href}
      // Clases Tailwind que gestionan el cambio de color de texto y la inyección de sombras neón al pasar el mouse (hover)
      className={`text-hacker-blue no-underline transition-all duration-300 hover:text-hacker-green hover:shadow-[0_0_5px_theme(colors.hacker-green)] ${className}`}
      target={target}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NeonLink;
