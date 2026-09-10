import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, MessageSquare, MapPin, Send, Github } from 'lucide-react';
import FadeInSection from '../atoms/FadeInSection';
import ContactForm from '../molecules/ContactForm';

const ContactSection: React.FC = () => {
  const contactData = [
    { label: 'Email', href: 'mailto:dazace94@gmail.com', icon: Mail, color: 'hover:text-cyber-cyan' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/brandondaza/', icon: Linkedin, color: 'hover:text-blue-500' },
    { label: 'GitHub', href: 'https://github.com/Brandon094', icon: Github, color: 'hover:text-premium-white' },
    { label: 'WhatsApp', href: 'https://wa.me/573222824941', icon: MessageSquare, color: 'hover:text-cyber-emerald' },
  ];

  return (
    <FadeInSection id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyber-purple/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto glass-card p-12 md:p-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-cyber-purple/10 rounded-full border border-cyber-purple/20">
              <Send className="w-8 h-8 text-cyber-purple" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            ¿Tienes un <span className="text-gradient">Proyecto?</span>
          </h2>
          <p className="text-xl text-muted-text mb-12 max-w-2xl mx-auto leading-relaxed">
            Hablemos sobre cómo llevar tu visión al siguiente nivel técnico.
            Utiliza el terminal seguro de contacto para iniciar el handshake.
          </p>

          <div className="mb-16">
            <ContactForm />
          </div>

          <div className="flex justify-center flex-wrap gap-6 md:gap-10">
            {contactData.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className={`p-5 rounded-2xl bg-white/5 border border-white/5 transition-all text-muted-text ${item.color} group relative`}
                title={item.label}
              >
                <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-24 flex items-center justify-center gap-2 text-muted-text">
            <MapPin className="w-4 h-4 text-cyber-orange" />
            <span className="text-xs font-mono uppercase tracking-widest">Latam [Operaciones Remotas]</span>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

export default ContactSection;
