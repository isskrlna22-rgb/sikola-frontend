"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, BookOpen, CalendarDays, QrCode, ShieldCheck } from "lucide-react";
import { OnboardingSlide, type OnboardingFeature } from "@/components/shared/onboarding-slide";
import type { MascotPose } from "@/components/shared/mascot-illustration";

interface SlideData {
  heading: string;
  subtitle: string;
  mascotPose: MascotPose;
  mascotAlt: string;
  features: OnboardingFeature[];
}

const ICON_CLASS = "size-5";

const SLIDES: SlideData[] = [
  {
    heading: "Smart Attendace",
    subtitle: "Mark attendace in seconds with QR technology.",
    mascotPose: "qr-checkin",
    mascotAlt: "Maskot SIKO memindai QR Code untuk absensi",
    features: [
      { icon: <QrCode className={ICON_CLASS} />, label: "QR Check-in Fast & Secure" },
      { icon: <BarChart3 className={ICON_CLASS} />, label: "Real-time Tracking" },
      { icon: <ShieldCheck className={ICON_CLASS} />, label: "Accurate & Reliable" },
    ],
  },
  {
    heading: "Academic Hub",
    subtitle: "All your academic activities in one piece.",
    mascotPose: "academic-hub",
    mascotAlt: "Maskot SIKO memegang buku dan piala prestasi",
    features: [
      { icon: <BookOpen className={ICON_CLASS} />, label: "Assigments & Exams" },
      { icon: <BarChart3 className={ICON_CLASS} />, label: "Performance Analytics" },
      { icon: <CalendarDays className={ICON_CLASS} />, label: "Timetable & Schedules" },
    ],
  },
];

/**
 * Route "/onboarding" — carousel 2 slide dalam SATU halaman (bukan 2 URL
 * terpisah), sesuai pola umum onboarding mobile: Skip selalu ke Login,
 * Next di slide terakhir juga ke Login, Next di slide sebelumnya pindah
 * slide berikutnya secara lokal (tanpa reload halaman).
 */
export default function OnboardingPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const goToLogin = () => router.push("/login");

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      setActiveIndex((i) => i + 1);
    } else {
      goToLogin();
    }
  };

  const slide = SLIDES[activeIndex];

  return (
    <OnboardingSlide
      key={activeIndex}
      heading={slide.heading}
      subtitle={slide.subtitle}
      mascotPose={slide.mascotPose}
      mascotAlt={slide.mascotAlt}
      features={slide.features}
      totalSlides={SLIDES.length}
      activeIndex={activeIndex}
      onSkip={goToLogin}
      onNext={handleNext}
    />
  );
}
