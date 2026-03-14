import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        geist: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        saas: {
          primary: "#4f46e5",    // Indigo 600
          "primary-light": "#6366f1", // Indigo 500
          secondary: "#9333ea",  // Purple 600
          "secondary-light": "#a855f7", // Purple 500
          bg: "#fafafa",         // Light Neutral
          card: "#ffffff",
          text: "#0f172a",       // Near black
          subtext: "#475569",    // Slate 600
          border: "#e2e8f0",     // Slate 200
        },
        neo: {
          bg: "#f3f5f8",
          card: "#ffffff",
          text: "#1e293b",
          subtext: "#64748b",
          border: "#e2e8f0",
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: {
          500: "#10b981",
        },
        warning: {
          500: "#f59e0b",
        },
        danger: {
          500: "#ef4444",
        },
      },
      boxShadow: {
        "saas-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "saas-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "saas-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "saas-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "saas-glow": "0 0 30px 0 rgba(79, 70, 229, 0.3)",
        "saas-glow-secondary": "0 0 30px 0 rgba(147, 51, 234, 0.3)",
        "neo-sm": "4px 4px 8px #e2e5e9, -4px -4px 8px #ffffff",
        "neo-md": "8px 8px 16px #e2e5e9, -8px -8px 16px #ffffff",
        "neo-lg": "12px 12px 24px #e2e5e9, -12px -12px 24px #ffffff",
        "neo-inset": "inset 4px 4px 8px #e2e5e9, inset -4px -4px 8px #ffffff",
        "neo-card": "8px 8px 16px #e2e5e9, -8px -8px 16px #ffffff",
        "neo-active": "inset 2px 2px 5px #e2e5e9, inset -2px -2px 5px #ffffff",
      },
      borderRadius: {
        "neo": "16px",
      },
      animation: {
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 3s",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
