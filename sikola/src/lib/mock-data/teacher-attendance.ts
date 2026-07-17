import type {
  QrSession,
  ClassAttendanceRecap,
  StudentAttendanceEntry,
  TeacherAttendanceRecap,
  AttendanceValidationRequest,
} from "@/types/teacher";

/**
 * Data dummy khusus halaman /guru/kehadiran. File terpisah dari
 * teacher-dashboard.ts (mengikuti pola modular yang sama dengan area
 * siswa — mis. schedule.ts terpisah dari student-dashboard.ts) supaya
 * tiap file tetap fokus ke satu halaman/fitur.
 */

/**
 * Rekap kehadiran per kelas, deterministik berdasarkan classId (bukan
 * Math.random()) supaya konsisten setiap render — sama prinsip dengan
 * pseudoStatusForDay() di lib/mock-data/attendance-history.ts.
 */
export function getMockClassAttendanceRecap(classId: string): ClassAttendanceRecap {
  const RECAP_BY_CLASS: Record<string, ClassAttendanceRecap> = {
    "cls-1": { hadir: 30, izin: 1, sakit: 1, alpa: 0, totalStudents: 32 },
    "cls-2": { hadir: 25, izin: 2, sakit: 0, alpa: 1, totalStudents: 28 },
    "cls-3": { hadir: 22, izin: 1, sakit: 2, alpa: 2, totalStudents: 27 },
  };
  return (
    RECAP_BY_CLASS[classId] ?? {
      hadir: 0,
      izin: 0,
      sakit: 0,
      alpa: 0,
      totalStudents: 0,
    }
  );
}

export function getMockQrSessionHistory(): QrSession[] {
  return [
    {
      id: "qr-1",
      classId: "cls-1",
      className: "X IPA 1",
      dateLabel: "12 Mei 2026",
      startTime: "07:00",
      endTime: "07:45",
      status: "nonaktif",
    },
    {
      id: "qr-2",
      classId: "cls-2",
      className: "X RPL",
      dateLabel: "12 Mei 2026",
      startTime: "08:00",
      endTime: "08:45",
      status: "nonaktif",
    },
    {
      id: "qr-3",
      classId: "cls-1",
      className: "X IPA 1",
      dateLabel: "11 Mei 2026",
      startTime: "07:00",
      endTime: "07:45",
      status: "nonaktif",
    },
  ];
}

/**
 * Daftar siswa + status kehadiran HARI INI per kelas — dipakai
 * Monitoring Kehadiran. Deterministik per classId (bukan Math.random()).
 */
export function getMockStudentAttendanceList(
  classId: string
): StudentAttendanceEntry[] {
  const ROSTER_BY_CLASS: Record<string, StudentAttendanceEntry[]> = {
    "cls-1": [
      { id: "st-1", name: "Ahmad Rizki", studentNumber: "10A-001", status: "hadir", checkInTime: "07:45" },
      { id: "st-2", name: "Aisyah Putri", studentNumber: "10A-002", status: "izin" },
      { id: "st-3", name: "Bima Pratama", studentNumber: "10A-003", status: "hadir", checkInTime: "07:50" },
      { id: "st-4", name: "Citra Anindya", studentNumber: "10A-004", status: "hadir", checkInTime: "07:40" },
      { id: "st-5", name: "Daffa Alfarizi", studentNumber: "10A-005", status: "alpa" },
      { id: "st-6", name: "Eka Maharani", studentNumber: "10A-006", status: "hadir", checkInTime: "07:55" },
      { id: "st-7", name: "Fahri Ramadhan", studentNumber: "10A-007", status: "terlambat", checkInTime: "08:05" },
      { id: "st-8", name: "Ghina Aulia", studentNumber: "10A-008", status: "hadir", checkInTime: "07:47" },
    ],
    "cls-2": [
      { id: "st-9", name: "Hana Salsabila", studentNumber: "10B-001", status: "hadir", checkInTime: "07:42" },
      { id: "st-10", name: "Irfan Maulana", studentNumber: "10B-002", status: "sakit" },
      { id: "st-11", name: "Joko Prasetyo", studentNumber: "10B-003", status: "hadir", checkInTime: "07:48" },
      { id: "st-12", name: "Kirana Dewi", studentNumber: "10B-004", status: "terlambat", checkInTime: "08:10" },
      { id: "st-13", name: "Lutfi Hakim", studentNumber: "10B-005", status: "hadir", checkInTime: "07:44" },
    ],
    "cls-3": [
      { id: "st-14", name: "Mira Anggraini", studentNumber: "10C-001", status: "hadir", checkInTime: "07:41" },
      { id: "st-15", name: "Nabil Firmansyah", studentNumber: "10C-002", status: "alpa" },
      { id: "st-16", name: "Olivia Ramadhani", studentNumber: "10C-003", status: "izin" },
      { id: "st-17", name: "Putra Wijaya", studentNumber: "10C-004", status: "hadir", checkInTime: "07:52" },
    ],
  };
  return ROSTER_BY_CLASS[classId] ?? [];
}

