import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function BlogNav() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md sm:px-12">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <TrendingUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold">Trading Core</span>
      </Link>
      <nav className="flex items-center gap-3 text-sm">
        <Link
          href="/cfa"
          className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline"
        >
          Blog
        </Link>
        <Link
          href="/pricing"
          className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline"
        >
          Pricing
        </Link>
        <Link
          href="/login"
          className="rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start Free
        </Link>
      </nav>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 text-center text-xs text-muted-foreground sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <Link href="/cfa" className="hover:text-foreground">Blog</Link>
          <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
          <Link href="/login" className="hover:text-foreground">Sign In</Link>
          <Link href="/register" className="hover:text-foreground">Start Free</Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">Trading Core</span>
        </div>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Trading Core. All rights reserved.
        </p>
        <p className="mt-1 text-[11px]">
          Not affiliated with CFA Institute. CFA® is a registered trademark of CFA Institute.
        </p>
      </div>
    </footer>
  );
}
