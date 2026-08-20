import type { AIBot, ParsedRule, RobotsAnalysis, BotStatus } from "@/types";

// High-priority AI crawlers to audit
export const AI_BOTS: Omit<AIBot, "status" | "rules">[] = [
  {
    name: "GPTBot",
    company: "OpenAI",
    userAgent: "GPTBot",
    description:
      "OpenAI's web crawler used to train GPT models including ChatGPT.",
  },
  {
    name: "ChatGPT-User",
    company: "OpenAI",
    userAgent: "ChatGPT-User",
    description:
      "OpenAI's browsing agent used when ChatGPT accesses real-time web content.",
  },
  {
    name: "ClaudeBot",
    company: "Anthropic",
    userAgent: "ClaudeBot",
    description: "Anthropic's web crawler used to train the Claude AI models.",
  },
  {
    name: "Google-Extended",
    company: "Google (Gemini)",
    userAgent: "Google-Extended",
    description:
      "Google's extended crawler specifically for Gemini AI and Bard training data.",
  },
  {
    name: "PerplexityBot",
    company: "Perplexity AI",
    userAgent: "PerplexityBot",
    description:
      "Perplexity AI's crawler for indexing and summarizing web content.",
  },
  {
    name: "cohere-ai",
    company: "Cohere",
    userAgent: "cohere-ai",
    description:
      "Cohere's AI crawler used to train enterprise language models.",
  },
  {
    name: "Meta-ExternalAgent",
    company: "Meta AI",
    userAgent: "Meta-ExternalAgent",
    description:
      "Meta's AI crawler used for training Llama models and Meta AI products.",
  },
];

export function parseRobotsTxt(content: string): ParsedRule[] {
  const rules: ParsedRule[] = [];
  const lines = content.split("\n");

  let currentAgents: string[] = [];
  let currentRule: ParsedRule | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip comments and empty lines (but save current rule first if switching)
    if (line.startsWith("#") || line === "") {
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const field = line.substring(0, colonIdx).trim().toLowerCase();
    const value = line.substring(colonIdx + 1).trim();

    if (field === "user-agent") {
      // If we have an existing rule with agents but encounter a new user-agent
      // after directives, save it first
      if (currentRule && currentRule.disallow.length + currentRule.allow.length > 0) {
        rules.push(currentRule);
        currentRule = null;
        currentAgents = [];
      }
      currentAgents.push(value);
      if (!currentRule) {
        currentRule = { userAgent: value, disallow: [], allow: [] };
      } else {
        currentRule.userAgent = value;
      }
    } else if (field === "disallow") {
      if (currentRule) {
        currentRule.disallow.push(value);
        // If multiple agents, duplicate for each
        if (currentAgents.length > 1) {
          for (let i = 1; i < currentAgents.length; i++) {
            const existing = rules.find(
              (r) => r.userAgent === currentAgents[i]
            );
            if (existing) {
              existing.disallow.push(value);
            } else {
              // Will be handled when we finalize
            }
          }
        }
      }
    } else if (field === "allow") {
      if (currentRule) {
        currentRule.allow.push(value);
      }
    } else {
      // Sitemap or other directive — finalize current rule
      if (
        currentRule &&
        currentRule.disallow.length + currentRule.allow.length > 0
      ) {
        rules.push(currentRule);
        currentRule = null;
        currentAgents = [];
      }
    }
  }

  // Push the last rule
  if (
    currentRule &&
    currentRule.disallow.length + currentRule.allow.length > 0
  ) {
    rules.push(currentRule);
  }

  return rules;
}

