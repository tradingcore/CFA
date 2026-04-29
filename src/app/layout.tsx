import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LevelProvider } from "@/contexts/level-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { StudyProgressProvider } from "@/contexts/study-progress-context";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

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
  description: "Assistente de IA para estudar para o CFA",
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
          <TooltipProvider>
            <LevelProvider>
              <StudyProgressProvider>
                <SidebarProvider>
                  <div className="flex h-full flex-col">
                    <Header />
                    <div className="flex flex-1 overflow-hidden">
                      <Sidebar />
                      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {children}
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </StudyProgressProvider>
            </LevelProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
