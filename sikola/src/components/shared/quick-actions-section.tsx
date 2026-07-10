import { QrCode, History, CalendarDays, GraduationCap } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { QuickActionTile } from "@/components/ui/quick-action-tile";

/**
 * Baris "Akses Cepat" di Dashboard. Sesuai arahan sprint ini: Scan QR,
 * Riwayat Kehadiran, Jadwal Pelajaran, Akademik — daftar ini beda dari
 * "Akses Cepat" versi Figma asli (Jadwal/Nilai/Pengumuman/Scan), dicatat
 * sebagai keputusan produk sprint ini di TECH_DEBT.md.
 */
export function QuickActionsSection() {
  return (
    <GlassCard as="section" className="mx-5 mt-4 p-4">
      <div className="grid grid-cols-4 gap-2">
        <QuickActionTile
          href="/scan-qr"
          icon={<QrCode className="size-6" aria-hidden="true" />}
          label="Scan QR"
        />
        <QuickActionTile
          href="/riwayat-kehadiran"
          icon={<History className="size-6" aria-hidden="true" />}
          label="Riwayat Kehadiran"
        />
        <QuickActionTile
          href="/jadwal"
          icon={<CalendarDays className="size-6" aria-hidden="true" />}
          label="Jadwal Pelajaran"
        />
        <QuickActionTile
          href="/akademik"
          icon={<GraduationCap className="size-6" aria-hidden="true" />}
          label="Akademik"
        />
      </div>
    </GlassCard>
  );
}
