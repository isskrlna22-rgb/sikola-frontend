import { GlassCard } from "@/components/ui/glass-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import type { MonthlyAttendanceStats } from "@/types/attendance";

export interface MonthlyAttendanceStatsCardProps {
  stats: MonthlyAttendanceStats;
}

interface BreakdownItemProps {
  label: string;
  value: number;
  colorClass: string;
}

function BreakdownItem({ label, value, colorClass }: BreakdownItemProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`font-heading text-body-lg font-bold ${colorClass}`}>
        {value}
      </span>
      <span className="text-caption text-text-secondary">{label}</span>
    </div>
  );
}

/**
 * Kartu statistik kehadiran BULANAN (beda dari status hari ini). Ring
 * persentase + breakdown Hadir/Izin/Sakit/Alpa.
 */
export function MonthlyAttendanceStatsCard({
  stats,
}: MonthlyAttendanceStatsCardProps) {
  return (
    <GlassCard as="section" className="mx-5 mt-4 p-5">
      <p className="text-body-sm text-text-secondary">
        Statistik Kehadiran Bulan Ini
      </p>
      <div className="mt-3 flex items-center gap-5">
        <ProgressRing
          percentage={stats.percentage}
          sublabel="Kehadiran bulan ini"
        />
        <div className="grid flex-1 grid-cols-2 gap-3">
          <BreakdownItem
            label="Hadir"
            value={stats.breakdown.hadir}
            colorClass="text-success"
          />
          <BreakdownItem
            label="Izin"
            value={stats.breakdown.izin}
            colorClass="text-warning"
          />
          <BreakdownItem
            label="Sakit"
            value={stats.breakdown.sakit}
            colorClass="text-info"
          />
          <BreakdownItem
            label="Alpa"
            value={stats.breakdown.alpa}
            colorClass="text-danger"
          />
        </div>
      </div>
      <p className="mt-3 text-center text-caption text-text-secondary">
        dari {stats.totalHariEfektif} hari efektif &middot; {stats.terlambatCount}x
        terlambat
      </p>
    </GlassCard>
  );
}
