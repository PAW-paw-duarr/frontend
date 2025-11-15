export function Header() {
  return (
    <header className="relative h-[650px] w-full bg-[url('/header.webp')] bg-cover bg-center bg-no-repeat">
      {/* Content - Centered */}
      <div className="absolute inset-0 top-[120px] z-20 flex items-center justify-center">
        <div className="max-w-5xl space-y-6 px-8 text-center">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">Capstone Project DTETI</h1>
          <p className="text-xl leading-relaxed font-normal text-white drop-shadow-md">
            Platform resmi untuk dokumentasi, kolaborasi, dan publikasi proyek akhir mahasiswa DTETI UGM. Wadah
            integrasi inovasi, teknologi, dan kolaborasi antar mahasiswa menuju solusi nyata bagi masyarakat.
          </p>
        </div>
      </div>
    </header>
  );
}
