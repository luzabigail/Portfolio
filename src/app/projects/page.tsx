"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectsLayer() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  const imageSrc =
    resolvedTheme === "dark"
      ? "/backgroundProjectNight.png"
      : "/backgroundProjectDay.png";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        key={imageSrc}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
      >
        <Image
          src={imageSrc}
          alt="Fondo de proyectos"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10 px-0 sm:px-0 md:p-20 lg:px-10 py-20">
        <div className="absolute -top-20 left-0 w-full h-[140px] sm:h-[180px] border-b-[5px] border-[#341409] rounded-[50%]" />

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 -gap-50 gap-30 place-items-center">
            <Link
              target="_blank"
              href="https://github.com/SoYuDev/ecommerce-analytics-storefront/tree/develop"
              className="w-full max-w-sm"
            >
              <motion.div
                animate={{
                  rotateY: [0, 10, -10, 0],
                  rotateX: [0, 4, -4, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative top-5 w-full ml-0 lg:ml-20 rounded-xl bg-background shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              >
                <div className="absolute -top-15 left-1/2 w-[60px] -translate-x-1/2 sm:w-[70px] z-10">
                  <Image
                    src="/broche.png"
                    alt=""
                    width={70}
                    height={70}
                    className="w-full h-auto"
                  />
                </div>

                <Image
                  src="/background-commerce.png"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                  alt="Proyecto E-Commerce"
                />

                <div className="text-center px-4 py-5 sm:px-6">
                  <h1 className="text-2xl sm:text-3xl pb-4 [font-family:var(--font-great-vibes)]">
                    E-Commerce
                  </h1>

                  <p className="text-sm sm:text-base">
                    Proyecto en conjunto donde se simula una tienda online de
                    productos con sus respectivas funcionalidades como añadir al
                    carrito, filtros, login, etc.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-3 pb-4">
                    <span className="p-2 border rounded-2xl">React</span>
                    <span className="p-2 border rounded-2xl">Next.js</span>
                    <span className="p-2 border rounded-2xl">Typescript</span>
                    <span className="p-2 border rounded-2xl">
                      TanStack Query
                    </span>
                    <span className="p-2 border rounded-2xl">Zustand</span>
                    <span className="p-2 border rounded-2xl">HTML</span>
                    <span className="p-2 border rounded-2xl">CSS</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            <Link href="#" className="w-full max-w-sm">
              <motion.div
                animate={{
                  rotateY: [0, 8, -8, 0],
                  rotateX: [0, 4, -4, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative -top-5 w-full ml-0 lg:-ml-20 rounded-xl bg-background shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              >
                <div className="absolute -top-15 left-1/2 w-[60px] -translate-x-1/2 sm:w-[70px] z-10">
                  <Image
                    src="/broche.png"
                    alt=""
                    width={70}
                    height={70}
                    className="w-full h-auto"
                  />
                </div>

                <Image
                  src="/imagen-tfg.png"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                  alt="Proyecto Film To Read"
                />

                <div className="text-center px-4 py-5 sm:px-6">
                  <h1 className="text-2xl sm:text-3xl pb-4 [font-family:var(--font-great-vibes)]">
                    Film To Read
                  </h1>

                  <p className="text-sm sm:text-base">
                    Página web de recomendación de libros según películas
                    similares. Incluye reseñas, autenticación de usuarios y
                    guardados.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-3 pb-4">
                    <span className="p-2 border rounded-2xl">PHP</span>
                    <span className="p-2 border rounded-2xl">MySQL</span>
                    <span className="p-2 border rounded-2xl">Javascript</span>
                    <span className="p-2 border rounded-2xl">HTML</span>
                    <span className="p-2 border rounded-2xl">CSS</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
