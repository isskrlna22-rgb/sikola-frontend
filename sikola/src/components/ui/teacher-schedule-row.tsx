import { Clock, MapPin, Users } from "lucide-react";
import type { TeacherScheduleItem } from "@/types/teacher";
import { StatusBadge } from "@/components/ui/status-badge";

export interface TeacherScheduleRowProps {
  item: TeacherScheduleItem;
}

/**
 * Baris jadwal mengajar guru — struktur sama dengan <ScheduleRow> siswa,
 * tapi menampilkan `className` (kelas yang diajar) dan `studentCount`
 * (jumlah siswa), bukan nama guru. Dibuat komponen terpisah, bukan
 * reuse langsung, karena field yang relevan beda maknanya per role
 * (lihat catatan di types/teacher.ts).
 */
export function TeacherScheduleRow({ item }: TeacherScheduleRowProps) {
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3">
      <div className="flex w-14 shrink-0 flex-col items-center text-caption text-text-secondary">
        <span className="flex items-center gap-1 font-semibold text-text-primary">
          <Clock className="size-3.5" aria-hidden="true" />
          {item.startTime}
        </span>
        <span>{item.endTime}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-body-base font-semibold text-text-primary">
          {item.subject}
        </p>
        <p className="flex items-center gap-1 truncate text-caption text-text-secondary">
          Kelas {item.className}
          <span aria-hidden="true">&middot;</span>
          <MapPin className="size-3" aria-hidden="true" />
          {item.room}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <StatusBadge status={item.status} />
        <span className="flex items-center gap-1 text-caption text-text-secondary">
          <Users className="size-3" aria-hidden="true" />
          {item.studentCount} siswa
        </span>
      </div>
    </li>
  );
}
