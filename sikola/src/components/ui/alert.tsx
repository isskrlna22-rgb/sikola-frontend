import type { ReactNode } from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const VARIANT_STYLE: Record<
  AlertVariant,
  { container: string; icon: ReactNode }
> = {
  success: {
    container: "bg-success/10 border-success/30 text-success",
    icon: <CheckCircle2 className="size-5" aria-hidden="true" />,
  },
  error: {
    container: "bg-danger/10 border-danger/30 text-danger",
    icon: <XCircle className="size-5" aria-hidden="true" />,
  },
  warning: {
    container: "bg-warning/10 border-warning/30 text-warning",
    icon: <AlertTriangle className="size-5" aria-hidden="true" />,
  },
  info: {
    container: "bg-info/10 border-info/30 text-info",
    icon: <Info className="size-5" aria-hidden="true" />,
  },
};

/**
 * Banner pesan status (sukses/error/warning/info) — dipakai di form-form
 * auth (mis. "Password reset successful!") dan nanti di halaman lain yang
 * butuh menampilkan status hasil aksi.
 */
export function Alert({ variant = "info", title, children, className }: AlertProps) {
  const style = VARIANT_STYLE[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-2xl border px-4 py-3",
        style.container,
        className
      )}
    >
      <span className="mt-0.5 shrink-0">{style.icon}</span>
      <div className="text-body-sm text-text-primary">
        {title && <p className="font-heading font-semibold">{title}</p>}
        <div className={title ? "mt-0.5" : undefined}>{children}</div>
      </div>
    </div>
  );
}
