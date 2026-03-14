"use client";

import { motion } from "framer-motion";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "Our sales team used to drown in WhatsApp messages. Since we deployed ForgeSuit, the AI categorizes intent immediately, and we've seen a 300% increase in closed deals.",
      author: "Sarah Jenkins",
      title: "VP of Sales, TechGrowth",
      avatar: "S",
      bg: "bg-indigo-100 text-indigo-700"
    },
    {
      quote: "The deep analytics completely changed how we view customer support. 80% of our tickets are now resolved instantly by the AI, saving us thousands of hours monthly.",
      author: "Marcus Chen",
      title: "Head of Support, ScaleUp Inc",
      avatar: "M",
      bg: "bg-emerald-100 text-emerald-700"
    },
    {
      quote: "It's rare to find a tool that is both incredibly powerful and beautifully designed. The dashboard alone is worth the price. The speed at which it operates is mind-blowing.",
      author: "Elena Rodriguez",
      title: "CEO, Nexa Retail",
      avatar: "E",
      bg: "bg-rose-100 text-rose-700"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-saas-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-saas-text tracking-tight mb-4"
          >
            Built for velocity. Loved by teams.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-saas-bg rounded-3xl p-8 border border-saas-border shadow-sm transition-all duration-300 hover:shadow-saas-md flex flex-col"
            >
              <div className="mb-6 flex gap-1">
                {[1,2,3,4,5].map(star => (
                   <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                   </svg>
                ))}
              </div>
              <p className="text-saas-text font-medium leading-relaxed italic mb-8 flex-1">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 rounded-full ${t.bg} flex items-center justify-center font-bold text-lg font-display`}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-saas-text">{t.author}</h4>
                  <p className="text-xs text-saas-subtext font-medium">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
