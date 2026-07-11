"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FlashToggleButton } from "@/components/shared/flash-toggle-button";
import { ScanQrPermission } from "@/components/shared/scan-qr-permission";
import { ScanQrCameraView } from "@/components/shared/scan-qr-camera-view";
import { AttendanceResultView } from "@/components/shared/attendance-result-view";
import { useCameraPermission } from "@/hooks/use-camera-permission";
import { attendanceService } from "@/services/attendance-service";
import type { CheckInResult } from "@/types/attendance";

/**
 * Halaman Scan QR — state machine dengan 3 langkah utama:
 * 1. "permission" — minta izin kamera (lihat useCameraPermission)
 * 2. "scanning"   — kamera aktif, menunggu QR ter-scan
 * 3. "result"     — hasil check-in (success/late/invalid)
 *
 * `step` sengaja DIHITUNG (derived), bukan disimpan sebagai state
 * terpisah yang di-sync manual lewat useEffect — supaya tidak ada dua
 * sumber kebenaran yang bisa saling tidak sinkron.
 */
export default function ScanQrPage() {
  const router = useRouter();
  const { status: permissionStatus, request: requestPermission } =
    useCameraPermission();
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);

  const step: "permission" | "scanning" | "result" =
    permissionStatus !== "granted" ? "permission" : result ? "result" : "scanning";

  const handleSimulateScan = async (qrPayload: string) => {
    setIsProcessing(true);
    const scanResult = await attendanceService.checkInWithQrCode(qrPayload);
    setIsProcessing(false);
    setResult(scanResult);
  };

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        onBack={() => router.push("/dashboard")}
        title={step === "scanning" ? "Scan QR" : undefined}
        rightSlot={
          step === "scanning" ? (
            <FlashToggleButton
              isOn={isFlashOn}
              onToggle={() => setIsFlashOn((v) => !v)}
            />
          ) : undefined
        }
      />

      {step === "permission" && (
        <ScanQrPermission
          status={permissionStatus}
          onRequestPermission={() => requestPermission(false)}
          onRequestDenied={() => requestPermission(true)}
        />
      )}

      {step === "scanning" && (
        <ScanQrCameraView
          isProcessing={isProcessing}
          onSimulateScan={handleSimulateScan}
        />
      )}

      {step === "result" && result && (
        <AttendanceResultView
          result={result}
          onBackToHome={() => router.push("/dashboard")}
          onScanAgain={() => setResult(null)}
        />
      )}
    </div>
  );
}
