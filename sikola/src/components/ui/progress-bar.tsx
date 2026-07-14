import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  /** 0-100 */
  percentage: number;
  className?: string;
}

/**
 * Bar progres linear (beda dari <ProgressRing> yang bentuk cincin) —
 * dipakai untuk persentase kehadiran per kelas di Dashboard Guru.
 * Warna otomatis menyesuaikan nilai (hijau/kuning/merah) supaya kelas
 * dengan kehadiran rendah langsung kelihatan.
 */
export function ProgressBar({ percentage, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const colorClass =
    clamped >= 90 ? "bg-success" : clamped >= 75 ? "bg-warning" : "bg-danger";

  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-border", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full transition-all", colorClass)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
