import { Clock, MapPin } from "lucide-react";
import type { ScheduleItem } from "@/types/schedule";
import { StatusBadge } from "@/components/ui/status-badge";

export interface ScheduleRowProps {
  item: ScheduleItem;
}

/**
 * Satu baris jadwal pelajaran. Dipakai di preview "Jadwal Hari Ini" pada
 * Dashboard, dan nanti dipakai lagi di halaman Jadwal penuh (sprint
 * berikutnya) — jangan bikin versi baru di sana, import komponen ini.
 */
export function ScheduleRow({ item }: ScheduleRowProps) {
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
          {item.teacherName}
          <span aria-hidden="true">&middot;</span>
          <MapPin className="size-3" aria-hidden="true" />
          {item.room}
        </p>
      </div>
      <StatusBadge status={item.status} />
    </li>
  );
}
