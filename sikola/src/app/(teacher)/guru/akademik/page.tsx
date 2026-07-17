"use client";

import { useRouter } from "next/navigation";
import { Megaphone, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MenuCard } from "@/components/ui/menu-card";

/**
 * Akademik Guru — MENU HUB (2 menu), sesuai wireframe. Pola sama
 * dengan /akademik (siswa): halaman hub berisi MenuCard, bukan konten
 * langsung.
 */
export default function AkademikGuruHubPage() {
  const router = useRouter();

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/guru/dashboard")} title="Akademik" />

      <div className="flex flex-col gap-3 px-5">
        <MenuCard
          href="/guru/akademik/pengumuman"
          icon={<Megaphone className="size-5" aria-hidden="true" />}
          title="Pengumuman"
          description="Lihat pengumuman terbaru dari sekolah"
        />
        <MenuCard
          href="/guru/akademik/data-siswa"
          icon={<Users className="size-5" aria-hidden="true" />}
          title="Data Siswa"
          description="Lihat dan kelola data siswa di kelas"
        />
      </div>
    </div>
  );
}
