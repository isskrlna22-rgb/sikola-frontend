import type { Metadata } from "next";
import { Bird } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | SIKOLA",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background via-background to-white">
      {/* Blob dekoratif — mengikuti nuansa gradient lembut pada frame Figma */}
      <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-sm flex-col px-5 pb-8 pt-8 sm:max-w-md">
        {/* Header logo */}
        <div className="flex items-center gap-2">
          {/* Placeholder logo — ganti dengan aset resmi SIKOLA (ikon rumah/sekolah) */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-accent">
            <Bird className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-bold text-primary">SIKOLA</p>
            <p className="-mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
              Smart School
            </p>
          </div>
        </div>

        {/* Welcome + mascot */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Welcome !</h1>
            <p className="max-w-[190px] text-sm text-muted-foreground">
              Login to continue your learning journey with Sikola.
            </p>
          </div>

          {/* Placeholder mascot — ganti dengan ilustrasi resmi burung hantu SIKOLA */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bird className="h-10 w-10" />
          </div>
        </div>

        {/* Card form login */}
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
