"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const links = [
  { name: "Proyectos", href: "/projects" },
  { name: "Contacto", href: "#contacto" },
  { name: "Tecnologías", href: "#tecnologias" },
];

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    onResize();
    onScroll();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const compact = isMobile || isScrolled;

  return (
    <motion.header
      initial={false}
      animate={{
        width: compact ? 72 : 650,
        paddingLeft: compact ? 12 : 32,
        paddingRight: compact ? 12 : 90,
        paddingTop: compact ? 12 : 20,
        paddingBottom: compact ? 12 : 20,
        borderRadius: compact ? 9999 : 0,
        y: compact ? 12 : 0,
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed right-2 top-4 z-[80] flex translate-x-2 items-center justify-end border-t border-t-surface"
    >
      <AnimatePresence mode="wait">
        {!compact ? (
          <motion.nav
            key="full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex w-full items-center justify-end gap-5 text-surface"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-medium transition hover:opacity-75"
              >
                {link.name}
              </Link>
            ))}

            <ThemeToggle></ThemeToggle>
          </motion.nav>
        ) : (
          <motion.div
            key="compact"
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-[#16143a]"
              aria-label="Abrir menú"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {compact && isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 10 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.22 }}
            className="absolute right-0 top-full mt-3 min-w-55 mx-8 rounded-2xl border border-[#e7b667] bg-foreground/50 p-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-3 text-[#000000]">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-5 py-5 text-lg transition hover:bg-white/10"
                >
                  {link.name}
                </Link>
              ))}

              <ThemeToggle></ThemeToggle>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
