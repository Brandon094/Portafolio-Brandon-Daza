/**
 * @file MainLayout.tsx
 * @description Plantilla de Maquetación Global (Main Layout).
 * Sigue el patrón estructural de "Slots" o contenedores genéricos en React (`children`).
 * Centraliza la inclusión del menú de navegación (`Navbar`) en la cabecera y el pie de página (`footer`),
 * proveyendo un marco homogéneo para todas las vistas públicas del portafolio.
 *
 * Brandon, como Arquitecto de Software, automatizar elementos comunes como la estampa de año dinámico
 * (`new Date().getFullYear()`) y configuraciones de selección de texto (`selection:bg-cyber-purple`)
 * en un diseño maestro disminuye la duplicación de código y afianza la solidez de tu UI.
 */

import React from 'react';
import Navbar from '../organisms/Navbar';
import { Github, Linkedin, Cpu } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode; // Recibe dinámicamente el nodo o vista que se va a renderizar en el cuerpo central
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // Configuración global del fondo oscuro del espacio y estilización de la selección de texto nativa
    <div className="bg-space-black min-h-screen selection:bg-cyber-purple selection:text-white">
      {/* Orquestación fija de la barra de navegación interactiva */}
      <Navbar />

      {/* Contenedor Semántico Central para el contenido inyectado */}
      <main>
        {children}
      </main>

      {/* PIE DE PÁGINA COMÚN */}
      <footer className="py-12 border-t border-white/5 text-center relative overflow-hidden">
        {/* Aura decorativa púrpura en el fondo para dotar de profundidad visual al cierre de página */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyber-purple/5 blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">

            {/* Bloque Izquierdo: Identidad de Marca y Copyright Dinámico */}
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

            {/* Bloque Central: Iconos y Accesos a Redes de Ingeniería */}
            <div className="flex gap-4">
              <a
                href="https://github.com/Brandon094"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-muted-text hover:text-white"
                title="GitHub"
              >
                <img src="" className="hidden" alt="" /> {/* Resguardo semántico */}
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

            {/* Bloque Derecho: Slogan Corporativo Minimalista */}
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
