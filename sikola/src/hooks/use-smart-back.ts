"use client";

import { useRouter } from "next/navigation";

/**
 * Tombol "kembali" yang benar secara kontekstual — dipakai di halaman
 * yang bisa diakses dari LEBIH DARI SATU tempat (mis. Riwayat Kehadiran
 * bisa dibuka dari Dashboard Quick Actions maupun dari menu Akademik).
 *
 * Kalau ada history SPA untuk kembali (pengguna benar-benar barusan
 * berpindah dari halaman lain di app ini), pakai `router.back()` supaya
 * balik ke halaman asal yang sebenarnya. Kalau tidak ada history sama
 * sekali (mis. halaman dibuka langsung lewat URL/bookmark/refresh),
 * fallback ke `fallbackHref` supaya tombol back tetap selalu berfungsi.
 *
 * Pemakaian:
 *   const handleBack = useSmartBack("/dashboard");
 *   <PageHeader onBack={handleBack} ... />
 *
 * Untuk halaman yang MEMANG cuma punya satu jalur masuk (mis.
 * /akademik/informasi yang cuma bisa dibuka dari /akademik), tidak perlu
 * hook ini — `router.push(fallbackHref)` biasa sudah benar dan lebih
 * eksplisit.
 */
export function useSmartBack(fallbackHref: string) {
  const router = useRouter();

  return () => {
    const hasInAppHistory =
      typeof window !== "undefined" && window.history.length > 1;

    if (hasInAppHistory) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };
}
