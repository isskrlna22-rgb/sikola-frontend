import type { NotificationItem } from "@/types/notification";

export function getMockNotifications(): NotificationItem[] {
  return [
    {
      id: "notif-1",
      title: "Pengumuman Baru",
      description: "Ujian Akhir Semester telah dipublikasikan.",
      category: "pengumuman",
      timeAgo: "10:30",
      isRead: false,
    },
    {
      id: "notif-2",
      title: "Absensi Berhasil",
      description: "Kehadiran Anda pada hari ini telah tercatat.",
      category: "absensi",
      timeAgo: "07:02",
      isRead: false,
    },
    {
      id: "notif-3",
      title: "Nilai Baru Diterbitkan",
      description: "Nilai Basis Data telah diterbitkan.",
      category: "akademik",
      timeAgo: "Kemarin",
      isRead: true,
    },
    {
      id: "notif-4",
      title: "Surat Disetujui",
      description: "Surat izin kamu telah disetujui oleh Wali Kelas.",
      category: "akademik",
      timeAgo: "Kemarin",
      isRead: true,
    },
    {
      id: "notif-5",
      title: "Pengingat Jadwal",
      description: "Informasi kelas akan dimulai dalam 15 menit.",
      category: "sistem",
      timeAgo: "2 hari lalu",
      isRead: true,
    },
  ];
}
