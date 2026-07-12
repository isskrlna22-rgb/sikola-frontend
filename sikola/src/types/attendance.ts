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

/**
 * Satu baris riwayat absensi (beda dari TodayAttendance yang cuma untuk
 * hari ini). Dipakai di halaman Riwayat Kehadiran.
 */
export interface AttendanceHistoryEntry {
  id: string;
  /** Format ISO "YYYY-MM-DD" — dipakai untuk sorting & filter bulan. */
  date: string;
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
}

/**
 * Hasil check-in QR — discriminated union berdasarkan `status` supaya
 * TypeScript bisa narrow field yang relevan per kasus (mis. `lateByMinutes`
 * cuma ada di status "late"). Dipakai oleh attendanceService.checkInWithQrCode
 * dan <AttendanceResultView>.
 */
export type CheckInResult =
  | {
      status: "success";
      checkInTime: string;
      date: string;
      location: string;
      isLocationValid: boolean;
    }
  | {
      status: "late";
      checkInTime: string;
      cutoffTime: string;
      lateByMinutes: number;
    }
  | {
      status: "invalid";
      reason: string;
    };
