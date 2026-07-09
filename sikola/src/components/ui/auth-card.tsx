import { cn } from "@/lib/utils";

export type AuthCardVariant = "sheet" | "floating";

export interface AuthCardProps {
  variant?: AuthCardVariant;
  children: React.ReactNode;
  className?: string;
}

/**
 * Kartu putih pembungkus form di halaman auth. Ada 2 pola yang muncul
 * berulang di desain Figma-mu:
 *
 * - "sheet"    : nempel di dasar layar, sudut membulat cuma di atas.
 *                Dipakai di Login (form langsung menyatu ke tepi bawah).
 * - "floating" : mengambang dengan margin di kiri-kanan, sudut membulat
 *                semua sisi + shadow lebih tebal.
 *                Dipakai di Forgot Password, OTP Verification, New Password.
 */
export function AuthCard({
  variant = "floating",
  children,
  className,
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "bg-surface",
        variant === "sheet"
          ? "rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(29,36,51,0.08)] px-6 pt-8 pb-8"
          : "mx-5 rounded-[2rem] shadow-xl px-6 pt-8 pb-8",
        className
      )}
    >
      {children}
    </div>
  );
}