export function analyzeBotsAgainstRules(
  rules: ParsedRule[],
  content: string
): AIBot[] {
  // Re-parse more carefully using a block-based approach
  const blocks = parseRobotsBlocks(content);

  return AI_BOTS.map((bot) => {
    // Find matching blocks for this bot's user-agent
    const matchingBlocks = blocks.filter(
      (block) =>
        block.agents.some(
          (a) => a.toLowerCase() === bot.userAgent.toLowerCase()
        ) ||
        block.agents.some((a) => a === "*")
    );

    const specificBlocks = blocks.filter((block) =>
      block.agents.some(
        (a) => a.toLowerCase() === bot.userAgent.toLowerCase()
      )
    );

    const wildcardBlocks = blocks.filter((block) =>
      block.agents.some((a) => a === "*")
    );

    let status: BotStatus = "allowed";
    const appliedRules: string[] = [];

    if (specificBlocks.length > 0) {
      // Specific rules take priority
      const allDisallow = specificBlocks.flatMap((b) => b.disallow);
      const allAllow = specificBlocks.flatMap((b) => b.allow);

      if (allDisallow.some((d) => d === "/")) {
        status = "blocked";
        appliedRules.push(`Disallow: /`);
      } else if (allDisallow.length > 0 && allAllow.length > 0) {
        status = "partial";
        appliedRules.push(...allDisallow.map((d) => `Disallow: ${d}`));
        appliedRules.push(...allAllow.map((a) => `Allow: ${a}`));
      } else if (allDisallow.length > 0) {
        status = "partial";
        appliedRules.push(...allDisallow.map((d) => `Disallow: ${d}`));
      } else {
        status = "allowed";
        appliedRules.push(
          ...allAllow.map((a) => `Allow: ${a}` || "Explicitly allowed")
        );
      }
    } else if (wildcardBlocks.length > 0) {
      // Wildcard rules apply
      const allDisallow = wildcardBlocks.flatMap((b) => b.disallow);
      const allAllow = wildcardBlocks.flatMap((b) => b.allow);

      if (allDisallow.some((d) => d === "/")) {
        status = "blocked";
        appliedRules.push(`Disallow: / (via wildcard *)`);
      } else if (allDisallow.length > 0 && allAllow.length > 0) {
        status = "partial";
        appliedRules.push(...allDisallow.map((d) => `Disallow: ${d} (via *)`));
        appliedRules.push(...allAllow.map((a) => `Allow: ${a} (via *)`));
      } else if (allDisallow.length > 0) {
        status = "partial";
        appliedRules.push(...allDisallow.map((d) => `Disallow: ${d} (via *)`));
      } else {
        status = "allowed";
      }
    } else {
      status = "allowed";
      appliedRules.push("No rules found — bot is allowed by default");
    }

    return {
      ...bot,
      status,
      rules: appliedRules,
    };
  });
}

interface RobotsBlock {
  agents: string[];
  disallow: string[];
  allow: string[];
}

function parseRobotsBlocks(content: string): RobotsBlock[] {
  const blocks: RobotsBlock[] = [];
  const lines = content.split("\n");

  let currentAgents: string[] = [];
  let currentDisallow: string[] = [];
  let currentAllow: string[] = [];
  let inBlock = false;

  const saveBlock = () => {
    if (currentAgents.length > 0) {
      blocks.push({
        agents: [...currentAgents],
        disallow: [...currentDisallow],
        allow: [...currentAllow],
      });
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("#") || line === "") {
      if (inBlock && (currentDisallow.length > 0 || currentAllow.length > 0)) {
        saveBlock();
        currentAgents = [];
        currentDisallow = [];
        currentAllow = [];
        inBlock = false;
      }
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const field = line.substring(0, colonIdx).trim().toLowerCase();
    const value = line.substring(colonIdx + 1).trim();

    if (field === "user-agent") {
      if (inBlock && (currentDisallow.length > 0 || currentAllow.length > 0)) {
        saveBlock();
        currentAgents = [];
        currentDisallow = [];
        currentAllow = [];
      }
      currentAgents.push(value);
      inBlock = true;
    } else if (field === "disallow") {
      currentDisallow.push(value);
    } else if (field === "allow") {
      currentAllow.push(value);
    }
  }

  // Save last block
  if (
    currentAgents.length > 0 &&
    (currentDisallow.length > 0 || currentAllow.length > 0)
  ) {
    saveBlock();
  }

  return blocks;
}

export function calculateProtectionScore(bots: AIBot[]): number {
  if (bots.length === 0) return 0;

  const scores: number[] = bots.map((bot) => {
    if (bot.status === "blocked") return 100;
    if (bot.status === "partial") return 50;
    return 0;
  });

  return Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length);
}

