"use client";

import { useRouter } from "next/navigation";
import { Eye, QrCode, BarChart3, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MenuCard } from "@/components/ui/menu-card";

/**
 * Kehadiran Guru — MENU HUB (bukan langsung QR session), sesuai
 * wireframe. Implementasi sesi QR yang sudah ada dipindah ke
 * /guru/kehadiran/sesi-absensi. 3 menu lain (Monitoring, Rekap,
 * Validasi) sengaja mengarah ke route yang belum dibangun — 404 dulu,
 * konsisten dengan pola bertahap di seluruh project ini (sama seperti
 * /akademik/informasi & /akademik/layanan dulu sebelum dibangun).
 */
export default function KehadiranHubPage() {
  const router = useRouter();

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/guru/dashboard")} title="Kehadiran" />

      <div className="flex flex-col gap-3 px-5">
        <MenuCard
          href="/guru/kehadiran/monitoring"
          icon={<Eye className="size-5" aria-hidden="true" />}
          title="Monitoring Kehadiran"
          description="Pantau kehadiran siswa dengan real-time"
        />
        <MenuCard
          href="/guru/kehadiran/sesi-absensi"
          icon={<QrCode className="size-5" aria-hidden="true" />}
          title="Sesi Absensi"
          description="Buat sesi absensi dan catat kehadiran siswa di kelas"
        />
        <MenuCard
          href="/guru/kehadiran/rekap"
          icon={<BarChart3 className="size-5" aria-hidden="true" />}
          title="Rekap Absensi"
          description="Lihat laporan dan statistik kehadiran siswa"
        />
        <MenuCard
          href="/guru/kehadiran/validasi"
          icon={<ShieldCheck className="size-5" aria-hidden="true" />}
          title="Validasi Kehadiran"
          description="Validasi atau koreksi data kehadiran siswa"
        />
      </div>
    </div>
  );
}
