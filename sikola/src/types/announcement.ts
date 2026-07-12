export type AnnouncementCategory = "school" | "class" | "personal";

export interface Announcement {
  id: string;
  title: string;
  author: string;
  category: AnnouncementCategory;
  excerpt: string;
  /** Isi lengkap untuk halaman detail — fallback ke `excerpt` kalau kosong. */
  content?: string;
  /** Waktu publikasi dalam bentuk teks siap-tampil, mis. "2 jam lalu". */
  publishedAt: string;
  isNew?: boolean;
}
