import { StatusBadge } from "@/components/ui/status-badge";
import type { StudentAttendanceEntry } from "@/types/teacher";

export interface StudentAttendanceRowProps {
  entry: StudentAttendanceEntry;
}

export function StudentAttendanceRow({ entry }: StudentAttendanceRowProps) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-body-base font-semibold text-text-primary">
          {entry.name}
        </p>
        <p className="text-caption text-text-secondary">
          {entry.studentNumber}
          {entry.checkInTime && <> &middot; {entry.checkInTime} WIB</>}
        </p>
      </div>
      <StatusBadge status={entry.status} />
    </li>
  );
}
