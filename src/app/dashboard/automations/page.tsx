"use client";

import { useState } from "react";
import {
  Plus, Zap, Play, Pause, Trash2, Edit3, CheckCircle2,
  AlertCircle, Clock, ChevronRight, ArrowRight, Filter,
  MessageCircle, Tag, Bot, Users, XCircle, ToggleRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const RULES = [
  {
    id: 1, name: "Welcome New Contact", active: true,
    trigger: "Contact Created", triggerType: "event",
    conditions: "Source = WhatsApp Inbound",
    actions: "Send Template: welcome_onboarding_v2, Tag: New Lead",
    runs: 247, lastTriggered: "2 mins ago",
  },
  {
    id: 2, name: "Follow-up After Demo", active: true,
    trigger: "Stage Changed → Demo Scheduled", triggerType: "stage",
    conditions: "Lead Stage = Demo Scheduled",
    actions: "Wait 24h → Send Template: demo_followup_v1, Assign to SalesBot",
    runs: 88, lastTriggered: "1 hour ago",
  },
  {
    id: 3, name: "Re-engage Cold Leads", active: false,
    trigger: "Inactivity > 7 days", triggerType: "time",
    conditions: "Last Message > 7 days, Stage ≠ Closed",
    actions: "Send Template: reengagement_cold, Tag: Cold",
    runs: 34, lastTriggered: "Mar 9, 2026",
  },
  {
    id: 4, name: "Escalate Negative Sentiment", active: true,
    trigger: "AI Sentiment < 0.3", triggerType: "ai",
    conditions: "AI confidence score < 0.3 on last 3 messages",
    actions: "Disable AI → Notify team on Slack, Assign to Human",
    runs: 18, lastTriggered: "Yesterday",
  },
  {
    id: 5, name: "Win Alert — Deal Closed", active: true,
    trigger: "Stage Changed → Closed", triggerType: "stage",
    conditions: "Lead Stage = Closed Won",
    actions: "Notify team, Tag: Closed Won, Send celebration template",
    runs: 22, lastTriggered: "Mar 12, 2026",
  },
];

const EXECUTION_LOG = [
  { rule: "Welcome New Contact", contact: "Deepa Krishnan", status: "success", time: "2 mins ago",  actions: "Template sent, Tag applied" },
  { rule: "Follow-up After Demo", contact: "Rahul Gupta",   status: "success", time: "1 hour ago", actions: "Template sent, Agent assigned" },
  { rule: "Escalate Negative Sentiment", contact: "Manish Joshi", status: "failed", time: "3 hours ago", actions: "Slack notification failed" },
  { rule: "Win Alert — Deal Closed", contact: "Sneha Patel", status: "success", time: "Mar 12", actions: "All actions completed" },
  { rule: "Re-engage Cold Leads", contact: "Vikram Nair",   status: "skipped", time: "Mar 10",    actions: "Condition not met" },
  { rule: "Welcome New Contact", contact: "Test User",      status: "success", time: "Mar 9",     actions: "Template sent, Tag applied" },
];

const TRIGGER_ICONS: Record<string, typeof Zap> = {
  event: MessageCircle,
  stage: Tag,
  time:  Clock,
  ai:    Bot,
};

const TRIGGER_COLORS: Record<string, string> = {
  event: "bg-blue-50 text-blue-600 border-blue-200",
  stage: "bg-purple-50 text-purple-600 border-purple-200",
  time:  "bg-amber-50 text-amber-600 border-amber-200",
  ai:    "bg-indigo-50 text-indigo-600 border-indigo-200",
};

const LOG_STATUS_CONFIG: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  success: { color: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: CheckCircle2 },
  failed:  { color: "bg-red-50 text-red-500 border-red-200",             icon: XCircle },
  skipped: { color: "bg-slate-50 text-slate-500 border-slate-200",       icon: AlertCircle },
};

