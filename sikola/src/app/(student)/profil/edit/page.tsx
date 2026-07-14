"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Phone, Save } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { AvatarUploadDummy } from "@/components/ui/avatar-upload-dummy";
import { Input } from "@/components/ui/input";
import { TextareaField } from "@/components/ui/textarea-field";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import {
  getMockStudentProfile,
  saveMockStudentProfile,
} from "@/lib/mock-data/student-dashboard";

/**
 * Edit Profil — cuma bisa diakses dari /profil (satu jalur masuk), jadi
 * tombol kembali pakai router.push biasa, bukan useSmartBack (lihat
 * catatan pola ini di hooks/use-smart-back.ts).
 *
 * Email TIDAK bisa diedit di sini karena itu akun belajar.id yang
 * dibuat Admin Sekolah (lihat flow Login yang sudah disepakati) — cuma
 * ditampilkan sebagai info read-only.
 */
export default function EditProfilPage() {
  const router = useRouter();
  const profile = getMockStudentProfile();

  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);
    await saveMockStudentProfile({
      name,
      phone,
      address,
      avatarUrl: avatarFileName ?? undefined,
    });
    setIsSaving(false);
    setIsSaved(true);
  };

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/profil")} title="Edit Profil" />

      <div className="px-5">
        <GlassCard as="section" className="p-5">
          <AvatarUploadDummy onFileSelected={setAvatarFileName} />

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <Input
              id="name"
              label="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              id="email"
              label="Email belajar.id"
              value={profile.email}
              disabled
            />
            <p className="-mt-3 text-caption text-text-secondary">
              Email tidak dapat diubah karena terhubung ke akun belajar.id.
            </p>

            <Input
              id="phone"
              label="No. HP"
              icon={<Phone className="size-5" aria-hidden="true" />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <TextareaField
              id="address"
              label="Alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
            />

            {isSaved && (
              <Alert variant="success">Perubahan profil berhasil disimpan.</Alert>
            )}

            <Button
              type="submit"
              size="lg"
              isLoading={isSaving}
              leftIcon={<Save className="size-4" aria-hidden="true" />}
            >
              Simpan Perubahan
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
