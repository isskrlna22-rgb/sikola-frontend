"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, User as UserIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { getTimeGreeting } from "@/lib/utils";
import type { StudentProfile } from "@/types/user";

export interface DashboardHeaderProps {
  profile: StudentProfile;
  unreadNotificationCount?: number;
}

/**
 * Header Dashboard: avatar + sapaan + nama + status online + tombol
 * notifikasi. Sapaan ("Selamat Pagi/Siang/...") dihitung di client
 * (useEffect) supaya tidak "beku" ke waktu build saat halaman
 * di-prerender statis — dan supaya tidak muncul warning hydration
 * mismatch karena teks beda antara server & client.
 */
export function DashboardHeader({
  profile,
  unreadNotificationCount = 0,
}: DashboardHeaderProps) {
  const [greeting, setGreeting] = useState<string>("Halo");

  useEffect(() => {
    // Sengaja setState di effect (bukan lazy useState initializer) supaya
    // render pertama di SERVER selalu netral ("Halo") dan waktu sungguhan
    // cuma dibaca di client — menghindari hydration mismatch kalau jam
    // server & client beda. Trade-off: satu re-render tambahan saat mount,
    // yang untuk teks sapaan non-kritis ini bisa diterima.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
            {profile.isOnline ? "Online" : "Offline"} &middot; {profile.className}
          </p>
        </div>
      </div>

      <Link
        href="/notifikasi"
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
