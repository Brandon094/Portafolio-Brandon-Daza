import React, { useState, useEffect } from 'react';
import { ref, push, remove, update, onValue } from 'firebase/database';
import { rtdb, auth } from '../config/firebase';
import { useProjects } from '../hooks/useProjects';
import { useAnalytics } from '../hooks/useAnalytics';
import MainLayout from '../components/templates/MainLayout';
import Button from '../components/atoms/Button';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Activity, Inbox, Database, PlusCircle, Save,
  XCircle, Trash2, Edit3, BarChart3, Globe, Smartphone,
  LayoutDashboard, FolderKanban, MessageSquare, ShieldCheck, Cpu, Signal, Image as ImageIcon
} from 'lucide-react';

/**
 * @file AdminPage.tsx
 * @description Centro de Mando Administrativo del Ecosistema.
 * Implementa una arquitectura de gestión de estado compleja mediante React Hooks (MVVM).
 * Proporciona telemetría en tiempo real, gestión de leads (mensajes) y repositorio de activos (CRUD de proyectos).
 */
const AdminPage: React.FC = () => {
  // --- VIEWMODELS (Custom Hooks) ---
  const { projects } = useProjects(); // Sincroniza la lista de proyectos en tiempo real
  const { stats } = useAnalytics();   // Sincroniza estadísticas globales de tráfico

  // --- ESTADOS LOCALES (Memory Slots) ---
  const [leads, setLeads] = useState<any[]>([]); // Almacena mensajes de contacto
  const [editingId, setEditingId] = useState<string | null>(null); // Puntero para edición de activos
  const [logs, setLogs] = useState<string[]>([]); // Registro histórico de la sesión
  const [activeTab, setActiveTab] = useState<'dashboard' | 'repository'>('dashboard'); // Gestor de vistas
  const [showForm, setShowForm] = useState(false); // Estado del búnker de inyección de datos

  // Estado atómico del formulario de proyectos
  const [form, setForm] = useState({
    title: '', description: '', images: '', featureGraphic: '',
    keyPoints: '', technologies: '', status: 'completed',
    progress: 100, liveUrl: '', playStoreUrl: ''
  });

  /**
   * addLog: Registra eventos en la consola virtual del mainframe.
   */
  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 20));
  };

  /**
   * useEffect: Inicializa las suscripciones de datos al montar la terminal.
   */
  useEffect(() => {
    addLog("Acceso de Seguridad Nivel 4. Bienvenido, Brandon.");
    const leadsRef = ref(rtdb, 'leads');

    // onValue: Crea un stream constante con la Realtime Database
    const unsub = onValue(leadsRef, (snap) => {
      const data = snap.val();
      if (data) {
        // Convertimos el objeto JSON a un array descendente por fecha
        setLeads(Object.keys(data).map(k => ({ ...data[k], id: k })).reverse());
        addLog("Sincronización de señales exitosa.");
      }
    });

    // Cleanup: Cierra la tubería al cerrar la terminal
    return () => unsub();
  }, []);

  /**
   * handleSubmit: Procesa el envío del formulario para crear o actualizar activos.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Detenemos recarga nativa para manejo SPA

    // Formateo de datos: Conversión de strings (CSV) a arrays técnicos
    const projectData = {
      ...form,
      images: form.images.split(',').map(i => i.trim()),
      keyPoints: form.keyPoints.split('\n').filter(p => p.trim()),
      technologies: form.technologies.split(',').map(t => t.trim()),
      progress: Number(form.progress)
    };

    try {
      if (editingId) {
        // Actualización de registro existente vía PUT (update)
        await update(ref(rtdb, `projects/${editingId}`), projectData);
        addLog(`Protocolo: Registro "${form.title}" actualizado.`);
      } else {
        // Inyección de nuevo activo vía POST (push)
        await push(ref(rtdb, 'projects'), projectData);
        addLog(`Protocolo: Inyección de activo "${form.title}" completada.`);
      }
      resetForm();
    } catch (err) {
      addLog("ALERTA CRÍTICA: Reintento de base de datos fallido.");
    }
  };

  /**
   * handleEdit: Carga los datos de un proyecto en el formulario para sobreescritura.
   */
  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setForm({
      title: p.title, description: p.description,
      images: p.images.join(', '), featureGraphic: p.featureGraphic || '',
      keyPoints: p.keyPoints.join('\n'), technologies: p.technologies.join(', '),
      status: p.status || 'completed', progress: p.progress || 100,
      liveUrl: p.liveUrl || '', playStoreUrl: p.playStoreUrl || ''
    });
    setShowForm(true);
    addLog(`Sistema: Preparando sobreescritura de "${p.title}".`);
  };

  const resetForm = () => {
    setForm({ title: '', description: '', images: '', featureGraphic: '', keyPoints: '', technologies: '', status: 'completed', progress: 100, liveUrl: '', playStoreUrl: '' });
    setEditingId(null);
    setShowForm(false);
  };

  /**
   * handleDelete: Ejecuta purga permanente de datos.
   */
  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`¿Confirmar purga permanente de "${title}"?`)) {
      await remove(ref(rtdb, `projects/${id}`));
      addLog(`Sistema: Entidad "${title}" purgada del mainframe.`);
    }
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-20 px-[5%] max-w-7xl mx-auto font-sans min-h-screen relative overflow-hidden">

        {/* FONDO ANIMADO: Auras dinámicas (GPU Accelerated) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-cyber-purple/15 blur-[150px] rounded-full" />
           <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 15, repeat: Infinity, delay: 2 }} className="absolute bottom-0 -left-[10%] w-[50%] h-[50%] bg-cyber-cyan/10 blur-[150px] rounded-full" />
        </div>

        {/* HEADER: Estado de sesión y control de terminal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/20 shadow-neon-purple">
               <Cpu className="w-8 h-8 text-cyber-purple animate-pulse" />
            </div>
            <div>
              <h2 className="text-white text-3xl font-black tracking-tighter uppercase italic leading-none">Centro de <span className="text-cyber-purple shadow-neon-purple">Mando v4.5</span></h2>
              <div className="flex items-center gap-3 mt-2">
                 <ShieldCheck className="w-3 h-3 text-cyber-emerald" />
                 <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Acceso de Administrador Autorizado</p>
              </div>
            </div>
          </div>
          <Button onClick={() => signOut(auth)} variant="outline" className="!px-8 !py-2 !text-[10px] uppercase font-black border-white/5 text-white/20 hover:text-white hover:border-cyber-purple transition-all">
            Cerrar Terminal
          </Button>
        </div>

        {/* TELEMETRY BAR: Visualización de señales globales */}
        <div className="flex flex-wrap gap-4 mb-10 bg-white/[0.01] p-5 rounded-[2rem] border border-white/5 relative z-10 backdrop-blur-md">
           {[
             { icon: Activity, t: 'Señales Globales', v: stats.visits, c: 'text-cyber-cyan' },
             { icon: FolderKanban, t: 'Activos Vivos', v: projects.length, c: 'text-cyber-purple' },
             { icon: Signal, t: 'Interacción', v: (stats.visits * 1.5).toFixed(0), c: 'text-cyber-emerald' }
           ].map((stat, i) => (
             <div key={i} className="flex items-center gap-5 px-8 py-3 border-r border-white/5 last:border-0 group transition-all">
                <div className={`p-2 bg-white/5 rounded-lg ${stat.c} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{stat.t}</p>
                   <p className="text-2xl font-black text-white tracking-tighter">{stat.v}</p>
                </div>
             </div>
           ))}
           <div className="flex-1 flex items-center justify-end px-6 min-w-[200px]">
              <div className="flex items-center gap-4 group">
                 <div className="text-right">
                    <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] leading-none mb-1">Última Transmisión</p>
                    <p className="text-[10px] text-cyber-purple font-mono truncate max-w-[250px] group-hover:text-white transition-colors">{logs[0] || 'En espera...'}</p>
                 </div>
                 <Terminal className="w-5 h-5 text-cyber-purple/40 group-hover:text-cyber-purple transition-all" />
              </div>
           </div>
        </div>

        {/* NAVIGATION TABS: Conmutación de búnkeres de gestión */}
        <div className="flex gap-2 mb-12 bg-white/[0.02] p-2 rounded-[1.5rem] border border-white/5 w-fit relative z-10">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Control Center' },
            { id: 'repository', icon: Database, label: 'Asset Repository' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setShowForm(false); }}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                activeTab === tab.id
                ? 'bg-white text-black shadow-neon-purple'
                : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ÁREA DE RENDERIZADO DINÁMICO */}
        <div className="relative z-10 min-h-[60vh]">
          <AnimatePresence mode="wait">

            {/* VIEW 01: DASHBOARD (Neural Inbox + Logs) */}
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-8">
                   <div className="flex items-center gap-4 opacity-40">
                      <Inbox className="w-5 h-5 text-cyber-purple" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Neural Inbox Signals ({leads.length})</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {leads.map(l => (
                        <div key={l.id} className="glass-card p-8 bg-black/20 hover:border-cyber-purple/40 hover:bg-white/[0.02] group relative">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-purple/5 blur-3xl" />
                          <div className="flex justify-between items-center mb-8">
                             <div className="p-3 bg-white/5 text-cyber-purple rounded-xl border border-white/5 group-hover:shadow-neon-purple transition-all">
                               <MessageSquare className="w-5 h-5" />
                             </div>
                             <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Rec_Data_{new Date().getDate()}_{new Date().getMonth()+1}</span>
                          </div>
                          <h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight italic">{l.name}</h4>
                          <p className="text-cyber-purple text-[10px] font-mono mb-6 truncate opacity-60">{l.email}</p>
                          <div className="h-[1px] w-full bg-white/5 mb-6" />
                          <p className="text-white/60 text-sm leading-relaxed font-light italic">"{l.message}"</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="flex items-center gap-4 opacity-40">
                      <Terminal className="w-5 h-5 text-cyber-purple" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Mainframe Console</h3>
                   </div>
                   <div className="glass-card p-8 bg-[#0A0A0A] h-[650px] flex flex-col shadow-2xl">
                      <div className="space-y-3 overflow-y-auto no-scrollbar font-mono text-[12px] flex-1 pr-4">
                        {logs.map((log, i) => (
                          <div key={i} className="flex gap-4 border-b border-white/[0.02] pb-3 group">
                              <span className="text-white/10 shrink-0 select-none">Line_{i.toString().padStart(2, '0')}</span>
                              <span className={`${log.includes('ALERTA') ? 'text-cyber-orange' : 'text-white/50 group-hover:text-white transition-colors'}`}>{log}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-20">
                         <span className="text-[9px] font-mono uppercase tracking-[0.5em]">Session Monitoring</span>
                         <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse shadow-neon-purple" />
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 02: REPOSITORY (Asset CRUD) */}
            {activeTab === 'repository' && (
              <motion.div key="repository" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }} className="space-y-10">
                {!showForm ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    <button onClick={() => setShowForm(true)} className="h-full min-h-[300px] border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center gap-6 hover:border-cyber-purple/40 hover:bg-white/[0.01] transition-all group">
                      <div className="p-6 bg-white/5 rounded-full group-hover:scale-110 group-hover:shadow-neon-purple transition-all duration-500 border border-white/5">
                        <PlusCircle className="w-10 h-10 text-white/10 group-hover:text-white" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-white transition-colors">Inyectar Activo</span>
                    </button>
                    {projects.map(p => (
                      <div key={p.id} className="glass-card p-10 bg-black/40 hover:border-cyber-purple/40 transition-all flex flex-col group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/[0.02] blur-3xl" />
                        <div className="flex justify-between items-start mb-8 relative z-10">
                           <div className={`p-4 rounded-2xl border border-white/5 ${p.status === 'in_progress' ? 'bg-cyber-purple/10 text-cyber-purple shadow-neon-purple' : 'bg-white/5 text-white/60'}`}>
                             <Database className="w-6 h-6" />
                           </div>
                           <div className="flex gap-2">
                             <button onClick={() => handleEdit(p)} className="p-3 bg-white/5 hover:bg-cyber-purple text-white/20 hover:text-cyber-purple transition-all rounded-xl border border-white/5"><Edit3 className="w-4 h-4" /></button>
                             <button onClick={() => handleDelete(p.id, p.title)} className="p-3 bg-white/5 hover:bg-cyber-orange text-white/20 hover:text-cyber-orange transition-all rounded-xl border border-white/5"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </div>
                        <h4 className="text-white font-black text-2xl mb-3 uppercase tracking-tighter italic leading-none">{p.title}</h4>
                        <p className="text-white/40 text-[11px] line-clamp-3 mb-10 font-light leading-relaxed italic">"{p.description}"</p>
                        <div className="mt-auto flex justify-between items-center pt-8 border-t border-white/5 relative z-10">
                           <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${p.status === 'in_progress' ? 'bg-cyber-purple animate-pulse shadow-neon-purple' : 'bg-cyber-emerald'}`} />
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{p.status === 'in_progress' ? 'Laboratorio' : 'Estable'}</span>
                           </div>
                           <span className="text-sm font-mono text-white/20">{p.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // BÚNKER DE INYECCIÓN (Full Form)
                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0A0A0A] border border-white/10 p-10 md:p-16 rounded-[4rem] relative overflow-hidden max-w-4xl mx-auto shadow-[0_0_100px_rgba(0,0,0,1)]">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-40 animate-pulse" />
                     <div className="flex justify-between items-center mb-16">
                        <div className="flex items-center gap-6">
                           <div className="p-4 bg-cyber-purple/10 rounded-2xl border border-cyber-purple/20">
                             {editingId ? <Edit3 className="w-8 h-8 text-cyber-purple" /> : <PlusCircle className="w-8 h-8 text-cyber-purple" />}
                           </div>
                           <h3 className="text-3xl font-black uppercase tracking-tighter italic text-white">
                             {editingId ? 'Protocolo Sobreescritura' : 'Protocolo Inyección'}
                           </h3>
                        </div>
                        <button onClick={resetForm} className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/20 hover:text-white transition-all border border-white/10"><XCircle className="w-6 h-6" /></button>
                     </div>

                     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2">Identificador de Activo</label>
                          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm text-white rounded-[1.5rem] outline-none focus:border-cyber-purple/40 focus:bg-white/[0.05] transition-all" required />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2">Análisis Abstracto (Payload)</label>
                          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 p-6 text-sm text-white rounded-[2rem] outline-none focus:border-cyber-purple/40 focus:bg-white/[0.05] transition-all h-40 resize-none" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2 flex items-center gap-2"><ImageIcon className="w-3 h-3"/> Gráfico Funcional (Feature Graphic)</label>
                          <input value={form.featureGraphic} onChange={e => setForm({...form, featureGraphic: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm text-white rounded-[1.5rem] outline-none focus:border-cyber-purple/40" placeholder="URL del banner promocional..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2">Recursos Visuales (CSV)</label>
                          <input value={form.images} onChange={e => setForm({...form, images: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm text-white rounded-[1.5rem] outline-none focus:border-cyber-purple/40" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2">Stack de Ingeniería (CSV)</label>
                          <input value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm text-white rounded-[1.5rem] outline-none focus:border-cyber-purple/40" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2 flex items-center gap-2"><Globe className="w-3 h-3"/> URL Producción</label>
                          <input value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm text-white rounded-[1.5rem] outline-none focus:border-cyber-purple/40" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2 flex items-center gap-2"><Smartphone className="w-3 h-3"/> Nodo Play Store</label>
                          <input value={form.playStoreUrl} onChange={e => setForm({...form, playStoreUrl: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm text-white rounded-[1.5rem] outline-none focus:border-cyber-purple/40" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2">Pilares de Arquitectura (Líneas)</label>
                          <textarea value={form.keyPoints} onChange={e => setForm({...form, keyPoints: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 p-6 text-sm text-white rounded-[2rem] outline-none focus:border-cyber-purple/40 h-32 resize-none" placeholder="Pilar 1&#10;Pilar 2..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2">Estado del Despliegue</label>
                          <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})} className="w-full bg-black border border-white/10 p-5 text-sm text-white rounded-[1.5rem] outline-none focus:border-cyber-purple/40 appearance-none cursor-pointer">
                            <option value="completed" className="bg-[#121212] text-white">Despliegue Estable</option>
                            <option value="in_progress" className="bg-[#121212] text-white">Laboratorio Activo</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-cyber-purple font-bold uppercase tracking-[0.4em] ml-2">Vector de Avance %</label>
                          <input type="number" value={form.progress} onChange={e => setForm({...form, progress: Number(e.target.value)})} className="w-full bg-white/[0.02] border border-white/5 p-5 text-sm text-white rounded-[1.5rem] outline-none focus:border-cyber-purple/40" />
                        </div>
                        <div className="md:col-span-2 pt-12">
                           <Button variant="secondary" className="w-full !py-8 font-black uppercase tracking-[0.5em] shadow-neon-purple active:scale-[0.98] transition-all">
                             {editingId ? 'Confirmar Sobreescritura de Datos' : 'Confirmar Inyección de Activo'}
                           </Button>
                        </div>
                     </form>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </MainLayout>
  );
};

export default AdminPage;
