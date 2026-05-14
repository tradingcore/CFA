import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { absoluteUrl, getSiteUrl, SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { LevelProvider } from "@/contexts/level-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { StudyProgressProvider } from "@/contexts/study-progress-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AppShell } from "@/components/layout/app-shell";
import { PageTracker } from "@/components/analytics/page-tracker";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE.name} | AI-Powered CFA Exam Prep — Free to Start`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "CFA",
    "CFA exam prep",
    "CFA Level I",
    "CFA Level II",
    "CFA Level III",
    "CFA study plan",
    "CFA mock exam",
    "CFA AI tutor",
    "CFA 2026 curriculum",
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} | AI-Powered CFA Exam Prep`,
    description: SITE.description,
    url: getSiteUrl(),
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | AI-Powered CFA Exam Prep`,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const base = getSiteUrl();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: base,
    logo: absoluteUrl("/icon"),
    description: SITE.description,
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: base,
    description: SITE.description,
    publisher: { "@type": "Organization", name: SITE.name, url: base },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/cfa?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <JsonLd id="organization" data={organizationJsonLd} />
        <JsonLd id="website" data={websiteJsonLd} />
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <LevelProvider>
                <StudyProgressProvider>
                  <SidebarProvider>
                    <ProtectedRoute>
                      <PageTracker />
                      <AppShell>
                        {children}
                      </AppShell>
                    </ProtectedRoute>
                  </SidebarProvider>
                </StudyProgressProvider>
              </LevelProvider>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
