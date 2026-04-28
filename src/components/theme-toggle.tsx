"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  const imageSrc = isDark ? "/interruptor-noche.png" : "/interruptor-dia.png";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-full h-20 cursor-pointer"
      aria-label="Cambiar tema"
    >
      <Image
        src={imageSrc}
        alt="Cambiar tema"
        fill
        sizes="80px"
        className="object-contain"
        priority
      />
    </button>
  );
}
