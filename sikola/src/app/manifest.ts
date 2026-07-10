import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SIKOLA",
    short_name: "SIKOLA",
    description: "Sistem Informasi Kehadiran & Layanan Akademik",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F9FC",
    theme_color: "#5B3DF5",

    icons: [
      {
        src: "/images/logo/sikola-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}