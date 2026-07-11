import { QrCode, GraduationCap, Megaphone, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NotificationCategory, NotificationItem } from "@/types/notification";

const CATEGORY_CONFIG: Record<
  NotificationCategory,
  { icon: typeof QrCode; iconClass: string; label: string }
> = {
  absensi: { icon: QrCode, iconClass: "bg-success/10 text-success", label: "Absensi" },
  akademik: {
    icon: GraduationCap,
    iconClass: "bg-primary/10 text-primary",
    label: "Akademik",
  },
  pengumuman: {
    icon: Megaphone,
    iconClass: "bg-accent/15 text-accent",
    label: "Pengumuman",
  },
  sistem: { icon: Settings, iconClass: "bg-info/10 text-info", label: "Sistem" },
};

export interface NotificationRowProps {
  notification: NotificationItem;
}

/**
 * Satu baris notifikasi: ikon per kategori + judul + deskripsi + waktu +
 * indikator belum dibaca (dot ungu di kanan, muncul cuma kalau
 * `isRead === false`).
 */
export function NotificationRow({ notification }: NotificationRowProps) {
  const config = CATEGORY_CONFIG[notification.category];
  const Icon = config.icon;

  return (
    <li
      className={cn(
        "flex gap-3 rounded-2xl px-3 py-3",
        notification.isRead ? "bg-white/40" : "bg-white/70"
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          config.iconClass
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "truncate font-heading text-body-sm",
              notification.isRead
                ? "font-medium text-text-primary"
                : "font-bold text-text-primary"
            )}
          >
            {notification.title}
          </p>
          <span className="shrink-0 text-caption text-text-secondary">
            {notification.timeAgo}
          </span>
        </div>
        <p className="mt-0.5 text-caption text-text-secondary">
          {notification.description}
        </p>
        <span className="mt-1 inline-block text-caption text-text-secondary/70">
          {config.label}
        </span>
      </div>
      {!notification.isRead && (
        <span
          className="mt-1 size-2 shrink-0 rounded-full bg-primary"
          aria-label="Belum dibaca"
        />
      )}
    </li>
  );
}
