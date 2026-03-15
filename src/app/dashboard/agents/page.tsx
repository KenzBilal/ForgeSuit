"use client";

import { useState } from "react";
import {
  Plus, Bot, Phone, Thermometer, Send, MessageCircle,
  Zap, Edit3, TestTube2, ChevronDown, ArrowUpRight,
  ToggleLeft, ToggleRight, Cpu, Clock, CheckCircle2, Slash,
  Loader2, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const AGENTS = [
  {
    id: 1, name: "SalesBot Prime", model: "GPT-4o", active: true,
    phone: "+91 98765 43210", temperature: 0.7,
    persona: "You are a friendly, professional sales assistant for ForgeSuit. Your goal is to qualify leads, answer product questions, and guide users toward booking a demo.",
    stats: { conversations: 312, resolved: 248, avgResponse: "2.1s", tokens: "184k" },
    handoffTrigger: "sentiment < 0.3 OR mentions:angry,cancel,refund",
  },
  {
    id: 2, name: "Support Agent", model: "GPT-4o-mini", active: true,
    phone: "+91 87654 32109", temperature: 0.4,
    persona: "You are a calm, empathetic support specialist. Help users resolve issues quickly, escalate complex technical problems, and maintain a positive tone at all times.",
    stats: { conversations: 198, resolved: 175, avgResponse: "1.4s", tokens: "92k" },
    handoffTrigger: "keyword:escalate OR intent:complaint",
  },
  {
    id: 3, name: "Onboarding Guide", model: "GPT-4o", active: false,
    phone: "Unassigned", temperature: 0.5,
    persona: "Guide new customers through the ForgeSuit setup. Walk them through connecting WhatsApp, setting up AI, and sending their first campaign.",
    stats: { conversations: 44, resolved: 40, avgResponse: "3.2s", tokens: "28k" },
    handoffTrigger: "step:not_started AND time > 48h",
  },
];

const HANDOFF_RULES = [
  { id: 1, trigger: "Negative Sentiment",   condition: "Sentiment score < 0.3",        action: "Route to Human Agent",    count: 18 },
  { id: 2, trigger: "Keyword: Refund",      condition: "Message contains 'refund'",    action: "Create Support Ticket",   count: 6 },
  { id: 3, trigger: "Unresolved > 10 mins", condition: "No resolution in 10 minutes",  action: "Notify Team on Slack",    count: 32 },
  { id: 4, trigger: "High-Value Contact",   condition: "Budget > ₹1,00,000",           action: "Assign to Senior Sales",  count: 11 },
];

const MODEL_COLORS: Record<string, string> = {
  "GPT-4o":      "bg-emerald-50 text-emerald-700 border-emerald-200",
  "GPT-4o-mini": "bg-blue-50 text-blue-700 border-blue-200",
  "Claude 3.5":  "bg-amber-50 text-amber-700 border-amber-200",
};

export default function AgentsPage() {
  const [agents, setAgents] = useState(AGENTS);
  const [testAgentId, setTestAgentId] = useState<number>(1);
  const [testInput, setTestInput] = useState("");
  const [testLog, setTestLog] = useState<{ role: "user"|"agent"; text: string; latency?: string; tokens?: number }[]>([]);
  const [testing, setTesting] = useState(false);

  const toggleAgent = (id: number) => {
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleTest = async () => {
    if (!testInput.trim()) return;
    const question = testInput;
    setTestInput("");
    setTestLog((p) => [...p, { role: "user", text: question }]);
    setTesting(true);
    await new Promise((r) => setTimeout(r, 1400));
    const agent = agents.find((a) => a.id === testAgentId)!;
    const responses = [
      "Thanks for reaching out! I'd be happy to help you with that. Let me pull up the details for you right away.",
      "Great question! Our Pro plan includes unlimited contacts, AI automation, campaign manager, and dedicated support at ₹4,999/month.",
      "I understand your concern. Let me look into this immediately and ensure we resolve it as quickly as possible.",
    ];
    const resp = responses[Math.floor(Math.random() * responses.length)];
    setTestLog((p) => [...p, { role: "agent", text: resp, latency: "1.42s", tokens: Math.floor(Math.random() * 80) + 40 }]);
    setTesting(false);
  };

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">AI Agents</h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">Configure and test your intelligent sales agents</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-saas-primary text-white text-sm font-semibold shadow-saas-md hover:shadow-saas-glow hover:-translate-y-0.5 transition-all duration-200">
          <Plus className="w-4 h-4" /> Create Agent
        </button>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="skeu-card p-6">
            {/* Top Row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  agent.active ? "bg-saas-primary/10 text-saas-primary" : "bg-slate-100 text-slate-400"
                )}>
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-saas-text text-base">{agent.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border", MODEL_COLORS[agent.model])}>
                      {agent.model}
                    </span>
                    <span className="text-[10px] font-mono text-saas-subtext flex items-center gap-1">
                      <Phone className="w-2.5 h-2.5" />{agent.phone}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleAgent(agent.id)}
                className={cn(
                  "relative w-10 h-6 rounded-full transition-all duration-300 flex-shrink-0",
                  agent.active ? "bg-saas-primary" : "bg-saas-border"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300",
                  agent.active ? "left-5" : "left-1"
                )} />
              </button>
            </div>

            {/* Persona */}
            <div className="mb-4 p-3 rounded-xl bg-saas-bg border border-saas-border">
              <p className="text-xs text-saas-subtext font-mono leading-relaxed line-clamp-2">{agent.persona}</p>
            </div>

            {/* Temperature */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-saas-subtext">
                  <Thermometer className="w-3.5 h-3.5" /> Temperature
                </div>
                <span className="text-xs font-mono font-bold text-saas-text">{agent.temperature}</span>
              </div>
              <div className="h-1.5 rounded-full bg-saas-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-red-400 transition-all"
                  style={{ width: `${agent.temperature * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-saas-subtext mt-1">
                <span>Precise</span><span>Creative</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "Chats",     value: agent.stats.conversations.toString() },
                { label: "Resolved",  value: agent.stats.resolved.toString() },
                { label: "Avg Resp",  value: agent.stats.avgResponse },
                { label: "Tokens",    value: agent.stats.tokens },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-bold text-saas-text text-lg leading-none">{s.value}</p>
                  <p className="text-[10px] text-saas-subtext mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl border border-saas-border text-saas-subtext hover:border-saas-primary/40 hover:text-saas-text transition-all">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => { setTestAgentId(agent.id); setTestLog([]); }}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl bg-saas-primary/10 text-saas-primary hover:bg-saas-primary/20 transition-all"
              >
                <TestTube2 className="w-3.5 h-3.5" /> Test
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Test Console + Handoff Rules */}
      <div className="grid grid-cols-2 gap-6">
        {/* Test Console */}
        <div className="skeu-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TestTube2 className="w-5 h-5 text-saas-primary" />
              <h2 className="font-display font-bold text-lg text-saas-text">Test Console</h2>
            </div>
            <div className="relative">
              <select
                value={testAgentId}
                onChange={(e) => { setTestAgentId(Number(e.target.value)); setTestLog([]); }}
                className="appearance-none text-xs font-semibold bg-saas-bg border border-saas-border rounded-xl px-3 py-1.5 pr-7 text-saas-text focus:outline-none focus:border-saas-primary transition-all"
              >
                {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-saas-subtext pointer-events-none" />
            </div>
          </div>

          {/* Log */}
          <div className="flex-1 bg-saas-bg border border-saas-border rounded-xl p-4 min-h-48 max-h-64 overflow-y-auto space-y-3 mb-4">
            {testLog.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <MessageCircle className="w-8 h-8 text-saas-border mb-2" />
                <p className="text-xs text-saas-subtext">Send a message to test the agent</p>
              </div>
            ) : (
              testLog.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-3 py-2 text-xs",
                    msg.role === "user" ? "bg-saas-primary text-white rounded-tr-none" : "bg-white border border-saas-border text-saas-text rounded-tl-none"
                  )}>
                    {msg.role === "agent" && <div className="flex items-center gap-1 mb-1 opacity-60"><Bot className="w-3 h-3"/><span className="font-mono text-[10px]">AI</span></div>}
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.latency && (
                      <div className="flex gap-3 mt-1 text-[10px] text-saas-subtext font-mono">
                        <span>{msg.latency}</span>
                        <span>{msg.tokens} tokens</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {testing && (
              <div className="flex justify-start">
                <div className="bg-white border border-saas-border rounded-2xl rounded-tl-none px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-saas-primary" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTest()}
              placeholder="Type a test message..."
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-saas-border bg-saas-bg text-saas-text placeholder:text-saas-subtext/50 focus:outline-none focus:border-saas-primary focus:ring-1 focus:ring-saas-primary/20 transition-all"
            />
            <button
              onClick={handleTest}
              disabled={!testInput.trim() || testing}
              className="p-2.5 rounded-xl bg-saas-primary text-white hover:shadow-saas-glow transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Handoff Rules */}
        <div className="skeu-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <h2 className="font-display font-bold text-lg text-saas-text">Handoff Rules</h2>
            </div>
            <button className="text-xs font-semibold text-saas-primary hover:underline">+ Add Rule</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-saas-border">
                {["Trigger", "Condition", "Action", "Runs"].map((h) => (
                  <th key={h} className="pb-2 text-left text-[10px] font-mono uppercase tracking-wider text-saas-subtext">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-saas-border/60">
              {HANDOFF_RULES.map((rule) => (
                <tr key={rule.id} className="hover:bg-saas-bg/40 transition-colors">
                  <td className="py-3 pr-3">
                    <p className="text-xs font-semibold text-saas-text">{rule.trigger}</p>
                  </td>
                  <td className="py-3 pr-3">
                    <p className="text-[11px] font-mono text-saas-subtext">{rule.condition}</p>
                  </td>
                  <td className="py-3 pr-3">
                    <p className="text-xs text-saas-text">{rule.action}</p>
                  </td>
                  <td className="py-3">
                    <span className="text-xs font-mono font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{rule.count}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
