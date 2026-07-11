export type NotificationCategory = "absensi" | "akademik" | "pengumuman" | "sistem";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  /** Waktu siap-tampil, mis. "2 jam lalu" — sama pola dengan Announcement.publishedAt. */
  timeAgo: string;
  isRead: boolean;
}
