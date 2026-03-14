import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustSection from "@/components/landing/TrustSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ProductShowcase from "@/components/landing/ProductShowcase";
import WorkflowSection from "@/components/landing/WorkflowSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-saas-bg flex flex-col relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-saas-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-saas-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-saas-secondary/10 blur-[120px] pointer-events-none" />

      <Navbar />
      
      <main className="flex-1 w-full pt-24">
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <ProductShowcase />
        <WorkflowSection />
        <DashboardPreview />
        <PricingSection />
        <TestimonialSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
