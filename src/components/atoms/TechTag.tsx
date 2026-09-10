import React from 'react';

interface TechTagProps {
  children: string;
}

const TechTag: React.FC<TechTagProps> = ({ children }) => {
  return (
    <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/10 rounded-full bg-white/5 text-muted-text">
      {children}
    </span>
  );
};

export default TechTag;
