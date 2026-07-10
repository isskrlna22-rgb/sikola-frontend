import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { ScheduleRow } from "@/components/ui/schedule-row";
import type { ScheduleItem } from "@/types/schedule";

export interface TodayScheduleSectionProps {
  schedule: ScheduleItem[];
}

export function TodayScheduleSection({ schedule }: TodayScheduleSectionProps) {
  return (
    <GlassCard as="section" className="mx-5 mt-4 p-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-body-base font-semibold text-text-primary">
          Jadwal Hari Ini
        </h2>
        <Link
          href="/jadwal"
          className="flex items-center gap-0.5 text-body-sm font-medium text-primary"
        >
          Lihat Semua
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {schedule.length === 0 ? (
        <p className="px-1 py-6 text-center text-body-sm text-text-secondary">
          Tidak ada jadwal pelajaran hari ini.
        </p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {schedule.map((item) => (
            <ScheduleRow key={item.id} item={item} />
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
