"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const NO_SHELL_PATHS = ["/", "/login", "/register", "/onboarding", "/pricing", "/admin"];
const NO_SHELL_PREFIXES = ["/cfa"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const hideShell =
    NO_SHELL_PATHS.includes(pathname) ||
    NO_SHELL_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
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
