export function Header() {
  return (
    <div className="relative flex h-[468px] flex-col items-center justify-center bg-[url('/header.png')] bg-cover bg-center text-center">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.58)]"></div>

      <div className="relative z-10">
        <div>{/* search */}</div>
        <div>
          <h1 className="text-5xl font-[1000] text-white">Capstone Project DTETI</h1>
          <div className="mt-4 text-white">
            <p>Platform resmi untuk dokumentasi, kolaborasi, dan publikasi proyek akhir mahasiswa DTETI UGM.</p>
            <p>
              Wadah integrasi inovasi, teknologi, dan kolaborasi antar mahasiswa menuju solusi nyata bagi masyarakat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
