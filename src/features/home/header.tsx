
export function Header() {
  return (
    <header className="w-full">
      <img src="/header.webp" alt="headerImage" className="w-full top-0 left-0 right-0 z-10 fixed"/>
      <div className="absolute w-full top-32 left-0 right-0 z-20">
        <div className="py-[245px] flex flex-col items-center space-y-4">
          <h1 className="text-6xl font-bold text-center text-secondary">Capstone Project DTETI</h1>
          <div className="mx-[550px]">
          <p className="text-[24px] font-normal text-secondary w-full text-center">Platform resmi untuk dokumentasi, kolaborasi, dan publikasi proyek akhir mahasiswa DTETI UGM. Wadah integrasi inovasi, teknologi, dan kolaborasi antar mahasiswa menuju solusi nyata bagi masyarakat.</p>
          </div>
        </div>
      </div>
    </header>
  )
}