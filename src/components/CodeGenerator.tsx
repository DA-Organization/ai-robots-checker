"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Code2, RefreshCw } from "lucide-react";
import { AI_BOTS, generateRobotsTxt } from "@/lib/robotsParser";

export default function CodeGenerator() {
  const [selectedBots, setSelectedBots] = useState<string[]>(
    AI_BOTS.map((b) => b.userAgent)
  );
  const [copied, setCopied] = useState(false);
  const [selectAll, setSelectAll] = useState(true);

  const generatedCode = generateRobotsTxt(selectedBots);

  const toggleBot = useCallback((userAgent: string) => {
    setSelectedBots((prev) => {
      const next = prev.includes(userAgent)
        ? prev.filter((b) => b !== userAgent)
        : [...prev, userAgent];
      setSelectAll(next.length === AI_BOTS.length);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectAll) {
      setSelectedBots([]);
      setSelectAll(false);
    } else {
      setSelectedBots(AI_BOTS.map((b) => b.userAgent));
      setSelectAll(true);
    }
  }, [selectAll]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = generatedCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedCode]);

  return (
    <div className="space-y-6">
      {/* Bot selection */}
      <div className="bg-[#0d1f3d] border border-cyan-500/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            Select AI Agents to Block
          </h3>
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 rounded-full px-3 py-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {selectAll ? "Deselect All" : "Select All"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AI_BOTS.map((bot) => {
            const isSelected = selectedBots.includes(bot.userAgent);
            return (
              <label
                key={bot.userAgent}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-cyan-500/40 bg-cyan-500/5"
                    : "border-slate-700/50 bg-[#0a1628] hover:border-slate-600"
                }`}
              >
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleBot(bot.userAgent)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-slate-600 bg-[#0a1628]"
                    }`}
                  >
                    {isSelected && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-semibold">
                      {bot.name}
                    </span>
                    <span className="text-slate-500 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                      {bot.userAgent}
                    </span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    {bot.company}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-slate-400 text-sm">
            <span className="text-cyan-400 font-bold">{selectedBots.length}</span> of {AI_BOTS.length} bots selected for blocking
          </span>
          {selectedBots.length > 0 && (
            <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
              ✓ Code ready
            </span>
          )}
        </div>
      </div>

      {/* Generated code */}
      <div className="bg-[#0d1f3d] border border-cyan-500/10 rounded-2xl overflow-hidden">
        {/* Code header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#0a1628]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-slate-400 text-xs font-mono ml-2">
              robots.txt
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            disabled={selectedBots.length === 0}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>

        {/* Code content */}
        <div className="p-5 max-h-96 overflow-y-auto">
          {selectedBots.length === 0 ? (
            <div className="text-center py-8">
              <Code2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                Select at least one AI bot above to generate your robots.txt code
              </p>
            </div>
          ) : (
            <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap text-slate-300">
              {generatedCode.split("\n").map((line, i) => {
                if (line.startsWith("#")) {
                  return (
                    <span key={i} className="block text-slate-500">
                      {line}
                    </span>
                  );
                }
                if (line.startsWith("User-agent:")) {
                  return (
                    <span key={i} className="block text-cyan-400 font-semibold">
                      {line}
                    </span>
                  );
                }
                if (line.startsWith("Disallow:")) {
                  return (
                    <span key={i} className="block text-red-400">
                      {line}
                    </span>
                  );
                }
                if (line.startsWith("Allow:")) {
                  return (
                    <span key={i} className="block text-green-400">
                      {line}
                    </span>
                  );
                }
                return (
                  <span key={i} className="block text-slate-300">
                    {line || "\u00A0"}
                  </span>
                );
              })}
            </pre>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
        <h4 className="text-amber-400 font-semibold text-sm mb-2 flex items-center gap-2">
          📋 How to Deploy This File
        </h4>
        <ol className="text-slate-400 text-xs space-y-1.5 list-decimal list-inside leading-relaxed">
          <li>Copy the generated code using the button above</li>
          <li>
            Navigate to your website&apos;s root directory on your web server or
            CMS
          </li>
          <li>
            Create or replace the file named exactly{" "}
            <code className="text-cyan-400 bg-cyan-500/10 px-1 rounded">
              robots.txt
            </code>{" "}
            in the root folder
          </li>
          <li>
            Verify it&apos;s live by visiting{" "}
            <code className="text-cyan-400 bg-cyan-500/10 px-1 rounded">
              yourdomain.com/robots.txt
            </code>
          </li>
          <li>
            Run this checker again to confirm all selected AI bots show{" "}
            <span className="text-green-400">Blocked</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
