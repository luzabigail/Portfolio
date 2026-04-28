"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
export default function HeaderImage() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  const imageSrc =
    resolvedTheme === "dark"
      ? "/header-image-night-cambio.png"
      : "/Header-Image.png";

  return (
    <header className="relative flex h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Header image"
          fill
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
            resolvedTheme === "light" ? "opacity-100" : "opacity-0"
          }`}
          priority
        />

        <Image
          src="/header-image-night-cambio.png"
          alt="Header oscuro"
          fill
          sizes="100vw"
          priority
          className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
            resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative z-20 flex flex-col justify-end px-20 py-40">
        <h1 className="[font-family:var(--font-great-vibes)] text-5xl font-bold text-surface md:text-7xl xl:text-8xl">
          Luz Bietti
        </h1>

        <p className=" mt-4 text-base text-white md:text-lg">
          Web UI Developer
        </p>
      </div>

      <section className="sectionAboutMe" />
    </header>
  );
}
