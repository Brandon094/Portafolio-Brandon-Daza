import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-32">
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-t-2 border-r-2 border-cyber-cyan mb-8"
      />
      <motion.p
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-cyber-cyan font-mono text-xs tracking-widest uppercase"
      >
        Synchronizing with Grid...
      </motion.p>
    </div>
  );
};

export default Loader;
