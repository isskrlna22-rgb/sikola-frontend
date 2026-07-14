import { User as UserIcon, Mail, Phone } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { InfoRow } from "@/components/ui/info-row";
import type { StudentProfile } from "@/types/user";

export interface ProfileHeaderCardProps {
  profile: StudentProfile;
}

/**
 * Kartu identitas utama di halaman Profil: avatar besar + nama di atas,
 * lalu NIS/NISN/Kelas/Jurusan/Email/Telepon lewat <InfoRow> yang sama
 * dipakai di banyak tempat lain (Scan QR, Akademik, dst).
 */
export function ProfileHeaderCard({ profile }: ProfileHeaderCardProps) {
  return (
    <GlassCard as="section" className="p-5">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-primary-light text-primary">
          <UserIcon className="size-9" aria-hidden="true" />
        </span>
        <p className="mt-3 font-heading text-h3 font-bold text-text-primary">
          {profile.name}
        </p>
        <p className="text-body-sm text-text-secondary">
          {profile.className} &middot; {profile.jurusan}
        </p>
      </div>

      <div className="mt-4 border-t border-border/70 pt-2">
        <InfoRow label="NIS" value={profile.nis} />
        <InfoRow label="NISN" value={profile.nisn} />
        <InfoRow
          icon={<Mail className="size-4" aria-hidden="true" />}
          label="Email"
          value={<span className="truncate">{profile.email}</span>}
        />
        <InfoRow
          icon={<Phone className="size-4" aria-hidden="true" />}
          label="No. HP"
          value={profile.phone}
        />
      </div>
    </GlassCard>
  );
}
