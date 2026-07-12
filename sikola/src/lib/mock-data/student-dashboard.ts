import type { StudentProfile } from "@/types/user";
import type { TodayAttendance, MonthlyAttendanceStats } from "@/types/attendance";
import type { ScheduleItem } from "@/types/schedule";
import type { Announcement } from "@/types/announcement";
import { getMockScheduleForDay, getCurrentDayOfWeek } from "@/lib/mock-data/schedule";

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
  // Dashboard cuma butuh potongan "hari ini" — ambil dari sumber
  // mingguan (lib/mock-data/schedule.ts) supaya datanya konsisten dengan
  // yang ditampilkan di halaman Jadwal. Default ke "senin" kalau akhir
  // pekan (tidak ada sekolah Sabtu/Minggu) supaya Dashboard tetap ada
  // isinya untuk didemokan.
  const day = getCurrentDayOfWeek() ?? "senin";
  return getMockScheduleForDay(day);
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
      content:
        "Ujian Akhir Semester Genap akan dilaksanakan pada tanggal 3-7 Juni 2024 dengan ketentuan sebagai berikut:\n\n- Datang 15 menit sebelum ujian dimulai\n- Membawa alat tulis lengkap\n- Berpakaian rapi sesuai ketentuan sekolah\n- Dilarang membawa catatan kecil\n\nJadwal lengkap per mata pelajaran akan diumumkan menyusul lewat wali kelas masing-masing.",
      publishedAt: "2 jam lalu",
      isNew: true,
    },
    {
      id: "ann-2",
      title: "Libur Akhir Semester",
      author: "Admin Sekolah",
      category: "school",
      excerpt: "Libur akhir semester dimulai tanggal 8-17 Juni 2024.",
      content:
        "Diberitahukan kepada seluruh siswa bahwa libur akhir semester genap dimulai tanggal 8-17 Juni 2024. Kegiatan belajar mengajar akan kembali normal pada tanggal 18 Juni 2024. Selamat berlibur dan tetap jaga kesehatan.",
      publishedAt: "Kemarin",
    },
    {
      id: "ann-3",
      title: "Pengambilan Raport",
      author: "Wali Kelas",
      category: "class",
      excerpt: "Pengambilan raport dilaksanakan di ruang kelas masing-masing.",
      content:
        "Pengambilan raport semester genap akan dilaksanakan di ruang kelas masing-masing sesuai jadwal yang ditentukan wali kelas. Mohon orang tua/wali hadir tepat waktu.",
      publishedAt: "2 hari lalu",
    },
    {
      id: "ann-4",
      title: "Konfirmasi Kehadiran Wali Murid",
      author: "Wali Kelas",
      category: "personal",
      excerpt:
        "Mohon konfirmasi kehadiran orang tua/wali untuk pertemuan pekan depan.",
      content:
        "Mohon konfirmasi kehadiran orang tua/wali untuk pertemuan pekan depan lewat wali kelas masing-masing selambat-lambatnya 3 hari sebelum acara berlangsung.",
      publishedAt: "3 hari lalu",
    },
  ];
}

export function getMockAnnouncementById(id: string): Announcement | null {
  return getMockAnnouncements().find((a) => a.id === id) ?? null;
}
