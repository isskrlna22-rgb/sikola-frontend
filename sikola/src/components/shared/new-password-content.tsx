"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, KeyRound } from "lucide-react";
import { AuthHeader } from "@/components/shared/page-header";
import { Logo } from "@/components/ui/logo";
import { MascotIllustration } from "@/components/shared/mascot-illustration";
import { AuthCard } from "@/components/ui/auth-card";
import { PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";
import { authService } from "@/services/auth-service";
import { AuthGradientPage } from "@/components/shared/auth-gradient-page";

const MIN_PASSWORD_LENGTH = 8;

/**
 * TECH DEBT (UI Polish nanti):
 * - Figma pakai pose maskot "jempol/thumbs-up". Sementara reuse pose
 *   "wave" karena pose itu belum di-crop dari sumber Figma.
 *
 * Halaman ini menangani DUA konteks sekaligus (lihat authService untuk
 * detail perbedaannya):
 * 1. Alur lupa password (datang dari OTP Verification) — ada `token` &
 *    `email` di query string, panggil authService.resetPasswordWithToken.
 * 2. Force Change Password saat first_login=true (datang dari redirect
 *    Login) — TIDAK ada `token` di query, panggil
 *    authService.changePasswordFirstLogin.
 */
export function NewPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password minimal ${MIN_PASSWORD_LENGTH} karakter.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setIsLoading(true);
    try {
      if (token) {
        await authService.resetPasswordWithToken({
          resetToken: token,
          newPassword: password,
        });
      } else {
        await authService.changePasswordFirstLogin(password);
      }
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah password.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthGradientPage>
        <div className="flex flex-col items-center px-6 pt-4 text-center">
          <Logo size="md" />
          <MascotIllustration
            pose="wave"
            alt="Maskot SIKO memberi jempol"
            className="mt-4 w-36"
          />
        </div>
        <AuthCard variant="floating" className="mt-6">
          <Alert variant="success" title="Password reset successful!">
            You can now login with your new password.
          </Alert>
          <Button
            className="mt-6"
            size="lg"
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Button>
        </AuthCard>
      </AuthGradientPage>
    );
  }

  return (
    <AuthGradientPage>
      <AuthHeader onBack={() => router.back()} />

      <div className="flex flex-col items-center px-6 pt-4 text-center">
        <Logo size="md" />
        <MascotIllustration
          pose="wave"
          alt="Maskot SIKO"
          className="mt-4 w-36"
        />
      </div>

      <AuthCard variant="floating" className="mt-6">
        <h1 className="font-heading text-h2 font-bold text-primary-dark">
          Create New Password
        </h1>
        <p className="mt-1 text-body-base text-text-secondary">
          Your new password must be different from previous used passwords.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <PasswordInput
              id="new-password"
              label="New Password"
              icon={<Lock className="size-5" aria-hidden="true" />}
              placeholder="Enter new password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordStrengthMeter password={password} />
          </div>

          <PasswordInput
            id="confirm-password"
            label="Confirm Password"
            icon={<KeyRound className="size-5" aria-hidden="true" />}
            placeholder="Re-enter new password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="text-body-sm text-danger">{error}</p>}

          <Button type="submit" size="lg" isLoading={isLoading}>
            Reset Password
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Button>
        </form>
      </AuthCard>
    </AuthGradientPage>
  );
}
