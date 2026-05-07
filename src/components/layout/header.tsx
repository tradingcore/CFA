"use client";

import { useLevel } from "@/contexts/level-context";
import { useAuth } from "@/contexts/auth-context";
import { useSidebar } from "@/contexts/sidebar-context";
import { CFALevel } from "@/lib/cfa-topics";
import { Moon, Sun, TrendingUp, ChevronDown, User, Menu, LogOut, Settings, HelpCircle, Sparkles } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ActiveUsersBadge } from "@/components/layout/active-users-badge";

const levels: CFALevel[] = ["I", "II", "III"];

export function Header() {
  const { level, setLevel } = useLevel();
  const { user, profile, signOut } = useAuth();
  const { setMobileOpen } = useSidebar();
  const { isSubscribed: isSub } = useSubscription();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const displayName = user?.displayName || profile?.displayName || "";
  const photoURL = user?.photoURL || profile?.photoURL || "";
  const initials = displayName
    ? displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-base font-bold leading-tight tracking-tight">
              Trading Core
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              CFA Prep
            </span>
          </div>
        </Link>
        <div className="hidden sm:block">
          <ActiveUsersBadge />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-accent"
        >
          <span>CFA Level {level}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {levels.map((l) => (
            <DropdownMenuItem
              key={l}
              onClick={() => setLevel(l)}
              className={l === level ? "font-bold text-primary" : ""}
            >
              CFA Level {l}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2 sm:gap-3">
        {!isSub && user && (
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow transition-all hover:opacity-90 hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upgrade</span>
            <span className="sm:hidden">Pro</span>
          </Link>
        )}
        {isSub && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
            PRO
          </span>
        )}
        <Link
          href="/help"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-accent"
          aria-label="How it works"
        >
          <HelpCircle className="h-4 w-4" />
        </Link>
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary transition-colors hover:bg-accent"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none ring-ring focus-visible:ring-2">
            <Avatar className="border-2 border-primary/20">
              {photoURL ? (
                <AvatarImage src={photoURL} alt={displayName} />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuItem onClick={() => router.push("/perfil")}>
              <Settings className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
