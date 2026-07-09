import type { Metadata } from "next";
// Self-hosted via @fontsource instead of next/font/google: identical result
// (fonts are bundled as static files, zero runtime requests to Google) but
// the files are fetched once from npm at install time instead of from
// fonts.googleapis.com at build time — more reliable in restricted/offline
// build environments (CI runners, school lab networks, etc.).
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIKOLA - Smart School",
  description:
    "Sistem Informasi Kehadiran & Layanan Akademik — absensi QR Code dan layanan akademik sekolah dalam satu platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
