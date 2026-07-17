import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { AnnouncementRow } from "@/components/ui/announcement-row";
import type { Announcement } from "@/types/announcement";

export interface AnnouncementsSectionProps {
  announcements: Announcement[];
  /** Tujuan link "Lihat Semua" — default "/pengumuman" (dipakai Dashboard
   * Siswa). Dashboard Guru mengoper "/guru/akademik/pengumuman" supaya
   * tidak nyasar ke shell (BottomNav) siswa. */
  viewAllHref?: string;
}

export function AnnouncementsSection({
  announcements,
  viewAllHref = "/pengumuman",
}: AnnouncementsSectionProps) {
  return (
    <GlassCard as="section" className="mx-5 mt-4 p-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-body-base font-semibold text-text-primary">
          Pengumuman Sekolah
        </h2>
        <Link
          href={viewAllHref}
          className="flex items-center gap-0.5 text-body-sm font-medium text-primary"
        >
          Lihat Semua
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {announcements.length === 0 ? (
        <p className="px-1 py-6 text-center text-body-sm text-text-secondary">
          Belum ada pengumuman baru.
        </p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {announcements.map((announcement) => (
            <AnnouncementRow key={announcement.id} announcement={announcement} />
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
