import React from 'react';
import MainLayout from './MainLayout';
import ScrollStory from '../organisms/ScrollStory';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* 🎬 LA EXPERIENCIA CINEMATOGRÁFICA PURA */}
      <div className="bg-space-black">
        <ScrollStory />
      </div>
    </MainLayout>
  );
};

export default HomePage;
