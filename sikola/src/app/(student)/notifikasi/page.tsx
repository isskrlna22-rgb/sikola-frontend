"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BellOff } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { NotificationRow } from "@/components/ui/notification-row";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { getMockNotifications } from "@/lib/mock-data/notifications";

/**
 * Halaman Notifikasi — versi awal (sederhana, belum ada filter kategori
 * atau infinite scroll). "Tandai semua dibaca" masih local state saja
 * (belum PATCH ke backend) — lihat TECH_DEBT.md.
 */
export default function NotifikasiPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(getMockNotifications());

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    // TODO: panggil notificationService.markAllAsRead() begitu backend siap.
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="flex flex-1 flex-col pb-4">
      <PageHeader onBack={() => router.push("/dashboard")} title="Notifikasi" />

      <div className="px-5 pt-4">
        <GlassCard as="section" className="p-4">
          {unreadCount > 0 && (
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-body-sm text-text-secondary">
                {unreadCount} notifikasi belum dibaca
              </p>
              <Button variant="ghost" size="md" fullWidth={false} onClick={handleMarkAllRead}>
                Tandai Semua Dibaca
              </Button>
            </div>
          )}

          {notifications.length === 0 ? (
            <EmptyState
              icon={<BellOff className="size-6" aria-hidden="true" />}
              title="Belum Ada Notifikasi"
              description="Notifikasi baru akan muncul di sini."
            />
          ) : (
            <ul className="flex flex-col gap-2">
              {notifications.map((notification) => (
                <NotificationRow key={notification.id} notification={notification} />
              ))}
            </ul>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
