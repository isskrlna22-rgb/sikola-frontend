import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
export type ButtonSize = "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Tampilkan spinner dan nonaktifkan tombol — dipakai saat menunggu response API. */
  isLoading?: boolean;
  /** Icon di sisi kiri label (mis. panah kirim, ikon Google/Apple). */
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary !text-white hover:bg-primary-hover active:bg-primary-dark disabled:bg-primary/40",
  outline:
    "border border-border bg-surface text-text-primary hover:bg-primary-light disabled:opacity-50",
  ghost: "text-primary hover:bg-primary-light disabled:opacity-50",
  danger:
    "border border-danger/30 bg-surface text-danger hover:bg-danger/10 disabled:opacity-50",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-body-base",
  lg: "h-14 px-6 text-body-lg",
};

/**
 * Tombol dasar dipakai di seluruh aplikasi. Semua varian visual (primary,
 * outline, ghost, danger) didefinisikan di sini — jangan styling tombol
 * langsung di halaman, supaya konsisten & gampang diubah dari satu tempat
 * kalau ada revisi Design System.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);
