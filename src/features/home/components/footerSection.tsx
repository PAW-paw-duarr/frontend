export function FooterSection() {
  return (
    <footer className="-[379px] w-full bg-[url('/footer.webp')] bg-cover bg-center bg-no-repeat py-12 md:h-[379px]">
      <div className="text-secondary flex h-full w-full flex-col items-center justify-center gap-5 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-[100px]">
        {/* Main Content */}
        <div className="flex flex-col items-center gap-2 md:gap-1">
          <h1 className="w-full text-center text-xl leading-tight font-extrabold sm:text-2xl md:w-[80%] md:text-3xl lg:w-[70%] lg:text-[32px] xl:w-[55%]">
            Terima kasih sudah menggunakan ReCapstone untuk mencari Project yang ingin diteruskan💡.
          </h1>
          <p className="text-center text-sm font-normal sm:text-base md:text-lg">
            Jika ada kendala, bug, atau pertanyaan, jangan sungkan untuk hubungi admin ya!
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-1 text-sm sm:text-base">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-400 hover:underline"
          >
            +62 812-3456-7890 (Admin)
          </a>
          <a href="mailto:capstone@dteti.ugm.ac.id" className="transition-colors hover:text-blue-400 hover:underline">
            capstone@dteti.ugm.ac.id
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs italic sm:text-sm">Dikembangkan dengan ❤️ oleh mahasiswa DTETI UGM.</div>
      </div>
    </footer>
  );
}
