import Link from "next/link";
import { MessageCircle, Twitter, Github, Linkedin } from "lucide-react";
import { ForgeSuitLogo } from "@/components/ui/ForgeSuitLogo";

export default function Footer() {
  return (
    <footer className="bg-saas-card pt-20 pb-10 border-t border-saas-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-saas-primary text-white flex items-center justify-center font-bold text-lg shadow-saas-sm group-hover:scale-105 transition-transform">
                <ForgeSuitLogo className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-saas-text tracking-tight">
                ForgeSuit
              </span>
            </Link>
            <p className="text-saas-subtext text-sm mb-6 max-w-sm">
              The AI-powered CRM that transforms your WhatsApp into a high-converting, automated sales machine.
            </p>
            <div className="flex items-center gap-4 text-saas-subtext">
              <Link href="#" className="hover:text-saas-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-saas-primary transition-colors"><Github className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-saas-primary transition-colors"><Linkedin className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-saas-text mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-saas-subtext">
              <li><Link href="#features" className="hover:text-saas-primary transition-colors">Features</Link></li>
              <li><Link href="#solutions" className="hover:text-saas-primary transition-colors">Solutions</Link></li>
              <li><Link href="#pricing" className="hover:text-saas-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-saas-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-saas-text mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-saas-subtext">
              <li><Link href="#" className="hover:text-saas-primary transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-saas-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-saas-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-saas-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-saas-text mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-saas-subtext">
              <li><Link href="#" className="hover:text-saas-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-saas-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-saas-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-saas-primary transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-saas-border flex flex-col md:flex-row items-center justify-between text-sm text-saas-subtext">
          <p>© 2026 ForgeSuit. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
