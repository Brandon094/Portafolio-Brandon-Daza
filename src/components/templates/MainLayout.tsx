import React from 'react';
import Navbar from '../organisms/Navbar';
import { Github, Linkedin, Cpu } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="bg-space-black min-h-screen selection:bg-cyber-purple selection:text-white">
      <Navbar />
      <main>
        {children}
      </main>
      <footer className="py-12 border-t border-white/5 text-center relative overflow-hidden">
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyber-purple/5 blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">

            {/* Logo & Copyright Side */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="w-5 h-5 text-cyber-cyan animate-pulse" />
                <span className="text-xl font-black tracking-tighter uppercase">
                  Brandon<span className="text-cyber-cyan">.</span>
                </span>
              </div>
              <p className="text-muted-text text-[10px] font-mono uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Architecting the future
              </p>
            </div>

            {/* Social Icons - More compact */}
            <div className="flex gap-4">
              <a
                href="https://github.com/Brandon094"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-muted-text hover:text-white"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/brandondaza"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-muted-text hover:text-blue-500"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Slogan Side */}
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
                Code <span className="text-cyber-cyan">&</span> Coffee
              </p>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
