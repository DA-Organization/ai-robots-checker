export type BotStatus = "blocked" | "allowed" | "partial" | "unknown";

export interface AIBot {
  name: string;
  company: string;
  userAgent: string;
  description: string;
  status: BotStatus;
  rules: string[];
}

export interface RobotsAnalysis {
  domain: string;
  rawContent: string;
  bots: AIBot[];
  protectionScore: number;
  globalDisallow: boolean;
  fetchMethod: "direct" | "cors-blocked" | "pasted";
  analyzedAt: Date;
}

export interface ParsedRule {
  userAgent: string;
  disallow: string[];
  allow: string[];
}

export type AppTab = "analyzer" | "generator";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  provider: "google" | "email" | "demo";
}