export function getMarketingInsight(bot: AIBot): string {
  if (bot.status === "allowed") {
    if (bot.company === "OpenAI") {
      return `⚠️ ${bot.name} is actively crawling your site. Your content is being used to train ChatGPT and OpenAI's language models.`;
    }
    if (bot.company === "Anthropic") {
      return `⚠️ Anthropic's ClaudeBot is scraping your website to train Claude AI — a direct competitor to your content.`;
    }
    if (bot.company === "Google (Gemini)") {
      return `⚠️ Google-Extended is harvesting your content for Gemini AI training, separate from standard Google Search indexing.`;
    }
    if (bot.company === "Perplexity AI") {
      return `⚠️ PerplexityBot is summarizing your content and presenting it to users without sending them to your website.`;
    }
    if (bot.company === "Meta AI") {
      return `⚠️ Meta's AI crawler is using your content to train Llama models powering Facebook and Instagram AI features.`;
    }
    return `⚠️ ${bot.name} from ${bot.company} has unrestricted access to your website's content.`;
  }
  if (bot.status === "partial") {
    return `🟡 ${bot.name} has partial access. Some of your content may still be used for AI training purposes.`;
  }
  return `✅ ${bot.name} is fully blocked. Your content is protected from ${bot.company}'s AI training pipeline.`;
}

export function generateRobotsTxt(selectedBots: string[]): string {
  if (selectedBots.length === 0) return "";

  const lines: string[] = [
    "# robots.txt — Generated by AI-Robots.txt Checker",
    "# The Small Biz AI Advantage | ai-robots-checker.app",
    "# Generated: " + new Date().toISOString().split("T")[0],
    "",
    "# ============================================",
    "# ALLOW ALL STANDARD SEARCH ENGINE CRAWLERS",
    "# ============================================",
    "User-agent: *",
    "Allow: /",
    "",
    "# ============================================",
    "# BLOCK SELECTED AI TRAINING CRAWLERS",
    "# ============================================",
  ];

  for (const agentName of selectedBots) {
    const bot = AI_BOTS.find((b) => b.userAgent === agentName);
    if (bot) {
      lines.push(`# ${bot.company} — ${bot.description}`);
      lines.push(`User-agent: ${bot.userAgent}`);
      lines.push(`Disallow: /`);
      lines.push("");
    }
  }

  lines.push("# Sitemap (update with your actual sitemap URL)");
  lines.push("# Sitemap: https://yourdomain.com/sitemap.xml");

  return lines.join("\n");
}

export async function fetchRobotsTxt(
  url: string
): Promise<{ content: string; method: "direct" | "cors-blocked" }> {
  // Normalize the URL
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith("http")) {
    normalizedUrl = "https://" + normalizedUrl;
  }

  try {
    const urlObj = new URL(normalizedUrl);
    const robotsUrl = `${urlObj.protocol}//${urlObj.host}/robots.txt`;

    const response = await fetch(robotsUrl, {
      method: "GET",
      headers: { Accept: "text/plain" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const content = await response.text();
    return { content, method: "direct" };
  } catch {
    return { content: "", method: "cors-blocked" };
  }
}

export function buildAnalysis(
  domain: string,
  rawContent: string,
  fetchMethod: "direct" | "cors-blocked" | "pasted"
): RobotsAnalysis {
  const rules = parseRobotsTxt(rawContent);
  const bots = analyzeBotsAgainstRules(rules, rawContent);
  const protectionScore = calculateProtectionScore(bots);

  // Check for global disallow
  const globalDisallow = rawContent.toLowerCase().includes("disallow: /") &&
    rawContent.toLowerCase().includes("user-agent: *");

  return {
    domain,
    rawContent,
    bots,
    protectionScore,
    globalDisallow,
    fetchMethod,
    analyzedAt: new Date(),
  };
}
