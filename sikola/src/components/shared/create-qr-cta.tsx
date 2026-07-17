import Link from "next/link";
import { QrCode, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

/**
 * CTA menonjol "Buat QR Kehadiran" — mengarah ke /guru/kehadiran (sprint
 * berikutnya) tempat guru bisa generate/lihat QR sesi absensi. Sengaja
 * dibuat kartu terpisah (bukan bagian dari <TeacherQuickActions>) karena
 * ini aksi UTAMA di Dashboard Guru, bukan sekadar salah satu shortcut.
 */
export function CreateQrCta() {
  return (
    <Link href="/guru/kehadiran/sesi-absensi" className="mx-5 mt-4 block">
      <GlassCard
        as="section"
        className="flex items-center gap-4 p-5 transition-transform active:scale-[0.98]"
      >
        <span className="flex size-14 shrink-0 items-center justify-center rounded-3xl bg-primary text-white shadow-md shadow-primary/30">
          <QrCode className="size-7" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-body-lg font-bold text-text-primary">
            Buat QR Kehadiran
          </p>
          <p className="mt-0.5 text-body-sm text-text-secondary">
            Generate QR Code sesi absensi untuk kelas hari ini
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </GlassCard>
    </Link>
  );
}
