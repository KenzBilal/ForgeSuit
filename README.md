# ForgeSuit — AI-powered WhatsApp CRM Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-ff55ff?logo=framer" />
</p>

> Transform your WhatsApp into a high-converting, automated sales engine. Connect with millions, qualify leads instantly, and close deals 10x faster using advanced AI agents.

---

## ✨ Features

- **AI-powered WhatsApp automation** — Auto-reply, intent categorization, smart follow-ups
- **Full CRM dashboard** — Conversations, Contacts, Campaigns, Agents, Analytics
- **Premium landing page** — 11-section world-class SaaS marketing site
- **Login / Signup system** — Dual-panel auth pages with Google OAuth support
- **Real-time analytics** — Live charts with Recharts, AI resolution rates, conversion tracking
- **Deep integration ready** — Supabase Auth + Database, REST/Webhook ready

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + Google OAuth |
| Charts | Recharts |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/           # Dashboard routes
│   │   ├── conversations/   # WhatsApp conversation manager
│   │   ├── layout.tsx       # Dashboard sidebar layout
│   │   └── page.tsx         # Dashboard home (metrics + charts)
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── globals.css          # Design system tokens
│   ├── layout.tsx           # Root layout + metadata
│   └── page.tsx             # Landing page
├── components/
│   ├── landing/             # Landing page sections
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TrustSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── WorkflowSection.tsx
│   │   ├── DashboardPreview.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── Footer.tsx
│   └── ui/
│       └── ForgeSuitLogo.tsx  # Custom SVG logo component
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- A Supabase project (for auth + database)

### Setup

```bash
# Clone the repository
git clone https://github.com/KenzBilal/ForgeSuit.git
cd ForgeSuit

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Marketing landing page (11 sections) |
| `/login` | Login page |
| `/signup` | Signup / Registration page |
| `/dashboard` | Main CRM dashboard with metrics |
| `/dashboard/conversations` | WhatsApp conversation manager |

---

## 🎨 Design System

ForgeSuit uses a custom Tailwind design system based around `saas-*` tokens:

- **Primary**: Indigo 600 (`#4f46e5`)
- **Secondary**: Purple 600 (`#9333ea`)
- **Background**: `#fafafa`
- **Cards**: White with `border border-saas-border`
- **Typography**: Inter (body) + Plus Jakarta Sans (display headings)

---

## 📝 License

MIT License — see [LICENSE](./LICENSE) for details.

---

<p align="center">Built with ❤️ by <a href="https://github.com/KenzBilal">KenzBilal</a></p>
