"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Phone,
  Bot,
  User,
  CheckCheck,
  Clock,
  Send,
  Paperclip,
  ChevronDown,
  MoreHorizontal,
  Tag,
  StickyNote,
  Zap,
  ArrowRight,
  Circle,
  AlertCircle,
  XCircle,
  MessageCircle,
  Star,
  Edit3,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const CONVERSATIONS = [
  {
    id: 1, name: "Arjun Mehta", phone: "+91 98765 43210",
    lastMsg: "I need help with my order status, it has been 3 days now",
    time: "2m", status: "ai", unread: 3, windowStatus: "open",
    tags: ["Hot Lead", "E-commerce"], leadStage: "Negotiation",
    budget: "₹50,000", location: "Mumbai", lastSeen: "Just now",
    notes: "Very interested in Pro plan. Follow up on pricing.",
    messages: [
      { id: 1, text: "Hi there! I would like to know about pricing", from: "contact", time: "10:20 AM", ai: false },
      { id: 2, text: "Hello Arjun! Thanks for reaching out to ForgeSuit. We have several plans starting at ₹2,999/month. Would you like to know more about our Pro plan?", from: "agent", time: "10:20 AM", ai: true },
      { id: 3, text: "Yes please, tell me more. What does the Pro plan include?", from: "contact", time: "10:22 AM", ai: false },
      { id: 4, text: "Great choice! The Pro plan includes unlimited contacts, AI automation, campaign manager, and dedicated support. Shall I send you a detailed feature breakdown?", from: "agent", time: "10:22 AM", ai: true },
      { id: 5, text: "I need help with my order status, it has been 3 days now", from: "contact", time: "11:45 AM", ai: false },
    ],
  },
  {
    id: 2, name: "Priya Sharma", phone: "+91 87654 32109",
    lastMsg: "What are your business hours?",
    time: "8m", status: "human", unread: 1, windowStatus: "open",
    tags: ["Warm Lead"], leadStage: "Qualification",
    budget: "₹20,000", location: "Bangalore", lastSeen: "8 mins ago",
    notes: "Prefers email follow-up. Decision maker confirmed.",
    messages: [
      { id: 1, text: "Hello, what are your business hours?", from: "contact", time: "11:37 AM", ai: false },
      { id: 2, text: "Hi Priya! We're available 24/7 via this platform. Our human support team is online 9AM–7PM IST on weekdays.", from: "agent", time: "11:38 AM", ai: false },
    ],
  },
  {
    id: 3, name: "Rahul Gupta", phone: "+91 76543 21098",
    lastMsg: "Can I reschedule my appointment?",
    time: "15m", status: "ai", unread: 0, windowStatus: "expiring",
    tags: ["Appointment"], leadStage: "Demo Scheduled",
    budget: "₹35,000", location: "Delhi", lastSeen: "15 mins ago",
    notes: "",
    messages: [
      { id: 1, text: "Can I reschedule my appointment for tomorrow?", from: "contact", time: "11:30 AM", ai: false },
      { id: 2, text: "Of course, Rahul! I can help you reschedule. What time slots work best for you tomorrow?", from: "agent", time: "11:31 AM", ai: true },
    ],
  },
  {
    id: 4, name: "Sneha Patel", phone: "+91 65432 10987",
    lastMsg: "Thank you for the quick reply!",
    time: "1h", status: "done", unread: 0, windowStatus: "closed",
    tags: ["Closed Won"], leadStage: "Closed",
    budget: "₹80,000", location: "Ahmedabad", lastSeen: "1 hour ago",
    notes: "Successfully onboarded. Customer since March 2026.",
    messages: [
      { id: 1, text: "Thank you for the quick reply!", from: "contact", time: "10:00 AM", ai: false },
      { id: 2, text: "Happy to help, Sneha! Feel free to reach out anytime.", from: "agent", time: "10:01 AM", ai: true },
    ],
  },
  {
    id: 5, name: "Vikram Nair", phone: "+91 54321 09876",
    lastMsg: "Price list for premium plans?",
    time: "2h", status: "ai", unread: 2, windowStatus: "open",
    tags: ["Enterprise", "High Value"], leadStage: "Proposal",
    budget: "₹2,00,000", location: "Chennai", lastSeen: "2 hours ago",
    notes: "Looking at 50+ seat plan. Send enterprise pricing doc.",
    messages: [
      { id: 1, text: "Can you send me the price list for premium plans?", from: "contact", time: "09:30 AM", ai: false },
      { id: 2, text: "Of course, Vikram! Let me put together our enterprise pricing for you. For 50+ seats, we offer custom pricing with dedicated infrastructure.", from: "agent", time: "09:31 AM", ai: true },
    ],
  },
  {
    id: 6, name: "Deepa Krishnan", phone: "+91 43210 98765",
    lastMsg: "Send me the demo video",
    time: "3h", status: "human", unread: 0, windowStatus: "expiring",
    tags: ["Demo Requested"], leadStage: "Discovery",
    budget: "₹15,000", location: "Hyderabad", lastSeen: "3 hours ago",
    notes: "Watched pricing page 3 times. High intent.",
    messages: [
      { id: 1, text: "Can you send me the demo video?", from: "contact", time: "08:45 AM", ai: false },
    ],
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  ai:    { label: "AI Active",  color: "bg-primary-50 text-primary-600 border-primary-200",   dot: "bg-primary-500" },
  human: { label: "Human",     color: "bg-slate-50 text-slate-600 border-slate-200",           dot: "bg-slate-400" },
  done:  { label: "Resolved",  color: "bg-emerald-50 text-emerald-600 border-emerald-200",     dot: "bg-emerald-500" },
};

const WINDOW_CONFIG: Record<string, { icon: typeof Circle; color: string; title: string }> = {
  open:     { icon: Circle,       color: "text-emerald-500", title: "24h window open" },
  expiring: { icon: AlertCircle,  color: "text-amber-500",   title: "Window expiring soon" },
  closed:   { icon: XCircle,      color: "text-slate-300",   title: "Window closed" },
};

const FILTER_TABS = ["All", "Open", "AI Active", "Human", "Resolved"];
const LEAD_STAGES = ["Discovery", "Qualification", "Demo Scheduled", "Proposal", "Negotiation", "Closed"];
const TAG_COLORS = [
  "bg-indigo-50 text-indigo-600 border-indigo-200",
  "bg-emerald-50 text-emerald-600 border-emerald-200",
  "bg-amber-50 text-amber-600 border-amber-200",
  "bg-purple-50 text-purple-600 border-purple-200",
];

export default function ConversationsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Record<number, string>>(
    Object.fromEntries(CONVERSATIONS.map((c) => [c.id, c.notes]))
  );
  const [leadStages, setLeadStages] = useState<Record<number, string>>(
    Object.fromEntries(CONVERSATIONS.map((c) => [c.id, c.leadStage]))
  );

  const filtered = CONVERSATIONS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Open" && c.windowStatus === "open") ||
      (activeFilter === "AI Active" && c.status === "ai") ||
      (activeFilter === "Human" && c.status === "human") ||
      (activeFilter === "Resolved" && c.status === "done");
    return matchesSearch && matchesFilter;
  });

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  const windowTimeLeft = (c: typeof CONVERSATIONS[0]) => {
    if (c.windowStatus === "open") return "23h 12m left";
    if (c.windowStatus === "expiring") return "1h 48m left";
    return "Window closed";
  };

  return (
    <div className="flex h-full overflow-hidden" style={{ height: "calc(100vh - 0px)" }}>

      {/* ── LEFT: Conversation List ── */}
      <div className="w-72 flex-shrink-0 border-r border-saas-border bg-saas-card flex flex-col">
        {/* Header */}
        <div className="px-4 pt-5 pb-3 border-b border-saas-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-display font-bold text-lg text-saas-text">Conversations</h1>
            <span className="text-xs font-mono bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full border border-primary-100 font-semibold">
              {CONVERSATIONS.filter(c => c.unread > 0).length} unread
            </span>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-saas-subtext" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-saas-border bg-saas-bg text-saas-text placeholder:text-saas-subtext/50 focus:outline-none focus:border-saas-primary focus:ring-1 focus:ring-saas-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 px-3 py-2 overflow-x-auto border-b border-saas-border">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                "flex-shrink-0 text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all",
                activeFilter === tab
                  ? "bg-saas-primary text-white"
                  : "text-saas-subtext hover:text-saas-text hover:bg-saas-bg"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4">
              <MessageCircle className="w-8 h-8 text-saas-border mb-2" />
              <p className="text-sm font-medium text-saas-subtext">No conversations found</p>
            </div>
          ) : (
            filtered.map((conv) => {
              const WindowIcon = WINDOW_CONFIG[conv.windowStatus].icon;
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelected(conv)}
                  className={cn(
                    "w-full text-left px-4 py-3 transition-all duration-150 border-b border-saas-border/60 group",
                    selected.id === conv.id
                      ? "bg-primary-50 border-l-2 border-l-saas-primary"
                      : "hover:bg-saas-bg/60"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold flex-shrink-0 relative">
                      {conv.name.charAt(0)}
                      {conv.unread > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-saas-primary text-white text-[9px] font-bold flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-saas-text truncate">{conv.name}</p>
                        <span className="text-[10px] text-saas-subtext flex-shrink-0 ml-1">{conv.time}</span>
                      </div>
                      <p className="text-[10px] font-mono text-saas-subtext/70 mb-1 flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5" />{conv.phone}
                      </p>
                      <p className="text-xs text-saas-subtext truncate">{conv.lastMsg}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className={cn(
                          "text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full border",
                          STATUS_CONFIG[conv.status].color
                        )}>
                          {STATUS_CONFIG[conv.status].label}
                        </span>
                        <span title={WINDOW_CONFIG[conv.windowStatus].title}>
                          <WindowIcon className={cn("w-3.5 h-3.5", WINDOW_CONFIG[conv.windowStatus].color)} />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── MIDDLE: Chat View ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-saas-bg">
        {/* Chat Header */}
        <div className="bg-saas-card border-b border-saas-border px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
              {selected.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-saas-text text-sm">{selected.name}</p>
              <p className="text-xs text-saas-subtext flex items-center gap-1">
                <Phone className="w-3 h-3" /> {selected.phone}
                <span className="ml-1.5 text-emerald-500 font-medium">● Online</span>
              </p>
            </div>
            <span className={cn("ml-2 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border", STATUS_CONFIG[selected.status].color)}>
              {STATUS_CONFIG[selected.status].label}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* AI Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-saas-subtext">AI</span>
              <button
                onClick={() => setAiEnabled(!aiEnabled)}
                className={cn(
                  "relative w-9 h-5 rounded-full transition-all duration-300",
                  aiEnabled ? "bg-saas-primary" : "bg-saas-border"
                )}
              >
                <div className={cn(
                  "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300",
                  aiEnabled ? "left-4" : "left-0.5"
                )} />
              </button>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-saas-border text-saas-subtext hover:text-saas-text hover:border-saas-primary/30 transition-all">
              <User className="w-3.5 h-3.5" /> Assign Agent <ChevronDown className="w-3 h-3" />
            </button>
            <button className="p-1.5 rounded-lg text-saas-subtext hover:text-saas-text hover:bg-saas-bg transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {selected.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex", msg.from === "contact" ? "justify-start" : "justify-end")}
            >
              <div className={cn(
                "max-w-[65%] rounded-2xl px-4 py-2.5 text-sm shadow-saas-sm",
                msg.from === "contact"
                  ? "bg-saas-card border border-saas-border text-saas-text rounded-tl-none"
                  : "bg-saas-primary text-white rounded-tr-none"
              )}>
                {msg.ai && msg.from === "agent" && (
                  <div className="flex items-center gap-1 mb-1 opacity-70">
                    <Bot className="w-3 h-3" />
                    <span className="text-[10px] font-mono">AI Generated</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.text}</p>
                <p className={cn(
                  "text-[10px] mt-1 text-right",
                  msg.from === "contact" ? "text-saas-subtext" : "text-white/60"
                )}>
                  {msg.time} {msg.from === "agent" && <CheckCheck className="inline w-3 h-3 ml-0.5" />}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 24h Window Counter */}
        <div className={cn(
          "flex items-center justify-center gap-2 py-1.5 text-xs font-medium border-t",
          selected.windowStatus === "open" ? "bg-emerald-50 border-emerald-100 text-emerald-700" :
          selected.windowStatus === "expiring" ? "bg-amber-50 border-amber-100 text-amber-700" :
          "bg-slate-50 border-slate-200 text-slate-500"
        )}>
          <Clock className="w-3.5 h-3.5" />
          {windowTimeLeft(selected)} · 24h messaging window
          {selected.windowStatus === "closed" && (
            <button className="ml-2 text-[11px] font-semibold text-saas-primary hover:underline flex items-center gap-1">
              Send Template <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Input Bar */}
        <div className="bg-saas-card border-t border-saas-border px-4 py-3 flex items-end gap-3">
          <button className="p-2 text-saas-subtext hover:text-saas-text hover:bg-saas-bg rounded-lg transition-all flex-shrink-0">
            <Paperclip className="w-4 h-4" />
          </button>
          <button className="p-2 text-saas-subtext hover:text-saas-text hover:bg-saas-bg rounded-lg transition-all text-xs font-semibold border border-saas-border px-3">
            Template
          </button>
          <textarea
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            placeholder={selectedWindowClosed(selected) ? "Window closed — use a template to re-open" : "Type a message..."}
            disabled={selectedWindowClosed(selected)}
            className="flex-1 resize-none px-4 py-2.5 rounded-xl border border-saas-border bg-saas-bg text-sm text-saas-text placeholder:text-saas-subtext/50 focus:outline-none focus:border-saas-primary focus:ring-1 focus:ring-saas-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex-shrink-0 p-2.5 rounded-xl bg-saas-primary text-white hover:shadow-saas-glow transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── RIGHT: Contact Info ── */}
      <div className="w-72 flex-shrink-0 border-l border-saas-border bg-saas-card flex flex-col overflow-y-auto">
        <div className="p-5 border-b border-saas-border">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 font-bold text-xl flex items-center justify-center mb-3">
              {selected.name.charAt(0)}
            </div>
            <h2 className="font-display font-bold text-saas-text text-base">{selected.name}</h2>
            <p className="text-xs text-saas-subtext flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3" />{selected.phone}
            </p>
            <div className="flex gap-1 mt-3 flex-wrap justify-center">
              {selected.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", TAG_COLORS[i % TAG_COLORS.length])}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Stage */}
        <div className="p-4 border-b border-saas-border">
          <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext font-semibold mb-2">Lead Stage</p>
          <div className="relative">
            <select
              value={leadStages[selected.id]}
              onChange={(e) => setLeadStages((p) => ({ ...p, [selected.id]: e.target.value }))}
              className="w-full appearance-none text-sm font-semibold text-saas-text bg-saas-bg border border-saas-border rounded-xl px-3 py-2 focus:outline-none focus:border-saas-primary focus:ring-1 focus:ring-saas-primary/20 transition-all"
            >
              {LEAD_STAGES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-saas-subtext pointer-events-none" />
          </div>
          {/* Stage progress */}
          <div className="flex gap-1 mt-3">
            {LEAD_STAGES.map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1 flex-1 rounded-full transition-all duration-300",
                  LEAD_STAGES.indexOf(leadStages[selected.id]) >= LEAD_STAGES.indexOf(s)
                    ? "bg-saas-primary"
                    : "bg-saas-border"
                )}
              />
            ))}
          </div>
        </div>

        {/* AI Toggle */}
        <div className="px-4 py-3 border-b border-saas-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-saas-text">AI Replies</span>
          </div>
          <button
            onClick={() => setAiEnabled(!aiEnabled)}
            className={cn(
              "relative w-9 h-5 rounded-full transition-all duration-300",
              aiEnabled ? "bg-saas-primary" : "bg-saas-border"
            )}
          >
            <div className={cn(
              "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300",
              aiEnabled ? "left-4" : "left-0.5"
            )} />
          </button>
        </div>

        {/* Attributes */}
        <div className="p-4 border-b border-saas-border space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext font-semibold mb-3">Attributes</p>
          {[
            { label: "Budget", value: selected.budget },
            { label: "Location", value: selected.location },
            { label: "Last Seen", value: selected.lastSeen },
          ].map((attr) => (
            <div key={attr.label} className="flex items-center justify-between py-1">
              <span className="text-xs text-saas-subtext">{attr.label}</span>
              <span className="text-xs font-semibold text-saas-text">{attr.value}</span>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="p-4 border-b border-saas-border flex-1">
          <div className="flex items-center gap-2 mb-3">
            <StickyNote className="w-4 h-4 text-amber-500" />
            <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">Notes</p>
          </div>
          {notes[selected.id] && (
            <p className="text-xs text-saas-subtext leading-relaxed mb-3 p-2 bg-amber-50 border border-amber-100 rounded-lg">
              {notes[selected.id]}
            </p>
          )}
          <textarea
            rows={2}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full resize-none text-xs px-3 py-2 rounded-xl border border-saas-border bg-saas-bg text-saas-text placeholder:text-saas-subtext/50 focus:outline-none focus:border-saas-primary focus:ring-1 focus:ring-saas-primary/20 transition-all"
          />
          <button
            onClick={() => {
              if (newNote.trim()) {
                setNotes((p) => ({ ...p, [selected.id]: newNote.trim() }));
                setNewNote("");
              }
            }}
            className="mt-2 w-full text-xs font-semibold py-1.5 rounded-lg bg-saas-primary/10 text-saas-primary hover:bg-saas-primary/20 transition-all"
          >
            Save Note
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4">
          <p className="text-[10px] font-mono uppercase tracking-wider text-saas-subtext font-semibold mb-3">Quick Actions</p>
          <div className="space-y-2">
            {[
              { icon: Tag,      label: "Add Tag",           color: "text-purple-500" },
              { icon: Zap,      label: "Trigger Automation", color: "text-amber-500" },
              { icon: Star,     label: "Mark as Priority",   color: "text-yellow-500" },
              { icon: Edit3,    label: "Edit Contact",        color: "text-primary-500" },
              { icon: Trash2,   label: "Delete Conversation", color: "text-red-500" },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 text-xs font-medium text-saas-subtext hover:text-saas-text hover:bg-saas-bg px-3 py-2 rounded-lg transition-all"
              >
                <action.icon className={cn("w-3.5 h-3.5", action.color)} />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function selectedWindowClosed(conv: typeof CONVERSATIONS[0]) {
  return conv.windowStatus === "closed";
}
