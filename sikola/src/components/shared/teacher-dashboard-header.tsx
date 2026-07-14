"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, User as UserIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { getTimeGreeting } from "@/lib/utils";
import type { TeacherProfile } from "@/types/teacher";

export interface TeacherDashboardHeaderProps {
  profile: TeacherProfile;
  unreadNotificationCount?: number;
}

/**
 * Header Dashboard Guru — struktur & pola sama persis dengan
 * <DashboardHeader> siswa (sapaan dihitung di client lewat useEffect
 * supaya tidak hydration-mismatch), tapi tipe datanya <TeacherProfile>
 * (NIP + mata pelajaran, bukan NIS + kelas). Dibuat komponen terpisah
 * (bukan generic satu komponen untuk 2 role) supaya area siswa yang
 * sudah stabil tidak perlu disentuh.
 */
export function TeacherDashboardHeader({
  profile,
  unreadNotificationCount = 0,
}: TeacherDashboardHeaderProps) {
  const [greeting, setGreeting] = useState<string>("Halo");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sengaja, sama pola dengan DashboardHeader siswa (hindari hydration mismatch waktu server vs client).
    setGreeting(getTimeGreeting());
  }, []);

  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-6">
      <div className="flex items-center gap-3">
        <span className="relative flex size-11 items-center justify-center rounded-full bg-primary-light text-primary">
          <UserIcon className="size-5" aria-hidden="true" />
          {profile.isOnline && (
            <span
              className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-surface bg-success"
              aria-hidden="true"
            />
          )}
        </span>
        <div>
          <p className="text-body-sm text-text-secondary">
            {greeting}, <span className="font-semibold text-text-primary">{profile.name}</span>
          </p>
          <p className="text-caption text-text-secondary">
            {profile.subject}
            {profile.isWaliKelas && profile.waliKelasOf && (
              <> &middot; Wali Kelas {profile.waliKelasOf}</>
            )}
          </p>
        </div>
      </div>

      <Link
        href="/guru/notifikasi"
        aria-label={
          unreadNotificationCount > 0
            ? `Notifikasi, ${unreadNotificationCount} belum dibaca`
            : "Notifikasi"
        }
        className="relative"
      >
        <GlassCard className="flex size-11 items-center justify-center rounded-2xl">
          <Bell className="size-5 text-primary" aria-hidden="true" />
        </GlassCard>
        {unreadNotificationCount > 0 && (
          <span
            className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white"
            aria-hidden="true"
          >
            {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
          </span>
        )}
      </Link>
    </div>
  );
}
