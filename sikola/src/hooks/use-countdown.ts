"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Hitung mundur detik generik. Dipakai di OTP Verification untuk "Kirim
 * ulang kode dalam 00:59", tapi ditulis generik supaya bisa dipakai ulang
 * di fitur lain yang butuh countdown (mis. sesi absensi, expiry token).
 */
export function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const reset = useCallback((seconds: number = initialSeconds) => {
    setSecondsLeft(seconds);
  }, [initialSeconds]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const label = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return { secondsLeft, label, isExpired: secondsLeft <= 0, reset };
}
