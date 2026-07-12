"use client";

import { useId, useState } from "react";
import { Upload, FileCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUploadDummyProps {
  label?: string;
  onFileSelected?: (fileName: string | null) => void;
  className?: string;
}

/**
 * Upload lampiran DUMMY — file yang dipilih cuma dibaca namanya untuk
 * ditampilkan di UI, tidak benar-benar di-upload ke mana pun. Ganti
 * dengan integrasi upload asli (mis. presigned URL / multipart form ke
 * backend) begitu tersedia.
 */
export function FileUploadDummy({
  label = "Upload dokumen pendukung",
  onFileSelected,
  className,
}: FileUploadDummyProps) {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (file: File | null) => {
    setFileName(file?.name ?? null);
    onFileSelected?.(file?.name ?? null);
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border bg-white/50 px-4 py-6 text-center transition-colors hover:border-primary"
      >
        {fileName ? (
          <>
            <FileCheck className="size-6 text-success" aria-hidden="true" />
            <span className="text-body-sm font-medium text-text-primary">
              {fileName}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleChange(null);
              }}
              className="flex items-center gap-1 text-caption font-semibold text-danger"
            >
              <X className="size-3.5" aria-hidden="true" />
              Hapus
            </button>
          </>
        ) : (
          <>
            <Upload className="size-6 text-text-secondary" aria-hidden="true" />
            <span className="text-body-sm font-medium text-text-primary">
              {label}
            </span>
            <span className="text-caption text-text-secondary">
              Format PDF, JPG, PNG (Maks. 5MB)
            </span>
          </>
        )}
      </label>
      <input
        id={inputId}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(e) => handleChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
