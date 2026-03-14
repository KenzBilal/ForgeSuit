"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section className="py-24 bg-saas-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24 lg:mb-32">
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-saas-text mb-6 leading-tight">
              Instantly know who is ready to buy.
            </h2>
            <p className="text-saas-subtext text-lg mb-8 leading-relaxed">
              Our AI analyzes the sentiment and intent of every incoming message in milliseconds. Hot leads are instantly routed to your top sales reps, while support queries are handled autonomously.
            </p>
            
            <ul className="space-y-4">
              {["Intent classification engine", "Automatic lead scoring overlay", "Priority routing rules"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-saas-text font-medium">
                  <CheckCircle2 className="w-5 h-5 text-saas-primary" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Image/Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-2xl bg-white border border-saas-border shadow-saas-xl p-2 aspect-[4/3] overflow-hidden group">
              {/* Back glow */}
              <div className="absolute inset-0 bg-saas-primary opacity-5 blur-[60px] group-hover:opacity-10 transition-opacity duration-500" />
              
              {/* Mockup UI Interface */}
              <div className="w-full h-full bg-saas-bg rounded-xl border border-saas-border/50 flex flex-col overflow-hidden relative z-10">
                {/* Header */}
                <div className="h-10 border-b border-saas-border/40 flex items-center px-4 bg-white/50 backdrop-blur-sm">
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                </div>
                {/* Content */}
                <div className="p-4 flex-1 flex gap-4">
                  {/* Sidebar */}
                  <div className="w-1/3 space-y-2">
                    <div className="h-12 bg-white rounded-lg border border-saas-primary shadow-[0_0_0_1px_rgba(79,70,229,0.1)] p-2 relative">
                      <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse-glow" />
                      <div className="h-2 w-16 bg-slate-200 rounded mb-1.5" />
                      <div className="h-2 w-24 bg-slate-100 rounded" />
                    </div>
                    {[1,2,3].map(i => (
                      <div key={i} className="h-12 bg-white/50 rounded-lg border border-dashed border-saas-border/50 p-2 opacity-50">
                        <div className="h-2 w-16 bg-slate-200 rounded mb-1.5" />
                        <div className="h-2 w-20 bg-slate-100 rounded" />
                      </div>
                    ))}
                  </div>
                  {/* Main Chat Area */}
                  <div className="flex-1 bg-white rounded-lg border border-saas-border shadow-sm p-4 flex flex-col justify-end gap-3">
                    <div className="self-end bg-saas-primary/10 text-saas-primary text-[10px] font-medium px-2 py-1 rounded-l-lg rounded-tr-lg w-3/4">
                      Are you looking to upgrade your plan today?
                    </div>
                    <div className="self-start bg-saas-bg text-saas-text text-[10px] font-medium px-2 py-1 rounded-r-lg rounded-tl-lg w-2/3 shadow-sm border border-saas-border/50">
                      Yes, I need the Enterprise features ASAP.
                    </div>
                    <div className="mt-2 flex items-center justify-center">
                      <div className="bg-emerald-100 text-emerald-700 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        High Intent Detected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Right Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-saas-text mb-6 leading-tight">
              Actionable insights at a glance.
            </h2>
            <p className="text-saas-subtext text-lg mb-8 leading-relaxed">
              Stop guessing. See exactly how your AI is performing, monitor human takeover rates, and track your revenue growth directly linked to WhatsApp interactions in real-time.
            </p>
            
            <ul className="space-y-4">
              {["Custom report builder", "Real-time metrics dashboard", "Agent performance tracking"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-saas-text font-medium">
                  <CheckCircle2 className="w-5 h-5 text-saas-primary" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Left Image/Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-2xl bg-white border border-saas-border shadow-saas-xl p-2 aspect-[4/3] overflow-hidden group">
              {/* Back glow */}
              <div className="absolute inset-0 bg-saas-secondary opacity-5 blur-[60px] group-hover:opacity-10 transition-opacity duration-500" />
              
              {/* Mockup UI Interface */}
              <div className="w-full h-full bg-saas-bg rounded-xl border border-saas-border/50 flex flex-col overflow-hidden relative z-10 p-4 gap-4">
                
                {/* Visual Chart Mockup */}
                <div className="flex-1 bg-white border border-saas-border shadow-sm rounded-lg p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                    <div className="h-4 w-12 bg-emerald-100 rounded-full" />
                  </div>
                  {/* Bars */}
                  <div className="flex-1 flex items-end justify-between gap-2">
                    {[30, 45, 20, 60, 80, 50, 90, 70, 40].map((h, i) => (
                      <div key={i} className="w-full bg-saas-primary/20 rounded-t-sm relative group/bar hover:bg-saas-primary transition-colors" style={{ height: `${h}%` }}>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub Cards */}
                <div className="h-1/3 flex gap-4">
                  <div className="flex-1 bg-white border border-saas-border shadow-sm rounded-lg p-3 flex flex-col justify-center">
                    <div className="h-2 w-16 bg-slate-200 rounded mb-2" />
                    <div className="h-5 w-24 bg-saas-text rounded" />
                  </div>
                  <div className="flex-1 bg-white border border-saas-border shadow-sm rounded-lg p-3 flex flex-col justify-center">
                    <div className="h-2 w-20 bg-slate-200 rounded mb-2" />
                    <div className="h-5 w-16 bg-emerald-500 rounded" />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
