import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MessageSquare, MapPin, Github, Zap } from 'lucide-react';
import MainLayout from '../components/templates/MainLayout';
import ContactForm from '../components/molecules/ContactForm';

const contactData = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/brandondaza/', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/Brandon094', icon: Github },
  { label: 'Email', href: 'mailto:dazace94@gmail.com', icon: Mail },
  { label: 'WhatsApp', href: 'https://wa.me/573222824941', icon: MessageSquare },
];

const ContactPage: React.FC = () => {
  return (
    <MainLayout>
      <section className="min-h-screen flex items-center justify-center bg-space-black relative overflow-hidden pt-40 pb-20">

        {/* Dynamic Background Auras */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <motion.div
             animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
             transition={{ duration: 10, repeat: Infinity }}
             className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyber-purple/10 blur-[150px] rounded-full"
           />
           <motion.div
             animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -50, 0] }}
             transition={{ duration: 15, repeat: Infinity, delay: 2 }}
             className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-cyber-cyan/10 blur-[150px] rounded-full"
           />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* LEFT SIDE: STRATEGIC INFO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-16"
            >
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple text-[9px] font-mono tracking-[0.4em] uppercase mb-10 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                  <Zap className="w-3 h-3 fill-cyber-purple" /> Secure Transmission Channel
                </div>
                <h1 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic text-white leading-none">
                  Iniciar <span className="text-gradient drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">Handshake.</span>
                </h1>
                <p className="text-xl text-white/60 font-light leading-relaxed max-w-md italic">
                  "Eleve su infraestructura digital. Utilice el terminal seguro para sincronizar su visión estratégica con mi ecosistema de ingeniería."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {contactData.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 transition-all group"
                  >
                    <div className="p-3 bg-white/5 rounded-xl text-white/20 group-hover:text-cyber-purple transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center gap-4 text-white/10 pt-10 border-t border-white/5">
                <div className="p-2 bg-white/5 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Operations Center: Latam Hub</span>
              </div>
            </motion.div>

            {/* RIGHT SIDE: TERMINAL FORM */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#0A0A0A] border border-white/10 p-8 md:p-16 rounded-[3.5rem] relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-purple/5 blur-[100px] pointer-events-none" />
              <div className="mb-10 opacity-30 flex items-center gap-3">
                <div className="w-2 h-2 bg-cyber-emerald rounded-full animate-pulse" />
                <span className="text-[9px] font-mono uppercase tracking-[0.5em]">Input Node: Active</span>
              </div>
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactPage;
