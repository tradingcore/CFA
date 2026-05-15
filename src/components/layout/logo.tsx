import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Trading Core brand mark — the green ∫TC monogram on a black tile.
 * Used in headers, sidebars, auth pages, OG cards.
 *
 * @param size       Outer tile size in pixels. Default 36.
 * @param rounded    Tailwind rounding class for the tile. Default `rounded-lg`.
 * @param className  Extra classes to merge.
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