/**
 * Rekap kehadiran BULANAN per kelas (beda dari getMockClassAttendanceRecap
 * yang cuma untuk HARI INI, dipakai Sesi Absensi). Deterministik per
 * classId, tidak bergantung pada yearMonth yang dipilih (disederhanakan
 * untuk dummy — lihat TECH_DEBT.md).
 */
export function getMockTeacherAttendanceRecap(
  classId: string
): TeacherAttendanceRecap {
  const RECAP_BY_CLASS: Record<string, TeacherAttendanceRecap> = {
    "cls-1": { percentage: 94, hadir: 28, izin: 2, sakit: 1, alpa: 1, totalStudents: 32 },
    "cls-2": { percentage: 91, hadir: 24, izin: 2, sakit: 1, alpa: 1, totalStudents: 28 },
    "cls-3": { percentage: 85, hadir: 20, izin: 3, sakit: 2, alpa: 2, totalStudents: 27 },
  };
  return (
    RECAP_BY_CLASS[classId] ?? {
      percentage: 0,
      hadir: 0,
      izin: 0,
      sakit: 0,
      alpa: 0,
      totalStudents: 0,
    }
  );
}

/** Daftar pengajuan izin/sakit/keterlambatan yang menunggu validasi guru. */
export function getMockAttendanceValidationRequests(): AttendanceValidationRequest[] {
  return [
    {
      id: "val-1",
      studentName: "Anisa Putri",
      className: "X IPA 1",
      type: "izin",
      reason: "Saya sedang berada di klinik sekolah karena kurang enak badan.",
      dateLabel: "20 Mei 2026",
      timeLabel: "08:15",
      status: "pending",
    },
    {
      id: "val-2",
      studentName: "Rafad Aditya",
      className: "X RPL",
      type: "izin",
      reason: "Latihan tim basket sekolah untuk pertandingan antar sekolah.",
      dateLabel: "20 Mei 2026",
      timeLabel: "08:30",
      status: "pending",
    },
    {
      id: "val-3",
      studentName: "Siti Aisyah",
      className: "X IPS 1",
      type: "sakit",
      reason: "Ada keperluan keluarga mendadak yang tidak bisa ditinggalkan.",
      dateLabel: "20 Mei 2026",
      timeLabel: "09:05",
      status: "pending",
    },
    {
      id: "val-4",
      studentName: "Fahri Ramadhan",
      className: "X IPA 1",
      type: "terlambat",
      reason: "Terjebak macet di jalan menuju sekolah pagi ini.",
      dateLabel: "20 Mei 2026",
      timeLabel: "08:05",
      status: "pending",
    },
    {
      id: "val-5",
      studentName: "Dewi Lestari",
      className: "X RPL",
      type: "izin",
      reason: "Mengurus keperluan administrasi kependudukan di kelurahan.",
      dateLabel: "18 Mei 2026",
      status: "disetujui",
    },
  ];
}
