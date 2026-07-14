import { ClipboardList } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import type { TeacherDashboardStats } from "@/types/teacher";

export interface TeacherStatsCardProps {
  stats: TeacherDashboardStats;
}

interface StatItemProps {
  label: string;
  value: number;
  colorClass: string;
}

function StatItem({ label, value, colorClass }: StatItemProps) {
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
 * Statistik kehadiran HARI INI lintas semua kelas yang diajar + jumlah
 * pengajuan izin yang menunggu persetujuan guru ini. Beda dari
 * <MonthlyAttendanceStatsCard> siswa (yang per-siswa & per-bulan) —
 * ini agregat lintas kelas & per-hari, jadi komponen terpisah.
 */
export function TeacherStatsCard({ stats }: TeacherStatsCardProps) {
  return (
    <GlassCard as="section" className="mx-5 mt-4 p-5">
      <p className="text-body-sm text-text-secondary">
        Ringkasan Kehadiran Hari Ini
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        <StatItem label="Hadir" value={stats.hadir} colorClass="text-success" />
        <StatItem label="Izin" value={stats.izin} colorClass="text-warning" />
        <StatItem label="Sakit" value={stats.sakit} colorClass="text-info" />
        <StatItem label="Alpa" value={stats.alpa} colorClass="text-danger" />
      </div>

      {stats.pendingPermissions > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-warning/10 px-4 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-warning/20 text-warning">
            <ClipboardList className="size-4" aria-hidden="true" />
          </span>
          <p className="text-body-sm text-text-primary">
            <span className="font-semibold">{stats.pendingPermissions}</span>{" "}
            pengajuan izin menunggu persetujuanmu
          </p>
        </div>
      )}
    </GlassCard>
  );
}
