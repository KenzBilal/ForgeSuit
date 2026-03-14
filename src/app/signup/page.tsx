"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { ForgeSuitLogo } from "@/components/ui/ForgeSuitLogo";

const PERKS = [
  "14-day free trial, no credit card required",
  "AI-powered WhatsApp automation from day one",
  "Connect unlimited WhatsApp numbers",
  "Cancel anytime, no questions asked",
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // Simulate sign-up — hook up Supabase here
    await new Promise((res) => setTimeout(res, 1400));
    setIsLoading(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-saas-bg flex">
      {/* ── Left: Brand Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-saas-text flex-col justify-between p-12 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-saas-primary/30 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-saas-secondary/20 blur-[100px] pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <div className="w-10 h-10 rounded-xl bg-saas-primary flex items-center justify-center shadow-saas-glow group-hover:scale-105 transition-transform">
            <ForgeSuitLogo className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight">
            ForgeSuit
          </span>
        </Link>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4">Get started free</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Your AI-powered<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              growth engine.
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-10">
            Join 14,000+ businesses automating WhatsApp sales with ForgeSuit.
          </p>

          <ul className="space-y-4">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{perk}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social proof strip */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {["S","M","E","J","K"].map((initial, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-saas-text bg-indigo-600 flex items-center justify-center text-white text-xs font-bold"
              >
                {initial}
              </div>
            ))}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Join 14k+ teams</p>
            <p className="text-slate-500 text-xs">Already automating with ForgeSuit</p>
          </div>
        </div>
      </div>

      {/* ── Right: Signup Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 mb-10 group">
          <div className="w-9 h-9 rounded-xl bg-saas-primary flex items-center justify-center shadow-saas-glow group-hover:scale-105 transition-transform">
            <ForgeSuitLogo className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-saas-text tracking-tight">ForgeSuit</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-saas-subtext text-sm">
              Start automating in minutes — free for 14 days.
            </p>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-saas-border bg-white text-saas-text text-sm font-semibold hover:bg-slate-50 hover:border-saas-primary/30 transition-all duration-200 shadow-saas-sm mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-saas-border" />
            <span className="text-xs text-saas-subtext font-medium">or with email</span>
            <div className="flex-1 h-px bg-saas-border" />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-saas-text mb-2" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-saas-border bg-white text-saas-text placeholder:text-saas-subtext/60 text-sm focus:outline-none focus:border-saas-primary focus:ring-2 focus:ring-saas-primary/20 transition-all duration-200 shadow-saas-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-saas-text mb-2" htmlFor="signup-email">
                Work email
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-saas-border bg-white text-saas-text placeholder:text-saas-subtext/60 text-sm focus:outline-none focus:border-saas-primary focus:ring-2 focus:ring-saas-primary/20 transition-all duration-200 shadow-saas-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-saas-text mb-2" htmlFor="signup-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-saas-border bg-white text-saas-text placeholder:text-saas-subtext/60 text-sm focus:outline-none focus:border-saas-primary focus:ring-2 focus:ring-saas-primary/20 transition-all duration-200 shadow-saas-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-saas-subtext hover:text-saas-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength hint */}
              {password.length > 0 && (
                <div className="mt-2 flex gap-1">
                  {[1,2,3,4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        password.length >= i * 3
                          ? password.length >= 12
                            ? "bg-emerald-500"
                            : password.length >= 8
                            ? "bg-amber-400"
                            : "bg-red-400"
                          : "bg-saas-border"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-saas-primary text-white text-sm font-semibold shadow-saas-md hover:shadow-saas-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create free account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-saas-subtext">
            By creating an account you agree to our{" "}
            <Link href="#" className="text-saas-primary hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="text-saas-primary hover:underline">Privacy Policy</Link>.
          </p>

          <p className="mt-6 text-center text-sm text-saas-subtext">
            Already have an account?{" "}
            <Link href="/login" className="text-saas-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
