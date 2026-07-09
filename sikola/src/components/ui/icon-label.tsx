import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface IconLabelProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

/**
 * Ikon bulat + label singkat di bawahnya. Dipakai di baris 3-fitur
 * Onboarding sekarang, dan cocok dipakai ulang nanti untuk "Akses Cepat" di
 * Dashboard (pola visualnya sama: ikon dalam lingkaran + caption).
 */
export function IconLabel({ icon, label, className }: IconLabelProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
        {icon}
      </div>
      <p className="text-caption font-medium text-text-secondary leading-tight max-w-20">
        {label}
      </p>
    </div>
  );
}
