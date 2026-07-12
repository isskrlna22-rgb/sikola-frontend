"use client";

import { use } from "react";
import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { EmptyState } from "@/components/ui/empty-state";
import { useSmartBack } from "@/hooks/use-smart-back";
import { getMockAnnouncementById } from "@/lib/mock-data/student-dashboard";

const CATEGORY_LABEL: Record<string, string> = {
  school: "Sekolah",
  class: "Kelas",
  personal: "Personal",
};

interface PengumumanDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PengumumanDetailPage({
  params,
}: PengumumanDetailPageProps) {
  const { id } = use(params);
  const handleBack = useSmartBack("/pengumuman");
  const announcement = getMockAnnouncementById(id);

  if (!announcement) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader onBack={handleBack} title="Pengumuman" />
        <EmptyState
          className="flex-1 justify-center"
          icon={<Megaphone className="size-6" aria-hidden="true" />}
          title="Pengumuman Tidak Ditemukan"
          description="Pengumuman ini mungkin sudah dihapus atau link-nya tidak valid."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={handleBack} title="Pengumuman" />

      <div className="animate-page-in px-5">
        <GlassCard as="section" className="p-5">
          <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-caption font-semibold text-primary">
            {CATEGORY_LABEL[announcement.category]}
          </span>

          <h1 className="mt-3 font-heading text-h3 font-bold text-text-primary">
            {announcement.title}
          </h1>
          <p className="mt-1 text-caption text-text-secondary">
            {announcement.author} &middot; {announcement.publishedAt}
          </p>

          <div className="mt-4 border-t border-border/70 pt-4">
            <p className="whitespace-pre-line text-body-base leading-relaxed text-text-primary">
              {announcement.content ?? announcement.excerpt}
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
