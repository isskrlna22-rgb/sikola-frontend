"use client";

import { Zap, ZapOff } from "lucide-react";

export interface FlashToggleButtonProps {
  isOn: boolean;
  onToggle: () => void;
}

/**
 * Tombol toggle flash di header Scan QR. Belum terhubung ke flash
 * kamera sungguhan (lihat TECH_DEBT.md) — cuma UI state lokal untuk
 * sekarang.
 */
export function FlashToggleButton({ isOn, onToggle }: FlashToggleButtonProps) {
  const Icon = isOn ? Zap : ZapOff;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOn ? "Matikan flash" : "Nyalakan flash"}
      aria-pressed={isOn}
      className="flex size-10 items-center justify-center rounded-full bg-surface text-primary shadow-sm hover:bg-primary-light"
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}
