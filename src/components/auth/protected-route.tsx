"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const PUBLIC_PATHS = ["/", "/login", "/register", "/pricing", "/features"];
const PUBLIC_PREFIXES = ["/cfa"];

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublic =
    PUBLIC_PATHS.includes(pathname) ||
    PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    if (loading) return;

    if (!user && !isPublic) {
      router.replace("/login");
      return;
    }

    if (user && (pathname === "/login" || pathname === "/register")) {
      router.replace("/dashboard");
      return;
    }

    if (user && pathname === "/") {
      router.replace("/dashboard");
      return;
    }

    // Users who just paid land on `/checkout/success` and may not have
    // completed onboarding yet (the funnel allows buying right after sign-up).
    // Let them see the confirmation page first; the page itself routes them to
    // /onboarding next when needed.
    const onboardingExempt =
      pathname === "/onboarding" || pathname.startsWith("/checkout/success");

    if (user && profile && !profile.onboardingCompleted && !onboardingExempt) {
      router.replace("/onboarding");
      return;
    }
  }, [user, profile, loading, pathname, isPublic, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && !isPublic) return null;

  return <>{children}</>;
}
