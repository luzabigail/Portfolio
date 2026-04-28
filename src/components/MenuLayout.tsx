import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Menu() {
  return (
    <>
      <div className="fixed z-40 left-216">
        <div className=" flex justify-end items-end">
          <div className=" border-solid border-t border-0 border-surface relative z-50 my-10 p-5 text-xl text-surface">
            <Link href="/projects">
              <span className="p-10">Projects</span>
            </Link>
            <Link href="/contact">
              <span className="p-10">Contact</span>
            </Link>
            <span className="p-10">Experience</span>
            <ThemeToggle></ThemeToggle>
          </div>
        </div>
      </div>
    </>
  );
}
