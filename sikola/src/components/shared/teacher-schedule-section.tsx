import Link from "next/link";
import { ChevronRight, CalendarX } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { TeacherScheduleRow } from "@/components/ui/teacher-schedule-row";
import { EmptyState } from "@/components/ui/empty-state";
import type { TeacherScheduleItem } from "@/types/teacher";

export interface TeacherScheduleSectionProps {
  schedule: TeacherScheduleItem[];
}

export function TeacherScheduleSection({ schedule }: TeacherScheduleSectionProps) {
  return (
    <GlassCard as="section" className="mx-5 mt-4 p-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-body-base font-semibold text-text-primary">
          Jadwal Mengajar Hari Ini
        </h2>
        <Link
          href="/guru/jadwal"
          className="flex items-center gap-0.5 text-body-sm font-medium text-primary"
        >
          Lihat Semua
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {schedule.length === 0 ? (
        <EmptyState
          icon={<CalendarX className="size-6" aria-hidden="true" />}
          title="Tidak Ada Jadwal"
          description="Tidak ada jadwal mengajar hari ini."
        />
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {schedule.map((item) => (
            <TeacherScheduleRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
