"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme-provider";

export default function ThemedImage() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  const imageSrc =
    resolvedTheme === "dark"
      ? "/Header-Image-Nightmode.png"
      : "/HeaderImage.png";

  return (
    <Image
      src={imageSrc}
      alt="Header"
      fill
      sizes="100vw"
      className="object-cover"
      priority
    />
  );
}
