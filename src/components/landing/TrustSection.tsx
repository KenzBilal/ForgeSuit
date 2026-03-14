export default function TrustSection() {
  const companies = [
    "ACME Corp", "GlobalTech", "StartUp Inc", "Venture Co", "SaaSify", 
    "CloudSync", "NextGen", "Innovate LLC", "Growth Scale", "DataFlow"
  ];

  return (
    <section className="py-10 border-y border-saas-border bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-center text-sm font-semibold text-saas-subtext uppercase tracking-widest">
          Trusted by innovative teams worldwide
        </p>
      </div>
      
      {/* Infinite marquee */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
          {[...companies, ...companies].map((company, index) => (
            <div 
              key={index} 
              className="font-display text-2xl font-bold text-slate-300 transition-colors duration-300 hover:text-saas-primary select-none cursor-default"
            >
              {company}
            </div>
          ))}
        </div>
        
        {/* Left / Right Fade masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
