"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, KeyRound, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { PasswordInput } from "@/components/ui/input";
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { authService } from "@/services/auth-service";

const MIN_PASSWORD_LENGTH = 8;

/**
 * Ubah Password — cuma diakses dari /profil, satu jalur masuk, jadi
 * back pakai router.push biasa (bukan useSmartBack). Demo state
 * berhasil/gagal: isi "password123" di Password Lama untuk sukses,
 * apa pun selain itu untuk melihat state gagal (lihat authService.changePassword).
 */
export default function UbahPasswordPage() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Password baru minimal ${MIN_PASSWORD_LENGTH} karakter.`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.changePassword({ oldPassword, newPassword });
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/profil")} title="Ubah Password" />

      <div className="px-5">
        <GlassCard as="section" className="p-5">
          {isSuccess ? (
            <Alert variant="success" title="Password berhasil diubah!">
              Gunakan password baru kamu untuk login selanjutnya.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <PasswordInput
                id="old-password"
                label="Password Lama"
                icon={<Lock className="size-5" aria-hidden="true" />}
                placeholder="Masukkan password lama"
                autoComplete="current-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />

              <div className="flex flex-col gap-2">
                <PasswordInput
                  id="new-password"
                  label="Password Baru"
                  icon={<KeyRound className="size-5" aria-hidden="true" />}
                  placeholder="Masukkan password baru"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <PasswordStrengthMeter password={newPassword} />
              </div>

              <PasswordInput
                id="confirm-password"
                label="Konfirmasi Password Baru"
                icon={<KeyRound className="size-5" aria-hidden="true" />}
                placeholder="Ulangi password baru"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {error && <p className="text-body-sm text-danger">{error}</p>}

              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                leftIcon={<ShieldCheck className="size-4" aria-hidden="true" />}
              >
                Simpan Password Baru
              </Button>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
