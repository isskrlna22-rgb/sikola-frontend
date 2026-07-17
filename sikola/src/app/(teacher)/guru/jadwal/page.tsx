"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarX } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { NextClassCard } from "@/components/shared/next-class-card";
import { GlassCard } from "@/components/ui/glass-card";
import { DayFilterTabs } from "@/components/ui/day-filter-tabs";
import { TeacherScheduleRow } from "@/components/ui/teacher-schedule-row";
import { EmptyState } from "@/components/ui/empty-state";
import { getMockTeacherScheduleForDay } from "@/lib/mock-data/teacher-schedule";
import { getCurrentDayOfWeek } from "@/lib/mock-data/schedule";
import { resolveTeacherDisplaySchedule } from "@/lib/teacher-schedule-utils";
import { DAY_OF_WEEK_ORDER, DAY_OF_WEEK_LABEL } from "@/types/schedule";
import type { DayOfWeek } from "@/types/schedule";

/**
 * Halaman Jadwal Guru. Pola & arsitektur SAMA PERSIS dengan Jadwal
 * Siswa (default netral lalu dikoreksi di useEffect supaya tidak
 * hydration-mismatch; status "berlangsung" cuma valid untuk hari ini),
 * tapi pakai helper & tipe guru sendiri (resolveTeacherDisplaySchedule,
 * TeacherScheduleItem) — TIDAK menyentuh file area siswa sama sekali.
 *
 * getCurrentDayOfWeek() DIIMPORT (bukan diduplikasi) dari
 * lib/mock-data/schedule.ts milik siswa — ini pure date utility yang
 * generik, bukan data siswa, jadi aman dipakai ulang read-only.
 */
export default function JadwalGuruPage() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("senin");
  const [currentDay, setCurrentDay] = useState<DayOfWeek | null>(null);

  useEffect(() => {
    const today = getCurrentDayOfWeek();
    // Sengaja setState di effect (bukan lazy useState initializer) —
    // pola sama dengan Jadwal Siswa & DashboardHeader, hindari
    // hydration mismatch hari server vs client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDay(today);
    if (today) {
      setSelectedDay(today);
    }
  }, []);

  const rawSchedule = getMockTeacherScheduleForDay(selectedDay);
  const schedule = resolveTeacherDisplaySchedule(rawSchedule, selectedDay, currentDay);

  // "Kelas Berikutnya" SELALU dari jadwal HARI INI (bukan hari yang
  // sedang difilter), supaya tetap relevan walau guru sedang lihat hari
  // lain.
  const todaySchedule = currentDay ? getMockTeacherScheduleForDay(currentDay) : [];
  const nextClass = todaySchedule.find((item) => item.status !== "selesai") ?? null;

  const isViewingToday = selectedDay === currentDay;
  const subtitle = isViewingToday
    ? "Jadwal mengajarmu hari ini"
    : `Jadwal mengajar hari ${DAY_OF_WEEK_LABEL[selectedDay]}`;

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/guru/dashboard")} title="Jadwal Mengajar" />

      {nextClass && <NextClassCard item={nextClass} />}

      <div className="px-5">
        <p className="pb-3 text-body-sm text-text-secondary">{subtitle}</p>
        <DayFilterTabs
          days={DAY_OF_WEEK_ORDER}
          selected={selectedDay}
          onSelect={setSelectedDay}
          todayDay={currentDay}
        />
      </div>

      <GlassCard as="section" className="mx-5 p-4">
        {schedule.length === 0 ? (
          <EmptyState
            icon={<CalendarX className="size-6" aria-hidden="true" />}
            title="Tidak Ada Jadwal"
            description={`Belum ada jadwal mengajar untuk hari ${DAY_OF_WEEK_LABEL[selectedDay]}.`}
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {schedule.map((item) => (
              <TeacherScheduleRow key={item.id} item={item} />
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}
