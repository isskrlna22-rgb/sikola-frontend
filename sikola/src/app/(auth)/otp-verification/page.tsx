import { Suspense } from "react";
import { OtpVerificationContent } from "@/components/shared/otp-verification-content";

/**
 * Dibungkus <Suspense> karena komponen di dalamnya memakai useSearchParams
 * (baca query "?email=..." dari halaman Forgot Password). Ini rekomendasi
 * resmi Next.js supaya bagian halaman yang statis tetap bisa di-prerender.
 */
export default function OtpVerificationPage() {
  return (
    <Suspense fallback={null}>
      <OtpVerificationContent />
    </Suspense>
  );
}
