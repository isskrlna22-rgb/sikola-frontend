export type AnnouncementCategory = "school" | "class" | "personal";

export interface Announcement {
  id: string;
  title: string;
  author: string;
  category: AnnouncementCategory;
  excerpt: string;
  /** Waktu publikasi dalam bentuk teks siap-tampil, mis. "2 jam lalu". */
  publishedAt: string;
  isNew?: boolean;
}
