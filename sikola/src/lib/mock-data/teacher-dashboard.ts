import type {
  TeacherProfile,
  TeacherClassSummary,
  TeacherDashboardStats,
  TeacherScheduleItem,
} from "@/types/teacher";

/**
 * Data dummy Dashboard Guru. Sengaja file & tipe TERPISAH dari
 * lib/mock-data/student-dashboard.ts (bukan reuse/extend tipe siswa)
 * supaya area siswa yang sudah stabil tidak perlu disentuh sama sekali.
 * Pengumuman sekolah tetap reuse getMockAnnouncements() dari modul siswa
 * karena datanya memang satu sumber yang sama (pengumuman bukan hal yang
 * berbeda per role) — lihat pemakaiannya di page.tsx.
 */

export function getMockTeacherProfile(): TeacherProfile {
  return {
    name: "Andi Setiawan, S.Pd.",
    nip: "198703152018011002",
    email: "andi.setiawan@smkbbci.sch.id",
    phone: "0812-3456-7890",
    subject: "Matematika",
    isWaliKelas: true,
    waliKelasOf: "XII RPL",
    isOnline: true,
  };
}

export function getMockTeacherDashboardStats(): TeacherDashboardStats {
  return {
    hadir: 24,
    izin: 1,
    sakit: 0,
    alpa: 0,
    pendingPermissions: 7,
  };
}

export function getMockTeacherClasses(): TeacherClassSummary[] {
  return [
    { id: "cls-1", className: "X IPA 1", studentCount: 32, attendancePercentageToday: 93.75 },
    { id: "cls-2", className: "X RPL", studentCount: 28, attendancePercentageToday: 93.35 },
    { id: "cls-3", className: "X IPS 1", studentCount: 27, attendancePercentageToday: 87.1 },
  ];
}

export function getMockTeacherTodaySchedule(): TeacherScheduleItem[] {
  return [
    {
      id: "tsch-1",
      startTime: "07:00",
      endTime: "07:45",
      subject: "Matematika",
      className: "X IPA 1",
      room: "R.201",
      status: "selesai",
    },
    {
      id: "tsch-2",
      startTime: "08:00",
      endTime: "08:45",
      subject: "Matematika",
      className: "X IPA 2",
      room: "R.202",
      status: "berlangsung",
    },
    {
      id: "tsch-3",
      startTime: "09:00",
      endTime: "09:45",
      subject: "Matematika",
      className: "XI IPA 1",
      room: "R.203",
      status: "akan-datang",
    },
    {
      id: "tsch-4",
      startTime: "11:00",
      endTime: "11:45",
      subject: "Matematika",
      className: "XI IPA 2",
      room: "R.204",
      status: "akan-datang",
    },
  ];
}
