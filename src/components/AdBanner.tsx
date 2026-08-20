"use client";

interface AdBannerProps {
  type: "leaderboard" | "skyscraper" | "footer-leaderboard";
  className?: string;
}

export default function AdBanner({ type, className = "" }: AdBannerProps) {
  if (type === "leaderboard") {
    return (
      <div className={`w-full flex justify-center py-2 bg-[#080f1e] border-b border-cyan-500/10 ${className}`}>
        {/* INSERT ADSENSE CODE HERE — Top Leaderboard Banner 728x90 */}
        <div
          className="flex items-center justify-center bg-[#0d1f3d] border border-cyan-500/10 rounded text-slate-500 text-xs font-mono tracking-wide"
          style={{ width: "728px", height: "90px", maxWidth: "100%" }}
        >
          <div className="text-center">
            <div className="text-slate-600 text-[10px] uppercase tracking-widest mb-1">Advertisement</div>
            <div className="text-slate-500 text-xs">Top Leaderboard — 728×90</div>
          </div>
        </div>
        {/* END ADSENSE — Top Leaderboard */}
      </div>
    );
  }

  if (type === "skyscraper") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {/* INSERT ADSENSE CODE HERE — Right Sidebar Skyscraper 300x600 */}
        <div className="text-center mb-2">
          <span className="text-slate-600 text-[10px] uppercase tracking-widest font-mono">
            Advertisement
          </span>
        </div>
        <div
          className="flex items-center justify-center bg-[#0d1f3d] border border-cyan-500/10 rounded-xl text-slate-500 text-xs font-mono w-full"
          style={{ width: "300px", height: "600px", maxWidth: "100%" }}
        >
          <div className="text-center px-4">
            <div className="text-slate-600 text-[10px] uppercase tracking-widest mb-2">Advertisement</div>
            <div className="text-slate-500 text-sm font-semibold">Skyscraper</div>
            <div className="text-slate-600 text-xs mt-1">300×600</div>
          </div>
        </div>
        {/* END ADSENSE — Right Sidebar Skyscraper */}
      </div>
    );
  }

  if (type === "footer-leaderboard") {
    return (
      <div className={`w-full flex flex-col items-center py-6 border-b border-cyan-500/10 ${className}`}>
        {/* INSERT ADSENSE CODE HERE — Bottom Footer Leaderboard Banner 728x90 */}
        <div className="text-center mb-2">
          <span className="text-slate-600 text-[10px] uppercase tracking-widest font-mono">
            Advertisement
          </span>
        </div>
        <div
          className="flex items-center justify-center bg-[#0d1f3d] border border-cyan-500/10 rounded text-slate-500 text-xs font-mono"
          style={{ width: "728px", height: "90px", maxWidth: "100%" }}
        >
          <div className="text-center">
            <div className="text-slate-600 text-[10px] uppercase tracking-widest mb-1">Advertisement</div>
            <div className="text-slate-500 text-xs">Bottom Leaderboard — 728×90</div>
          </div>
        </div>
        {/* END ADSENSE — Bottom Footer Leaderboard */}
      </div>
    );
  }

  return null;
}
