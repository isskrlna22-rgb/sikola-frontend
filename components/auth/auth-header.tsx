interface AuthHeaderProps {
  align?: "left" | "center";
}

export function AuthHeader({
  align = "left",
}: AuthHeaderProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h1 className="text-3xl font-bold text-blue-600">SIKOLA</h1>

      <h2 className="mt-6 text-2xl font-bold">
        Verifikasi OTP
      </h2>

      <p className="mt-2 text-gray-500">
        Masukkan kode OTP yang telah dikirim ke email Anda.
      </p>
    </div>
  );
}