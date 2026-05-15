import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Trading Core brand mark.
 *
 * Two variants:
 *  - `icon` (default): square tile with just the green integral symbol on a
 *    black background. Used in headers, sidebars, avatars, OG cards.
 *  - `wordmark`: wide brand mark (integral + "TradingCore" wordmark) on a
 *    black background. Used as the standalone header logo where you don't
 *    also want a separate text label next to it.
 *
 * @param size       Outer height in pixels. Default 36.
 * @param rounded    Tailwind rounding class. Default `rounded-lg`.
 * @param variant    `"icon"` (square, default) or `"wordmark"` (~2:1 wide).
 * @param className  Extra classes to merge.
 */
export function Logo({
  size = 36,
  rounded = "rounded-lg",
  variant = "icon",
  className,
}: {
  size?: number;
  rounded?: string;
  variant?: "icon" | "wordmark";
  className?: string;
}) {
  const isWordmark = variant === "wordmark";
  const width = isWordmark ? Math.round(size * (1024 / 503)) : size;
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden bg-black",
        rounded,
        className,
      )}
      style={{ width, height: size }}
    >
      <Image
        src={isWordmark ? "/logo-wordmark.png" : "/logo.png"}
        alt="Trading Core"
        width={width}
        height={size}
        priority
        className="h-full w-full object-contain"
      />
    </div>
  );
}
