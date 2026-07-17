import type { ScheduleStatus } from "@/types/schedule";
import type { AttendanceStatus } from "@/types/attendance";

export interface TeacherProfile {
  name: string;
  nip: string;
  email: string;
  phone: string;
  /** Mata pelajaran utama yang diampu. */
  subject: string;
  isWaliKelas: boolean;
  /** Nama kelas kalau isWaliKelas true, mis. "XII RPL". */
  waliKelasOf?: string;
  isOnline: boolean;
}

/** Satu kelas yang diampu guru — dipakai di ringkasan Dashboard. */
export interface TeacherClassSummary {
  id: string;
  className: string;
  studentCount: number;
  /** Persentase kehadiran kelas ini hari ini, 0-100. */
  attendancePercentageToday: number;
}

export interface TeacherDashboardStats {
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  /** Jumlah pengajuan izin siswa yang menunggu persetujuan guru ini. */
  pendingPermissions: number;
}

/**
 * Satu sesi mengajar hari ini. Sengaja BUKAN reuse <ScheduleItem> siswa
 * (yang punya field `teacherName`) — dari sudut pandang guru yang
 * relevan adalah `className` (kelas mana yang diajar), bukan nama guru
 * itu sendiri. Field lain (waktu, ruang, status) tetap sama polanya.
 */
export interface TeacherScheduleItem {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  className: string;
  room: string;
  studentCount: number;
  status: ScheduleStatus;
}

/**
 * Status sesi QR absensi. Reuse union "aktif"/"nonaktif" yang sama
 * dipakai `StatusBadge` untuk status akun — semantiknya pas (sesi QR
 * ya aktif atau sudah berakhir), tidak perlu union status baru.
 */
export type QrSessionStatus = "aktif" | "nonaktif";

export interface QrSession {
  id: string;
  classId: string;
  className: string;
  dateLabel: string;
  startTime: string;
  /** "-" kalau sesi masih aktif (belum ada waktu selesai). */
  endTime: string;
  status: QrSessionStatus;
}

/** Rekap kehadiran satu kelas untuk hari ini — dipakai di /guru/kehadiran. */
export interface ClassAttendanceRecap {
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  totalStudents: number;
}

/**
 * Satu baris siswa di Monitoring Kehadiran. `status` reuse
 * `AttendanceStatus` dari types/attendance.ts (union
 * hadir/izin/sakit/alpa/terlambat) — vocabulary status kehadiran sama
 * persis lintas role, tidak perlu union baru.
 */
export interface StudentAttendanceEntry {
  id: string;
  name: string;
  /** NIS */
  studentNumber: string;
  status: AttendanceStatus;
  checkInTime?: string;
}

/** Rekap kehadiran satu kelas untuk satu BULAN — dipakai di Rekap Kehadiran. */
export interface TeacherAttendanceRecap {
  /** Persentase kehadiran, 0-100. */
  percentage: number;
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  totalStudents: number;
}

export type AttendanceValidationType = "izin" | "sakit" | "terlambat";

/**
 * Satu pengajuan yang menunggu (atau sudah) divalidasi guru. `status`
 * reuse StatusKind dari StatusBadge ("pending"/"disetujui"/"ditolak").
 */
export interface AttendanceValidationRequest {
  id: string;
  studentName: string;
  className: string;
  type: AttendanceValidationType;
  reason: string;
  dateLabel: string;
  timeLabel?: string;
  status: "pending" | "disetujui" | "ditolak";
}
