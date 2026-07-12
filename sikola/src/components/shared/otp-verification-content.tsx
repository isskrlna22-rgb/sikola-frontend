"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MailCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Logo } from "@/components/ui/logo";
import { AuthCard } from "@/components/ui/auth-card";
import { OtpInput } from "@/components/ui/otp-input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useCountdown } from "@/hooks/use-countdown";
import { authService } from "@/services/auth-service";
import { AuthGradientPage } from "@/components/shared/auth-gradient-page";
import { maskEmail } from "@/lib/utils";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

/**
 * TECH DEBT (UI Polish nanti):
 * - Figma pakai ilustrasi amplop bersayap dengan animasi sparkle. Untuk
 *   sprint ini dipakai ikon MailCheck dalam lingkaran sebagai gantinya.
 */
export function OtpVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const { label, isExpired, reset } = useCountdown(RESEND_COOLDOWN_SECONDS);

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (code.length < OTP_LENGTH) {
      setError("Masukkan seluruh 6 digit kode verifikasi.");
      return;
    }

    setIsVerifying(true);
    try {
      const result = await authService.verifyOtp({ email, code });
      router.push(
        `/new-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
          result.resetToken
        )}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verifikasi gagal.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setResendMessage(null);
    setIsResending(true);
    try {
      await authService.resendOtp(email);
      setCode("");
      reset(RESEND_COOLDOWN_SECONDS);
      setResendMessage("Kode baru telah dikirim ke email Anda.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim ulang kode.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthGradientPage>
      <PageHeader onBack={() => router.push("/forgot-password")} />

      <div className="flex flex-col items-center px-6 pt-4 text-center">
        <Logo size="md" />
      </div>

      <AuthCard variant="floating" className="mt-6">
        <div className="flex justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary-light text-primary">
            <MailCheck className="size-8" aria-hidden="true" />
          </span>
        </div>

        <h1 className="mt-4 text-center font-heading text-h2 font-bold text-primary-dark">
          Masukan Kode Verifikasi
        </h1>
        <p className="mt-1 text-center text-body-base text-text-secondary">
          Kami telah mengirimkan kode ke email anda{" "}
          <span className="font-semibold text-text-primary">
            {maskEmail(email)}
          </span>
        </p>

        <form onSubmit={handleVerify} className="mt-6 flex flex-col gap-4">
          <OtpInput
            length={OTP_LENGTH}
            value={code}
            onChange={setCode}
            error={error ?? undefined}
            disabled={isVerifying}
          />

          <div aria-live="polite" className="text-center text-body-sm text-text-secondary">
            {isExpired ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="font-semibold text-primary disabled:opacity-50"
              >
                {isResending ? "Mengirim ulang..." : "Kirim ulang kode"}
              </button>
            ) : (
              <span>
                Kirim ulang kode dalam{" "}
                <span className="font-semibold text-primary">{label}</span>
              </span>
            )}
          </div>

          {resendMessage && (
            <Alert variant="success">{resendMessage}</Alert>
          )}

          <Button type="submit" size="lg" isLoading={isVerifying}>
            Verifikasi
          </Button>
        </form>
      </AuthCard>
    </AuthGradientPage>
  );
}
