"use client";

import { useState, useRef } from "react";
import {
  Search, Plus, Filter, Users, UserPlus, Bot, UserMinus,
  Phone, Tag, ChevronRight, ArrowUpRight, MoreHorizontal,
  X, Edit3, MessageCircle, Trash2, Star, ChevronDown,
  Clock, MapPin, DollarSign, Calendar, StickyNote,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const CONTACTS_DATA = [
  {
    id: 1, name: "Arjun Mehta", phone: "+91 98765 43210", email: "arjun@techcorp.in",
    tags: ["Hot Lead", "E-commerce"], stage: "Negotiation", lastSeen: "2 mins ago",
    lastMsg: "I need help with my order status", ai: true, optedOut: false,
    budget: "₹50,000", location: "Mumbai", source: "WhatsApp Inbound", createdAt: "Mar 10, 2026",
    conversations: 14, notes: "Very interested in Pro plan. Follow up on pricing.",
    starred: true,
  },
  {
    id: 2, name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@startup.io",
    tags: ["Warm Lead"], stage: "Qualification", lastSeen: "8 mins ago",
    lastMsg: "What are your business hours?", ai: false, optedOut: false,
    budget: "₹20,000", location: "Bangalore", source: "Landing Page", createdAt: "Mar 12, 2026",
    conversations: 5, notes: "Prefers email follow-up. Decision maker confirmed.",
    starred: false,
  },
  {
    id: 3, name: "Rahul Gupta", phone: "+91 76543 21098", email: "rahul@agency.com",
    tags: ["Appointment", "Agency"], stage: "Demo Scheduled", lastSeen: "15 mins ago",
    lastMsg: "Can I reschedule my appointment?", ai: true, optedOut: false,
    budget: "₹35,000", location: "Delhi", source: "Referral", createdAt: "Mar 8, 2026",
    conversations: 9, notes: "",
    starred: true,
  },
  {
    id: 4, name: "Sneha Patel", phone: "+91 65432 10987", email: "sneha@brand.in",
    tags: ["Closed Won"], stage: "Closed", lastSeen: "1 hour ago",
    lastMsg: "Thank you for the quick reply!", ai: true, optedOut: false,
    budget: "₹80,000", location: "Ahmedabad", source: "Campaign", createdAt: "Feb 28, 2026",
    conversations: 22, notes: "Successfully onboarded. Customer since March 2026.",
    starred: false,
  },
  {
    id: 5, name: "Vikram Nair", phone: "+91 54321 09876", email: "vikram@enterprise.co",
    tags: ["Enterprise", "High Value"], stage: "Proposal", lastSeen: "2 hours ago",
    lastMsg: "Price list for premium plans?", ai: true, optedOut: false,
    budget: "₹2,00,000", location: "Chennai", source: "LinkedIn", createdAt: "Mar 1, 2026",
    conversations: 18, notes: "Looking at 50+ seat plan. Send enterprise pricing doc.",
    starred: true,
  },
  {
    id: 6, name: "Deepa Krishnan", phone: "+91 43210 98765", email: "deepa@design.in",
    tags: ["Demo Requested"], stage: "Discovery", lastSeen: "3 hours ago",
    lastMsg: "Send me the demo video", ai: false, optedOut: false,
    budget: "₹15,000", location: "Hyderabad", source: "WhatsApp Inbound", createdAt: "Mar 14, 2026",
    conversations: 3, notes: "Watched pricing page 3 times. High intent.",
    starred: false,
  },
  {
    id: 7, name: "Manish Joshi", phone: "+91 32109 87654", email: "manish@retail.com",
    tags: ["Opted Out"], stage: "Closed Lost", lastSeen: "2 days ago",
    lastMsg: "Please don't contact me anymore", ai: false, optedOut: true,
    budget: "₹10,000", location: "Jaipur", source: "Cold Outreach", createdAt: "Feb 15, 2026",
    conversations: 2, notes: "",
    starred: false,
  },
];

const TAG_COLORS: Record<string, string> = {
  "Hot Lead":       "bg-red-50 text-red-600 border-red-200",
  "E-commerce":     "bg-blue-50 text-blue-600 border-blue-200",
  "Warm Lead":      "bg-orange-50 text-orange-600 border-orange-200",
  "Appointment":    "bg-purple-50 text-purple-600 border-purple-200",
  "Agency":         "bg-indigo-50 text-indigo-600 border-indigo-200",
  "Closed Won":     "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Enterprise":     "bg-violet-50 text-violet-600 border-violet-200",
  "High Value":     "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Demo Requested": "bg-sky-50 text-sky-600 border-sky-200",
  "Opted Out":      "bg-slate-50 text-slate-500 border-slate-200",
};

const STAGE_COLOR: Record<string, string> = {
  "Discovery":       "text-slate-500",
  "Qualification":   "text-blue-600",
  "Demo Scheduled":  "text-purple-600",
  "Proposal":        "text-amber-600",
  "Negotiation":     "text-orange-600",
  "Closed":          "text-emerald-600",
  "Closed Lost":     "text-red-500",
};

const METRIC_CARDS = [
  { label: "Total Contacts",  value: "847",  delta: "+8.1%",  up: true,  icon: Users,    color: "#4f46e5" },
  { label: "New This Week",   value: "34",   delta: "+22%",   up: true,  icon: UserPlus, color: "#10b981" },
  { label: "AI Tagged",       value: "619",  delta: "+5.4%",  up: true,  icon: Bot,      color: "#4f46e5" },
  { label: "Opted Out",       value: "12",   delta: "-2",     up: false, icon: UserMinus,color: "#ef4444" },
];

const ALL_TAGS = ["Hot Lead", "Warm Lead", "Enterprise", "High Value", "Appointment", "Closed Won", "Demo Requested"];

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [selected, setSelected] = useState<typeof CONTACTS_DATA[0] | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = CONTACTS_DATA.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tagFilter === "All" || c.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">Contacts</h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">Manage your CRM contacts and leads</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saas-subtext" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts..."
              className="pl-9 pr-4 py-2.5 text-sm rounded-xl border border-saas-border bg-white focus:outline-none focus:border-saas-primary focus:ring-2 focus:ring-saas-primary/20 transition-all w-60"
            />
          </div>
          <div className="relative">
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="appearance-none text-sm font-medium text-saas-subtext bg-white border border-saas-border rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-saas-primary transition-all"
            >
              <option value="All">All Tags</option>
              {ALL_TAGS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-saas-subtext pointer-events-none" />
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-saas-primary text-white text-sm font-semibold shadow-saas-md hover:shadow-saas-glow hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="w-4 h-4" /> Add Contact
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {METRIC_CARDS.map((card) => (
          <div key={card.label} className="skeu-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.color}18`, color: card.color }}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-xs font-mono font-semibold px-2 py-1 rounded-full flex items-center gap-1",
                card.up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
              )}>
                {card.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5 rotate-180" />}
                {card.delta}
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-saas-text leading-none mb-1">{card.value}</p>
            <p className="text-saas-subtext text-sm font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="skeu-card overflow-hidden">
        <div className="px-6 py-4 border-b border-saas-border flex items-center justify-between">
          <p className="font-display font-semibold text-saas-text">{filtered.length} contacts</p>
        </div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Users className="w-12 h-12 text-saas-border mb-4" />
            <p className="font-semibold text-saas-text mb-1">No contacts found</p>
            <p className="text-sm text-saas-subtext">Try adjusting your search or filter</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-saas-border bg-saas-bg/50">
                {["Contact", "Phone", "Last Message", "Tags", "Stage", "Last Seen", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-[11px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-saas-border/60 hover:bg-saas-bg/40 cursor-pointer transition-colors group"
                  onClick={() => setSelected(contact)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-saas-text group-hover:text-saas-primary transition-colors">{contact.name}</p>
                          {contact.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                          {contact.optedOut && <span className="text-[10px] font-mono px-1.5 py-0.5 bg-red-50 text-red-500 border border-red-200 rounded-full">Opted out</span>}
                        </div>
                        <p className="text-xs text-saas-subtext">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-saas-subtext flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />{contact.phone}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-xs text-saas-subtext truncate">{contact.lastMsg}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {contact.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", TAG_COLORS[tag] || "bg-slate-50 text-slate-500 border-slate-200")}>
                          {tag}
                        </span>
                      ))}
                      {contact.tags.length > 2 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-slate-50 text-slate-500 border-slate-200">
                          +{contact.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-xs font-semibold", STAGE_COLOR[contact.stage] || "text-saas-subtext")}>
                      {contact.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-saas-subtext flex items-center gap-1">
                      <Clock className="w-3 h-3" />{contact.lastSeen}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg text-saas-subtext hover:text-primary-600 hover:bg-primary-50 transition-all" onClick={(e) => { e.stopPropagation(); setSelected(contact); }}>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-saas-subtext hover:text-saas-text hover:bg-saas-bg transition-all" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-96 bg-saas-card border-l border-saas-border h-full flex flex-col shadow-saas-xl overflow-y-auto">
            {/* Slide-over Header */}
            <div className="px-6 py-5 border-b border-saas-border flex items-center justify-between">
              <h2 className="font-display font-bold text-saas-text text-lg">Contact Details</h2>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg text-saas-subtext hover:text-saas-text hover:bg-saas-bg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile */}
            <div className="px-6 py-6 border-b border-saas-border">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 font-bold text-xl flex items-center justify-center flex-shrink-0">
                  {selected.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-saas-text text-base">{selected.name}</h3>
                    {selected.starred && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </div>
                  <p className="text-xs text-saas-subtext mt-0.5 flex items-center gap-1">
                    <Phone className="w-3 h-3" />{selected.phone}
                  </p>
                  <p className="text-xs text-saas-subtext mt-0.5">{selected.email}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {selected.tags.map((tag) => (
                      <span key={tag} className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", TAG_COLORS[tag] || "bg-slate-50 text-slate-500 border-slate-200")}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div className="px-6 py-4 border-b border-saas-border space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">Attributes</p>
              {[
                { icon: DollarSign, label: "Budget",    value: selected.budget },
                { icon: MapPin,     label: "Location",  value: selected.location },
                { icon: Calendar,   label: "Created",   value: selected.createdAt },
                { icon: Tag,        label: "Source",    value: selected.source },
                { icon: MessageCircle, label: "Conversations", value: `${selected.conversations} total` },
              ].map((a) => (
                <div key={a.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-saas-subtext">
                    <a.icon className="w-3.5 h-3.5" />
                    <span className="text-xs">{a.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-saas-text">{a.value}</span>
                </div>
              ))}
            </div>

            {/* Lead Stage */}
            <div className="px-6 py-4 border-b border-saas-border">
              <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext font-semibold mb-3">Lead Stage</p>
              <div className="grid grid-cols-3 gap-2">
                {["Discovery","Qualification","Demo Scheduled","Proposal","Negotiation","Closed"].map((stage) => (
                  <button
                    key={stage}
                    className={cn(
                      "text-[11px] font-semibold px-2 py-1.5 rounded-lg border text-center transition-all",
                      selected.stage === stage
                        ? "bg-saas-primary text-white border-saas-primary"
                        : "border-saas-border text-saas-subtext hover:border-saas-primary/40 hover:text-saas-text"
                    )}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="px-6 py-4 border-b border-saas-border">
              <div className="flex items-center gap-2 mb-3">
                <StickyNote className="w-4 h-4 text-amber-500" />
                <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">Notes</p>
              </div>
              {selected.notes && (
                <p className="text-xs text-saas-subtext leading-relaxed mb-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  {selected.notes}
                </p>
              )}
              <textarea
                rows={3}
                placeholder="Add a note..."
                className="w-full resize-none text-xs px-3 py-2.5 rounded-xl border border-saas-border bg-saas-bg text-saas-text placeholder:text-saas-subtext/50 focus:outline-none focus:border-saas-primary focus:ring-1 focus:ring-saas-primary/20 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 text-sm font-semibold px-3 py-2.5 rounded-xl bg-saas-primary text-white hover:shadow-saas-glow transition-all">
                  <MessageCircle className="w-4 h-4" /> Message
                </button>
                <button className="flex items-center justify-center gap-2 text-sm font-semibold px-3 py-2.5 rounded-xl border border-saas-border text-saas-subtext hover:border-saas-primary/40 hover:text-saas-text transition-all">
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center justify-center gap-2 text-sm font-medium px-3 py-2.5 rounded-xl border border-saas-border text-saas-subtext hover:border-saas-primary/40 hover:text-saas-text transition-all col-span-2">
                  <Trash2 className="w-4 h-4 text-red-500" /> <span className="text-red-500">Delete Contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
