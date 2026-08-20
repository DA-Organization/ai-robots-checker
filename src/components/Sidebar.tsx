"use client";

import AdBanner from "./AdBanner";
import {
  Users,
  ExternalLink,
  BookOpen,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

// Social SVG icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    handle: "@imhabibur23",
    url: "https://www.facebook.com/imhabibur23",
    icon: FacebookIcon,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
  },
  {
    name: "Instagram",
    handle: "@thesmallbizaiadvantage",
    url: "https://www.instagram.com/thesmallbizaiadvantage",
    icon: InstagramIcon,
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20",
    hoverBorder: "hover:border-pink-500/40",
  },
  {
    name: "YouTube",
    handle: "@TheSmallBizAIAdvantage",
    url: "https://www.youtube.com/@TheSmallBizAIAdvantage",
    icon: YoutubeIcon,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20 hover:bg-red-500/20",
    hoverBorder: "hover:border-red-500/40",
  },
];

const TIPS = [
  {
    icon: Lightbulb,
    tip: "Block GPTBot to prevent OpenAI from using your content to train ChatGPT.",
  },
  {
    icon: TrendingUp,
    tip: "Your robots.txt changes take effect within 24-48 hours as bots recrawl.",
  },
  {
    icon: BookOpen,
    tip: "Blocking AI crawlers does NOT affect your Google Search rankings — they use a separate Googlebot.",
  },
];

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Ad Skyscraper */}
      <AdBanner type="skyscraper" />

      {/* Community Section */}
      <div className="bg-[#0d1f3d] border border-cyan-500/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">
              Join the Advantage Community
            </h3>
            <p className="text-slate-500 text-[10px]">
              Free AI tips for small business owners
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {SOCIAL_LINKS.map(
            ({ name, handle, url, icon: Icon, color, bg, hoverBorder }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-200 group ${bg} ${hoverBorder}`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${color}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{name}</div>
                  <div className="text-slate-500 text-[11px] truncate">
                    {handle}
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
              </a>
            )
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-slate-400 text-[11px] leading-relaxed text-center">
            🚀 Get weekly AI prompts &amp; strategies delivered free to help grow your small business
          </p>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-[#0d1f3d] border border-cyan-500/10 rounded-2xl p-5">
        <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          Quick Tips
        </h3>
        <div className="space-y-3">
          {TIPS.map(({ icon: Icon, tip }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-3 h-3 text-amber-400" />
              </div>
              <p className="text-slate-400 text-[12px] leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What is robots.txt */}
      <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/15 rounded-2xl p-5">
        <h3 className="text-white font-bold text-sm mb-3">
          🤔 What is robots.txt?
        </h3>
        <p className="text-slate-400 text-[12px] leading-relaxed">
          A robots.txt file is a small text file on your website that tells
          crawlers (both search engines and AI bots) which pages they{" "}
          <span className="text-white">can</span> and{" "}
          <span className="text-white">cannot</span> access. It&apos;s your
          website&apos;s digital &quot;No Trespassing&quot; sign for AI
          companies.
        </p>
      </div>
    </aside>
  );
}
