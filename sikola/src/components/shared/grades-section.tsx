import { ClipboardCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradeRow } from "@/components/ui/grade-row";
import { EmptyState } from "@/components/ui/empty-state";
import type { GradeEntry } from "@/types/academic";

export interface GradesSectionProps {
  grades: GradeEntry[];
}

export function GradesSection({ grades }: GradesSectionProps) {
  return (
    <GlassCard as="section" className="p-4">
      <h2 className="px-1 font-heading text-body-base font-semibold text-text-primary">
        Nilai Mata Pelajaran
      </h2>

      {grades.length === 0 ? (
        <EmptyState
          icon={<ClipboardCheck className="size-6" aria-hidden="true" />}
          title="Belum Ada Nilai"
          description="Nilai akan muncul di sini setelah guru menginput hasil penilaian."
        />
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {grades.map((grade) => (
            <GradeRow key={grade.id} grade={grade} />
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
