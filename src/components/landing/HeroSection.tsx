"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saas-primary/10 border border-saas-primary/20 text-saas-primary text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saas-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-saas-primary"></span>
              </span>
              ForgeSuit 2.0 is live
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-saas-text tracking-tight leading-[1.1] mb-6">
              Automate your <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-saas-primary to-saas-secondary">
                WhatsApp sales
              </span>
            </h1>
            
            <p className="text-lg text-saas-subtext mb-8 max-w-lg leading-relaxed">
              Transform your WhatsApp into a high-converting, automated sales engine. Connect with millions, qualify leads instantly, and close deals 10x faster using our advanced AI agents.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-saas-primary text-white font-semibold shadow-saas-lg hover:shadow-saas-glow hover:-translate-y-1 transition-all duration-300"
              >
                Start building today <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-saas-text font-semibold border border-saas-border shadow-saas-sm hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300"
              >
                <PlayCircle className="w-5 h-5 text-saas-subtext" /> Watch Video
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm text-saas-subtext font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> No credit card required
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 14-day free trial
              </div>
            </div>
          </motion.div>

          {/* Right Content - Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* The actual floating mockup */}
            <div className="relative w-full max-w-[600px] animate-float">
              {/* Back glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-saas-primary to-saas-secondary blur-[80px] opacity-20 rounded-full" />
              
              {/* Glass Mockup Window */}
              <div className="relative bg-white border border-saas-border/60 rounded-2xl shadow-saas-xl overflow-hidden backdrop-blur-xl">
                {/* Mockup Top Bar */}
                <div className="h-12 border-b border-saas-border/40 bg-slate-50/50 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                
                {/* Mockup Inside content */}
                <div className="p-6 h-[400px] bg-saas-bg/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-6 w-32 bg-slate-200 rounded animate-pulse-soft" />
                    <div className="h-8 w-8 bg-saas-primary/10 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-saas-primary rounded-full animate-pulse-glow" />
                    </div>
                  </div>
                  
                  {/* Fake chart/bars */}
                  <div className="space-y-4 mb-8">
                    <div className="h-3 w-full bg-slate-200 rounded overflow-hidden">
                      <div className="h-full w-[70%] bg-saas-primary" />
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded overflow-hidden">
                      <div className="h-full w-[45%] bg-saas-secondary" />
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded overflow-hidden">
                      <div className="h-full w-[85%] bg-emerald-500" />
                    </div>
                  </div>

                  {/* Fake small cards floating */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-saas-border shadow-saas-sm">
                      <div className="w-6 h-6 bg-emerald-100 rounded mb-2" />
                      <div className="h-4 w-16 bg-slate-200 rounded mb-1" />
                      <div className="h-8 w-24 bg-slate-800 rounded" />
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-saas-border shadow-saas-sm">
                      <div className="w-6 h-6 bg-saas-primary/10 rounded mb-2" />
                      <div className="h-4 w-16 bg-slate-200 rounded mb-1" />
                      <div className="h-8 w-24 bg-slate-800 rounded" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements over the mockup */}
              <motion.div 
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-24 bg-white p-4 rounded-xl shadow-saas-lg border border-saas-border flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                  $
                </div>
                <div>
                  <p className="text-xs text-saas-subtext font-medium">New deal closed</p>
                  <p className="text-sm font-bold text-saas-text">+$4,200.00</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ y: 0 }}
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 bottom-20 bg-saas-text text-white p-4 rounded-xl shadow-saas-lg border border-white/10 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-glow" />
                <p className="text-sm font-medium">AI Agent answering...</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
