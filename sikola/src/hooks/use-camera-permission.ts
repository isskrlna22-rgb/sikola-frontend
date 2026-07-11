"use client";

import { useCallback, useState } from "react";

export type CameraPermissionStatus = "idle" | "requesting" | "granted" | "denied";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Hook izin kamera. Saat ini MOCK (simulasi delay, tidak benar-benar
 * memanggil browser API) — belum ada scanner asli untuk dihubungkan.
 *
 * Cara mengganti ke implementasi asli nanti: ganti isi `request()` jadi
 * `await navigator.mediaDevices.getUserMedia({ video: true })`, tangkap
 * try/catch untuk membedakan granted vs denied. Pemanggil (komponen Scan
 * QR) TIDAK perlu berubah karena bentuk return hook ini
 * (status/request/reset) tetap sama.
 */
export function useCameraPermission() {
  const [status, setStatus] = useState<CameraPermissionStatus>("idle");

  const request = useCallback(async (simulateDenied = false) => {
    setStatus("requesting");
    // TODO: ganti dengan:
    // try {
    //   await navigator.mediaDevices.getUserMedia({ video: true });
    //   setStatus("granted");
    // } catch {
    //   setStatus("denied");
    // }
    await delay(700);
    setStatus(simulateDenied ? "denied" : "granted");
  }, []);

  const reset = useCallback(() => setStatus("idle"), []);

  return { status, request, reset };
}