export default function AutomationsPage() {
  const [rules, setRules] = useState(RULES);
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderStep, setBuilderStep] = useState(0);

  const toggleRule = (id: number) =>
    setRules((p) => p.map((r) => r.id === id ? { ...r, active: !r.active } : r));

  const activeCount = rules.filter((r) => r.active).length;

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">Automations</h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">
            {activeCount} active rules · {rules.reduce((s, r) => s + r.runs, 0)} total runs
          </p>
        </div>
        <button
          onClick={() => { setShowBuilder(true); setBuilderStep(0); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-saas-primary text-white text-sm font-semibold shadow-saas-md hover:shadow-saas-glow hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-4 h-4" /> Create Rule
        </button>
      </div>

      {/* Rules List */}
      <div className="skeu-card overflow-hidden">
        <div className="px-6 py-4 border-b border-saas-border">
          <h2 className="font-display font-bold text-lg text-saas-text">Rules</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-saas-border bg-saas-bg/50">
              {["Rule", "Trigger", "Conditions", "Actions", "Runs", "Last Run", "Active", ""].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[11px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => {
              const TriggerIcon = TRIGGER_ICONS[rule.triggerType] || Zap;
              return (
                <tr key={rule.id} className="border-b border-saas-border/60 hover:bg-saas-bg/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-saas-text">{rule.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-mono font-semibold px-2 py-1 rounded-full border flex items-center gap-1.5 w-fit", TRIGGER_COLORS[rule.triggerType])}>
                      <TriggerIcon className="w-3 h-3" />{rule.trigger}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-[160px]">
                    <p className="text-xs text-saas-subtext truncate">{rule.conditions}</p>
                  </td>
                  <td className="px-6 py-4 max-w-[180px]">
                    <p className="text-xs text-saas-subtext truncate">{rule.actions}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold font-mono text-saas-text">{rule.runs}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-saas-subtext flex items-center gap-1">
                      <Clock className="w-3 h-3" />{rule.lastTriggered}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={cn(
                        "relative w-9 h-5 rounded-full transition-all duration-300",
                        rule.active ? "bg-saas-primary" : "bg-saas-border"
                      )}
                    >
                      <div className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300",
                        rule.active ? "left-4" : "left-0.5"
                      )} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg text-saas-subtext hover:text-primary-600 hover:bg-primary-50 transition-all">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Execution Log */}
      <div className="skeu-card overflow-hidden">
        <div className="px-6 py-4 border-b border-saas-border">
          <h2 className="font-display font-bold text-lg text-saas-text">Execution Log</h2>
          <p className="text-xs text-saas-subtext mt-0.5">Last 6 executions</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-saas-border bg-saas-bg/50">
              {["Rule", "Contact", "Status", "Time", "Actions Executed"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[11px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EXECUTION_LOG.map((log, i) => {
              const StatusIcon = LOG_STATUS_CONFIG[log.status].icon;
              return (
                <tr key={i} className="border-b border-saas-border/60 hover:bg-saas-bg/30 transition-colors">
                  <td className="px-6 py-3">
                    <p className="text-sm font-medium text-saas-text">{log.rule}</p>
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-sm text-saas-subtext">{log.contact}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit", LOG_STATUS_CONFIG[log.status].color)}>
                      <StatusIcon className="w-3 h-3" />{log.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-xs text-saas-subtext">{log.time}</span>
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-xs text-saas-subtext">{log.actions}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rule Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowBuilder(false)} />
          <div className="relative bg-saas-card rounded-2xl shadow-saas-xl border border-saas-border w-full max-w-lg p-6">
            <h2 className="font-display font-bold text-xl text-saas-text mb-2">Create Automation Rule</h2>
            <p className="text-sm text-saas-subtext mb-6">Build a rule in 3 steps</p>

            {/* Steps */}
            <div className="flex items-center gap-2 mb-8">
              {["Trigger", "Conditions", "Actions"].map((step, i) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div className={cn(
                    "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    builderStep >= i ? "bg-saas-primary text-white" : "bg-saas-border text-saas-subtext"
                  )}>
                    {i + 1}
                  </div>
                  <span className={cn("text-xs font-semibold flex-1", builderStep >= i ? "text-saas-text" : "text-saas-subtext")}>{step}</span>
                  {i < 2 && <ArrowRight className="w-3.5 h-3.5 text-saas-border flex-shrink-0" />}
                </div>
              ))}
            </div>

            {builderStep === 0 && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-saas-text mb-3">Select a trigger event</p>
                {[
                  { icon: MessageCircle, label: "New message received",    desc: "When a new WhatsApp message arrives" },
                  { icon: Tag,           label: "Stage changed",           desc: "When a contact's lead stage updates" },
                  { icon: Clock,         label: "Inactivity timeout",      desc: "When no response after N days" },
                  { icon: Bot,           label: "AI sentiment threshold",  desc: "When AI detects negative sentiment" },
                ].map((t) => (
                  <button key={t.label} onClick={() => setBuilderStep(1)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl border border-saas-border hover:border-saas-primary/50 hover:bg-primary-50/30 transition-all text-left group">
                    <div className="w-9 h-9 rounded-xl bg-saas-bg border border-saas-border flex items-center justify-center group-hover:border-saas-primary/30 group-hover:bg-primary-50 transition-all">
                      <t.icon className="w-4 h-4 text-saas-subtext group-hover:text-saas-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-saas-text">{t.label}</p>
                      <p className="text-xs text-saas-subtext">{t.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-saas-subtext group-hover:text-saas-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            )}

            {builderStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-saas-text mb-3">Set conditions</p>
                <div>
                  <label className="text-xs font-semibold text-saas-text block mb-1.5">When field</label>
                  <select className="w-full text-sm border border-saas-border rounded-xl px-3 py-2.5 bg-saas-bg text-saas-text focus:outline-none focus:border-saas-primary transition-all">
                    <option>Lead Stage</option><option>Source</option><option>AI Sentiment</option><option>Last Seen</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-saas-text block mb-1.5">Operator</label>
                  <select className="w-full text-sm border border-saas-border rounded-xl px-3 py-2.5 bg-saas-bg text-saas-text focus:outline-none focus:border-saas-primary transition-all">
                    <option>equals</option><option>not equals</option><option>contains</option><option>greater than</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-saas-text block mb-1.5">Value</label>
                  <input placeholder="e.g. Discovery" className="w-full text-sm border border-saas-border rounded-xl px-3 py-2.5 bg-saas-bg text-saas-text focus:outline-none focus:border-saas-primary transition-all" />
                </div>
                <button onClick={() => setBuilderStep(2)} className="w-full py-2.5 rounded-xl bg-saas-primary text-white text-sm font-semibold hover:shadow-saas-glow transition-all">
                  Next: Set Actions →
                </button>
              </div>
            )}

            {builderStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-saas-text mb-3">Define actions</p>
                {[
                  { label: "Send WhatsApp Template", tag: "Common" },
                  { label: "Add / Remove Tag",       tag: "" },
                  { label: "Change Lead Stage",      tag: "" },
                  { label: "Assign to Agent",        tag: "" },
                  { label: "Notify via Slack",       tag: "Pro" },
                ].map((a) => (
                  <label key={a.label} className="flex items-center justify-between p-3 rounded-xl border border-saas-border hover:border-saas-primary/30 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="accent-saas-primary" />
                      <span className="text-sm text-saas-text">{a.label}</span>
                    </div>
                    {a.tag && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 border border-primary-100">{a.tag}</span>}
                  </label>
                ))}
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setShowBuilder(false)} className="flex-1 py-2.5 rounded-xl border border-saas-border text-sm font-semibold text-saas-subtext hover:text-saas-text hover:border-saas-primary/40 transition-all">
                    Cancel
                  </button>
                  <button onClick={() => setShowBuilder(false)} className="flex-1 py-2.5 rounded-xl bg-saas-primary text-white text-sm font-semibold hover:shadow-saas-glow transition-all">
                    Save Rule ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
