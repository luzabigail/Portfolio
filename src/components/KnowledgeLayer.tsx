"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const books = [
  {
    id: 1,
    src: "/libro-uno.png",
    width: "6%",
    left: "15%",
    top: "42%",
    rounded: "rounded-xl",
    delay: 0,
  },
  {
    id: 2,
    src: "/libro-dos.png",
    width: "15%",
    left: "17%",
    top: "39%",
    rounded: "rounded-sm",
    delay: 0.08,
  },
  {
    id: 3,
    src: "/libro-tres.png",
    width: "5%",
    left: "28%",
    top: "27%",
    rounded: "rounded-md",
    delay: 0.16,
  },
  {
    id: 4,
    src: "/libro-cuatro.png",
    width: "15%",
    left: "30.5%",
    top: "39%",
    rounded: "rounded-xl",
    delay: 0.24,
  },
  {
    id: 5,
    src: "/libro-cinco.png",
    width: "9%",
    left: "41%",
    top: "33%",
    rounded: "rounded-xl",
    delay: 0.32,
  },
  {
    id: 6,
    src: "/libro-seis.png",
    width: "9%",
    left: "45.4%",
    top: "33%",
    rounded: "rounded-xl",
    delay: 0.4,
  },
  {
    id: 7,
    src: "/libro-siete.png",
    width: "9%",
    left: "52.1%",
    top: "32.5%",
    rounded: "rounded-md",
    delay: 0.48,
  },
  {
    id: 8,
    src: "/libro-ocho.png",
    width: "6%",
    left: "61.1%",
    top: "39%",
    rounded: "rounded-md",
    delay: 0.56,
  },
  {
    id: 9,
    src: "/libro-nueve.png",
    width: "6%",
    left: "67%",
    top: "46.9%",
    rounded: "rounded-xl",
    delay: 0.64,
  },
];

export default function Knowledge() {
  return (
    <>
      <div className="mt-20">
        <h1 className="text-center text-7xl [font-family:var(--font-great-vibes)]">
          Tecnologías
        </h1>
        <section
          id="tecnologias"
          className="flex justify-center -mt-10 xl:-mt-40"
        >
          <div className="relative w-full max-w-275">
            <Image
              src="/estanteria-vacia.png"
              alt="Estantería"
              width={1100}
              height={700}
              className="block w-full h-auto"
              priority
            />

            {books.map((book) => (
              <motion.div
                key={book.id}
                className={`absolute ${book.rounded} transition-all duration-300 ease-out hover:-translate-y-4 hover:shadow-xl`}
                style={{
                  left: book.left,
                  top: book.top,
                  width: book.width,
                }}
                initial={{ y: -200, opacity: 0, rotate: -15, scale: 0.9 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{
                  delay: book.delay,
                  duration: 3.0,
                  type: "spring",
                  stiffness: 180,
                  damping: 11,
                }}
              >
                <Image
                  src={book.src}
                  alt="Libro"
                  width={180}
                  height={400}
                  className={`w-full h-auto ${book.rounded}`}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
