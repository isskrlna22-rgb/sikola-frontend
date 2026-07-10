import type { ReactNode } from "react";

export interface AuthGradientPageProps {
  children: ReactNode;
}

/**
 * Background gradient + ambient blur, dipakai di Forgot Password, OTP
 * Verification, dan New Password — 3 halaman yang di Figma punya
 * background gradient ungu lembut (beda dengan Login yang flat, dan
 * Splash yang gradient gelap penuh).
 */
export function AuthGradientPage({ children }: AuthGradientPageProps) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-primary-light via-background to-primary-light">
      <div
        className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 size-72 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
