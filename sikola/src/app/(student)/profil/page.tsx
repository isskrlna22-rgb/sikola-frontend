"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCog, KeyRound, HelpCircle, Info, LogOut } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ProfileHeaderCard } from "@/components/shared/profile-header-card";
import { SchoolInfoCard } from "@/components/shared/school-info-card";
import { MenuCard } from "@/components/ui/menu-card";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { getMockStudentProfile } from "@/lib/mock-data/student-dashboard";
import { getMockSchoolInfo } from "@/lib/mock-data/profile";
import { authService } from "@/services/auth-service";

/**
 * Halaman Profil — halaman terakhir area siswa: identitas, data
 * sekolah, pengaturan, dan akun (logout). Data statis (tidak
 * time-dependent), jadi aman dipanggil langsung tanpa pola "netral dulu
 * lalu dikoreksi di useEffect" seperti Dashboard/Jadwal.
 */
export default function ProfilPage() {
  const router = useRouter();
  const profile = getMockStudentProfile();
  const schoolInfo = getMockSchoolInfo();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authService.logout();
    setIsLoggingOut(false);
    setShowLogoutConfirm(false);
    router.push("/login");
  };

  return (
    <div className="animate-page-in flex flex-1 flex-col gap-4 pb-4">
      <PageHeader onBack={() => router.push("/dashboard")} title="Profil" />

      <div className="flex flex-col gap-4 px-5">
        <ProfileHeaderCard profile={profile} />
        <SchoolInfoCard info={schoolInfo} />

        <div>
          <h2 className="mb-2 px-1 font-heading text-body-base font-semibold text-text-primary">
            Pengaturan
          </h2>
          <div className="flex flex-col gap-3">
            <MenuCard
              href="/profil/edit"
              icon={<UserCog className="size-5" aria-hidden="true" />}
              title="Edit Profil"
              description="Perbarui data pribadi kamu"
            />
            <MenuCard
              href="/profil/ubah-password"
              icon={<KeyRound className="size-5" aria-hidden="true" />}
              title="Ubah Password"
              description="Ganti password akun kamu"
            />
            <MenuCard
              href="/profil/bantuan"
              icon={<HelpCircle className="size-5" aria-hidden="true" />}
              title="Pusat Bantuan"
              description="FAQ dan panduan penggunaan aplikasi"
            />
            <MenuCard
              href="/profil/tentang"
              icon={<Info className="size-5" aria-hidden="true" />}
              title="Tentang Aplikasi"
              description="Informasi versi dan pengembang SIKOLA"
            />
          </div>
        </div>

        <div>
          <h2 className="mb-2 px-1 font-heading text-body-base font-semibold text-text-primary">
            Akun
          </h2>
          <Button
            variant="danger"
            leftIcon={<LogOut className="size-4" aria-hidden="true" />}
            onClick={() => setShowLogoutConfirm(true)}
          >
            Keluar
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={showLogoutConfirm}
        title="Keluar dari akun?"
        description="Kamu perlu login kembali menggunakan email belajar.id dan password untuk mengakses SIKOLA."
        confirmLabel="Ya, Keluar"
        variant="danger"
        isLoading={isLoggingOut}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}
