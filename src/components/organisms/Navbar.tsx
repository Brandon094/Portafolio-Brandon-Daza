import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, MessageSquare, LogIn, Globe, Home, User, Layers } from 'lucide-react';
import { useMenu } from '../../hooks/useMenu';

const Navbar: React.FC = () => {
  const { isOpen, toggle, close } = useMenu();
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isHome = location.pathname === '/';
      if (isHome) {
        setIsVisible(window.scrollY > window.innerHeight * 0.8);
      } else {
        setIsVisible(true);
      }
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Empresa', href: '/solutions', icon: Globe },
    { name: 'Proyectos', href: '/projects', icon: Briefcase },
    { name: 'Contacto', href: '/contact', icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* --- DESKTOP NAVBAR (Floating Pill) --- */}
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-6 left-0 w-full z-[1000] hidden md:flex justify-center pointer-events-none"
          >
            <nav className={`
              pointer-events-auto flex items-center gap-2 px-6 py-2 rounded-full
              bg-black/40 backdrop-blur-xl border border-white/5 transition-all duration-500
              hover:border-cyber-purple/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] group/nav
              ${scrolled ? 'scale-95 shadow-2xl bg-black/60' : 'scale-100'}
            `}>
              {/* Logo Link */}
              <Link to="/" className="p-2 mr-4 border-r border-white/10 pr-6 group/logo">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyber-purple rounded-full shadow-neon-purple animate-pulse" />
                  <span className="font-black text-xs tracking-tighter uppercase text-white/40 group-hover/logo:text-white transition-colors">Brandon.</span>
                </div>
              </Link>

              {/* Links */}
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`
                      relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-xl
                      flex items-center gap-2 group/item
                      ${isActive(link.href) ? 'text-white' : 'text-white/30 hover:text-white'}
                    `}
                  >
                    {/* Hover Background Pill */}
                    <div className="absolute inset-0 bg-white/[0.03] rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity" />

                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-cyber-purple/10 rounded-xl border border-cyber-purple/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2 group-hover/item:scale-110 transition-transform">
                      <link.icon className={`w-3 h-3 transition-colors ${isActive(link.href) ? 'text-cyber-purple' : 'group-hover/item:text-cyber-purple'}`} />
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Login/Admin Link */}
              <Link to="/login" className="ml-4 p-2.5 text-white/10 hover:text-cyber-purple transition-all border-l border-white/10 pl-6 group/login">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyber-purple/20 blur-lg opacity-0 group-hover/login:opacity-100 transition-opacity rounded-full" />
                  <LogIn className="w-4 h-4 relative z-10" />
                </div>
              </Link>
            </nav>
          </motion.header>

          {/* --- MOBILE NAVBAR (Bottom Action Bar) --- */}
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-[1000] md:hidden"
          >
            <div className="flex items-center justify-around p-3 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[2rem] bg-black/80 backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent" />

              <Link to="/" className={`p-4 rounded-2xl transition-all active:scale-90 ${isActive('/') ? 'bg-cyber-purple/10 text-cyber-purple shadow-neon-purple' : 'text-white/20'}`}>
                <Home className="w-6 h-6" />
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`p-4 rounded-2xl transition-all active:scale-90 ${isActive(link.href) ? 'bg-cyber-purple/10 text-cyber-purple shadow-neon-purple' : 'text-white/20'}`}
                >
                  <link.icon className="w-6 h-6" />
                </Link>
              ))}
              <button
                onClick={toggle}
                className="p-4 text-white/20 active:scale-90"
              >
                <Layers className="w-6 h-6" />
              </button>
            </div>
          </motion.nav>

          {/* --- MOBILE MORE MENU --- */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-space-black/98 z-[1010] flex flex-col items-center justify-center gap-10 md:hidden backdrop-blur-3xl"
              >
                <button onClick={close} className="absolute top-10 right-10 text-white/20 hover:text-white p-2 transition-colors">
                  <X className="w-10 h-10" />
                </button>

                <div className="flex flex-col items-center gap-2 mb-10">
                   <div className="p-4 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/20 mb-4">
                      <Cpu className="w-10 h-10 text-cyber-purple" />
                   </div>
                   <h3 className="text-cyber-purple font-mono text-[10px] tracking-[0.5em] uppercase">Operations Center</h3>
                </div>

                <div className="flex flex-col gap-6 text-center">
                  <Link to="/archive" onClick={close} className="text-4xl font-black text-white hover:text-cyber-purple transition-all flex items-center justify-center gap-6 group">
                    <span className="w-2 h-2 bg-cyber-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    ARCHIVO
                  </Link>
                  <Link to="/login" onClick={close} className="text-4xl font-black text-white hover:text-cyber-purple transition-all flex items-center justify-center gap-6 group">
                    <span className="w-2 h-2 bg-cyber-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    ADMIN
                  </Link>
                </div>

                <div className="mt-20 flex items-center gap-4 text-[10px] font-mono text-white/10 uppercase tracking-widest">
                  <div className="w-10 h-[1px] bg-white/5" />
                  ChopCode Solutions 2026
                  <div className="w-10 h-[1px] bg-white/5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
