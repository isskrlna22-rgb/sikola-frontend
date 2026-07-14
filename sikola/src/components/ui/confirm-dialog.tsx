"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: "default" | "danger";
}

/**
 * Dialog konfirmasi generik (mis. "Yakin ingin keluar?"). Pertama kalinya
 * ada pola modal di app ini — dipakai di Logout sekarang, dan reusable
 * untuk aksi destruktif/butuh konfirmasi lain nanti (hapus akun, dsb).
 *
 * Sengaja pakai background SOLID (bg-surface), bukan glassmorphism
 * seperti <GlassCard> — modal butuh kontras tinggi & keterbacaan pasti
 * di atas backdrop blur, beda kebutuhan dari kartu konten biasa yang
 * duduk di atas ambient background halaman.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Ya, Lanjutkan",
  cancelLabel = "Batal",
  onConfirm,
  onCancel,
  isLoading = false,
  variant = "default",
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 px-6 backdrop-blur-sm animate-page-in"
      role="presentation"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-sm rounded-3xl bg-surface p-6 shadow-2xl",
          "animate-page-in"
        )}
      >
        <h2
          id="confirm-dialog-title"
          className="font-heading text-h3 font-bold text-text-primary"
        >
          {title}
        </h2>
        <p id="confirm-dialog-description" className="mt-2 text-body-sm text-text-secondary">
          {description}
        </p>
        <div className="mt-6 flex gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
