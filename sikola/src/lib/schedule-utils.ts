import type { DayOfWeek, ScheduleItem } from "@/types/schedule";
import { DAY_OF_WEEK_ORDER } from "@/types/schedule";

/**
 * Status "selesai"/"berlangsung" cuma masuk akal untuk jadwal HARI INI.
 * Kalau pengguna sedang melihat tab hari lain (mis. hari ini Senin tapi
 * dia buka tab Rabu), semua item di hari itu ditampilkan sebagai
 * "akan-datang" (kalau harinya belum lewat) atau "selesai" (kalau sudah
 * lewat minggu ini) — bukan status asli dari mock data.
 *
 * Ini fungsi murni (pure) supaya gampang ditest dan gampang diganti nanti
 * kalau logic status akhirnya dihitung di backend (backend bisa langsung
 * kirim status yang benar per item, dan fungsi ini jadi tidak diperlukan
 * lagi untuk data dari API asli — cuma dipakai untuk mock).
 */
export function resolveDisplaySchedule(
  items: ScheduleItem[],
  selectedDay: DayOfWeek,
  currentDay: DayOfWeek | null
): ScheduleItem[] {
  const isViewingToday = selectedDay === currentDay;
  if (isViewingToday) return items;

  const selectedIndex = DAY_OF_WEEK_ORDER.indexOf(selectedDay);
  const currentIndex = currentDay ? DAY_OF_WEEK_ORDER.indexOf(currentDay) : -1;
  // Akhir pekan (currentDay null) -> anggap seluruh minggu ini belum
  // terjadi (semua hari sekolah berikutnya "akan-datang").
  const isPastDay = currentIndex !== -1 && selectedIndex < currentIndex;

  return items.map((item) => ({
    ...item,
    status: isPastDay ? "selesai" : "akan-datang",
  }));
}
