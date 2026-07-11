import type { CheckInResult } from "@/types/attendance";

/**
 * Payload QR khusus untuk memicu setiap outcome secara dummy (dipakai dev
 * controls di halaman Scan QR). QR sungguhan nanti akan berisi token
 * unik per sesi absensi dari backend — string ini HANYA untuk simulasi
 * sebelum scanner asli terpasang.
 */
export const MOCK_QR_PAYLOAD = {
  SUCCESS: "SIKOLA-QR-SUCCESS",
  LATE: "SIKOLA-QR-LATE",
  INVALID: "SIKOLA-QR-INVALID",
} as const;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Layer terpisah untuk semua panggilan API terkait absensi. Sama seperti
 * authService — begitu backend siap, isi try-block di bawah diganti
 * pemanggilan fetch/axios nyata ke endpoint absensi; pemanggil (halaman
 * Scan QR) tidak perlu berubah karena bentuk return-nya (CheckInResult)
 * tetap sama.
 */
export const attendanceService = {
  /**
   * Kirim payload hasil scan QR ke backend untuk divalidasi & dicatat.
   * Backend yang menentukan valid/tidak, tepat waktu/terlambat — frontend
   * hanya menampilkan apa yang dikembalikan (lihat catatan geolocation
   * yang sudah disepakati sebelumnya: validasi lokasi & waktu murni di
   * backend).
   */
  async checkInWithQrCode(qrPayload: string): Promise<CheckInResult> {
    // TODO: const res = await httpClient.post("/api/attendance/check-in", { qrPayload, latitude, longitude });
    // TODO: return res.json();
    await delay(1100);

    if (qrPayload === MOCK_QR_PAYLOAD.LATE) {
      return {
        status: "late",
        checkInTime: "07:35",
        cutoffTime: "07:30",
        lateByMinutes: 5,
      };
    }

    if (qrPayload === MOCK_QR_PAYLOAD.INVALID) {
      return {
        status: "invalid",
        reason: "QR Code tidak valid atau sudah kedaluwarsa.",
      };
    }

    return {
      status: "success",
      checkInTime: "07:02",
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      location: "SMK Budi Bakti Ciwidey",
      isLocationValid: true,
    };
  },
};
