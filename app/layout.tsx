import { cn } from "@/lib/utils";

export type LogoVariant = "default" | "reversed";
export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps {
  /** "default" = warna brand (untuk background terang). "reversed" = putih (untuk background gelap/gradient). */
  variant?: LogoVariant;
  size?: LogoSize;
  /** Tampilkan tagline "Smart School, Smarter Future" di bawah wordmark. */
  showTagline?: boolean;
  className?: string;
}

const ICON_SIZE: Record<LogoSize, number> = { sm: 28, md: 36, lg: 56 };
const WORDMARK_CLASS: Record<LogoSize, string> = {
  sm: "text-h4",
  md: "text-h3",
  lg: "text-h1",
};
const TAGLINE_CLASS: Record<LogoSize, string> = {
  sm: "text-caption",
  md: "text-body-sm",
  lg: "text-body-base",
};

/**
 * Lockup logo SIKOLA: ikon (topi wisuda + rumah) + wordmark "SIKOLA" + tagline opsional.
 * Dibuat sebagai SVG + teks asli (bukan gambar raster) supaya tajam di semua ukuran layar
 * dan warnanya bisa mengikuti konteks (di atas gradient gelap vs. di atas kartu putih).
 */
export function Logo({
  variant = "default",
  size = "md",
  showTagline = false,
  className,
}: LogoProps) {
  const isReversed = variant === "reversed";
  const iconSize = ICON_SIZE[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex items-center gap-2.5">
        <LogoMark size={iconSize} reversed={isReversed} />
        <span
          className={cn(
            "font-heading font-bold tracking-tight",
            WORDMARK_CLASS[size],
            isReversed ? "text-white" : "text-primary-dark"
          )}
        >
          SIKOLA
        </span>
      </div>
      {showTagline && (
        <p
          className={cn(
            "font-medium",
            TAGLINE_CLASS[size],
            isReversed ? "text-white/80" : "text-text-secondary"
          )}
        >
          Smart School, Smarter Future
        </p>
      )}
    </div>
  );
}

function LogoMark({ size, reversed }: { size: number; reversed: boolean }) {
  const bodyColor = reversed ? "#FFFFFF" : "var(--color-primary-dark)";
  const capColor = reversed ? "#FFFFFF" : "var(--color-primary-dark)";
  const doorColor = reversed ? "rgba(91,61,245,0.35)" : "var(--color-accent)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="6" y="16" width="28" height="20" rx="7" fill={bodyColor} />
      <path d="M20 4 L37 12.5 L20 21 L3 12.5 Z" fill={capColor} />
      <rect x="14" y="22" width="12" height="14" rx="4" fill={doorColor} />
    </svg>
  );
}
