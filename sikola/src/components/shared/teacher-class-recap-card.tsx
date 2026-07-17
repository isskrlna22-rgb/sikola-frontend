import { GlassCard } from "@/components/ui/glass-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import type { TeacherAttendanceRecap } from "@/types/teacher";

export interface TeacherClassRecapCardProps {
  recap: TeacherAttendanceRecap;
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
 * Statistik kehadiran BULANAN per kelas — dibuat komponen TERSENDIRI
 * (bukan reuse <MonthlyAttendanceStatsCard> siswa) karena caption-nya
 * berbeda makna: siswa menghitung "dari X hari efektif" (agregat per
 * HARI), sementara ini "dari X siswa" (agregat per SISWA). Reuse
 * langsung akan menampilkan label yang salah/membingungkan. Struktur
 * visual & komponen di dalamnya (GlassCard, ProgressRing) tetap reuse
 * penuh.
 */
export function TeacherClassRecapCard({ recap }: TeacherClassRecapCardProps) {
  return (
    <GlassCard as="section" className="mx-5 p-5">
      <p className="text-body-sm text-text-secondary">
        Statistik Kehadiran Bulan Ini
      </p>
      <div className="mt-3 flex items-center gap-5">
        <ProgressRing percentage={recap.percentage} sublabel="Persentase hadir" />
        <div className="grid flex-1 grid-cols-2 gap-3">
          <BreakdownItem label="Hadir" value={recap.hadir} colorClass="text-success" />
          <BreakdownItem label="Izin" value={recap.izin} colorClass="text-warning" />
          <BreakdownItem label="Sakit" value={recap.sakit} colorClass="text-info" />
          <BreakdownItem label="Alpa" value={recap.alpa} colorClass="text-danger" />
        </div>
      </div>
      <p className="mt-3 text-center text-caption text-text-secondary">
        dari {recap.totalStudents} siswa terdaftar
      </p>
    </GlassCard>
  );
}
