"use client";

import { cn } from "@/lib/utils";

export type UserRole = "student" | "teacher";

export interface RoleSwitchProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  className?: string;
}

const OPTIONS: { value: UserRole; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
];

/**
 * Segmented control "I am a [Student][Teacher]" di halaman Login. Role yang
 * dipilih di sini menentukan endpoint login mana yang dipanggil nanti
 * (lihat catatan di authService saat halaman Login disambungkan ke API).
 */
export function RoleSwitch({ value, onChange, className }: RoleSwitchProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-body-base text-text-secondary shrink-0">I am a</span>
      <div
        role="radiogroup"
        aria-label="Pilih peran login"
        className="flex flex-1 gap-2 rounded-full bg-primary-light p-1"
      >
        {OPTIONS.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex-1 rounded-full py-2 text-body-base font-semibold font-heading transition-colors",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-primary/60 hover:text-primary"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
