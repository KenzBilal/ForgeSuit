"use client";

import { useState } from "react";
import {
  Upload, RefreshCw, BookOpen, FileText, Globe, Link2,
  Trash2, CheckCircle2, Clock, AlertCircle, ChevronRight,
  Database, Cpu, Layers, Cloud, ArrowUpRight, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const SOURCES = [
  {
    id: 1, name: "ForgeSuit_FAQ.pdf", type: "PDF", chunks: 142, status: "synced",
    lastSynced: "5 mins ago", size: "1.2 MB",
    icon: FileText, iconColor: "text-red-500", iconBg: "bg-red-50",
  },
  {
    id: 2, name: "Pricing & Plans Guide.pdf", type: "PDF", chunks: 48, status: "synced",
    lastSynced: "1 hour ago", size: "340 KB",
    icon: FileText, iconColor: "text-red-500", iconBg: "bg-red-50",
  },
  {
    id: 3, name: "https://docs.forgesuit.com", type: "URL", chunks: 312, status: "syncing",
    lastSynced: "Syncing...", size: "—",
    icon: Globe, iconColor: "text-blue-500", iconBg: "bg-blue-50",
  },
  {
    id: 4, name: "Product Changelog Q1 2026.txt", type: "TXT", chunks: 29, status: "synced",
    lastSynced: "2 days ago", size: "128 KB",
    icon: FileText, iconColor: "text-slate-500", iconBg: "bg-slate-100",
  },
  {
    id: 5, name: "Customer Success Stories.docx", type: "DOCX", chunks: 85, status: "error",
    lastSynced: "Failed", size: "2.1 MB",
    icon: FileText, iconColor: "text-amber-500", iconBg: "bg-amber-50",
  },
  {
    id: 6, name: "https://forgesuit.com/features", type: "URL", chunks: 64, status: "synced",
    lastSynced: "3 hours ago", size: "—",
    icon: Globe, iconColor: "text-blue-500", iconBg: "bg-blue-50",
  },
];

const CHUNKS = [
  { index: 1, source: "ForgeSuit_FAQ.pdf", text: "ForgeSuit is a WhatsApp AI CRM platform that helps businesses automate their sales conversations using advanced language models. It supports unlimited contacts, real-time AI replies, and a full campaign broadcast manager...", score: 0.94 },
  { index: 2, source: "ForgeSuit_FAQ.pdf", text: "The 24-hour messaging window is a Meta policy that allows businesses to respond to a WhatsApp message within 24 hours of receiving it. Outside this window, only approved template messages can be sent...", score: 0.88 },
  { index: 3, source: "Pricing & Plans Guide.pdf", text: "ForgeSuit Pro Plan — ₹4,999/month. Includes: Up to 10,000 contacts, unlimited AI conversations, campaign manager, 5 AI agents, analytics dashboard, priority support, and API access...", score: 0.81 },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  synced:  { label: "Synced",   color: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: CheckCircle2 },
  syncing: { label: "Syncing",  color: "bg-blue-50 text-blue-600 border-blue-200",          icon: RefreshCw },
  error:   { label: "Error",    color: "bg-red-50 text-red-500 border-red-200",              icon: AlertCircle },
};

const STAT_CARDS = [
  { label: "Total Documents", value: "6",        icon: BookOpen,  color: "#4f46e5" },
  { label: "Active Chunks",   value: "680",       icon: Layers,    color: "#10b981" },
  { label: "Last Synced",     value: "5m ago",    icon: Clock,     color: "#4f46e5" },
  { label: "Embed Model",     value: "ada-002",   icon: Cpu,       color: "#6366f1" },
];

export default function KnowledgePage() {
  const [dragging, setDragging] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<typeof CHUNKS[0] | null>(null);

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">Knowledge Base</h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">RAG-powered context for your AI agents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
            <div className="led-green" />
            <span className="text-xs font-mono font-medium text-emerald-700">Sync Live</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-saas-primary text-white text-sm font-semibold shadow-saas-md hover:shadow-saas-glow hover:-translate-y-0.5 transition-all duration-200">
            <Upload className="w-4 h-4" /> Upload Document
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="skeu-card p-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${card.color}18`, color: card.color }}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="font-display text-3xl font-bold text-saas-text leading-none mb-1">{card.value}</p>
            <p className="text-saas-subtext text-sm font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Sources + Chunk Preview */}
      <div className="grid grid-cols-3 gap-6">
        {/* Sources List */}
        <div className="col-span-2 skeu-card overflow-hidden">
          <div className="px-6 py-4 border-b border-saas-border flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-saas-text">Sources</h2>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-saas-primary hover:underline">
              <RefreshCw className="w-3.5 h-3.5" /> Sync All
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-saas-border bg-saas-bg/50">
                {["Source", "Type", "Chunks", "Status", "Last Synced", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-[11px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SOURCES.map((src) => {
                const StatusIcon = STATUS_CONFIG[src.status].icon;
                return (
                  <tr key={src.id} className="border-b border-saas-border/60 hover:bg-saas-bg/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", src.iconBg)}>
                          <src.icon className={cn("w-4 h-4", src.iconColor)} />
                        </div>
                        <p className="text-sm font-semibold text-saas-text max-w-[180px] truncate">{src.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-saas-bg border border-saas-border text-saas-subtext">
                        {src.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-saas-text">{src.chunks}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit", STATUS_CONFIG[src.status].color)}>
                        <StatusIcon className={cn("w-3 h-3", src.status === "syncing" && "animate-spin")} />
                        {STATUS_CONFIG[src.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-saas-subtext flex items-center gap-1">
                        <Clock className="w-3 h-3" />{src.lastSynced}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg text-primary-500 hover:bg-primary-50 transition-all">
                          <RefreshCw className="w-3.5 h-3.5" />
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

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={() => setDragging(false)}
            className={cn(
              "mx-6 my-4 p-6 border-2 border-dashed rounded-2xl text-center transition-all duration-200",
              dragging
                ? "border-saas-primary bg-primary-50/50 scale-[1.01]"
                : "border-saas-border hover:border-saas-primary/40 hover:bg-saas-bg/40"
            )}
          >
            <Upload className={cn("w-8 h-8 mx-auto mb-2 transition-colors", dragging ? "text-saas-primary" : "text-saas-subtext")} />
            <p className="text-sm font-semibold text-saas-text">Drop files to upload</p>
            <p className="text-xs text-saas-subtext mt-0.5">Supports PDF, TXT, DOCX, CSV, or paste a URL</p>
          </div>
        </div>

        {/* Chunk Preview */}
        <div className="skeu-card p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-primary-500" />
            <h2 className="font-display font-bold text-lg text-saas-text">Chunk Preview</h2>
          </div>
          <div className="space-y-3 flex-1">
            {CHUNKS.map((chunk) => (
              <button
                key={chunk.index}
                onClick={() => setSelectedChunk(selectedChunk?.index === chunk.index ? null : chunk)}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all duration-200",
                  selectedChunk?.index === chunk.index
                    ? "border-saas-primary/40 bg-primary-50/50"
                    : "border-saas-border hover:border-saas-primary/30 hover:bg-saas-bg/40"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-saas-subtext">Chunk #{chunk.index} · {chunk.source}</span>
                  <ChevronRight className={cn("w-3.5 h-3.5 text-saas-subtext transition-transform", selectedChunk?.index === chunk.index && "rotate-90")} />
                </div>
                <p className="text-xs text-saas-text line-clamp-2 leading-relaxed">{chunk.text}</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] text-saas-subtext font-mono">Similarity</span>
                    <span className="text-[10px] font-mono font-bold text-saas-primary">{chunk.score}</span>
                  </div>
                  <div className="h-1 rounded-full bg-saas-border overflow-hidden">
                    <div className="h-full rounded-full bg-saas-primary transition-all duration-500" style={{ width: `${chunk.score * 100}%` }} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedChunk && (
            <div className="mt-4 p-4 rounded-xl bg-saas-bg border border-saas-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold text-saas-subtext uppercase tracking-wider">Full Text</span>
                <button onClick={() => setSelectedChunk(null)}>
                  <X className="w-3.5 h-3.5 text-saas-subtext hover:text-saas-text" />
                </button>
              </div>
              <p className="text-xs text-saas-text leading-relaxed">{selectedChunk.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
