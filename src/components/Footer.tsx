"use client";

import Image from "next/image";
import AdBanner from "./AdBanner";
import { ExternalLink, Heart } from "lucide-react";

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
    url: "https://www.facebook.com/imhabibur23",
    icon: FacebookIcon,
    color: "text-blue-400 hover:text-blue-300",
    bg: "hover:bg-blue-500/10",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/thesmallbizaiadvantage",
    icon: InstagramIcon,
    color: "text-pink-400 hover:text-pink-300",
    bg: "hover:bg-pink-500/10",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@TheSmallBizAIAdvantage",
    icon: YoutubeIcon,
    color: "text-red-400 hover:text-red-300",
    bg: "hover:bg-red-500/10",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080f1e] border-t border-cyan-500/10 mt-16">
      {/* Bottom Leaderboard Ad — positioned above social links */}
      <AdBanner type="footer-leaderboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-cyan-500/30">
                <Image
                  src="/logo.png"
                  alt="The Small Biz AI Advantage"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-white font-bold text-sm">
                  The Small Biz AI Advantage
                </div>
                <div className="text-cyan-400 text-[10px] uppercase tracking-widest">
                  AI-Robots.txt Checker
                </div>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Empowering small businesses to take control of their digital
              content and protect it from AI data harvesting — for free.
            </p>
          </div>

          {/* Tools column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Features</h4>
            <ul className="space-y-2">
              {[
                "AI Crawler Scanner",
                "Protection Score",
                "7-Bot Audit Engine",
                "robots.txt Generator",
                "Marketing Insights",
                "CORS Fallback Checker",
              ].map((item) => (
                <li key={item}>
                  <span className="text-slate-500 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full flex-shrink-0" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Community */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Join the Advantage Community
            </h4>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map(({ name, url, icon: Icon, color, bg }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-200 group ${bg}`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${color}`} />
                  <span className="text-slate-400 text-xs group-hover:text-white transition-colors">
                    {name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400 ml-auto transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Tagline */}
            <div className="text-center sm:text-left">
              <p className="text-cyan-400/70 text-[11px] font-semibold tracking-[0.25em] uppercase">
                MASTERING AI PROMPTS • FOR SMALL BUSINESS &amp; MARKETING
              </p>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
              <span>© {new Date().getFullYear()} The Small Biz AI Advantage</span>
              <span className="flex items-center gap-1">
                · Made with <Heart className="w-3 h-3 text-red-500/60 fill-red-500/60" /> for small businesses
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
