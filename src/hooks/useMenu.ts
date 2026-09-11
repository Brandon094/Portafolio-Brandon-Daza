/**
 * @file useMenu.ts
 * @description Hook minimalista para controlar el estado abierto/cerrado de un menú (como el Navbar móvil).
 * Es un excelente ejemplo de encapsulación de lógica de UI para mantener los componentes visuales limpios.
 *
 * Brandon, como Diseñador del Sistema, delegar estados booleanos simples a hooks específicos te ayuda
 * a mantener tus vistas atómicas y enfocadas únicamente en el diseño y la interacción.
 */

import { useState } from 'react';

export const useMenu = () => {
  // Estado que define si el menú desplegable está visible o no
  const [isOpen, setIsOpen] = useState(false);

  // Alterna el estado (abierto <-> cerrado)
  const toggle = () => setIsOpen(!isOpen);

  // Fuerza el cierre del menú (ideal al hacer clic en un enlace de navegación)
  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    close,
  };
};
