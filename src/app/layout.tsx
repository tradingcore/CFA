import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { LevelProvider } from "@/contexts/level-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { StudyProgressProvider } from "@/contexts/study-progress-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AppShell } from "@/components/layout/app-shell";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trading Core | CFA Prep",
  description: "Seu assistente de IA para o CFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <LevelProvider>
                <StudyProgressProvider>
                  <SidebarProvider>
                    <ProtectedRoute>
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
