"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarX } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { DayFilterTabs } from "@/components/ui/day-filter-tabs";
import { ScheduleRow } from "@/components/ui/schedule-row";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getMockScheduleForDay,
  getCurrentDayOfWeek,
} from "@/lib/mock-data/schedule";
import { resolveDisplaySchedule } from "@/lib/schedule-utils";
import { DAY_OF_WEEK_ORDER, DAY_OF_WEEK_LABEL } from "@/types/schedule";
import type { DayOfWeek } from "@/types/schedule";

/**
 * Halaman Jadwal Pelajaran. `selectedDay` & `currentDay` sengaja default
 * netral ("senin" / null) di render pertama lalu disesuaikan ke hari
 * asli di useEffect (pola sama seperti sapaan waktu di DashboardHeader)
 * — supaya render server & client selalu sama persis di awal, tidak ada
 * hydration mismatch, baru "dikoreksi" ke hari sungguhan sesaat setelah
 * mount di browser.
 */
export default function JadwalPage() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("senin");
  const [currentDay, setCurrentDay] = useState<DayOfWeek | null>(null);
  const [todayDateLabel, setTodayDateLabel] = useState<string | null>(null);

  useEffect(() => {
    const today = getCurrentDayOfWeek();
    // Sengaja setState di effect (bukan lazy useState initializer) supaya
    // render pertama di SERVER selalu netral ("senin"/null) dan hari asli
    // cuma dibaca di client — pola sama seperti sapaan waktu di
    // DashboardHeader, menghindari hydration mismatch kalau tanggal
    // server & client beda.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDay(today);
    if (today) {
      setSelectedDay(today);
      setTodayDateLabel(
        new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    }
  }, []);

  const isViewingToday = selectedDay === currentDay;
  const rawSchedule = getMockScheduleForDay(selectedDay);
  const schedule = resolveDisplaySchedule(rawSchedule, selectedDay, currentDay);

  const subtitle =
    isViewingToday && todayDateLabel
      ? `Jadwal pelajaranmu hari ini, ${todayDateLabel}`
      : `Jadwal pelajaran hari ${DAY_OF_WEEK_LABEL[selectedDay]}`;

  return (
    <div className="flex flex-1 flex-col pb-4">
      <PageHeader onBack={() => router.push("/dashboard")} title="Jadwal Pelajaran" />

      <div className="px-5 pt-3">
        <p className="text-body-sm text-text-secondary">{subtitle}</p>
      </div>

      <div className="px-5 pt-4">
        <DayFilterTabs
          days={DAY_OF_WEEK_ORDER}
          selected={selectedDay}
          onSelect={setSelectedDay}
          todayDay={currentDay}
        />
      </div>

      <GlassCard as="section" className="mx-5 mt-4 p-4">
        {schedule.length === 0 ? (
          <EmptyState
            icon={<CalendarX className="size-6" aria-hidden="true" />}
            title="Tidak Ada Jadwal"
            description={`Belum ada jadwal pelajaran untuk hari ${DAY_OF_WEEK_LABEL[selectedDay]}.`}
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {schedule.map((item) => (
              <ScheduleRow key={item.id} item={item} />
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}
