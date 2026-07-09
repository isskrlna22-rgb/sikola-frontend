import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Pose maskot SIKO yang tersedia sebagai aset terpotong (transparent PNG).
 * Tambahkan entry baru di sini setiap kali pose baru di-crop dari sumber
 * Figma (lihat public/images/mascot-*.png), supaya seluruh app punya satu
 * sumber kebenaran untuk nama pose -> file.
 */
const MASCOT_POSES = {
  wave: { src: "/images/mascott-wave.png", width: 538, height: 607 },
  "qr-checkin": {
    src: "/images/mascot-qr-checkin.png",
    width: 374,
    height: 328,
  },
  "academic-hub": {
    src: "/images/mascot-academic-hub.png",
    width: 359,
    height: 378,
  },
} as const;

export type MascotPose = keyof typeof MASCOT_POSES;

export interface MascotIllustrationProps {
  pose: MascotPose;
  /** Teks alt deskriptif untuk konteks halaman ini (wajib diisi per pemakaian). */
  alt: string;
  className?: string;
  priority?: boolean;
}

export function MascotIllustration({
  pose,
  alt,
  className,
  priority = false,
}: MascotIllustrationProps) {
  const asset = MASCOT_POSES[pose];

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
    />
  );
}
