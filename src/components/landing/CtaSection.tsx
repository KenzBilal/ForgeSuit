"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0A0F1C]">
      {/* Immersive background glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[150%] bg-saas-primary opacity-30 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[120%] bg-saas-secondary opacity-20 blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md shadow-2xl">
          <Phone className="w-8 h-8 text-white" />
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight mb-6"
        >
          Start building today.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed"
        >
          Join thousands of modern teams scaling their global sales and support with our AI-powered WhatsApp CRM platform.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-saas-text font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
          >
            Start 14-day Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
          >
            Book a Demo
          </button>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-sm text-slate-400"
        >
          Free migration included • Set up in under 10 minutes
        </motion.p>

      </div>
    </section>
  );
}
