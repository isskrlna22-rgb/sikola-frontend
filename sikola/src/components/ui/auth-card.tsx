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
      // Glassmorphism
      "border border-white/40 bg-white/75 backdrop-blur-xl",

      variant === "sheet"
        ? "rounded-t-[2.5rem] px-6 pt-8 pb-8 shadow-[0_-20px_50px_rgba(91,61,245,0.12)]"
        : "mx-5 rounded-[2rem] px-6 pt-8 pb-8 shadow-[0_20px_50px_rgba(91,61,245,0.12)]",

      className
    )}
  >
    {children}
  </div>
)};