"use client";

import { useId, useState } from "react";
import { Camera, User as UserIcon } from "lucide-react";

export interface AvatarUploadDummyProps {
  onFileSelected?: (fileName: string | null) => void;
}

/**
 * Upload foto profil DUMMY — sama prinsip dengan <FileUploadDummy>
 * (cuma baca nama file untuk ditampilkan, tidak benar-benar upload).
 * Dipisah jadi komponen sendiri karena tampilannya beda total (avatar
 * bulat + tombol kamera mengambang), bukan drop-zone kotak.
 */
export function AvatarUploadDummy({ onFileSelected }: AvatarUploadDummyProps) {
  const inputId = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (file: File | null) => {
    setFileName(file?.name ?? null);
    onFileSelected?.(file?.name ?? null);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <span className="flex size-24 items-center justify-center rounded-full bg-primary-light text-primary">
          <UserIcon className="size-11" aria-hidden="true" />
        </span>
        <label
          htmlFor={inputId}
          className="absolute -bottom-1 -right-1 flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md ring-2 ring-surface hover:bg-primary-hover"
        >
          <Camera className="size-4" aria-hidden="true" />
          <span className="sr-only">Ganti foto profil</span>
        </label>
        <input
          id={inputId}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="sr-only"
          onChange={(e) => handleChange(e.target.files?.[0] ?? null)}
        />
      </div>
      {fileName && (
        <p className="text-caption text-text-secondary">{fileName}</p>
      )}
    </div>
  );
}
