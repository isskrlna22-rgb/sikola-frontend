"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, Send, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Logo } from "@/components/ui/logo";
import { MascotIllustration } from "@/components/shared/mascot-illustration";
import { AuthCard } from "@/components/ui/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth-service";
import { AuthGradientPage } from "@/components/shared/auth-gradient-page";

/**
 * TECH DEBT (UI Polish nanti):
 * - Figma pakai pose maskot "bingung/bertanya" (touching chin + "?").
 *   Sementara reuse pose "wave" karena pose itu belum di-crop dari sumber
 *   Figma. Ganti begitu aset tersedia — lihat MascotIllustration untuk
 *   cara menambah pose baru.
 * - Teks "Secure Private Protected" di bawah card pada desain belum
 *   ditambahkan di versi ini.
 */
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await authService.requestPasswordReset(email);
      router.push(`/otp-verification?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal mengirim kode, coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGradientPage>
      <PageHeader onBack={() => router.back()} />

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
          Forgot Password?
        </h1>
        <p className="mt-1 text-body-base text-text-secondary">
          No worries! Enter your registered email and we&apos;ll send you a
          verification code.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            id="email"
            label="Email Address"
            type="email"
            icon={<Mail className="size-5" aria-hidden="true" />}
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ?? undefined}
            required
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            rightIcon={<Send className="size-4" aria-hidden="true" />}
          >
            Send OTP
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/login")}
          >
            Back To Login
          </Button>
        </form>
      </AuthCard>

      <p className="mt-6 flex items-center justify-center gap-2 pb-8 text-body-sm text-text-secondary">
        <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
        Secure Private Protected
      </p>
    </AuthGradientPage>
  );
}
