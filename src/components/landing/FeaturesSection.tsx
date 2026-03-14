"use client";

import { motion } from "framer-motion";
import { Bot, Zap, BarChart3, Shield, Globe2, MessageSquare } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "AI Auto-Replies",
      description: "Train our local AI on your docs to instantly resolve 80% of customer queries without human intervention.",
      color: "text-saas-primary",
      bg: "bg-saas-primary/10",
      delay: 0.1,
    },
    {
      icon: Zap,
      title: "Smart Automations",
      description: "Trigger advanced workflows based on message intent, user language, or time of day.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      delay: 0.2,
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description: "Real-time insights into response times, resolution rates, and team performance metrics.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      delay: 0.3,
    },
    {
      icon: Globe2,
      title: "Multilingual Support",
      description: "Communicate globally. The AI automatically detects and translates conversations in 50+ languages.",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      delay: 0.4,
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption, role-based access control, and GDPR compliant data routing.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      delay: 0.5,
    },
    {
      icon: MessageSquare,
      title: "Unified Inbox",
      description: "Manage multiple WhatsApp Business numbers from a single, high-performance interface.",
      color: "text-saas-secondary",
      bg: "bg-saas-secondary/10",
      delay: 0.6,
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saas-primary/10 text-saas-primary text-xs font-bold uppercase tracking-widest mb-4"
          >
            Powerful Features
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold text-saas-text tracking-tight mb-4"
          >
            Everything you need to scale
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-saas-subtext text-lg"
          >
            We've built all the tools required to turn chaotic WhatsApp inboxes into streamlined revenue generators.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl p-8 border border-saas-border shadow-saas-sm hover:shadow-saas-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle gradient hover effect on background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-saas-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 shadow-sm`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              
              <h3 className="font-display text-xl font-bold text-saas-text mb-3">{feature.title}</h3>
              <p className="text-saas-subtext leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
