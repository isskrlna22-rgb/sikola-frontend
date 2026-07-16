"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { MascotIllustration } from "@/components/shared/mascot-illustration";
import { AuthCard } from "@/components/ui/auth-card";
import { RoleSwitch, type UserRole } from "@/components/ui/role-switch";
import { Input, PasswordInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { GoogleIcon } from "@/components/ui/google-icon";
import { ContactAdminLink } from "@/components/shared/contact-admin-link";
import { authService } from "@/services/auth-service";

const WELCOME_SUBTITLE: Record<UserRole, string> = {
  student: "Login to continue your learning journey with Sikola.",
  teacher: "Login to continue your teaching journey with Sikola.",
};

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = await authService.login({ role, email, password });
      localStorage.setItem("user", JSON.stringify(result.user));
      if (result.firstLogin) {
        router.push("/new-password");
        return;
      }
      // TODO: begitu AuthContext + routing per-role sudah ada, ganti ke
      // dashboard sesuai role (student -> (student)/dashboard, teacher ->
      // (teacher)/dashboard). Untuk sekarang diarahkan ke /dashboard yang
      // belum dibuat — sengaja 404 dulu, sama seperti pola Onboarding.
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login gagal, silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="flex items-start justify-between gap-4 px-6 pt-8">
        <div>
          <Logo
             tone="color"
             size="sm"
              className="items-start"
            />
          <h1 className="mt-5 font-heading text-h2 font-bold text-primary-dark">
            Welcome !
          </h1>
          <p className="mt-1 max-w-[220px] text-body-base text-text-secondary">
            {WELCOME_SUBTITLE[role]}
          </p>
        </div>
        <MascotIllustration
          pose="wave"
          alt="Maskot SIKO melambaikan tangan"
          className="w-28 shrink-0"
        />
      </div>

      <AuthCard variant="sheet" className="mt-8 flex-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <RoleSwitch value={role} onChange={setRole} />

          <Input
            id="email"
            type="email"
            icon={<Mail className="size-5" aria-hidden="true" />}
            placeholder="Enter your email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex flex-col gap-2">
            <PasswordInput
              id="password"
              icon={<Lock className="size-5" aria-hidden="true" />}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a
              href="/forgot-password"
              className="self-end text-body-sm font-semibold text-primary"
            >
              Forgot Password?
            </a>
          </div>

          {error && <p className="text-body-sm text-danger">{error}</p>}

          <Button type="submit" size="lg" isLoading={isLoading}>
            Login
          </Button>

          <Divider label="or continue with" className="mt-1" />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              leftIcon={<GoogleIcon className="size-5" />}
            >
              Google
            </Button>
        </div>

        </form>

        <p className="mt-6 text-center text-body-sm text-text-secondary">
          Don&apos;t have an account belajar.id?{" "}
          <ContactAdminLink role={role} />
        </p>
      </AuthCard>
    </div>
  );
}
