import { CalendarDays, ClipboardCheck, GraduationCap, User } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { QuickActionTile } from "@/components/ui/quick-action-tile";

/**
 * Baris "Akses Cepat" Dashboard Guru — struktur sama dengan
 * <QuickActionsSection> siswa (grid 4 <QuickActionTile>), tujuan link
 * beda (semua ke /guru/*). Dibuat komponen terpisah (bukan reuse
 * langsung QuickActionsSection) karena daftar tujuannya berbeda total
 * per role, tapi tetap pakai <QuickActionTile> yang sama di dalamnya.
 */
export function TeacherQuickActions() {
  return (
    <GlassCard as="section" className="mx-5 mt-4 p-4">
      <div className="grid grid-cols-4 gap-2">
        <QuickActionTile
          href="/guru/jadwal"
          icon={<CalendarDays className="size-6" aria-hidden="true" />}
          label="Jadwal Mengajar"
        />
        <QuickActionTile
          href="/guru/kehadiran"
          icon={<ClipboardCheck className="size-6" aria-hidden="true" />}
          label="Kehadiran"
        />
        <QuickActionTile
          href="/guru/akademik"
          icon={<GraduationCap className="size-6" aria-hidden="true" />}
          label="Akademik"
        />
        <QuickActionTile
          href="/guru/profil"
          icon={<User className="size-6" aria-hidden="true" />}
          label="Profil"
        />
      </div>
    </GlassCard>
  );
}
