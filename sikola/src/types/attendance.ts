/**
 * Status kehadiran harian. Dipakai di banyak tempat (dashboard, riwayat,
 * validasi guru) — satu sumber definisi supaya konsisten.
 */
export type AttendanceStatus = "hadir" | "izin" | "sakit" | "alpa" | "terlambat";

export interface TodayAttendance {
  status: AttendanceStatus;
  /** Jam absen, format "07:02" — undefined kalau belum absen sama sekali. */
  checkInTime?: string;
  location?: string;
}

export interface MonthlyAttendanceBreakdown {
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
}

export interface MonthlyAttendanceStats {
  /** Persentase kehadiran bulan berjalan, 0-100. */
  percentage: number;
  breakdown: MonthlyAttendanceBreakdown;
  totalHariEfektif: number;
  terlambatCount: number;
}
