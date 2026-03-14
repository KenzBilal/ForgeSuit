"use client";

import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      desc: "For small teams starting with WhatsApp automation.",
      price: "$49",
      period: "/month",
      features: [
        "1 WhatsApp number",
        "Up to 1,000 AI replies/mo",
        "Basic intents & routing",
        "Standard analytics",
        "Community support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro",
      desc: "For growing businesses scaling their sales engine.",
      price: "$149",
      period: "/month",
      features: [
        "Up to 5 WhatsApp numbers",
        "Unlimited AI replies",
        "Custom knowledge base (PDFs)",
        "Advanced intent routing",
        "CRM Integrations (HubSpot, Salesforce)",
        "Priority 24/7 support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "For large organizations with complex global needs.",
      price: "Custom",
      period: "",
      features: [
        "Unlimited WhatsApp numbers",
        "Dedicated local AI models",
        "Custom SLA & compliance",
        "Data residency options",
        "Dedicated Success Manager",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-saas-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-saas-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saas-primary/10 text-saas-primary text-xs font-bold uppercase tracking-widest mb-4"
          >
            Simple Pricing
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold text-saas-text tracking-tight mb-4"
          >
            Predictable scale, infinite ROI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-saas-subtext text-lg"
          >
            Choose the perfect plan for your communication volume. Every plan includes a 14-day free trial.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl bg-white p-8 flex flex-col h-full ${
                plan.popular 
                  ? "border border-saas-primary/50 shadow-saas-glow scale-100 lg:scale-105 z-10" 
                  : "border border-saas-border shadow-saas-md z-0"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-saas-primary to-saas-secondary text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-saas-sm">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-saas-text mb-2">{plan.name}</h3>
                <p className="text-sm text-saas-subtext h-10">{plan.desc}</p>
              </div>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-saas-text">{plan.price}</span>
                {plan.period && <span className="text-saas-subtext font-medium">{plan.period}</span>}
              </div>
              
              <button 
                className={`w-full py-3 rounded-xl font-bold transition-all duration-200 mb-8 ${
                  plan.popular 
                    ? "bg-saas-primary text-white shadow-saas-md hover:shadow-saas-glow hover:-translate-y-0.5" 
                    : "bg-slate-50 text-saas-text border border-saas-border hover:bg-slate-100 hover:-translate-y-0.5"
                }`}
              >
                {plan.cta}
              </button>
              
              <div className="flex-1">
                <p className="text-sm font-semibold text-saas-text mb-4">What's included:</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600 font-bold" />
                      </div>
                      <span className="text-sm text-saas-subtext font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
