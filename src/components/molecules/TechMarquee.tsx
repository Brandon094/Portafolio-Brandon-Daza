import React from 'react';
import { motion } from 'framer-motion';

const techs = [
  'React', 'TypeScript', 'Node.js', 'Firebase', 'Java', 'Android', 'Tailwind',
  'Spring Boot', 'SQLite', 'Git', 'Vite', 'Python', 'FastAPI', 'Framer Motion'
];

const TechMarquee: React.FC = () => {
  return (
    <div className="py-20 overflow-hidden bg-space-black/50 border-y border-white/5">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center px-10"
        >
          {[...techs, ...techs].map((tech, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-black text-white/10 hover:text-white/40 transition-colors cursor-default select-none"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechMarquee;
