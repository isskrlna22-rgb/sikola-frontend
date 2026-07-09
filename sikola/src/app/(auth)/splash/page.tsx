"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/shared/splash-screen";

/** Berapa lama Splash Screen tampil sebelum pindah otomatis ke Onboarding. */
const SPLASH_DURATION_MS = 2200;

/**
 * Route "/splash". Ini sengaja dipisah dari komponen <SplashScreen>:
 * - <SplashScreen> = tampilan murni, gampang dipakai di Storybook/preview.
 * - page.tsx ini   = "wiring" alur aplikasi (kapan & ke mana pindah).
 *
 * Catatan implementasi: untuk saat ini navigasi berikutnya selalu ke
 * "/onboarding". Ketika halaman Login sudah dibangun, ini sebaiknya
 * dicek dulu: jika ada sesi/token tersimpan, langsung ke dashboard sesuai
 * role; jika belum pernah lihat onboarding, ke onboarding; jika sudah
 * pernah tapi belum login, langsung ke /login. Logic itu akan mengikuti
 * setelah AuthContext dibangun.
 */
export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
