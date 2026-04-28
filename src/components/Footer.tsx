import Image from "next/image";

export default function FooterLayout() {
  return (
    <>
      <div className="flex justify-center border-solid mx-10 border-t border-surface2 xl:mx-40">
        <div className="flex justify-center items-center z-50 p-5 text-xl text-surface2">
          <span>Made by Luz Abigail Bietti | ©2026 </span>
          <div className="flex">
            <Image
              src="/logo.png"
              alt="Parte trasera del sobre"
              width={70}
              height={70}
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
