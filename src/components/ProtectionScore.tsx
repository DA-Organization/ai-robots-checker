"use client";

interface ProtectionScoreProps {
  score: number;
}

export default function ProtectionScore({ score }: ProtectionScoreProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return { stroke: "#22c55e", text: "text-green-400", glow: "shadow-green-500/20" };
    if (s >= 50) return { stroke: "#f59e0b", text: "text-amber-400", glow: "shadow-amber-500/20" };
    if (s >= 25) return { stroke: "#f97316", text: "text-orange-400", glow: "shadow-orange-500/20" };
    return { stroke: "#ef4444", text: "text-red-400", glow: "shadow-red-500/20" };
  };

  const getLabel = (s: number) => {
    if (s >= 80) return { label: "Well Protected", subtitle: "Your content is shielded from most AI crawlers" };
    if (s >= 50) return { label: "Partially Protected", subtitle: "Some AI bots still have access to your content" };
    if (s >= 25) return { label: "Mostly Exposed", subtitle: "Most AI crawlers can freely access your content" };
    return { label: "Fully Exposed", subtitle: "⚠️ Your content is being used to train competing AI models" };
  };

  const colors = getScoreColor(score);
  const { label, subtitle } = getLabel(score);

  // SVG radial meter
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#0d1f3d] border border-cyan-500/10 rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
        <span className="text-2xl">🛡️</span>
        AI Protection Score
      </h3>

      <div className="flex flex-col items-center">
        {/* Radial Meter */}
        <div className={`relative inline-flex items-center justify-center mb-6 rounded-full shadow-2xl ${colors.glow}`}>
          <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
            {/* Background track */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="14"
            />
            {/* Progress arc */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1.5s ease-in-out, stroke 0.5s ease" }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-black ${colors.text}`}>
              {score}%
            </span>
            <span className="text-slate-400 text-xs font-medium mt-0.5">Protected</span>
          </div>
        </div>

        {/* Label */}
        <div className="text-center">
          <div className={`text-lg font-bold ${colors.text} mb-1`}>{label}</div>
          <div className="text-slate-400 text-sm leading-relaxed max-w-xs text-center">
            {subtitle}
          </div>
        </div>

        {/* Score bar breakdown */}
        <div className="w-full mt-6 space-y-2">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>0% — Fully Exposed</span>
            <span>100% — Fully Protected</span>
          </div>
          <div className="w-full h-3 bg-[#1e3a5f] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-in-out"
              style={{
                width: `${score}%`,
                background: `linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)`,
                backgroundSize: "200% 100%",
                backgroundPosition: `${100 - score}% 0`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
