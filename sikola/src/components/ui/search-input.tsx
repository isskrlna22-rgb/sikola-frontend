"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Input pencarian bergaya sama dengan <Input> (border, radius, warna
 * fokus), dengan ikon kaca pembesar + tombol clear kalau ada teks.
 * Generik, dipakai di Monitoring Kehadiran, cocok dipakai ulang di
 * halaman lain yang butuh search serupa (mis. Data Siswa nanti).
 */
export function SearchInput({
  value,
  onChange,
  placeholder = "Cari...",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search
        className="pointer-events-none absolute left-4 size-4 text-text-secondary"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-11 w-full rounded-2xl border border-border bg-surface pl-10 pr-9 text-body-sm text-text-primary placeholder:text-text-secondary/70 outline-none transition-colors focus:border-primary"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Bersihkan pencarian"
          className="absolute right-3 flex size-5 items-center justify-center rounded-full text-text-secondary hover:text-text-primary"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
