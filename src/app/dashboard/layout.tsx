"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageCircle,
  Users,
  Megaphone,
  Bot,
  BookOpen,
  Zap,
  BarChart3,
  Settings,
  CreditCard,
  Phone,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ForgeSuitLogo } from "@/components/ui/ForgeSuitLogo";
import { createClient } from "@/lib/supabase";

const navItems = [
  { label: "Dashboard",     href: "/dashboard",             icon: LayoutDashboard },
  { label: "Conversations", href: "/dashboard/conversations",icon: MessageCircle },
  { label: "Contacts",      href: "/dashboard/contacts",    icon: Users },
  { label: "Campaigns",     href: "/dashboard/campaigns",   icon: Megaphone },
  { label: "AI Agents",     href: "/dashboard/agents",      icon: Bot },
  { label: "Knowledge Base",href: "/dashboard/knowledge",   icon: BookOpen },
  { label: "Automations",   href: "/dashboard/automations", icon: Zap },
  { label: "Analytics",     href: "/dashboard/analytics",   icon: BarChart3 },
];

const bottomItems = [
  { label: "WhatsApp",  href: "/dashboard/whatsapp",  icon: Phone },
  { label: "Billing",   href: "/dashboard/billing",   icon: CreditCard },
  { label: "Settings",  href: "/dashboard/settings",  icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-saas-bg">
      {/* ── Sidebar ── */}
      <aside className="skeu-sidebar w-64 flex flex-col flex-shrink-0 select-none border-r border-saas-border">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-saas-border">
          <div className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-saas-primary text-white shadow-saas-sm group-hover:scale-105 transition-transform"
            >
              <ForgeSuitLogo className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display text-saas-text font-bold text-base leading-tight">
                ForgeSuit
              </p>
              <p className="text-saas-subtext text-[10px] font-mono tracking-widest uppercase mt-0.5">
                AI Platform
              </p>
            </div>
          </div>
        </div>

        {/* Org badge */}
        <div className="mx-4 mt-6 mb-2 px-4 py-3 rounded-xl bg-saas-card border border-saas-border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-saas-text text-xs font-semibold">My Organization</p>
              <p className="text-saas-subtext text-[10px]">Free Plan</p>
            </div>
            <div className="led-green" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 mt-2">
          <p className="px-3 pb-2 text-[10px] font-mono text-saas-subtext uppercase tracking-widest font-semibold">
            Main
          </p>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  active
                    ? "text-primary-600 bg-primary-50"
                    : "text-saas-subtext hover:text-saas-text hover:bg-saas-bg/50"
                )}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-500 rounded-r-full" />
                )}
                <item.icon className={cn(
                  "w-4 h-4 flex-shrink-0 transition-colors",
                  active ? "text-primary-500" : "text-saas-subtext group-hover:text-saas-text"
                )} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 text-primary-500 opacity-60" />}
              </Link>
            );
          })}

          <div className="pt-6">
            <p className="px-3 pb-2 text-[10px] font-mono text-saas-subtext uppercase tracking-widest font-semibold">
              System
            </p>
            {bottomItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    active
                      ? "text-primary-600 bg-primary-50"
                      : "text-saas-subtext hover:text-saas-text hover:bg-saas-bg/50"
                  )}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-500 rounded-r-full" />
                  )}
                  <item.icon className={cn(
                    "w-4 h-4 flex-shrink-0 transition-colors",
                    active ? "text-primary-500" : "text-saas-subtext group-hover:text-saas-text"
                  )} />
                  <span className="flex-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

          <div className="p-4 border-t border-saas-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-saas-bg cursor-pointer group transition-all duration-200 text-left"
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white bg-saas-subtext shadow-sm"
              >
                U
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-saas-text text-sm font-medium truncate group-hover:text-primary-600 transition-colors">User</p>
                <p className="text-saas-subtext text-xs truncate">user@example.com</p>
              </div>
              <LogOut className="w-4 h-4 text-saas-subtext group-hover:text-red-500 transition-colors" />
            </button>
          </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto w-full pt-4">
        {children}
      </main>
    </div>
  );
}
