import { TeacherDashboardHeader } from "@/components/shared/teacher-dashboard-header";
import { TeacherStatsCard } from "@/components/shared/teacher-stats-card";
import { TeacherClassesSummaryCard } from "@/components/shared/teacher-classes-summary-card";
import { CreateQrCta } from "@/components/shared/create-qr-cta";
import { TeacherScheduleSection } from "@/components/shared/teacher-schedule-section";
import { AnnouncementsSection } from "@/components/shared/announcements-section";
import { TeacherQuickActions } from "@/components/shared/teacher-quick-actions";
import {
  getMockTeacherProfile,
  getMockTeacherDashboardStats,
  getMockTeacherClasses,
  getMockTeacherTodaySchedule,
} from "@/lib/mock-data/teacher-dashboard";
import { getMockAnnouncements } from "@/lib/mock-data/student-dashboard";

/**
 * Dashboard Guru — halaman utama setelah login sebagai guru.
 *
 * Sengaja reuse getMockAnnouncements() dari modul SISWA untuk bagian
 * "Pengumuman Sekolah" — data pengumuman memang satu sumber yang sama
 * lintas role (bukan hal yang berbeda per siswa/guru), jadi ini bukan
 * pelanggaran "tipe & mock data guru terpisah" (yang dimaksud adalah
 * data KHUSUS guru seperti profil/kelas/jadwal mengajar).
 *
 * Server Component biasa (bukan "use client") — sama pola dengan
 * Dashboard Siswa: bagian yang butuh state client (sapaan waktu di
 * TeacherDashboardHeader, active-state BottomNav) sudah "use client" di
 * komponennya masing-masing.
 */
export default function TeacherDashboardPage() {
  const profile = getMockTeacherProfile();
  const stats = getMockTeacherDashboardStats();
  const classes = getMockTeacherClasses();
  const schedule = getMockTeacherTodaySchedule();
  const announcements = getMockAnnouncements();

  return (
    <div className="animate-page-in pb-4">
      <TeacherDashboardHeader
        profile={profile}
        unreadNotificationCount={stats.pendingPermissions}
      />
      <TeacherStatsCard stats={stats} />
      <TeacherClassesSummaryCard classes={classes} />
      <CreateQrCta />
      <TeacherScheduleSection schedule={schedule} />
      <AnnouncementsSection
        announcements={announcements}
        viewAllHref="/guru/pengumuman"
      />
      <TeacherQuickActions />
    </div>
  );
}
