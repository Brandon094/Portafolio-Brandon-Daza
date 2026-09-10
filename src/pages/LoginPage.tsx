import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import MainLayout from '../components/templates/MainLayout';
import Button from '../components/atoms/Button';
import { motion } from 'framer-motion';
import { Lock, Key, User, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Acceso denegado: Credenciales inválidas.');
      setIsAuthenticating(false);
    }
  };

  return (
    <MainLayout>
      <section className="min-h-screen flex items-center justify-center bg-space-black relative overflow-hidden px-6">

        {/* Dynamic Background Auras - Consistent with Ecosystem */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <motion.div
             animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 20, 0] }}
             transition={{ duration: 10, repeat: Infinity }}
             className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-cyber-purple/15 blur-[120px] rounded-full"
           />
           <motion.div
             animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, -30, 0] }}
             transition={{ duration: 15, repeat: Infinity, delay: 2 }}
             className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-cyber-cyan/10 blur-[120px] rounded-full"
           />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md relative z-10"
        >
          {/* HEADER VIBRANTE */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex p-4 rounded-2xl bg-cyber-purple/10 border border-cyber-purple/20 mb-8 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
            >
              <Cpu className="w-8 h-8 text-cyber-purple animate-pulse" />
            </motion.div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-white/30 text-[8px] font-mono tracking-[0.4em] uppercase mb-4">
              <ShieldCheck className="w-3 h-3 text-cyber-emerald" /> Identity Protocol v4.5
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic leading-none">
              Acceso <span className="text-gradient drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">Root.</span>
            </h1>
          </div>

          {/* FORMULARIO PREMIUM */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple/40 to-transparent" />

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-1">Identificador</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyber-purple transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@chopcode.com"
                    className="w-full bg-white/[0.02] border border-white/5 p-5 pl-14 text-sm text-white rounded-2xl outline-none focus:border-cyber-purple/40 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest ml-1">Clave Maestra</label>
                <div className="relative group">
                  <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyber-purple transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.02] border border-white/5 p-5 pl-14 text-sm text-white rounded-2xl outline-none focus:border-cyber-purple/40 focus:bg-white/[0.05] transition-all font-mono placeholder:text-white/10"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 text-cyber-orange text-[10px] font-bold uppercase tracking-wider bg-cyber-orange/5 p-4 rounded-xl border border-cyber-orange/10 shadow-inner">
                  <Lock className="w-4 h-4" /> {error}
                </div>
              )}

              <div className="pt-4">
                <Button
                  variant="primary"
                  className="w-full !py-6 text-xs font-black uppercase tracking-[0.4em] shadow-neon-purple group"
                >
                  {isAuthenticating ? 'Sincronizando...' : (
                    <span className="flex items-center justify-center gap-3">
                      Autorizar Sesión <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* ACCIÓN DE RETORNO */}
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[10px] font-mono text-white/20 hover:text-white transition-all uppercase tracking-[0.5em] flex items-center justify-center gap-3 mx-auto group"
            >
              <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">←</span> Abortar y Volver
            </button>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
