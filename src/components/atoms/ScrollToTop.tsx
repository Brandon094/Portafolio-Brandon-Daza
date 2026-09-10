import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop: Controller invisible que gestiona el reset del scroll
 * Patrón: Observer del cambio de locación
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset inmediato al tope de la página
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Usamos instant para que el usuario no vea el deslizamiento de vuelta
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
