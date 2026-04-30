"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const NO_SHELL_PATHS = ["/", "/login", "/registro", "/onboarding"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const hideShell = NO_SHELL_PATHS.includes(pathname);
  const showShell = user && !hideShell && !loading;

  if (!showShell) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
