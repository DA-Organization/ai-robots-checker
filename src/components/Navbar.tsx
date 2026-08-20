"use client";

import Image from "next/image";
import { useAuth } from "@/lib/authContext";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-[#0a1628] border-b border-cyan-500/20 sticky top-0 z-50 shadow-lg shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-cyan-500/30 bg-[#0d1f3d]">
              <Image
                src="/logo.png"
                alt="The Small Biz AI Advantage Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm leading-tight tracking-wide">
                The Small Biz AI Advantage
              </span>
              <span className="text-cyan-400 text-[10px] font-medium tracking-widest uppercase leading-tight hidden sm:block">
                AI-Robots.txt Checker
              </span>
            </div>
          </div>

          {/* Center badge */}
          <div className="hidden md:flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-xs font-medium tracking-wide">
              AI Crawler Protection Scanner
            </span>
          </div>

          {/* Auth area */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-[#0d1f3d] border border-cyan-500/20 rounded-full px-3 py-1.5">
                  {user.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatarUrl}
                      alt={user.name || "User"}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-cyan-400" />
                  )}
                  <span className="text-white text-xs font-medium hidden sm:block">
                    {user.name || user.email?.split("@")[0] || "User"}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs hidden sm:block">
                  Free Analysis
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
