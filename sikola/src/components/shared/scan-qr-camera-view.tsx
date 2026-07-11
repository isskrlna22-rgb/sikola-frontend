import { ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { MascotIllustration } from "@/components/shared/mascot-illustration";
import { MOCK_QR_PAYLOAD } from "@/services/attendance-service";

export interface ScanQrCameraViewProps {
  isProcessing: boolean;
  onSimulateScan: (qrPayload: string) => void;
}

/**
 * Viewfinder kamera (state "kamera aktif"). Belum ada feed kamera/scanner
 * QR sungguhan — area viewfinder cuma dekorasi statis (gradient gelap +
 * bingkai sudut + garis scan animasi). Lihat TECH_DEBT.md untuk rencana
 * integrasi scanner asli (mis. lib `@zxing/browser` atau `qr-scanner`).
 *
 * "Dev Controls" di bawah viewfinder HANYA untuk sprint ini — memicu
 * attendanceService.checkInWithQrCode() dengan payload dummy yang
 * berbeda, supaya ketiga outcome (sukses/terlambat/tidak valid) bisa
 * didemokan tanpa scanner asli. Hapus blok "Dev Controls" saat scanner
 * asli sudah terpasang (lihat komentar TODO di bawah).
 */
export function ScanQrCameraView({
  isProcessing,
  onSimulateScan,
}: ScanQrCameraViewProps) {
  return (
    <div className="flex flex-1 flex-col px-6 pb-6">
      <p className="text-center text-body-sm text-text-secondary">
        Arahkan kamera ke QR Code untuk absensi
      </p>

      <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-3xl bg-primary-dark/90">
        {/* TODO: ganti <div> ini dengan elemen <video> feed kamera asli +
            overlay hasil decode dari library QR scanner. */}
        <div className="absolute inset-4 rounded-2xl border-2 border-white/70">
          <span className="absolute -left-0.5 -top-0.5 size-6 rounded-tl-2xl border-l-4 border-t-4 border-white" />
          <span className="absolute -right-0.5 -top-0.5 size-6 rounded-tr-2xl border-r-4 border-t-4 border-white" />
          <span className="absolute -bottom-0.5 -left-0.5 size-6 rounded-bl-2xl border-b-4 border-l-4 border-white" />
          <span className="absolute -bottom-0.5 -right-0.5 size-6 rounded-br-2xl border-b-4 border-r-4 border-white" />
        </div>
        <div
          className="absolute inset-x-4 top-1/2 h-1 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(91,61,245,0.8)] motion-safe:animate-pulse"
          aria-hidden="true"
        />
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/60 backdrop-blur-sm">
            <p className="text-body-sm font-semibold text-white">
              Memvalidasi QR Code…
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-white/60 px-4 py-3">
        <MascotIllustration pose="wave" alt="Maskot SIKO" className="w-10 shrink-0" />
        <p className="text-body-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Hi! I&apos;m SIKO 👋</span>{" "}
          Let&apos;s scan the QR code to check you in!
        </p>
      </div>

      <p className="mt-3 flex items-start gap-2 text-caption text-text-secondary">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        Pastikan QR Code valid. Scan hanya dapat dilakukan pada waktu dan
        lokasi yang ditentukan.
      </p>

      <GlassCard as="section" className="mt-4 p-4">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-secondary">
          Dev Controls — simulasi hasil scan
        </p>
        <div className="mt-2 flex flex-col gap-2">
          <Button
            size="md"
            disabled={isProcessing}
            onClick={() => onSimulateScan(MOCK_QR_PAYLOAD.SUCCESS)}
          >
            Simulasikan QR Berhasil
          </Button>
          <Button
            size="md"
            variant="outline"
            disabled={isProcessing}
            onClick={() => onSimulateScan(MOCK_QR_PAYLOAD.LATE)}
          >
            Simulasikan Terlambat
          </Button>
          <Button
            size="md"
            variant="danger"
            disabled={isProcessing}
            onClick={() => onSimulateScan(MOCK_QR_PAYLOAD.INVALID)}
          >
            Simulasikan QR Tidak Valid
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
