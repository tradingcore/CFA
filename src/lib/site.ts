export const SITE = {
  name: "Trading Core",
  shortName: "Trading Core",
  tagline: "Your AI-powered CFA study assistant",
  description:
    "The only AI study platform built exclusively for the CFA exam. Complete 2026 curriculum, massive question bank, and a tutor that understands the syllabus.",
  twitter: "@tradingcore",
  defaultOgImage: "/og-default.png",
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://www.tradingcore.com.br";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
