/**
 * Layout untuk seluruh halaman auth (Splash, Onboarding, Login, Forgot
 * Password, OTP, New Password).
 *
 * Pendekatan responsive yang dipakai di sini — dan akan dipakai ulang di
 * layout (student) & (teacher) nanti — adalah "adaptive frame":
 *  - Mobile (<768px): halaman mengisi penuh viewport, persis desain Figma.
 *  - Desktop (>=768px): konten yang sama ditampilkan di dalam kartu selebar
 *    ~430px (lebar setara mobile) yang center di layar, dengan sudut
 *    membulat + shadow, mengambang di atas background netral.
 *
 * Ini BUKAN membuat layout desktop baru — ini "desktop mengikuti mobile
 * secara responsive" seperti yang diminta: satu markup, satu breakpoint
 * tambahan, tanpa duplikasi komponen per device.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 justify-center md:bg-border/50 md:py-10">
      <div className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden md:my-auto md:min-h-[860px] md:max-w-[430px] md:rounded-[2.5rem] md:shadow-2xl">
        {children}
      </div>
    </div>
  );
}
