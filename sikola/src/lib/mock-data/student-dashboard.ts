import type { StudentProfile } from "@/types/user";
import type { TodayAttendance, MonthlyAttendanceStats } from "@/types/attendance";
import type { ScheduleItem } from "@/types/schedule";
import type { Announcement } from "@/types/announcement";

/**
 * Data dummy untuk Dashboard Siswa. Sengaja dipisah per domain (profile,
 * attendance, schedule, announcement) dan diekspor sebagai fungsi
 * `getMock*()` — bukan konstanta statis — supaya nanti gampang diganti
 * jadi pemanggilan service/API asli tanpa mengubah pemanggil di halaman
 * (page.tsx cukup ganti `getMockTodaySchedule()` jadi
 * `scheduleService.getToday()`, bentuk datanya tetap sama).
 */

export function getMockStudentProfile(): StudentProfile {
  return {
    name: "Anisa Lidia Putri",
    className: "XII RPL",
    nis: "12345678",
    isOnline: true,
  };
}

export function getMockTodayAttendance(): TodayAttendance {
  return {
    status: "hadir",
    checkInTime: "07:02",
    location: "SMK Budi Bakti Ciwidey",
  };
}

export function getMockMonthlyAttendanceStats(): MonthlyAttendanceStats {
  return {
    percentage: 96,
    breakdown: { hadir: 24, izin: 2, sakit: 0, alpa: 0 },
    totalHariEfektif: 26,
    terlambatCount: 2,
  };
}

export function getMockTodaySchedule(): ScheduleItem[] {
  return [
    {
      id: "sch-1",
      startTime: "07:00",
      endTime: "08:30",
      subject: "Matematika",
      teacherName: "Bu Sinta Rahmawati",
      room: "R.201",
      status: "selesai",
    },
    {
      id: "sch-2",
      startTime: "09:00",
      endTime: "10:30",
      subject: "Basis Data",
      teacherName: "Pak Dedi Kurniawan",
      room: "Lab 1",
      status: "berlangsung",
    },
    {
      id: "sch-3",
      startTime: "11:00",
      endTime: "12:30",
      subject: "PBO",
      teacherName: "Pak Arif Maulana",
      room: "Lab 1",
      status: "akan-datang",
    },
  ];
}

export function getMockAnnouncements(): Announcement[] {
  return [
    {
      id: "ann-1",
      title: "Ujian Akhir Semester",
      author: "Admin Sekolah",
      category: "school",
      excerpt:
        "Ujian Akhir Semester Genap akan dilaksanakan pada tanggal 3-7 Juni 2024.",
      publishedAt: "2 jam lalu",
      isNew: true,
    },
    {
      id: "ann-2",
      title: "Libur Akhir Semester",
      author: "Admin Sekolah",
      category: "school",
      excerpt: "Libur akhir semester dimulai tanggal 8-17 Juni 2024.",
      publishedAt: "Kemarin",
    },
    {
      id: "ann-3",
      title: "Pengambilan Raport",
      author: "Wali Kelas",
      category: "class",
      excerpt: "Pengambilan raport dilaksanakan di ruang kelas masing-masing.",
      publishedAt: "2 hari lalu",
    },
  ];
}
