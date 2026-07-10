import { cn } from "@/lib/utils";

export type PasswordStrength = "weak" | "medium" | "strong";

/**
 * Heuristik sederhana (bukan library khusus) — cukup untuk memberi
 * feedback visual, bukan validasi keamanan yang ketat. Kalau nanti mau
 * lebih akurat, gampang diganti isi fungsi ini saja tanpa menyentuh
 * komponen tampilannya.
 */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return "weak";
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

const STRENGTH_CONFIG: Record<
  PasswordStrength,
  { label: string; barClass: string; textClass: string; filled: number }
> = {
  weak: { label: "Weak", barClass: "bg-danger", textClass: "text-danger", filled: 1 },
  medium: {
    label: "Medium",
    barClass: "bg-warning",
    textClass: "text-warning",
    filled: 2,
  },
  strong: {
    label: "Strong",
    barClass: "bg-success",
    textClass: "text-success",
    filled: 3,
  },
};

export interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export function PasswordStrengthMeter({
  password,
  className,
}: PasswordStrengthMeterProps) {
  if (!password) return null;
  const strength = getPasswordStrength(password);
  const config = STRENGTH_CONFIG[strength];

  return (
    <div className={cn("flex items-center gap-2", className)} aria-live="polite">
      <div className="flex flex-1 gap-1">
        {[1, 2, 3].map((segment) => (
          <span
            key={segment}
            className={cn(
              "h-1 flex-1 rounded-full",
              segment <= config.filled ? config.barClass : "bg-border"
            )}
          />
        ))}
      </div>
      <span className={cn("text-body-sm font-semibold", config.textClass)}>
        {config.label}
      </span>
    </div>
  );
}
