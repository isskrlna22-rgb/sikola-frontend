import type { DayOfWeek, ScheduleItem, WeeklySchedule } from "@/types/schedule";
import { DAY_OF_WEEK_ORDER } from "@/types/schedule";

/**
 * Sumber data jadwal MINGGUAN — dipakai halaman Jadwal (semua hari) dan
 * juga oleh Dashboard (yang cuma butuh potongan "hari ini"). Sengaja
 * dipisah dari lib/mock-data/student-dashboard.ts supaya cuma ada SATU
 * sumber kebenaran untuk data jadwal; Dashboard tinggal ambil potongan
 * hari ini dari sini (lihat getMockScheduleForDay di bawah), bukan
 * mendefinisikan array jadwal sendiri.
 *
 * Nanti kalau sudah ada backend: fungsi getMockScheduleForDay dan
 * getMockWeeklySchedule ini yang diganti jadi pemanggilan
 * scheduleService.getByDay(day) / getWeekly() — bentuk return (
 * ScheduleItem[] / WeeklySchedule) tetap sama, jadi pemanggil (halaman
 * Jadwal & Dashboard) tidak perlu berubah.
 */
function getWeeklyScheduleMock(): WeeklySchedule {
  return {
    senin: [
      {
        id: "sen-1",
        startTime: "07:00",
        endTime: "08:30",
        subject: "Matematika",
        teacherName: "Bu Sinta Rahmawati",
        room: "R.201",
        status: "selesai",
      },
      {
        id: "sen-2",
        startTime: "09:00",
        endTime: "10:30",
        subject: "Basis Data",
        teacherName: "Pak Dedi Kurniawan",
        room: "Lab 1",
        status: "berlangsung",
      },
      {
        id: "sen-3",
        startTime: "11:00",
        endTime: "12:30",
        subject: "PBO",
        teacherName: "Pak Arif Maulana",
        room: "Lab 1",
        status: "akan-datang",
      },
    ],
    selasa: [
      {
        id: "sel-1",
        startTime: "07:00",
        endTime: "08:30",
        subject: "Bahasa Indonesia",
        teacherName: "Bu Sari",
        room: "R.202",
        status: "akan-datang",
      },
      {
        id: "sel-2",
        startTime: "08:45",
        endTime: "10:15",
        subject: "Jaringan Komputer",
        teacherName: "Pak Irvan Sofi'ul",
        room: "Lab 2",
        status: "akan-datang",
      },
    ],
    rabu: [
      {
        id: "rab-1",
        startTime: "07:00",
        endTime: "08:30",
        subject: "IPA",
        teacherName: "Bu Rina",
        room: "Lab IPA",
        status: "akan-datang",
      },
      {
        id: "rab-2",
        startTime: "09:00",
        endTime: "10:30",
        subject: "Bahasa Inggris",
        teacherName: "Mr. Jhon",
        room: "R.203",
        status: "akan-datang",
      },
      {
        id: "rab-3",
        startTime: "12:30",
        endTime: "13:15",
        subject: "PJOK",
        teacherName: "Pak Arif",
        room: "Lapangan",
        status: "akan-datang",
      },
    ],
    kamis: [
      {
        id: "kam-1",
        startTime: "07:00",
        endTime: "08:30",
        subject: "Informatika",
        teacherName: "Pak Andi",
        room: "Lab 2",
        status: "akan-datang",
      },
      {
        id: "kam-2",
        startTime: "09:45",
        endTime: "10:30",
        subject: "Seni Budaya",
        teacherName: "Bu Maya",
        room: "R.105",
        status: "akan-datang",
      },
    ],
    // Jumat sengaja dikosongkan — dipakai untuk mendemokan empty state.
    jumat: [],
  };
}

export function getMockWeeklySchedule(): WeeklySchedule {
  return getWeeklyScheduleMock();
}

export function getMockScheduleForDay(day: DayOfWeek): ScheduleItem[] {
  return getWeeklyScheduleMock()[day];
}

/**
 * Hari sekolah saat ini ("senin".."jumat"), atau null kalau akhir pekan.
 * Dipanggil di CLIENT (bukan saat prerender statis) supaya selalu
 * merefleksikan tanggal asli perangkat pengguna — lihat pemakaiannya di
 * halaman Jadwal.
 */
export function getCurrentDayOfWeek(): DayOfWeek | null {
  const jsDay = new Date().getDay(); // 0=Minggu, 1=Senin, ..., 6=Sabtu
  const index = jsDay - 1;
  if (index < 0 || index >= DAY_OF_WEEK_ORDER.length) return null;
  return DAY_OF_WEEK_ORDER[index];
}
