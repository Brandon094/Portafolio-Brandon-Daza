import React, { useState } from 'react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import { Send, CheckCircle2 } from 'lucide-react';
import Button from '../atoms/Button';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const leadsRef = ref(rtdb, 'leads');
      await push(leadsRef, {
        ...form,
        timestamp: serverTimestamp()
      });
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Error en la transmisión. Intente vía WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex p-4 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/20 mb-6">
              <CheckCircle2 className="w-10 h-10 text-cyber-emerald" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Transmisión Exitosa</h3>
            <p className="text-white/40 font-light italic mb-10">He recibido su señal. Mi equipo de análisis se pondrá en contacto pronto.</p>
            <button
              onClick={() => setSent(false)}
              className="text-[10px] font-mono text-cyber-cyan uppercase tracking-[0.4em] hover:text-white transition-colors underline underline-offset-8"
            >
              Nueva Transmisión
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-mono text-white/20 uppercase tracking-widest ml-1">Identifier</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="Nombre o Empresa"
                  className="w-full bg-white/[0.03] border border-white/5 p-4 text-sm text-white rounded-2xl outline-none focus:border-cyber-purple/30 focus:bg-white/[0.06] transition-all placeholder:text-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-mono text-white/20 uppercase tracking-widest ml-1">Return Path</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="Email de contacto"
                  className="w-full bg-white/[0.03] border border-white/5 p-4 text-sm text-white rounded-2xl outline-none focus:border-cyber-purple/30 focus:bg-white/[0.06] transition-all placeholder:text-white/10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-white/20 uppercase tracking-widest ml-1">Technical Payload</label>
              <textarea
                required
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                placeholder="Describa su visión estratégica o desafío técnico..."
                className="w-full bg-white/[0.03] border border-white/5 p-4 text-sm text-white rounded-2xl outline-none focus:border-cyber-purple/30 focus:bg-white/[0.06] transition-all h-32 resize-none placeholder:text-white/10"
              />
            </div>
            <Button
              variant="primary"
              className="w-full !py-5 !text-[11px] uppercase tracking-[0.4em] font-black shadow-neon-purple group"
              disabled={sending}
            >
              {sending ? 'Transmitiendo...' : (
                <span className="flex items-center gap-3">
                  Ejecutar Handshake <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
