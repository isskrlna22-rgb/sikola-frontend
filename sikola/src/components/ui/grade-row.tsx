import { BookOpen } from "lucide-react";
import type { GradeEntry } from "@/types/academic";
import { getGradePredicate, getGradeColorClass } from "@/lib/academic-utils";

export interface GradeRowProps {
  grade: GradeEntry;
}

export function GradeRow({ grade }: GradeRowProps) {
  const predicate = getGradePredicate(grade.score);
  const colorClass = getGradeColorClass(grade.score);

  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        <BookOpen className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-body-base font-semibold text-text-primary">
          {grade.subject}
        </p>
        <p className="truncate text-caption text-text-secondary">
          {grade.teacherName}
        </p>
      </div>
      <div className="flex shrink-0 items-baseline gap-2">
        <span className={`font-heading text-body-lg font-bold ${colorClass}`}>
          {predicate}
        </span>
        <span className="text-caption text-text-secondary">{grade.score}</span>
      </div>
    </li>
  );
}
