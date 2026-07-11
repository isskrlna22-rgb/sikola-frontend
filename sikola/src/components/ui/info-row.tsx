import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InfoRowProps {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  className?: string;
}

/**
 * Baris "label kiri, value kanan" di dalam kartu — dipakai di hasil Scan
 * QR sekarang, dan cocok dipakai ulang nanti di Detail Absensi/Detail
 * Pengajuan (pola sama persis di Figma untuk halaman-halaman itu).
 */
export function InfoRow({ icon, label, value, className }: InfoRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3 py-2.5", className)}>
      <span className="flex items-center gap-2 text-body-sm text-text-secondary">
        {icon}
        {label}
      </span>
      <span className="text-body-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}
