import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Empty state generik — dipakai di Jadwal (tidak ada pelajaran hari itu)
 * dan cocok dipakai ulang di halaman lain yang butuh empty state
 * (Riwayat Kehadiran, Pengumuman, dst) tanpa bikin versi baru tiap kali.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-10 text-center", className)}>
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
        {icon}
      </span>
      <p className="mt-4 font-heading text-body-base font-semibold text-text-primary">
        {title}
      </p>
      {description && (
        <p className="mt-1 text-body-sm text-text-secondary">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
