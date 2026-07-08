import type { Metadata } from "next";

import { AuthHeader } from "../../components/auth/auth-header";
import { VerifyOtpForm } from "../../components/auth/verify-otp-form";
export const metadata: Metadata = {
  title: "Verify OTP | SIKOLA",
};

export default function VerifyOtpPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background via-background to-white">
      <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-sm flex-col items-center px-5 pb-8 pt-8 sm:max-w-md">
        <div className="w-full">
          <AuthHeader align="center" />
        </div>

        <div className="mt-8 w-full">
          <VerifyOtpForm />
        </div>
      </div>
    </main>
  );
}