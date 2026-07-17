import type { DayOfWeek } from "@/types/schedule";
import type { TeacherScheduleItem } from "@/types/teacher";

/**
 * Sumber data jadwal mengajar MINGGUAN guru — dipakai halaman
 * /guru/jadwal (semua hari). File terpisah dari
 * lib/mock-data/teacher-dashboard.ts (yang cuma butuh potongan "hari
 * ini" untuk preview), mengikuti pola modular yang sama dengan area
 * siswa (schedule.ts terpisah dari student-dashboard.ts).
 *
 * Nanti diganti pemanggilan service asli — signature fungsi
 * (getMockTeacherScheduleForDay/getMockTeacherWeeklySchedule) tetap
 * sama supaya pemanggil tidak perlu berubah.
 */

type TeacherWeeklySchedule = Record<DayOfWeek, TeacherScheduleItem[]>;

function getWeeklyScheduleMock(): TeacherWeeklySchedule {
  return {
    senin: [
      {
        id: "tsen-1",
        startTime: "07:00",
        endTime: "07:45",
        subject: "Matematika",
        className: "X IPA 1",
        room: "R.201",
        studentCount: 32,
        status: "selesai",
      },
      {
        id: "tsen-2",
        startTime: "08:00",
        endTime: "08:45",
        subject: "Matematika",
        className: "X IPA 2",
        room: "R.202",
        studentCount: 30,
        status: "berlangsung",
      },
      {
        id: "tsen-3",
        startTime: "09:00",
        endTime: "09:45",
        subject: "Matematika",
        className: "XI IPA 1",
        room: "R.203",
        studentCount: 28,
        status: "akan-datang",
      },
      {
        id: "tsen-4",
        startTime: "11:00",
        endTime: "11:45",
        subject: "Matematika",
        className: "XI IPA 2",
        room: "R.204",
        studentCount: 27,
        status: "akan-datang",
      },
    ],
    selasa: [
      {
        id: "tsel-1",
        startTime: "07:00",
        endTime: "07:45",
        subject: "Matematika",
        className: "X RPL",
        room: "Lab 1",
        studentCount: 28,
        status: "akan-datang",
      },
      {
        id: "tsel-2",
        startTime: "09:00",
        endTime: "09:45",
        subject: "Matematika",
        className: "X IPS 1",
        room: "R.205",
        studentCount: 27,
        status: "akan-datang",
      },
    ],
    rabu: [
      {
        id: "trab-1",
        startTime: "07:00",
        endTime: "07:45",
        subject: "Matematika",
        className: "XII RPL",
        room: "Lab 1",
        studentCount: 26,
        status: "akan-datang",
      },
      {
        id: "trab-2",
        startTime: "08:00",
        endTime: "08:45",
        subject: "Matematika",
        className: "X IPA 1",
        room: "R.201",
        studentCount: 32,
        status: "akan-datang",
      },
      {
        id: "trab-3",
        startTime: "10:00",
        endTime: "10:45",
        subject: "Matematika",
        className: "X IPA 2",
        room: "R.202",
        studentCount: 30,
        status: "akan-datang",
      },
    ],
    kamis: [
      {
        id: "tkam-1",
        startTime: "07:00",
        endTime: "07:45",
        subject: "Matematika",
        className: "XI IPA 1",
        room: "R.203",
        studentCount: 28,
        status: "akan-datang",
      },
      {
        id: "tkam-2",
        startTime: "08:00",
        endTime: "08:45",
        subject: "Matematika",
        className: "XI IPA 2",
        room: "R.204",
        studentCount: 27,
        status: "akan-datang",
      },
    ],
    // Jumat sengaja dikosongkan — dipakai mendemokan empty state, sama
    // pola dengan lib/mock-data/schedule.ts milik siswa.
    jumat: [],
  };
}

export function getMockTeacherWeeklySchedule(): TeacherWeeklySchedule {
  return getWeeklyScheduleMock();
}

export function getMockTeacherScheduleForDay(day: DayOfWeek): TeacherScheduleItem[] {
  return getWeeklyScheduleMock()[day];
}
