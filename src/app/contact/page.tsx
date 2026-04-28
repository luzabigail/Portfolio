"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactLayer() {
  return (
    <section className="flex justify-center items-center">
      <div className="relative w-full max-w-xl mx-4 -mt-40 lg:-mt-80 lg:-mb-30 md:-mb-30 md:-mt-70 sm:-mt-70 sm:-mb-40 group">
        <Image
          src="/carta-abierta.png"
          alt="Parte trasera del sobre"
          width={900}
          height={600}
          priority
          className="relative z-10 w-full h-auto pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
        />

        <div
          id="contacto"
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="bg-[#d8c3a4] rounded-2xl relative top-10 w-[60%] h-[25%] md:h-[20%] md:w-[50%] lg:h-[20%] sm:h-[20%] flex flex-col justify-center transition-transform duration-500 ease-out group-hover:-translate-y-16 sm:group-hover:-translate-y-20 shadow-xl group-hover:shadow-xl">
            <h1 className="text-center text-4xl sm:text-5xl text-white [font-family:var(--font-great-vibes)]">
              Contacto
            </h1>

            <div className="flex justify-center items-center gap-4 sm:gap-6">
              <Link href="mailto:tu-email@gmail.com">
                <Image
                  src="/gmail.png"
                  width={45}
                  height={45}
                  alt="correo"
                  className="cursor-pointer hover:scale-110 transition-transform"
                />
              </Link>

              <Link href="https://www.linkedin.com/">
                <Image
                  src="/linkedin.png"
                  width={45}
                  height={45}
                  alt="linkedin"
                  className="cursor-pointer hover:scale-110 transition-transform"
                />
              </Link>

              <Link href="https://github.com/luzabigail">
                <Image
                  src="/github.png"
                  width={45}
                  height={45}
                  alt="github"
                  className="cursor-pointer hover:scale-110 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>

        <Image
          src="/sobre-delantero.png"
          alt="Parte delantera del sobre"
          width={900}
          height={600}
          className="absolute z-30 left-5 top-7 sm:left-6 inset-0 w-[91.5%] h-full pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
        />
      </div>
    </section>
  );
}
