/**
 * @file Button.tsx
 * @description Componente reutilizable de Botón / Enlace según la metodología de Diseño Atómico.
 * Representa una unidad de UI indivisible con estilos futuristas y Cyberpunk altamente estilizados.
 *
 * Brandon, como Arquitecto de Interfaces, este átomo unifica el comportamiento de botones y enlaces,
 * soportando variantes visuales consistentes con la identidad de marca de tu portafolio.
 */

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string; // Si se proporciona, el componente se renderiza como una etiqueta <a> en lugar de <button>
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline'; // Diferentes esquemas estéticos predefinidos
  disabled?: boolean;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  disabled = false,
  title
}) => {
  // Estilos base compartidos por todos los botones para asegurar consistencia en paddings, tipografía y bordes redondeados
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  // Mapeo de variantes visuales Cyberpunk/Neón usando Tailwind CSS
  const variants = {
    primary: "bg-white !text-black hover:bg-opacity-90 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-neon-purple active:scale-95",
    secondary: "bg-cyber-purple !text-white hover:bg-opacity-90 shadow-neon-purple active:scale-95",
    outline: "bg-transparent border border-white/20 !text-white hover:bg-white/5 active:scale-95"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  // Lógica de Renderizado Condicional: Si tiene 'href', actúa como un enlace web seguro
  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={combinedClassName}
        title={title}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  // En caso contrario, se renderiza como un botón de acción clásico para formularios o clics de UI
  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
