import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";
import AnalyzerPanel from "@/components/AnalyzerPanel";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Shield, Zap, Globe, TrendingUp } from "lucide-react";

const STATS = [
  { icon: Shield, label: "AI Bots Tracked", value: "7", color: "text-cyan-400" },
  { icon: Globe, label: "Websites Analyzed", value: "10K+", color: "text-blue-400" },
  { icon: Zap, label: "Instant Results", value: "< 3s", color: "text-amber-400" },
  { icon: TrendingUp, label: "Protection Score", value: "Free", color: "text-green-400" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Top Leaderboard Ad Banner — directly below navigation */}
      <AdBanner type="leaderboard" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#080f1e] border-b border-cyan-500/10">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                Free AI Crawler Audit Tool
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
              Is Your Website{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Training AI
              </span>{" "}
              Without Your Permission?
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Scan your robots.txt to discover which AI companies (OpenAI,
              Anthropic, Google, Meta &amp; more) are harvesting your content —
              and block them in one click.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {STATS.map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="bg-[#0d1f3d] border border-cyan-500/10 rounded-xl py-3 px-4 text-center"
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1.5 ${color}`} />
                  <div className={`text-xl font-black ${color}`}>{value}</div>
                  <div className="text-slate-500 text-[11px] leading-tight">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content — Two-column grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Main Tool Panel — 2 columns */}
          <div className="md:col-span-2">
            <AnalyzerPanel />
          </div>

          {/* Right: Sidebar — 1 column */}
          <div className="md:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
