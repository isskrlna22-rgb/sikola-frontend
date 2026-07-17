import type { DayOfWeek } from "@/types/schedule";
import { DAY_OF_WEEK_ORDER } from "@/types/schedule";
import type { TeacherScheduleItem } from "@/types/teacher";

/**
 * Versi guru dari resolveDisplaySchedule() siswa (lib/schedule-utils.ts)
 * — logic-nya IDENTIK (status "selesai"/"berlangsung" cuma valid untuk
 * hari ini, hari lain ditimpa "selesai"/"akan-datang" berdasar posisi
 * relatif ke hari ini), tapi ditulis ulang khusus untuk
 * `TeacherScheduleItem[]` alih-alih dipaksa generic.
 *
 * Alasan tidak reuse langsung: fungsi siswa di-type ke `ScheduleItem`
 * (bukan generic), dan mengubahnya jadi generic berarti menyentuh file
 * area siswa yang sudah stabil — risikonya tidak sepadan untuk fungsi
 * sesederhana ini. Duplikasi kecil di sini jauh lebih aman.
 */
export function resolveTeacherDisplaySchedule(
  items: TeacherScheduleItem[],
  selectedDay: DayOfWeek,
  currentDay: DayOfWeek | null
): TeacherScheduleItem[] {
  const isViewingToday = selectedDay === currentDay;
  if (isViewingToday) return items;

  const selectedIndex = DAY_OF_WEEK_ORDER.indexOf(selectedDay);
  const currentIndex = currentDay ? DAY_OF_WEEK_ORDER.indexOf(currentDay) : -1;
  const isPastDay = currentIndex !== -1 && selectedIndex < currentIndex;

  return items.map((item) => ({
    ...item,
    status: isPastDay ? "selesai" : "akan-datang",
  }));
}
