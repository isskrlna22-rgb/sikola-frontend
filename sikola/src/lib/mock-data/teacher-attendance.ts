import type { QrSession, ClassAttendanceRecap } from "@/types/teacher";

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
