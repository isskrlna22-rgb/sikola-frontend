import { GraduationCap, Users, CalendarRange } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { InfoRow } from "@/components/ui/info-row";
import type { AcademicSummary } from "@/types/academic";

export interface AcademicSummaryCardProps {
  summary: AcademicSummary;
}

/**a
 * Ringkasan akademik: rata-rata nilai + predikat besar di atas, lalu
 * info kelas/semester/wali kelas pakai <InfoRow> yang sama dipakai di
 * hasil Scan QR — satu komponen baris info dipakai lintas fitur.
 */
export function AcademicSummaryCard({ summary }: AcademicSummaryCardProps) {
  return (
    <GlassCard as="section" className="p-5">
      <div className="flex items-center justify-around text-center">
        <div>
          <p className="text-body-sm text-text-secondary">Rata-rata Nilai</p>
          <p className="mt-1 font-heading text-h1 font-bold text-primary-dark">
            {summary.averageScore}
          </p>
        </div>
        <div className="h-10 w-px bg-border" aria-hidden="true" />
        <div>
          <p className="text-body-sm text-text-secondary">Predikat</p>
          <p className="mt-1 font-heading text-h1 font-bold text-success">
            {summary.predicate}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-border/70 pt-2">
        <InfoRow
          icon={<Users className="size-4" aria-hidden="true" />}
          label="Kelas"
          value={summary.className}
        />
        <InfoRow
          icon={<CalendarRange className="size-4" aria-hidden="true" />}
          label="Semester"
          value={summary.semester}
        />
        <InfoRow
          icon={<GraduationCap className="size-4" aria-hidden="true" />}
          label="Wali Kelas"
          value={summary.waliKelas}
        />
      </div>
    </GlassCard>
  );
}
