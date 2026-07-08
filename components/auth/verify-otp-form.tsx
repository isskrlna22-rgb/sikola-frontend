"use client";

import * as React from "react";
import { Check, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 59;

export function VerifyOtpForm() {
  const [otp, setOtp] = React.useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = React.useState(RESEND_SECONDS);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  function handleChange(index: number, value: string) {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handleResend() {
    setSecondsLeft(RESEND_SECONDS);
    // TODO: hubungkan ke Laravel REST API untuk mengirim ulang kode OTP.
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: hubungkan ke Laravel REST API untuk verifikasi kode OTP.
  }

  const formattedTime = "00:" + secondsLeft.toString().padStart(2, "0");

  return (
    <div className="w-full rounded-[2rem] bg-card p-6 shadow-xl">
      {/* Ilustrasi amplop + kode OTP */}
      <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Mail className="h-9 w-9" />
        </div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">
          123456
        </div>
        <div className="absolute -right-1 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
          <Check className="h-4 w-4" />
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1 text-center">
          <h1 className="text-lg font-bold text-foreground">
            Masukan Kode Verifikasi
          </h1>
          <p className="text-sm text-muted-foreground">
            Kami telah mengirimkan kode ke email anda **@gmail.com
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-11 rounded-xl border border-input bg-background text-center text-lg font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {secondsLeft > 0 ? (
            <span>
              Kirim ulang kode dalam{" "}
              <span className="font-semibold text-foreground">
                {formattedTime}
              </span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-primary hover:underline"
            >
              Kirim ulang kode
            </button>
          )}
        </p>

        <Button type="submit" size="lg" className="w-full rounded-full">
          Verifikasi
        </Button>
      </form>
    </div>
  );
}