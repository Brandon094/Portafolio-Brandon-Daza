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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/ecosystem" element={<PageTransition><EcosystemPage /></PageTransition>} />
        <Route path="/academy" element={<PageTransition><AcademyPage /></PageTransition>} />
        <Route path="/solutions" element={<PageTransition><SolutionsPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/archive" element={<PageTransition><ArchivePage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
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
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
