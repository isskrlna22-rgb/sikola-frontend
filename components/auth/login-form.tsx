"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Role = "student" | "teacher";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.88-3c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.28a12 12 0 0 0 0 10.8l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.6l4.01 3.1C6.23 6.86 8.88 4.75 12 4.75Z"
      />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M16.36 1.43c0 1.14-.42 2.2-1.16 3.02-.83.9-2.09 1.59-3.16 1.5-.14-1.1.42-2.26 1.15-3.02.82-.89 2.24-1.55 3.17-1.5ZM19.8 17.15c-.5 1.16-.74 1.68-1.39 2.71-.9 1.44-2.17 3.24-3.75 3.25-1.4.02-1.76-.9-3.66-.89-1.9.01-2.3.91-3.7.9-1.58-.02-2.78-1.63-3.68-3.07-2.52-4.02-2.78-8.74-1.23-11.25.05-.08.1-.16.16-.24 1.14-1.62 2.9-2.55 4.55-2.55 1.7 0 2.77 1.02 4.18 1.02 1.36 0 2.19-1.02 4.15-1.02 1.47 0 3.02.8 4.13 2.19-3.63 2-3.04 7.2.24 8.95Z" />
    </svg>
  );
}

function RoleToggle({
  value,
  onChange,
}: {
  value: Role;
  onChange: (role: Role) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">I am a</span>
      <div className="flex flex-1 gap-2">
        <button
          type="button"
          onClick={() => onChange("student")}
          className={cn(
            "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            value === "student"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          Student
        </button>
        <button
          type="button"
          onClick={() => onChange("teacher")}
          className={cn(
            "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            value === "teacher"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          Teacher
        </button>
      </div>
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();

  const [role, setRole] = React.useState<Role>("student");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert(data.message);

    if (data.role === "admin") {
      router.push("/dashboard");
    }
  } catch (error) {
    console.error(error);
    alert("Tidak dapat terhubung ke server.");
  }
}

  return (
    <div className="w-full rounded-[2rem] bg-card p-6 shadow-xl">
      <div className="mb-4 flex flex-col items-center">
        <Image
          src="/image/mascot1.png"
          alt="Maskot penguin SIKOLA"
          width={100}
          height={120}
          priority
        />
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <RoleToggle value={role} onChange={setRole} />

        <div className="space-y-3">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="rounded-full pl-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="rounded-full pl-11 pr-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={
                showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full rounded-full">
          Login
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          or continue with
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="rounded-full">
            <GoogleIcon />
            Google
          </Button>
          <Button type="button" variant="outline" className="rounded-full">
            <AppleIcon />
            Apple
          </Button>
        </div>

<p
  onClick={() => {
    const pesan = `Hallo Admin,Saya belum memiliki akun belajar.id untuk login ke aplikasi  SIKOLA.

Nama: 
Kelas: 

Mohon bantu dibuatkan akun saya.
Terima kasih.`;

    window.open(
      `https://wa.me/6281546422640?text=${encodeURIComponent(pesan)}`,
      "_blank"
    );
  }}
  className="cursor-pointer text-blue-600 hover:underline"
>
  Don't have an account? Hubungi Admin Sekolah
</p>
      </form>
    </div>
  );
}