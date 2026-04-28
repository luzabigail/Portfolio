export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground" />
        <p className="text-xl [font-family:var(--font-great-vibes)]">Cargando...</p>
      </div>
    </div>
  );
}
