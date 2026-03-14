"use client";

import { motion } from "framer-motion";
import { MessageCircle, Bot, Zap, ArrowUpRight } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-saas-text relative overflow-hidden">
      {/* Dark background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-saas-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white tracking-tight mb-4"
          >
            A command center for growth
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Experience the snappiest, most beautiful dashboard ever created for WhatsApp CRM. Designed for power users, accessible to everyone.
          </motion.p>
        </div>

        {/* Dashboard Grid Mockup */}
        <div className="bg-[#0b1121] rounded-2xl border border-slate-800 shadow-2xl p-4 lg:p-8 aspect-video w-full flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stat Card 1 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#1e293b]/50 border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-saas-primary/20 flex items-center justify-center text-saas-primary">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                  <ArrowUpRight className="w-3 h-3" /> +12.4%
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-white mb-1">1,284</p>
              <p className="text-slate-400 text-sm">Total Conversations</p>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#1e293b]/50 border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                  <ArrowUpRight className="w-3 h-3" /> +3.2%
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-white mb-1">68%</p>
              <p className="text-slate-400 text-sm">AI Resolution Rate</p>
            </motion.div>

            {/* Stat Card 3 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#1e293b]/50 border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                  <ArrowUpRight className="w-3 h-3" /> +18s
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-white mb-1">1m 24s</p>
              <p className="text-slate-400 text-sm">Avg Response Time</p>
            </motion.div>
          </div>

          <div className="flex-1 bg-[#1e293b]/30 border border-slate-700/30 rounded-xl p-6 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
               {/* Abstract chart wave SVG placeholder */}
              <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,200 L0,200 Z" fill="url(#blue-grad)" opacity="0.2"/>
                <path d="M0,120 C150,220 350,20 500,120 C650,220 850,20 1000,120" fill="none" stroke="#3b82f6" strokeWidth="3"/>
                <defs>
                  <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
