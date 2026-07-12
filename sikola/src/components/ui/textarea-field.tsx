import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/** Textarea bergaya sama dengan <Input> — dipakai untuk "Alasan Izin". */
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField({ label, error, className, id, rows = 4, ...props }, ref) {
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
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={cn(
            "w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-body-base text-text-primary placeholder:text-text-secondary/70 outline-none transition-colors focus:border-primary",
            error && "border-danger focus:border-danger",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-body-sm text-danger">{error}</p>}
      </div>
    );
  }
);
