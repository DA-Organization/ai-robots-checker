import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/authContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-Robots.txt Checker | The Small Biz AI Advantage",
  description:
    "Instantly audit which AI bots (GPTBot, ClaudeBot, Google-Extended, PerplexityBot and more) can access your website. Get your AI Protection Score and generate a blocking robots.txt in one click.",
  keywords: [
    "robots.txt checker",
    "AI crawler blocker",
    "GPTBot block",
    "ClaudeBot block",
    "Google Extended block",
    "AI protection score",
    "small business AI",
  ],
  openGraph: {
    title: "AI-Robots.txt Checker | The Small Biz AI Advantage",
    description:
      "Audit and protect your website from AI training crawlers with our free analyzer.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#080f1e] text-slate-100 antialiased min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
