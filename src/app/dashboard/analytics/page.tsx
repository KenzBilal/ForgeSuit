"use client";

import { useState } from "react";
import {
  MessageCircle, Send, Bot, Clock, Users, TrendingUp,
  ArrowUpRight, ArrowDownRight, BarChart2, Zap, Award,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, FunnelChart, Funnel, LabelList,
} from "recharts";
import { cn } from "@/lib/utils";

// ── Mock Data ────────────────────────────────────────────────
const DATE_RANGES = ["7d", "30d", "90d"];

const MSG_DATA = {
  "7d": [
    { day: "Mon", in: 42, out: 38, ai: 30, cost: 0.08 },
    { day: "Tue", in: 58, out: 52, ai: 44, cost: 0.11 },
    { day: "Wed", in: 35, out: 30, ai: 22, cost: 0.07 },
    { day: "Thu", in: 71, out: 65, ai: 58, cost: 0.14 },
    { day: "Fri", in: 89, out: 80, ai: 70, cost: 0.18 },
    { day: "Sat", in: 44, out: 38, ai: 32, cost: 0.09 },
    { day: "Sun", in: 27, out: 22, ai: 18, cost: 0.05 },
  ],
  "30d": Array.from({length:30},(_,i)=>({day:`D${i+1}`,in:Math.floor(Math.random()*120+20),out:Math.floor(Math.random()*100+15),ai:Math.floor(Math.random()*80+10),cost:parseFloat((Math.random()*0.3+0.05).toFixed(2))})),
  "90d": Array.from({length:90},(_,i)=>({day:`D${i+1}`,in:Math.floor(Math.random()*200+30),out:Math.floor(Math.random()*180+25),ai:Math.floor(Math.random()*150+20),cost:parseFloat((Math.random()*0.5+0.08).toFixed(2))})),
};

const FUNNEL_DATA = [
  { name: "Contacted",     value: 1284, fill: "#4f46e5" },
  { name: "Qualified",     value: 640,  fill: "#6366f1" },
  { name: "Demo Booked",   value: 210,  fill: "#818cf8" },
  { name: "Proposal Sent", value: 88,   fill: "#a5b4fc" },
  { name: "Closed Won",    value: 22,   fill: "#10b981" },
];

const AI_VS_HUMAN = [
  { day: "Mon", ai: 30, human: 12 },
  { day: "Tue", ai: 44, human: 8 },
  { day: "Wed", ai: 22, human: 13 },
  { day: "Thu", ai: 58, human: 7 },
  { day: "Fri", ai: 70, human: 10 },
  { day: "Sat", ai: 32, human: 6 },
  { day: "Sun", ai: 18, human: 4 },
];

const AGENT_TABLE = [
  { name: "SalesBot Prime",   conversations: 312, resolved: 248, rate: "79%", avgTime: "2.1s", cost: "$8.40" },
  { name: "Support Agent",    conversations: 198, resolved: 175, rate: "88%", avgTime: "1.4s", cost: "$3.10" },
  { name: "Onboarding Guide", conversations: 44,  resolved: 40,  rate: "91%", avgTime: "3.2s", cost: "$0.92" },
];

const TOP_CONTACTS = [
  { name: "Vikram Nair",    conversations: 18, lastMsg: "2 hours ago", stage: "Proposal",      value: "₹2,00,000" },
  { name: "Arjun Mehta",    conversations: 14, lastMsg: "2 mins ago",  stage: "Negotiation",   value: "₹50,000" },
  { name: "Sneha Patel",    conversations: 22, lastMsg: "1 hour ago",  stage: "Closed",        value: "₹80,000" },
  { name: "Rahul Gupta",    conversations: 9,  lastMsg: "15 mins ago", stage: "Demo Scheduled",value: "₹35,000" },
  { name: "Priya Sharma",   conversations: 5,  lastMsg: "8 mins ago",  stage: "Qualification", value: "₹20,000" },
];

