import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** HTML element pembungkus — default "div". Pakai "section" untuk kartu utama dashboard. */
  as?: "div" | "section";
}

/**
 * Kartu glassmorphism dasar — SATU-SATUNYA tempat definisi style efek
 * kaca ini. Semua kartu utama Dashboard (header, kehadiran hari ini,
 * statistik, quick actions, pengumuman) memakai komponen ini, bukan
 * menyalin class Tailwind-nya berulang, supaya kalau efeknya perlu
 * diubah nanti (fase UI Polish), cukup ubah di satu tempat.
 *
 * Spec (sesuai arahan Design System):
 * - background rgba(255,255,255,0.72) -> bg-white/72 (arbitrary opacity)
 * - backdrop-blur-xl
 * - border border-white/40
 * - rounded-3xl
 * - shadow lembut bertona ungu brand (bukan shadow hitam generik)
 */
export function GlassCard({ children, className, as = "div" }: GlassCardProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        "rounded-3xl border border-white/40 bg-white/72 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(91,61,245,0.12)]",
        className
      )}
    >
      {children}
    </Component>
  );
}
