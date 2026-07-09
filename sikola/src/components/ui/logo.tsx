import Image from "next/image";
import { cn } from "@/lib/utils";

export type LogoTone = "color" | "white";
export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps {
  /**
   * "color"  = logo asli (untuk background terang/putih).
   * "white"  = versi monokrom putih (untuk background gelap, mis. Splash
   *            Screen), dibuat dari file resmi yang sama lewat CSS filter —
   *            BUKAN aset terpisah, supaya satu sumber kebenaran tetap
   *            file SVG resmi dari Figma.
   */
  tone?: LogoTone;
  size?: LogoSize;
  showTagline?: boolean;
  className?: string;
}

const WIDTH_BY_SIZE: Record<LogoSize, number> = { sm: 120, md: 160, lg: 220 };
const TAGLINE_CLASS: Record<LogoSize, string> = {
  sm: "text-caption",
  md: "text-body-sm",
  lg: "text-body-base",
};

const LOGO_SRC = "/images/logo/logo-sikola-white.svg";
const LOGO_ASPECT_RATIO = 3178 / 970; // width / height asli file sumber

export function Logo({
  tone = "color",
  size = "md",
  showTagline = false,
  className,
}: LogoProps) {
  const width = WIDTH_BY_SIZE[size];
  const height = Math.round(width / LOGO_ASPECT_RATIO);

  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <Image
        src={LOGO_SRC}
        alt="SIKOLA - Smart School"
        width={width}
        height={height}
        priority
        className={cn()}
      />
      {showTagline && (
        <p
          className={cn(
            "font-medium",
            TAGLINE_CLASS[size],
            tone === "white" ? "text-white" : "text-text-secondary"
          )}
        >
          Smart School, Smarter Future
        </p>
      )}
    </div>
  );
}
