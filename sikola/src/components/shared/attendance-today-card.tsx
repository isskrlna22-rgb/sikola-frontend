import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { TodayAttendance } from "@/types/attendance";

export interface AttendanceTodayCardProps {
  attendance: TodayAttendance;
}

const STATUS_ICON = {
  hadir: CheckCircle2,
  terlambat: AlertCircle,
  izin: Clock,
  sakit: Clock,
  alpa: AlertCircle,
} as const;

/**
 * Kartu status kehadiran HARI INI (beda dari statistik bulanan di
 * <MonthlyAttendanceStatsCard>). Menampilkan status + jam absen kalau
 * ada.
 */
export function AttendanceTodayCard({ attendance }: AttendanceTodayCardProps) {
  const Icon = STATUS_ICON[attendance.status];

  return (
    <GlassCard as="section" className="mx-5 mt-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-body-sm text-text-secondary">Kehadiran Hari Ini</p>
          <div className="mt-1 flex items-center gap-2">
            <StatusBadge status={attendance.status} />
            {attendance.checkInTime && (
              <span className="text-body-sm text-text-secondary">
                pukul {attendance.checkInTime} WIB
              </span>
            )}
          </div>
          {attendance.location && (
            <p className="mt-1 text-caption text-text-secondary">
              {attendance.location}
            </p>
          )}
        </div>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-success/10 text-success">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      </div>
    </GlassCard>
  );
}
