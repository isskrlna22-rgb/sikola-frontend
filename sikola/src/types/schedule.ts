export type ScheduleStatus = "selesai" | "berlangsung" | "akan-datang";

export interface ScheduleItem {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacherName: string;
  room: string;
  status: ScheduleStatus;
}

/** Sekolah beroperasi Senin-Jumat — lihat DAY_OF_WEEK_ORDER di bawah. */
export type DayOfWeek = "senin" | "selasa" | "rabu" | "kamis" | "jumat";

export const DAY_OF_WEEK_ORDER: DayOfWeek[] = [
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
];

export const DAY_OF_WEEK_LABEL: Record<DayOfWeek, string> = {
  senin: "Senin",
  selasa: "Selasa",
  rabu: "Rabu",
  kamis: "Kamis",
  jumat: "Jumat",
};

/** Jadwal satu minggu penuh, per hari. */
export type WeeklySchedule = Record<DayOfWeek, ScheduleItem[]>;
