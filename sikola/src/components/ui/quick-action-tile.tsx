import Link from "next/link";
import type { ReactNode } from "react";

export interface QuickActionTileProps {
  href: string;
  icon: ReactNode;
  label: string;
}

/**
 * Satu ubin "Akses Cepat" (ikon bulat + label, bisa diklik/navigasi).
 * Beda dari <IconLabel> yang murni presentational tanpa interaksi —
 * komponen ini membungkusnya dengan <Link> supaya tetap satu sumber
 * kebenaran untuk tampilan ikon+label (lihat implementasi di bawah,
 * struktur visualnya sengaja disamakan dengan IconLabel).
 */
export function QuickActionTile({ href, icon, label }: QuickActionTileProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 rounded-2xl px-2 py-1 text-center transition-transform active:scale-95"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/30">
        {icon}
      </span>
      <span className="text-caption font-medium text-text-primary leading-tight">
        {label}
      </span>
    </Link>
  );
}
