import { Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import type { TeacherScheduleItem } from "@/types/teacher";

export interface NextClassCardProps {
  item: TeacherScheduleItem;
}

/**
 * Kartu "Kelas Berikutnya" di atas halaman Jadwal Guru — selalu
 * merefleksikan kelas HARI INI yang belum selesai (bukan hari yang
 * sedang dipilih di filter tab), jadi tetap relevan meski guru sedang
 * melihat jadwal hari lain.
 */
export function NextClassCard({ item }: NextClassCardProps) {
  const isOngoing = item.status === "berlangsung";

  return (
    <GlassCard as="section" className="mx-5 p-5">
      <div className="flex items-center gap-2">
        <ArrowRight className="size-4 text-primary" aria-hidden="true" />
        <p className="text-body-sm text-text-secondary">
          {isOngoing ? "Sedang Berlangsung" : "Kelas Berikutnya"}
        </p>
      </div>

      <p className="mt-2 font-heading text-h3 font-bold text-primary-dark">
        {item.subject}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-text-secondary">
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" aria-hidden="true" />
          {item.startTime} - {item.endTime}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="size-4" aria-hidden="true" />
          {item.room}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="size-4" aria-hidden="true" />
          Kelas {item.className} &middot; {item.studentCount} siswa
        </span>
      </div>
    </GlassCard>
  );
}
