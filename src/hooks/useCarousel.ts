/**
 * @file useCarousel.ts
 * @description Hook genérico de utilidad para encapsular la lógica matemática y de estado de un carrusel o slider.
 * Sigue el principio SOLID de Responsabilidad Única, abstrayendo los cálculos de índice actual de la vista UI.
 *
 * Brandon, este enfoque modular e independiente permite reutilizar esta misma lógica en cualquier sección
 * que requiera navegación secuencial de elementos, mejorando la reusabilidad del código.
 */

import { useState } from 'react';

export const useCarousel = (itemCount: number) => {
  // Almacena el índice actual seleccionado del carrusel (basado en 0)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanza al siguiente slide de manera circular usando el operador residuo (%)
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  // Retrocede al slide anterior de forma segura e igualmente circular
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  // Salta directamente a un slide específico validando los límites del arreglo
  const goToSlide = (index: number) => {
    if (index >= 0 && index < itemCount) {
      setCurrentIndex(index);
    }
  };

  return {
    currentIndex,
    next,
    prev,
    goToSlide,
  };
};
