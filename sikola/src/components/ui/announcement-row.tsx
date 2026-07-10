import { Megaphone } from "lucide-react";
import type { Announcement } from "@/types/announcement";
import { cn } from "@/lib/utils";

const CATEGORY_LABEL: Record<Announcement["category"], string> = {
  school: "Sekolah",
  class: "Kelas",
  personal: "Personal",
};

export interface AnnouncementRowProps {
  announcement: Announcement;
  className?: string;
}

/**
 * Satu baris pengumuman ringkas. Dipakai di preview Dashboard, dan bisa
 * dipakai ulang di halaman Pengumuman penuh nanti (tinggal tambah link
 * ke detail per item kalau dibutuhkan di sana).
 */
export function AnnouncementRow({ announcement, className }: AnnouncementRowProps) {
  return (
    <li className={cn("flex gap-3 rounded-2xl bg-white/50 px-3 py-3", className)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Megaphone className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-heading text-body-sm font-semibold text-text-primary">
            {announcement.title}
          </p>
          {announcement.isNew && (
            <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              Baru
            </span>
          )}
        </div>
        <p className="truncate text-caption text-text-secondary">
          {CATEGORY_LABEL[announcement.category]} &middot; {announcement.publishedAt}
        </p>
      </div>
    </li>
  );
}
