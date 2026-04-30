"use client";

import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileQuestion,
  CalendarDays,
  GraduationCap,
  MessageCircle,
  PanelLeftClose,
  PanelLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/sidebar-context";
import { useAuth } from "@/contexts/auth-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatSession, getChatSessions, deleteChatSession } from "@/lib/firestore";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/simulado", label: "Mock Exam", icon: FileQuestion },
  { href: "/estudo", label: "Study Progress", icon: GraduationCap },
  { href: "/plano", label: "Study Plan", icon: CalendarDays },
  { href: "/chat?new=1", label: "Chat", icon: MessageCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const { user, profile } = useAuth();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);


  const loadChatSessions = useCallback(() => {
    if (!user) {
      setChatSessions([]);
      return;
    }
    getChatSessions(user.uid, 12).then(setChatSessions).catch(console.error);
  }, [user]);

  useEffect(() => {
    loadChatSessions();
    window.addEventListener("tradingcore:chat-sessions-updated", loadChatSessions);
    return () => window.removeEventListener("tradingcore:chat-sessions-updated", loadChatSessions);
  }, [loadChatSessions]);

  const displayName = user?.displayName || profile?.displayName || "";
  const photoURL = user?.photoURL || profile?.photoURL || "";
  const initials = displayName
    ? displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const sidebarContent = (
    <>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const hrefPath = item.href.split("?")[0];
          const isActive =
            hrefPath === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(hrefPath);

          const linkElement = (
            <Link
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              )}
            >
              <div className="relative">
                {isActive && (
                  <div className="absolute -left-[18px] top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  )}
                />
              </div>
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </Link>
          );

          if (collapsed && !mobileOpen) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger className="w-full">
                  {linkElement}
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          const showChatSubitems = item.href === "/chat?new=1" && (!collapsed || mobileOpen);

          return (
            <div key={item.href}>
              {linkElement}
              {showChatSubitems && chatSessions.length > 0 && (
                <div className="ml-8 mt-1 flex flex-col gap-0.5 border-l border-border/70 pl-3">
                  {chatSessions.slice(0, 10).map((session) => (
                    <div key={session.id} className="group flex items-center gap-0.5">
                      <Link
                        href={`/chat?session=${session.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="min-w-0 flex-1 truncate rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-primary"
                        title={session.title}
                      >
                        {session.title}
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user && session.id) {
                            deleteChatSession(user.uid, session.id).then(loadChatSessions).catch(console.error);
                          }
                        }}
                        className="hidden shrink-0 rounded p-0.5 text-muted-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-destructive group-hover:block"
                        title="Delete chat"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User + collapse */}
      <div className="border-t border-border p-3 hidden md:block">
        {!collapsed && (
          <Link
            href="/perfil"
            className="flex items-center gap-3 rounded-lg px-3 py-2 mb-2 transition-colors hover:bg-sidebar-accent"
          >
            <Avatar className="h-7 w-7">
              {photoURL ? <AvatarImage src={photoURL} alt={displayName} /> : null}
              <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{displayName}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
            </div>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        >
          {collapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <div className="flex w-full items-center gap-3">
              <PanelLeftClose className="h-5 w-5" />
              <span className="text-sm">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-[260px] flex-col border-r border-border bg-sidebar transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <span className="text-sm font-bold">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>

      <aside
        className={cn(
          "sticky top-16 hidden h-[calc(100vh-4rem)] flex-col border-r border-border bg-sidebar transition-all duration-300 md:flex",
          collapsed ? "w-[68px]" : "w-[240px]"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
