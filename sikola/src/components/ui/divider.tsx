import { cn } from "@/lib/utils";

export interface DividerProps {
  /** Teks di tengah divider, mis. "or continue with". Kosongkan untuk garis polos. */
  label?: string;
  className?: string;
}

/**
 * Garis pemisah horizontal, dengan atau tanpa label di tengah (dipakai di
 * Login: "or continue with" sebelum tombol Google/Apple).
 */
export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn("border-t border-border", className)} />;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <hr className="h-px flex-1 border-0 bg-border" />
      <span className="text-body-sm text-text-secondary whitespace-nowrap">
        {label}
      </span>
      <hr className="h-px flex-1 border-0 bg-border" />
    </div>
  );
}
