/**
 * @file App.tsx
 * @description Orquestador central de la aplicación (Application Routing Engine).
 * En la arquitectura de este proyecto React, este componente actúa como la raíz funcional,
 * configurando el motor de enrutamiento con React Router (`BrowserRouter` como `Router`).
 * Envuelve las declaraciones de rutas en `AnimatePresence` de Framer Motion para habilitar
 * transiciones fluidas de salida entre páginas y asegura las vistas administrativas mediante el guardián `AuthGuard`.
 *
 * Brandon, esta es la columna vertebral de navegación de tu software. Mantener declarativas todas tus rutas
 * aquí facilita enormemente agregar nuevas secciones estratégicas al portafolio de forma limpia y escalable.
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './components/templates/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ArchivePage from './pages/ArchivePage';
import SolutionsPage from './pages/SolutionsPage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import EcosystemPage from './pages/EcosystemPage';
import AcademyPage from './pages/AcademyPage';
import AuthGuard from './components/atoms/AuthGuard';
import PageTransition from './components/templates/PageTransition';
import ScrollToTop from './components/atoms/ScrollToTop';

/**
 * AnimatedRoutes
 * Subcomponente encargado de inyectar las locaciones dinámicas del historial al motor de Framer Motion.
 * Requiere ser invocado dentro del contexto del nodo <Router>.
 */
function AnimatedRoutes() {
  // useLocation: Extrae la ruta actual en tiempo de ejecución de la barra del navegador
  const location = useLocation();

  return (
    // AnimatePresence mode="wait" fuerza a las transiciones a finalizar la salida de la página vieja antes de pintar la nueva
    <AnimatePresence mode="wait">
      {/*
        Le pasamos de forma explícita 'location' y una clave única 'key' basada en la URL actual a <Routes>
        para que Framer Motion detecte con precisión quirúrgica el cambio de vista y gatille las animaciones correspondientes.
      */}
      <Routes location={location} key={location.pathname}>
        {/* Rutas Públicas Envueltas en la Plantilla de Movimiento Estética PageTransition */}
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/ecosystem" element={<PageTransition><EcosystemPage /></PageTransition>} />
        <Route path="/academy" element={<PageTransition><AcademyPage /></PageTransition>} />
        <Route path="/solutions" element={<PageTransition><SolutionsPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/archive" element={<PageTransition><ArchivePage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />

        {/*
          Ruta Protegida Administrativa:
          Utiliza el patrón de Diseño "HOC / Envoltorio Estructural" insertando 'AuthGuard' en el nivel exterior,
          el cual cancelará el montaje de 'AdminPage' si Firebase Auth no detecta una sesión válida.
        */}
        <Route path="/admin" element={
          <AuthGuard>
            <PageTransition><AdminPage /></PageTransition>
          </AuthGuard>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      {/* Forzamos el reset automático del scroll en cada redirección de la app */}
      <ScrollToTop />
      {/* Carga del motor de rutas animadas */}
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
