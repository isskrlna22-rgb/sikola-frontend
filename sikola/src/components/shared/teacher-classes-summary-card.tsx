import { Users } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { TeacherClassSummary } from "@/types/teacher";

export interface TeacherClassesSummaryCardProps {
  classes: TeacherClassSummary[];
}

export function TeacherClassesSummaryCard({
  classes,
}: TeacherClassesSummaryCardProps) {
  return (
    <GlassCard as="section" className="mx-5 mt-4 p-5">
      <h2 className="font-heading text-body-base font-semibold text-text-primary">
        Kelas yang Diampu
      </h2>

      <ul className="mt-3 flex flex-col gap-3">
        {classes.map((cls) => (
          <li key={cls.id}>
            <div className="flex items-center justify-between text-body-sm">
              <span className="flex items-center gap-1.5 font-medium text-text-primary">
                <Users className="size-3.5 text-text-secondary" aria-hidden="true" />
                {cls.className}
                <span className="text-caption text-text-secondary">
                  &middot; {cls.studentCount} siswa
                </span>
              </span>
              <span className="font-semibold text-text-primary">
                {cls.attendancePercentageToday}%
              </span>
            </div>
            <ProgressBar percentage={cls.attendancePercentageToday} className="mt-1.5" />
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
