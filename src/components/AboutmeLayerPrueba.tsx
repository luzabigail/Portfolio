"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { motion, Transition } from "framer-motion";

export default function AboutMe() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [isZooming, setIsZooming] = useState(false);

  const handleClick = () => {
    if (isZooming) return;

    setIsZooming(true);

    setTimeout(() => {
      router.push("/projects");
    }, 700);
  };

  if (!resolvedTheme) return null;

  const fromLeft = {
    hidden: { opacity: 0, x: -120 },
    visible: { opacity: 1, x: 0 },
  };

  const fromRight = {
    hidden: { opacity: 0, x: 120 },
    visible: { opacity: 1, x: 0 },
  };

  const fromBottom = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  };

  const transition: Transition = {
    duration: 1.5,
    ease: "easeOut",
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background px-2 py-0 md:px-4">
      <div className="mx-auto flex min-h-[50vh] max-w-400 items-center">
        <div
          // Cambio aquí: Reducimos las columnas en 'md' y pasamos las columnas grandes a 'lg'
          className={`grid w-full grid-cols-1 items-center gap-2 transition-all duration-500 md:grid-cols-[180px_1fr_180px] lg:grid-cols-[280px_1fr_280px] ${
            isZooming ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
            className="flex justify-start"
          >
            {/* Cambio aquí: Reducimos la farola en 'md' y pasamos el tamaño grande a 'lg' */}
            <div className="relative h-[260px] w-[180px] sm:h-[320px] sm:w-[220px] md:h-[360px] md:w-[180px] lg:h-[460px] lg:w-[320px]">
              <Image
                src="/farola-apagada.png"
                alt="Farola clara izquierda"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 180px, 320px"
                priority
                className={`object-contain object-left transition-opacity duration-500 ${
                  resolvedTheme === "light" ? "opacity-100" : "opacity-0"
                }`}
              />
              <Image
                src="/farola.png"
                alt="Farola oscura izquierda"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 180px, 320px"
                priority
                className={`object-contain object-left transition-opacity duration-500 ${
                  resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </motion.div>

          <motion.div
            variants={fromBottom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
            className="flex flex-col items-center text-center px-2"
          >
            <div className="flex items-center">
              <div className="mx-3 h-[10px] w-[50px] border-b border-foreground sm:w-[80px] md:w-[100px]"></div>
              <h1 className="text-4xl font-bold sm:text-5xl md:text-7xl [font-family:var(--font-great-vibes)]">
                Acerca de mí
              </h1>
              <div className="mx-3 h-[10px] w-[50px] border-b border-foreground sm:w-[80px] md:w-[100px]"></div>
            </div>

            <p className="mt-4 max-w-2xl text-sm text-foreground/80 sm:text-base md:text-lg [font-family:var(--font-josefin)]">
              Soy Desarrolladora Web. Mi mayor motivacion es que una página
              pueda ser totalmente equilibrada, única y por sobre todo
              funcional. Tambien me encanta diseñar desarrollar mas a fondo mi
              creatividad.
            </p>

            <div className="mt-8 w-full max-w-[420px] border-t"></div>
          </motion.div>

          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
            className="flex justify-end"
          >
            {/* Cambio aquí: Reducimos la farola en 'md' y pasamos el tamaño grande a 'lg' */}
            <div className="relative h-[260px] w-[180px] sm:h-[320px] sm:w-[220px] md:h-[360px] md:w-[180px] lg:h-[460px] lg:w-[320px]">
              <Image
                src="/farola-flip-apagada.png"
                alt="Farola clara derecha"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 180px, 320px"
                priority
                className={`object-contain object-right transition-opacity duration-500 ${
                  resolvedTheme === "light" ? "opacity-100" : "opacity-0"
                }`}
              />
              <Image
                src="/farola-flip.png"
                alt="Farola oscura derecha"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 180px, 320px"
                priority
                className={`object-contain object-right transition-opacity duration-500 ${
                  resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto mt-[-20px] h-[340px] w-full max-w-[1800px] sm:h-[420px] md:mt-[-40px] md:h-[620px]">
        <div className="relative -top-30 left-0 w-75 z-20 lg:left-65">
          <Image
            src="/enter-projects.png"
            alt="Entrar a proyectos"
            width={200}
            height={120}
            className="h-auto w-full object-contain"
          />
        </div>

        <motion.div
          variants={fromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...transition, delay: 0.1 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
        >
          <button
            type="button"
            onClick={handleClick}
            className="pointer-events-auto relative cursor-pointer bg-transparent"
          >
            <div
              className={`relative max-w-[1000px] p-15 rounded-t-full border p-4 will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isZooming ? "scale-[3.2]" : "scale-100"
              }`}
            >
              <Image
                src="/About-me-window.png"
                alt="Daylight window"
                width={1400}
                height={1100}
                className={`rounded-t-full h-auto w-full transition-opacity duration-500 ${
                  resolvedTheme === "light" ? "opacity-100" : "opacity-0"
                }`}
              />
              <Image
                src="/Aboutme-Night.png"
                alt="Window Night"
                fill
                sizes="(max-width: 768px) 100vw, 1000px"
                className={`p-20 rounded-t-full object-contain transition-opacity duration-500 ${
                  resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </button>
        </motion.div>

        <motion.div
          variants={fromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={transition}
          className="absolute bottom-0 left-[-8%] z-20 sm:left-[-2%] md:left-[2%]"
        >
          {/* Cambio aquí: Reducimos la maceta a 350px en 'md' y pasamos los 520px a 'lg' */}
          <div className="relative h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[520px] lg:w-[520px]">
            <Image
              src="/maceta.png"
              alt="Maceta día"
              fill
              sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 520px"
              className={`object-contain transition-opacity duration-500 ${
                resolvedTheme === "light" ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src="/maceta-noche.png"
              alt="Maceta noche"
              fill
              sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 520px"
              className={`object-contain transition-opacity duration-500 ${
                resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={transition}
          className="absolute bottom-0 right-[-8%] z-20 sm:right-[-2%] md:right-[2%]"
        >
          {/* Cambio aquí: Reducimos la maceta a 350px en 'md' y pasamos los 520px a 'lg' */}
          <div className="relative h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[520px] lg:w-[520px]">
            <Image
              src="/maceta.png"
              alt="Maceta día"
              fill
              sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 520px"
              className={`object-contain transition-opacity duration-500 ${
                resolvedTheme === "light" ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src="/maceta-noche.png"
              alt="Maceta noche"
              fill
              sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 520px"
              className={`object-contain transition-opacity duration-500 ${
                resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </motion.div>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-black transition-opacity duration-700 ${
          isZooming ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
