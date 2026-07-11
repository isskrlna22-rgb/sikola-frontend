import { Camera, CameraOff } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { MascotIllustration } from "@/components/shared/mascot-illustration";
import type { CameraPermissionStatus } from "@/hooks/use-camera-permission";

export interface ScanQrPermissionProps {
  status: CameraPermissionStatus;
  onRequestPermission: () => void;
  onRequestDenied: () => void;
}

/**
 * TECH DEBT (UI Polish nanti): Figma tidak punya layar izin kamera
 * eksplisit — ini ditambahkan karena browser/PWA butuh flow izin kamera
 * sebelum bisa scan. Ilustrasi mascot reuse pose "wave".
 */
export function ScanQrPermission({
  status,
  onRequestPermission,
  onRequestDenied,
}: ScanQrPermissionProps) {
  const isRequesting = status === "requesting";

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <MascotIllustration pose="wave" alt="Maskot SIKO" className="w-32" />

      <GlassCard as="section" className="mt-6 w-full p-6">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Camera className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-heading text-h3 font-bold text-primary-dark">
          Izinkan Akses Kamera
        </h1>
        <p className="mt-1 text-body-sm text-text-secondary">
          SIKOLA butuh akses kamera untuk memindai QR Code absensi. Kamera
          hanya aktif saat kamu membuka halaman ini.
        </p>

        {status === "denied" && (
          <Alert variant="error" className="mt-4 text-left">
            Akses kamera ditolak. Aktifkan izin kamera lewat pengaturan
            browser untuk bisa scan QR.
          </Alert>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <Button
            onClick={onRequestPermission}
            isLoading={isRequesting}
            leftIcon={<Camera className="size-4" aria-hidden="true" />}
          >
            Izinkan Akses Kamera
          </Button>
          {status !== "denied" && (
            <Button
              variant="outline"
              onClick={onRequestDenied}
              disabled={isRequesting}
              leftIcon={<CameraOff className="size-4" aria-hidden="true" />}
            >
              Simulasikan Ditolak
            </Button>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
