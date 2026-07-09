import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { MascotPose } from "@/components/shared/mascot-illustration";
import { MascotIllustration } from "@/components/shared/mascot-illustration";
import { IconLabel } from "@/components/ui/icon-label";
import { PageDots } from "@/components/ui/page-dots";

export interface OnboardingFeature {
  icon: ReactNode;
  label: string;
}

export interface OnboardingSlideProps {
  heading: string;
  subtitle: string;
  mascotPose: MascotPose;
  mascotAlt: string;
  features: OnboardingFeature[];
  totalSlides: number;
  activeIndex: number;
  onSkip: () => void;
  onNext: () => void;
}

/**
 * Template tampilan satu slide Onboarding. Onboarding 1 & 2 memakai
 * komponen yang SAMA ini dengan props (heading/subtitle/mascot/features)
 * berbeda — jadi menambah Onboarding 3 nanti (kalau ada) tinggal menambah
 * satu object data di page.tsx, bukan bikin file baru.
 */
export function OnboardingSlide({
  heading,
  subtitle,
  mascotPose,
  mascotAlt,
  features,
  totalSlides,
  activeIndex,
  onSkip,
  onNext,
}: OnboardingSlideProps) {
  return (
    <div className="flex flex-1 flex-col bg-background px-6">
      <div className="flex justify-end pt-6">
        <button
          type="button"
          onClick={onSkip}
          className="
              rounded-full
              bg-white/80
              backdrop-blur-md
              border
              border-white/40
              px-4
              py-2
              text-body-sm
              font-semibold
              text-text-primary
              shadow-sm

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:shadow-lg

              active:scale-95
              "
        >
          Skip
        </button>
      </div>

      <div className="flex flex-col items-center pt-6 text-center">
        <h1 className="font-heading text-h2 font-bold text-primary-dark">
          {heading}
        </h1>
        <p className="mt-2 text-body-base text-text-secondary">{subtitle}</p>
      </div>

      <div className="flex flex-1 items-center justify-center py-4">
        <MascotIllustration pose={mascotPose} alt={mascotAlt} className="w-100" />
      </div>

      <div className="flex items-center justify-center gap-6 pb-8">
        {features.map((feature) => (
          <IconLabel key={feature.label} icon={feature.icon} label={feature.label} />
        ))}
      </div>

      <div className="flex items-center justify-between pb-10">
        <PageDots count={totalSlides} activeIndex={activeIndex} />
        <button
          type="button"
          onClick={onNext}
          aria-label="Lanjut"
          className="
            flex
            size-14
            items-center
            justify-center

            rounded-full

            bg-white/80
            backdrop-blur-md
            border
            border-white/40

            text-primary

            shadow-md

            transition-all
            duration-200

            hover:bg-primary-light
            hover:scale-105
            hover:shadow-lg

            active:scale-95
            "
        >
          <ArrowRight
            className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}
