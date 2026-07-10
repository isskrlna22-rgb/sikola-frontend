"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  QrCode,
  GraduationCap,
  User,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NavRole = "student" | "teacher";

interface NavItem {
  href: string;
  label: string;
  icon: typeof Home;
}

const STUDENT_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Beranda", icon: Home },
  { href: "/jadwal", label: "Jadwal", icon: Calendar },
  { href: "/scan-qr", label: "Scan QR", icon: QrCode },
  { href: "/akademik", label: "Akademik", icon: GraduationCap },
  { href: "/profil", label: "Profil", icon: User },
];

// Disiapkan untuk sprint Dashboard Guru berikutnya — item tengah beda
// (Kehadiran, bukan Scan QR) sesuai dokumen analisis awal. Belum dipakai
// sekarang, tapi menghindari perlu bikin komponen BottomNav kedua nanti.
const TEACHER_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Beranda", icon: Home },
  { href: "/jadwal", label: "Jadwal", icon: Calendar },
  { href: "/kehadiran", label: "Kehadiran", icon: UserPlus },
  { href: "/akademik", label: "Layanan Akademik", icon: GraduationCap },
  { href: "/profil", label: "Profil", icon: User },
];

export interface BottomNavProps {
  role: NavRole;
}

/**
 * Navigasi bawah aplikasi (Student & Teacher). Item ke-3 (index tengah)
 * digambar lebih besar & elevated — pola umum "FAB di tengah bottom nav"
 * yang muncul di semua mockup Figma (Scan QR untuk siswa, Kehadiran untuk
 * guru).
 */
export function BottomNav({ role }: BottomNavProps) {
  const pathname = usePathname();
  const items = role === "student" ? STUDENT_ITEMS : TEACHER_ITEMS;

  return (
    <nav
      aria-label="Navigasi utama"
      className="relative flex shrink-0 items-end justify-around border-t border-white/40 bg-white/72 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur-xl"
    >
      {items.map((item, index) => {
        const isActive = pathname === item.href;
        const isCenter = index === 2;
        const Icon = item.icon;

if (isCenter) {
  return (
    <Link
      key={item.href}
      href={item.href}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      className="-mt-5 flex flex-1 flex-col items-center gap-1"
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full text-white shadow-lg shadow-primary/40 transition-colors",
          isActive ? "bg-primary-dark" : "bg-primary"
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>

      <span
        className={cn(
          "text-caption font-medium",
          isActive ? "text-primary" : "text-text-secondary"
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-caption font-medium transition-colors",
              isActive ? "text-primary" : "text-text-secondary"
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
