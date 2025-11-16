export function Header() {
  return (
    <header className="relative h-[650px] w-full bg-[url('/header.webp')] bg-cover bg-center bg-no-repeat">
      {/* Content - Centered */}
      <div className="absolute inset-0 top-[158px] z-20 flex items-center justify-center md:top-[120px]">
        <div className="max-w-5xl px-8 text-center md:gap-6">
          <h1 className="text-[28px] font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            Capstone Project DTETI
          </h1>
          <p className="text-sm leading-relaxed font-normal text-white drop-shadow-md md:text-lg lg:text-xl">
            Platform resmi untuk dokumentasi, kolaborasi, dan publikasi proyek akhir mahasiswa DTETI UGM. Wadah
            integrasi inovasi, teknologi, dan kolaborasi antar mahasiswa menuju solusi nyata bagi masyarakat.
          </p>
        </div>
      </div>
    </header>
  );
}
