"use client";

import { motion } from "framer-motion";
import { Download, Cpu, Activity, TrendingUp } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      num: "01",
      title: "Connect WhatsApp",
      description: "Link your Business API in 2 minutes. We auto-sync your entire contact history securely.",
      icon: Download,
    },
    {
      num: "02",
      title: "Configure AI",
      description: "Upload your PDFs, website URLs, and FAQs. The AI learns your business tone instantly.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Automate & Route",
      description: "The AI answers 80% of questions. Complex queries are routed to humans with full context.",
      icon: Activity,
    },
    {
      num: "04",
      title: "Scale Revenue",
      description: "Use our analytics to understand intent and launch targeted re-engagement campaigns.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white border-t border-saas-border">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-saas-text tracking-tight mb-4"
          >
            How it works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-saas-subtext text-lg"
          >
            A frictionless setup process designed for velocity. Go from creating an account to automating responses in under 10 minutes.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line background (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-saas-border -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Number Badge */}
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-saas-border shadow-saas-sm flex items-center justify-center font-display font-bold text-xl text-saas-text mb-6 group-hover:border-saas-primary group-hover:text-saas-primary transition-colors duration-300 relative z-10">
                  {step.num}
                  <div className="absolute inset-0 bg-saas-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Icon small */}
                <div className="w-8 h-8 rounded-full bg-saas-bg flex items-center justify-center text-saas-subtext mb-4">
                  <step.icon className="w-4 h-4" />
                </div>
                
                <h3 className="font-bold text-saas-text text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-saas-subtext leading-relaxed px-4">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
