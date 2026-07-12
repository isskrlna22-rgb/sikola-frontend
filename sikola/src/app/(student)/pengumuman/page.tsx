"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { PillFilterTabs } from "@/components/ui/pill-filter-tabs";
import { AnnouncementRow } from "@/components/ui/announcement-row";
import { EmptyState } from "@/components/ui/empty-state";
import { useSmartBack } from "@/hooks/use-smart-back";
import { getMockAnnouncements } from "@/lib/mock-data/student-dashboard";
import type { AnnouncementCategory } from "@/types/announcement";

type CategoryFilter = "semua" | AnnouncementCategory;

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "school", label: "Sekolah" },
  { value: "class", label: "Kelas" },
  { value: "personal", label: "Personal" },
];

/**
 * Halaman Pengumuman penuh — bisa dibuka dari Dashboard ("Lihat Semua")
 * ATAU dari menu Akademik, jadi tombol back pakai useSmartBack (sama
 * pola dengan perbaikan Riwayat Kehadiran) supaya selalu balik ke
 * halaman asal yang benar, bukan hardcode ke satu tujuan.
 */
export default function PengumumanPage() {
  const handleBack = useSmartBack("/dashboard");
  const [category, setCategory] = useState<CategoryFilter>("semua");

  const allAnnouncements = getMockAnnouncements();
  const newCount = allAnnouncements.filter((a) => a.isNew).length;
  const announcements = allAnnouncements.filter(
    (a) => category === "semua" || a.category === category
  );

  return (
    <div className="flex flex-1 flex-col pb-4">
      <PageHeader onBack={handleBack} title="Pengumuman" />

      <div className="px-5 pt-3">
        <p className="text-body-sm text-text-secondary">
          {newCount > 0
            ? `${newCount} pengumuman baru minggu ini`
            : "Semua pengumuman sudah kamu lihat"}
        </p>
      </div>

      <div className="px-5 pt-3">
        <PillFilterTabs
          options={CATEGORY_OPTIONS}
          selected={category}
          onSelect={setCategory}
        />
      </div>

      <GlassCard as="section" className="animate-page-in mx-5 mt-4 p-4">
        {announcements.length === 0 ? (
          <EmptyState
            icon={<Megaphone className="size-6" aria-hidden="true" />}
            title="Belum Ada Pengumuman"
            description="Pengumuman baru akan muncul di sini."
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {announcements.map((announcement) => (
              <AnnouncementRow key={announcement.id} announcement={announcement} />
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}
