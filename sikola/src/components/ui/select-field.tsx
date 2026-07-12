import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

/**
 * Dropdown select bergaya sama dengan <Input> (border, radius, warna
 * fokus) — dipakai untuk field pilihan seperti "Jenis Izin".
 */
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField({ label, error, className, id, children, ...props }, ref) {
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
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              "h-14 w-full appearance-none rounded-2xl border border-border bg-surface px-4 pr-10 text-body-base text-text-primary outline-none transition-colors focus:border-primary",
              error && "border-danger focus:border-danger",
              className
            )}
            aria-invalid={!!error}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>
        {error && <p className="text-body-sm text-danger">{error}</p>}
      </div>
    );
  }
);
