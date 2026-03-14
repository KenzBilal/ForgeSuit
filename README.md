# WhatsApp AI CRM — Frontend Setup

## ⚡ Run in 3 commands

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
open http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (fonts)
│   ├── globals.css             ← Skeuomorphic design system
│   ├── page.tsx                ← Redirects to /dashboard
│   └── dashboard/
│       ├── layout.tsx          ← Sidebar navigation
│       ├── page.tsx            ← Dashboard overview ✅
│       ├── conversations/      ← Next to build
│       └── [slug]/             ← Placeholder for other routes
├── lib/
│   ├── supabase.ts             ← Supabase browser client
│   └── utils.ts                ← cn() helper
```

## 🔑 Environment Variables

Already configured in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🎨 Design System

The skeuomorphic design uses these CSS classes:
- `.skeu-card`       → Light parchment card with depth
- `.skeu-card-dark`  → Dark leather card
- `.skeu-btn`        → Brass gradient button
- `.skeu-input`      → Inset input field
- `.skeu-sidebar`    → Dark sidebar
- `.led-green/yellow/red` → LED status indicators
- `.stitched`        → Dashed border leather effect
- `.embossed`        → Text depth effect

## 📦 Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** (custom skeuomorphic tokens)
- **Recharts** (charts)
- **Supabase** (auth + database)
- **Lucide React** (icons)
- **DM Sans + Playfair Display** (fonts)
