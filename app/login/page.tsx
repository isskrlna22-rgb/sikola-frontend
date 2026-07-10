import type { Metadata } from "next";
import Image from "next/image";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | SIKOLA",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-64 w-64 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-sm flex-col px-5 pt-8 pb-8">
        {/* Logo */}
        <Image
          src="/image/logo.png"
          alt="Logo SIKOLA"
          width={90}
          height={90}
          style={{ width: "auto", height: "auto" }}
        />

        {/* Welcome */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome!</h1>

            <p className="mt-2 text-gray-500">
              Login to continue your learning journey with SIKOLA.
            </p>
          </div>

          <Image
            src="/image/mascot1.png"
            alt="SIKO Mascot"
            width={120}
            height={120}
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        {/* Login Form */}
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}