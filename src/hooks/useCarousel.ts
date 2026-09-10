import { useState } from 'react';

export const useCarousel = (itemCount: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

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
