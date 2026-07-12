import { cn } from "@/lib/utils";

/**
 * Semua jenis status pill yang muncul di seluruh aplikasi digabung di
 * satu union supaya konsisten — tambah entry baru di sini kalau ada
 * status baru, jangan bikin komponen badge terpisah per fitur.
 */
export type StatusKind =
  | "hadir"
  | "izin"
  | "sakit"
  | "alpa"
  | "terlambat"
  | "selesai"
  | "berlangsung"
  | "akan-datang"
  | "pending"
  | "disetujui"
  | "ditolak"
  | "dibatalkan";

export interface StatusBadgeProps {
  status: StatusKind;
  /** Override label tampilan kalau butuh teks beda dari default (mis. locale lain). */
  label?: string;
  className?: string;
}

const STATUS_CONFIG: Record<StatusKind, { label: string; className: string }> = {
  hadir: { label: "Hadir", className: "bg-success/10 text-success" },
  izin: { label: "Izin", className: "bg-warning/10 text-warning" },
  sakit: { label: "Sakit", className: "bg-info/10 text-info" },
  alpa: { label: "Alpa", className: "bg-danger/10 text-danger" },
  terlambat: { label: "Terlambat", className: "bg-warning/10 text-warning" },
  selesai: { label: "Selesai", className: "bg-success/10 text-success" },
  berlangsung: { label: "Berlangsung", className: "bg-primary/10 text-primary" },
  "akan-datang": {
    label: "Akan Datang",
    className: "bg-secondary/20 text-text-secondary",
  },
  pending: { label: "Menunggu", className: "bg-warning/10 text-warning" },
  disetujui: { label: "Disetujui", className: "bg-success/10 text-success" },
  ditolak: { label: "Ditolak", className: "bg-danger/10 text-danger" },
  dibatalkan: {
    label: "Dibatalkan",
    className: "bg-secondary/20 text-text-secondary",
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold",
        config.className,
        className
      )}
    >
      {label ?? config.label}
    </span>
  );
}
