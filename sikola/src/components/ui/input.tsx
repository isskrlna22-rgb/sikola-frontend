"use client";

import {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Icon di kiri field, mis. <Mail /> atau <Lock />. */
  icon?: ReactNode;
  /** Pesan error di bawah field. Kalau diisi, border field otomatis merah. */
  error?: string;
  label?: string;
}

/**
 * Field input dasar (email, teks, dsb). Untuk password, pakai
 * <PasswordInput> di bawah — sudah termasuk tombol show/hide.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, error, label, className, id, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="font-heading text-body-sm font-semibold text-text-primary"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute left-4 text-text-secondary">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-14 w-full rounded-2xl border border-border bg-surface text-body-base text-text-primary placeholder:text-text-secondary/70",
            "px-4 outline-none transition-colors focus:border-primary",
            icon && "pl-11",
            error && "border-danger focus:border-danger",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error && id ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={id ? `${id}-error` : undefined} className="text-body-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
});

export type PasswordInputProps = Omit<InputProps, "type">;

/**
 * Input password dengan tombol mata (show/hide). Dipisah dari <Input>
 * karena butuh state lokal untuk toggle visibility — komponen <Input>
 * sendiri tetap "dumb"/tanpa state supaya gampang dipakai untuk field apa
 * saja.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ icon, error, label, className, id, ...props }, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="font-heading text-body-sm font-semibold text-text-primary"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="pointer-events-none absolute left-4 text-text-secondary">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            type={visible ? "text" : "password"}
            className={cn(
              "h-14 w-full rounded-2xl border border-border bg-surface text-body-base text-text-primary placeholder:text-text-secondary/70",
              "px-4 outline-none transition-colors focus:border-primary",
              icon && "pl-11",
              "pr-11",
              error && "border-danger focus:border-danger",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error && id ? `${id}-error` : undefined}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-4 text-text-secondary hover:text-text-primary"
            aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
            tabIndex={-1}
          >
            {visible ? (
              <EyeOff className="size-5" aria-hidden="true" />
            ) : (
              <Eye className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
        {error && (
          <p id={id ? `${id}-error` : undefined} className="text-body-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  }
);
