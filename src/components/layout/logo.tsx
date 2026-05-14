import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Trading Core brand mark — used as the icon component throughout the app
 * (header, auth pages, OG-style cards, etc.). Wraps the PNG logo in a black
 * tile so it always reads consistently in both light and dark themes
 * (the artwork itself is designed for a dark background).
 *
 * Inputs
 * @param size  Outer tile size in pixels. Default 36.
 * @param rounded  Tailwind rounding class for the tile. Default `rounded-lg`.
 * @param className  Extra classes to merge into the tile.
 *
 * Output
 *   A square `<div>` containing the optimized Next.js `<Image>` of the brand.
 */
export function Logo({
  size = 36,
  rounded = "rounded-lg",
  className,
}: {
  size?: number;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden bg-black",
        rounded,
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Trading Core"
        width={size}
        height={size}
        priority
        className="h-full w-full object-cover"
      />
    </div>
  );
}
