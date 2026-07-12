import { Clock3, CalendarDays, MapPin, CheckCircle2, XCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { InfoRow } from "@/components/ui/info-row";
import { MascotIllustration } from "@/components/shared/mascot-illustration";
import type { CheckInResult } from "@/types/attendance";

export interface AttendanceResultViewProps {
  result: CheckInResult;
  onBackToHome: () => void;
  onScanAgain: () => void;
}

const HEADING_BY_STATUS: Record<CheckInResult["status"], string> = {
  success: "Absensi Berhasil!",
  late: "Terlambat!",
  invalid: "QR Code Tidak Valid",
};

const SUBTITLE_BY_STATUS: Record<CheckInResult["status"], string> = {
  success: "Kehadiran Anda telah tercatat",
  late: "Kamu melewati batas waktu yang telah ditentukan.",
  invalid: "Coba scan ulang atau hubungi guru piket.",
};

const MOTIVATION_BY_STATUS: Record<CheckInResult["status"], string> = {
  success: "Terus semangat belajar dan jadi pribadi hebat!",
  late: "Datang lebih awal ya! Disiplin adalah kunci sukses.",
  invalid: "Pastikan QR Code masih berlaku dan coba lagi.",
};

/**
 * TECH DEBT (UI Polish nanti): Figma pakai pose maskot beda per outcome
 * (thumbs-up untuk sukses, sedih untuk terlambat). Sementara semua reuse
 * pose "wave".
 *
 * Satu komponen menangani 3 outcome (bukan 3 file terpisah) karena
 * struktur layout-nya identik — cuma judul, warna, dan baris info yang
 * beda. Baris info dibangun data-driven dari `result` (discriminated
 * union) supaya TypeScript pastikan tiap status cuma menampilkan field
 * yang benar-benar ada di tipe-nya.
 */
export function AttendanceResultView({
  result,
  onBackToHome,
  onScanAgain,
}: AttendanceResultViewProps) {
  const isSuccess = result.status === "success";

  return (
    <div className="animate-page-in flex flex-1 flex-col items-center px-6 pb-6 pt-4 text-center">
      <MascotIllustration pose="wave" alt="Maskot SIKO" className="w-32" />

      <h1
        className={
          "mt-4 font-heading text-h2 font-bold " +
          (isSuccess ? "text-success" : "text-danger")
        }
      >
        {HEADING_BY_STATUS[result.status]}
      </h1>
      <p className="mt-1 text-body-base text-text-secondary">
        {SUBTITLE_BY_STATUS[result.status]}
      </p>

      <GlassCard as="section" className="mt-5 w-full p-5 text-left">
        {result.status === "success" && (
          <>
            <InfoRow
              icon={<Clock3 className="size-4" aria-hidden="true" />}
              label="Waktu Absen"
              value={`${result.checkInTime} WIB`}
            />
            <InfoRow
              icon={<CalendarDays className="size-4" aria-hidden="true" />}
              label="Tanggal"
              value={result.date}
            />
            <InfoRow
              icon={<MapPin className="size-4" aria-hidden="true" />}
              label="Lokasi"
              value={
                <span className="flex items-center gap-2">
                  {result.location}
                  <StatusBadge
                    status={result.isLocationValid ? "disetujui" : "ditolak"}
                    label={result.isLocationValid ? "Valid" : "Tidak Valid"}
                  />
                </span>
              }
            />
          </>
        )}

        {result.status === "late" && (
          <>
            <InfoRow
              icon={<Clock3 className="size-4" aria-hidden="true" />}
              label="Waktu Absen"
              value={`${result.checkInTime} WIB`}
            />
            <InfoRow
              icon={<Clock3 className="size-4" aria-hidden="true" />}
              label="Batas Waktu"
              value={`${result.cutoffTime} WIB`}
            />
            <InfoRow
              label="Keterlambatan"
              value={`${result.lateByMinutes} menit`}
            />
          </>
        )}

        {result.status === "invalid" && (
          <InfoRow
            icon={<XCircle className="size-4 text-danger" aria-hidden="true" />}
            label="Keterangan"
            value={result.reason}
          />
        )}
      </GlassCard>

      <p className="mt-4 text-body-sm text-text-secondary">
        {MOTIVATION_BY_STATUS[result.status]}
      </p>

      <div className="mt-6 flex w-full flex-col gap-2">
        {result.status !== "success" && (
          <Button variant="outline" onClick={onScanAgain}>
            Scan Ulang
          </Button>
        )}
        <Button
          onClick={onBackToHome}
          leftIcon={
            isSuccess ? (
              <CheckCircle2 className="size-4" aria-hidden="true" />
            ) : undefined
          }
        >
          Kembali Ke Beranda
        </Button>
      </div>
    </div>
  );
}
