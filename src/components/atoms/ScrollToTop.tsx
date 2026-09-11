/**
 * @file ScrollToTop.tsx
 * @description Átomo estructural invisible que actúa como controlador del comportamiento del scroll global.
 * Sigue el patrón de Diseño de "Observer" de Rutas. Se suscribe al enrutador de React Router
 * para forzar que la ventana del navegador vuelva a la posición superior (0,0) cada vez que el usuario cambia de página.
 *
 * Brandon, esta es una pieza indispensable de experiencia de usuario (UX) en aplicaciones Single Page Applications (SPA),
 * garantizando que los visitantes siempre inicien la lectura desde el principio de cada nueva vista.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // useLocation: Hook de react-router-dom que provee la información de la ruta actual (URL)
  const { pathname } = useLocation();

  // useEffect se dispara inmediatamente cada vez que cambia el valor de 'pathname' en el arreglo de dependencias
  useEffect(() => {
    // Forzamos el reset del viewport de forma inmediata (instant)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Evitamos animaciones lentas para que la UI se sienta instantánea y limpia
    });
  }, [pathname]);

  // Al ser un componente de control o de lógica pura de UI, no renderiza nada en la pantalla
  return null;
};

export default ScrollToTop;
