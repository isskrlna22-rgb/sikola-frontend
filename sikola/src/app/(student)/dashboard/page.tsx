import { DashboardHeader } from "@/components/shared/dashboard-header";
import { AttendanceTodayCard } from "@/components/shared/attendance-today-card";
import { MonthlyAttendanceStatsCard } from "@/components/shared/monthly-attendance-stats-card";
import { QuickActionsSection } from "@/components/shared/quick-actions-section";
import { TodayScheduleSection } from "@/components/shared/today-schedule-section";
import { AnnouncementsSection } from "@/components/shared/announcements-section";
import {
  getMockStudentProfile,
  getMockTodayAttendance,
  getMockMonthlyAttendanceStats,
  getMockTodaySchedule,
  getMockAnnouncements,
} from "@/lib/mock-data/student-dashboard";

/**
 * Dashboard Siswa — halaman utama setelah login.
 *
 * Data masih dummy (lihat lib/mock-data/student-dashboard.ts). Server
 * Component biasa (bukan "use client") karena tidak ada interaktivitas di
 * level halaman ini sendiri — semua bagian yang butuh state client
 * (greeting berbasis waktu di DashboardHeader, active-state di BottomNav)
 * sudah jadi "use client" masing-masing di komponennya sendiri. Ini
 * sengaja dipertahankan granular (bukan seluruh halaman "use client")
 * supaya bagian statis tetap bisa di-render di server.
 *
 * Nanti kalau data sudah dari API asli, cukup ganti pemanggilan
 * getMock*() di sini jadi pemanggilan service (mis. dijadikan
 * `async function DashboardPage()` yang await service call) — struktur
 * JSX di bawah tidak perlu berubah sama sekali.
 */
export default function DashboardPage() {
  const profile = getMockStudentProfile();
  const todayAttendance = getMockTodayAttendance();
  const monthlyStats = getMockMonthlyAttendanceStats();
  const todaySchedule = getMockTodaySchedule();
  const announcements = getMockAnnouncements();

  return (
    <div className="pb-4">
      <DashboardHeader profile={profile} unreadNotificationCount={3} />
      <AttendanceTodayCard attendance={todayAttendance} />
      <MonthlyAttendanceStatsCard stats={monthlyStats} />
      <QuickActionsSection />
      <TodayScheduleSection schedule={todaySchedule} />
      <AnnouncementsSection announcements={announcements} />
    </div>
  );
}
