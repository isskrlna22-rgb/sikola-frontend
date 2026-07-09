"use client";

import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthHeaderProps {
  /** Tampilkan tombol back (kiri). Onboarding tidak pakai ini; Forgot Password/OTP/New Password pakai. */
  onBack?: () => void;
  /** Slot kanan bebas — dipakai untuk tombol "Skip" di Onboarding. Kosongkan kalau tidak perlu. */
  rightSlot?: React.ReactNode;
  className?: string;
}

/**
 * Baris navigasi atas yang dipakai berulang di seluruh halaman auth:
 * [tombol back opsional] ................. [slot kanan opsional]
 *
 * Sengaja tidak menaruh judul di tengah — di semua desain Figma untuk flow
 * ini, judul halaman selalu muncul sebagai heading besar di body, bukan di
 * header (beda dengan pola dashboard nanti).
 */
export function AuthHeader({ onBack, rightSlot, className }: AuthHeaderProps) {
  if (!onBack && !rightSlot) return null;

  return (
    <div className={cn("flex items-center justify-between px-6 pt-6", className)}>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="flex size-10 items-center justify-center rounded-full bg-surface shadow-sm text-primary hover:bg-primary-light"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
      ) : (
        <span />
      )}
      {rightSlot}
    </div>
  );
}