const METRIC_CARDS = [
  { label: "Messages In",    value: "366",   delta: "+12.4%", up: true,  icon: MessageCircle, color: "#4f46e5" },
  { label: "Messages Out",   value: "325",   delta: "+9.8%",  up: true,  icon: Send,          color: "#6366f1" },
  { label: "AI Resolution",  value: "68%",   delta: "+3.2%",  up: true,  icon: Bot,           color: "#10b981" },
  { label: "Avg Response",   value: "1m 24s",delta: "-18s",   up: true,  icon: Clock,         color: "#4f46e5" },
  { label: "New Contacts",   value: "34",    delta: "+22%",   up: true,  icon: Users,         color: "#6366f1" },
  { label: "Leads Won",      value: "22",    delta: "+4",     up: true,  icon: Award,         color: "#10b981" },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<keyof typeof MSG_DATA>("7d");
  const data = MSG_DATA[dateRange];

  return (
    <div className="min-h-full p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-saas-text tracking-tight">Analytics</h1>
          <p className="text-saas-subtext text-sm mt-1 font-medium">Performance insights across your WhatsApp CRM</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-saas-card border border-saas-border">
          {DATE_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r as keyof typeof MSG_DATA)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all",
                dateRange === r ? "bg-saas-primary text-white shadow-saas-sm" : "text-saas-subtext hover:text-saas-text"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-6 gap-4">
        {METRIC_CARDS.map((card) => (
          <div key={card.label} className="skeu-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${card.color}18`, color: card.color }}>
                <card.icon className="w-4 h-4" />
              </div>
              <span className={cn("text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full", card.up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
                {card.delta}
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-saas-text leading-none mb-1">{card.value}</p>
            <p className="text-saas-subtext text-xs font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Message Volume */}
        <div className="col-span-2 skeu-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-lg text-saas-text">Message Volume</h2>
              <p className="text-saas-subtext text-xs mt-0.5">Inbound · Outbound · AI handled</p>
            </div>
            <div className="flex gap-4 text-xs font-medium">
              {[{l:"Inbound",c:"#94a3b8"},{l:"Outbound",c:"#cbd5e1"},{l:"AI",c:"#4f46e5"}].map((x)=>(
                <div key={x.l} className="flex items-center gap-1.5 text-saas-subtext"><span className="w-2.5 h-2.5 rounded-full" style={{background:x.c}}/>{x.l}</div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{top:10,right:10,bottom:0,left:-20}}>
              <defs>
                {[{id:"inG",c:"#94a3b8"},{id:"outG",c:"#cbd5e1"},{id:"aiG",c:"#4f46e5"}].map((g)=>(
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.c} stopOpacity={0.2}/><stop offset="95%" stopColor={g.c} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="day" tick={{fontSize:12,fill:"#94a3b8"}} axisLine={false} tickLine={false} dy={10}/>
              <YAxis tick={{fontSize:12,fill:"#94a3b8"}} axisLine={false} tickLine={false} dx={-10}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",fontSize:"12px"}}/>
              <Area dataKey="in"  stroke="#94a3b8" strokeWidth={2} fill="url(#inG)"  dot={{r:0}} activeDot={{r:4}}/>
              <Area dataKey="out" stroke="#cbd5e1" strokeWidth={2} fill="url(#outG)" dot={{r:0}} activeDot={{r:4}}/>
              <Area dataKey="ai"  stroke="#4f46e5" strokeWidth={2} fill="url(#aiG)"  dot={{r:0}} activeDot={{r:4}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Funnel */}
        <div className="skeu-card p-6">
          <h2 className="font-display font-bold text-lg text-saas-text mb-1">Conversion Funnel</h2>
          <p className="text-xs text-saas-subtext mb-4">Lead stages · {dateRange}</p>
          <div className="space-y-2">
            {FUNNEL_DATA.map((item, i) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-saas-subtext">{item.name}</span>
                  <span className="text-xs font-bold font-mono text-saas-text">{item.value}</span>
                </div>
                <div className="h-5 rounded-lg bg-saas-bg overflow-hidden">
                  <div className="h-full rounded-lg flex items-center px-2 transition-all duration-500"
                    style={{width:`${(item.value/FUNNEL_DATA[0].value)*100}%`,background:item.fill}}>
                    <span className="text-[10px] text-white font-bold">{Math.round((item.value/FUNNEL_DATA[0].value)*100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6">
        {/* AI vs Human */}
        <div className="skeu-card p-6">
          <h2 className="font-display font-bold text-lg text-saas-text mb-1">AI vs Human Replies</h2>
          <p className="text-xs text-saas-subtext mb-4">Last 7 days</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={AI_VS_HUMAN} margin={{top:0,right:0,bottom:0,left:-20}}>
              <XAxis dataKey="day" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",fontSize:"12px"}}/>
              <Bar dataKey="ai"    fill="#4f46e5" radius={[4,4,0,0]} barSize={12}/>
              <Bar dataKey="human" fill="#e2e8f0" radius={[4,4,0,0]} barSize={12}/>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {[{l:"AI",c:"#4f46e5"},{l:"Human",c:"#e2e8f0"}].map((x)=>(
              <div key={x.l} className="flex items-center gap-1.5 text-xs text-saas-subtext">
                <span className="w-2.5 h-2.5 rounded-full" style={{background:x.c}}/>{x.l}
              </div>
            ))}
          </div>
        </div>

        {/* Daily AI Cost */}
        <div className="skeu-card p-6">
          <h2 className="font-display font-bold text-lg text-saas-text mb-1">Daily AI Cost</h2>
          <p className="text-xs text-saas-subtext mb-4">Token + template spend ($)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={MSG_DATA["7d"]} margin={{top:10,right:10,bottom:0,left:-20}}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} dy={8}/>
              <YAxis tick={{fontSize:11,fill:"#94a3b8"}} axisLine={false} tickLine={false} dx={-10}/>
              <Tooltip contentStyle={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",fontSize:"12px"}}/>
              <Area dataKey="cost" stroke="#f59e0b" strokeWidth={2} fill="url(#costGrad)" dot={{r:0}} activeDot={{r:4}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Contacts */}
        <div className="skeu-card p-6">
          <h2 className="font-display font-bold text-lg text-saas-text mb-4">Top Contacts</h2>
          <div className="space-y-3">
            {TOP_CONTACTS.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-saas-subtext w-4">{i+1}</span>
                  <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-saas-text">{c.name}</p>
                    <p className="text-[10px] text-saas-subtext">{c.conversations} conversations</p>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono text-emerald-600">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="skeu-card overflow-hidden">
        <div className="px-6 py-4 border-b border-saas-border">
          <h2 className="font-display font-bold text-lg text-saas-text">Agent Performance</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-saas-border bg-saas-bg/50">
              {["Agent","Conversations","Resolved","Resolution Rate","Avg Response","Cost"].map((h)=>(
                <th key={h} className="px-6 py-3 text-left text-[11px] font-mono uppercase tracking-wider text-saas-subtext font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AGENT_TABLE.map((agent) => (
              <tr key={agent.name} className="border-b border-saas-border/60 hover:bg-saas-bg/30 transition-colors">
                <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center"><Bot className="w-4 h-4"/></div><span className="text-sm font-semibold text-saas-text">{agent.name}</span></div></td>
                <td className="px-6 py-4"><span className="text-sm font-bold text-saas-text">{agent.conversations}</span></td>
                <td className="px-6 py-4"><span className="text-sm font-bold text-saas-text">{agent.resolved}</span></td>
                <td className="px-6 py-4"><span className="text-sm font-bold text-emerald-600">{agent.rate}</span></td>
                <td className="px-6 py-4"><span className="text-sm font-mono text-saas-text">{agent.avgTime}</span></td>
                <td className="px-6 py-4"><span className="text-sm font-mono text-saas-text">{agent.cost}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
