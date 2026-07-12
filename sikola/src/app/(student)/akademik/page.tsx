"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, FileText, Megaphone, History } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MenuCard } from "@/components/ui/menu-card";

/**
 * Halaman Akademik — MENU HUB (bukan halaman detail langsung), sesuai
 * struktur Figma: Menu Akademik -> 4 sub-menu. Detail nilai/statistik ada
 * di /akademik/informasi, pengajuan surat di /akademik/layanan.
 */
export default function AkademikPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/dashboard")} title="Akademik" />

      <div className="flex flex-col gap-3 px-5">
        <MenuCard
          href="/akademik/informasi"
          icon={<GraduationCap className="size-5" aria-hidden="true" />}
          title="Informasi Akademik"
          description="Lihat nilai tugas, ujian, dan rata-rata nilai"
        />
        <MenuCard
          href="/akademik/layanan"
          icon={<FileText className="size-5" aria-hidden="true" />}
          title="Layanan Akademik"
          description="Ajukan surat izin, surat keterangan, dan lainnya"
        />
        <MenuCard
          href="/pengumuman"
          icon={<Megaphone className="size-5" aria-hidden="true" />}
          title="Pengumuman"
          description="Informasi terbaru dari sekolah"
        />
        <MenuCard
          href="/riwayat-kehadiran"
          icon={<History className="size-5" aria-hidden="true" />}
          title="Riwayat Kehadiran"
          description="Lihat riwayat dan statistik kehadiran Anda"
        />
      </div>
    </div>
  );
}
