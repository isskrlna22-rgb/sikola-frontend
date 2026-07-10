"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  /** id dasar untuk label aksesibilitas & aria-describedby error. */
  id?: string;
}

/**
 * Input kode OTP N-digit (default 6), satu kotak per digit. Mendukung:
 * - auto-advance ke kotak berikutnya saat mengetik
 * - backspace mundur ke kotak sebelumnya saat kotak kosong
 * - paste kode penuh sekaligus (mis. dari SMS/clipboard) langsung terbagi
 *   ke semua kotak
 *
 * State kode disimpan sebagai satu string di komponen induk (controlled),
 * bukan di sini — supaya gampang divalidasi/dikirim ke API.
 */
export function OtpInput({
  length = 6,
  value,
  onChange,
  error,
  disabled,
  id = "otp",
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted.slice(0, length));
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div
        role="group"
        aria-label="Kode verifikasi 6 digit"
        aria-describedby={error ? `${id}-error` : undefined}
        className="flex justify-between gap-2"
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${index + 1} dari ${length}`}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "h-14 w-12 rounded-2xl border border-border bg-surface text-center font-heading text-h3 font-semibold text-text-primary outline-none transition-colors focus:border-primary",
              error && "border-danger focus:border-danger"
            )}
          />
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-body-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
