import { Suspense } from "react";
import { NewPasswordContent } from "@/components/shared/new-password-content";

/**
 * Dibungkus <Suspense> karena komponen di dalamnya memakai useSearchParams
 * (baca query "?email=...&token=..." dari OTP Verification, atau tanpa
 * query sama sekali saat datang dari redirect Force Change Password).
 */
export default function NewPasswordPage() {
  return (
    <Suspense fallback={null}>
      <NewPasswordContent />
    </Suspense>
  );
}
