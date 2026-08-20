"use client";

import type { AIBot, BotStatus } from "@/types";
import { getMarketingInsight } from "@/lib/robotsParser";
import { Shield, AlertTriangle, CheckCircle2, MinusCircle } from "lucide-react";

interface BotStatusGridProps {
  bots: AIBot[];
}

function StatusBadge({ status }: { status: BotStatus }) {
  if (status === "blocked") {
    return (
      <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-3 py-1 text-xs font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Blocked 🛑
      </span>
    );
  }
  if (status === "partial") {
    return (
      <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-3 py-1 text-xs font-semibold">
        <MinusCircle className="w-3.5 h-3.5" />
        Partially Allowed 🟡
      </span>
    );
  }
  if (status === "allowed") {
    return (
      <span className="flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full px-3 py-1 text-xs font-semibold">
        <AlertTriangle className="w-3.5 h-3.5" />
        Allowed 🟢
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-full px-3 py-1 text-xs font-semibold">
      <Shield className="w-3.5 h-3.5" />
      Unknown
    </span>
  );
}

function CompanyLogo({ company }: { company: string }) {
  const logos: Record<string, string> = {
    OpenAI: "🤖",
    Anthropic: "🧠",
    "Google (Gemini)": "✨",
    "Perplexity AI": "🔮",
    Cohere: "⚡",
    "Meta AI": "👁️",
  };
  return <span className="text-2xl">{logos[company] || "🤖"}</span>;
}

function getBorderColor(status: BotStatus): string {
  if (status === "blocked") return "border-green-500/20 hover:border-green-500/40";
  if (status === "partial") return "border-amber-500/20 hover:border-amber-500/40";
  if (status === "allowed") return "border-red-500/20 hover:border-red-500/40";
  return "border-slate-500/20";
}

function getGlowBg(status: BotStatus): string {
  if (status === "blocked") return "bg-green-500/5";
  if (status === "partial") return "bg-amber-500/5";
  if (status === "allowed") return "bg-red-500/5";
  return "";
}

export default function BotStatusGrid({ bots }: BotStatusGridProps) {
  return (
    <div className="bg-[#0d1f3d] border border-cyan-500/10 rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        AI Crawler Audit — 7 Agents Analyzed
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bots.map((bot) => (
          <div
            key={bot.userAgent}
            className={`border rounded-xl p-4 transition-all duration-200 ${getBorderColor(bot.status)} ${getGlowBg(bot.status)}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <CompanyLogo company={bot.company} />
                <div>
                  <div className="text-white font-semibold text-sm">{bot.name}</div>
                  <div className="text-slate-500 text-[11px]">{bot.company}</div>
                </div>
              </div>
              <StatusBadge status={bot.status} />
            </div>

            {/* Description */}
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              {bot.description}
            </p>

            {/* Applied rules */}
            {bot.rules.length > 0 && (
              <div className="space-y-1">
                {bot.rules.slice(0, 2).map((rule, i) => (
                  <div
                    key={i}
                    className="bg-[#0a1628] rounded px-2.5 py-1.5 font-mono text-[11px] text-cyan-300/70"
                  >
                    {rule}
                  </div>
                ))}
              </div>
            )}

            {/* Marketing insight */}
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-[11px] leading-relaxed text-slate-400 italic">
                {getMarketingInsight(bot)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
