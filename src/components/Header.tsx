export default function Header() {
  return (
    // 1. El header ahora es relative. Todo lo que esté dentro en absolute se guiará por este contenedor.
    <header
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      role="banner"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/poster-banner.webp"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/Video-medusa.mp4" type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 z-20 flex flex-col justify-end py-60 px-40">
        <h1 className="text-8xl font-bold text-[#f8ceb7] drop-shadow-lg">
          Luz Bietti
        </h1>
        <p className="text-white pt-5 text-xl font-medium">Web UI Developer</p>
      </div>
      <section className="sectionAboutMe"></section>
    </header>
  );
}
