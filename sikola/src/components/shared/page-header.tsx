"use client";

import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  /** Tombol kembali opsional. */
  onBack?: () => void;

  /** Judul di tengah. */
  title?: string;

  /** Slot kanan bebas (mis. tombol flash). */
  rightSlot?: React.ReactNode;

  className?: string;
}

/**
 * Header generik untuk halaman auth & halaman setelah login.
 *
 * Contoh:
 * [←]   Scan QR   [flash]
 */
export function PageHeader({
  onBack,
  title,
  rightSlot,
  className,
}: PageHeaderProps) {
  if (!onBack && !title && !rightSlot) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 pt-6",
        className
      )}
    >
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
        <div className="size-10" />
      )}

      {title ? (
        <h1 className="font-heading text-body-lg font-semibold text-text-primary">
          {title}
        </h1>
      ) : (
        <span />
      )}

      {rightSlot ?? <div className="size-10" />}
    </div>
  );
}