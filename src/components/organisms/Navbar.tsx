/**
 * @file Navbar.tsx
 * @description Organismo de barra de navegación dual (Píldora superior para Escritorio / Dock ergonómico inferior para Móviles).
 * Actúa como el controlador de navegación principal de la aplicación, vinculando rutas de React Router
 * y utilizando animaciones fluidas con Framer Motion.
 *
 * Brandon, esta es una obra maestra de diseño responsivo y UX móvil (Mobile-First). Al esconder el Navbar
 * clásico en pantallas pequeñas y sustituirlo por un "Dock" inferior al estilo iOS/Android, facilitas la
 * navegabilidad con una sola mano (ergonomía del pulgar), una decisión de diseño de nivel Fundador/Arquitecto.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, MessageSquare, LogIn, Globe, Home, Layers, BookOpen, X, Cpu, LayoutGrid } from 'lucide-react';
import { useMenu } from '../../hooks/useMenu';

const Navbar: React.FC = () => {
  //useMenu: Abstracción de lógica de UI para abrir/cerrar el menú extendido móvil
  const { isOpen, toggle, close } = useMenu();
  // Estado para controlar cuándo debe aparecer el Navbar flotante basándonos en el scroll de la página principal
  const [isVisible, setIsVisible] = useState(false);
  // Estado menor para contraer sutilmente la escala de la píldora al deslizar
  const [scrolled, setScrolled] = useState(false);
  // useLocation: Detecta cambios de ruta para reconfigurar el comportamiento del Navbar
  const location = useLocation();

  // useEffect que regula la visibilidad inteligente del Navbar según la posición del scroll
  useEffect(() => {
    const handleScroll = () => {
      const isHome = location.pathname === '/';
      if (isHome) {
        // En Home, el Navbar aparece solo tras superar el 80% de la altura del Hero principal
        setIsVisible(window.scrollY > window.innerHeight * 0.8);
      } else {
        // En subpáginas, el Navbar siempre permanece visible para garantizar la orientación del usuario
        setIsVisible(true);
      }
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Evaluación inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Arreglos de configuración para un renderizado declarativo de enlaces
  const navLinks = [
    { name: 'Empresa', href: '/solutions', icon: Globe },
    { name: 'Proyectos', href: '/projects', icon: Briefcase },
    { name: 'Academia', href: '/academy', icon: BookOpen },
    { name: 'Contacto', href: '/contact', icon: MessageSquare },
  ];

  const mobileDockItems = [
    { id: 'home', href: '/', icon: Home, label: 'Inicio' },
    { id: 'solutions', href: '/solutions', icon: Globe, label: 'ChopCode' },
    { id: 'projects', href: '/projects', icon: Briefcase, label: 'Proyectos' },
    { id: 'academy', href: '/academy', icon: BookOpen, label: 'Academia' },
  ];

  // Función utilitaria que compara la ruta actual con el destino para inyectar estados activos estricto
  const isActive = (path: string) => location.pathname === path;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* --- DESKTOP NAVBAR (Píldora Flotante Superior) --- */}
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
              {/* Logo / Identificador Personal */}
              <Link to="/" className="flex items-center gap-3 px-2 mr-4 border-r border-white/10 pr-6 group/logo">
                <div className="w-2 h-2 bg-cyber-purple rounded-full shadow-neon-purple animate-pulse" />
                <span className="font-black text-xs tracking-tighter uppercase text-white/40 group-hover/logo:text-white transition-colors">Brandon.</span>
              </Link>

              {/* Render de Enlaces mediante mapeo */}
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
                    <div className="absolute inset-0 bg-white/[0.03] rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity" />

                    {/*
                      Shared Layout Animation (layoutId="activeTab"):
                      Efecto premium de Framer Motion donde la pastilla de fondo "viaja" fluidamente
                      entre los diferentes elementos del menú al cambiar de pestaña mediante físicas de resorte.
                    */}
                    {isActive(link.href) && (
                      <motion.div layoutId="activeTab" className="absolute inset-0 bg-cyber-purple/10 rounded-xl border border-cyber-purple/20" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                    )}
                    <span className="relative z-10 flex items-center gap-2 group-hover/item:scale-105 transition-transform">
                      <link.icon className={`w-3 h-3 transition-colors ${isActive(link.href) ? 'text-cyber-purple' : 'group-hover/item:text-cyber-purple'}`} />
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Acceso Oculto al Login de Administración */}
              <Link to="/login" className="ml-4 p-2.5 text-white/10 hover:text-cyber-purple transition-all border-l border-white/10 pl-6 group/login">
                <LogIn className="w-4 h-4" />
              </Link>
            </nav>
          </motion.header>

          {/* --- MOBILE NAVBAR (Dock Ergonómico Inferior) --- */}
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] z-[1000] md:hidden"
          >
            <div className="flex items-center justify-between p-2 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] bg-black/90 backdrop-blur-3xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-cyber-purple/40 to-transparent" />

              {mobileDockItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-75 ${isActive(item.href) ? 'bg-cyber-purple/10 text-cyber-purple shadow-neon-purple' : 'text-white/20'}`}
                >
                  <item.icon className="w-5 h-5 mb-1" />
                  <span className="text-[7px] font-black uppercase tracking-tighter leading-none">{item.label}</span>
                </Link>
              ))}

              {/* Botón de Expansión para Desplegar Opciones Secundarias */}
              <button
                onClick={(e) => { e.preventDefault(); toggle(); }}
                className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-75 ${isOpen ? 'bg-cyber-purple/20 text-white' : 'text-white/20'}`}
              >
                <LayoutGrid className="w-5 h-5 mb-1" />
                <span className="text-[7px] font-black uppercase tracking-tighter leading-none">Más</span>
              </button>
            </div>
          </motion.nav>

          {/* --- MOBILE MORE MENU (Centro de Control de Pantalla Completa) --- */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed inset-0 bg-space-black/98 z-[1010] flex flex-col items-center justify-center gap-12 md:hidden backdrop-blur-3xl"
              >
                <button onClick={close} className="absolute top-10 right-10 text-white/20 hover:text-white p-2">
                  <X className="w-10 h-10" />
                </button>

                <div className="flex flex-col items-center gap-2 mb-4">
                   <div className="p-5 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/20 mb-4 shadow-neon-purple">
                      <Cpu className="w-12 h-12 text-cyber-purple" />
                   </div>
                   <h3 className="text-cyber-purple font-mono text-[10px] tracking-[0.5em] uppercase">Control Center</h3>
                </div>

                <div className="flex flex-col gap-6 text-center w-full px-12">
                  <Link to="/contact" onClick={close} className="text-4xl font-black text-white hover:text-cyber-purple transition-all flex items-center justify-center gap-6 group">
                    <MessageSquare className="w-6 h-6 text-cyber-purple" /> CONTACTO
                  </Link>
                  <Link to="/archive" onClick={close} className="text-4xl font-black text-white hover:text-cyber-cyan transition-all flex items-center justify-center gap-6 group">
                    <Layers className="w-6 h-6 text-cyber-cyan" /> ARCHIVO
                  </Link>
                  <Link to="/login" onClick={close} className="text-4xl font-black text-white hover:text-cyber-purple transition-all flex items-center justify-center gap-6 group">
                    <LogIn className="w-6 h-6 text-white/20" /> ADMIN
                  </Link>
                </div>

                <div className="mt-12 text-[9px] font-mono text-white/10 uppercase tracking-widest text-center italic">
                   "Engineering the future of rural productivity"<br/>
                   ChopCode Solutions 2026
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
