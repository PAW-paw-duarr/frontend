export function FooterSection() {
  return (
    <footer className="h-[379px] w-full bg-[url('/footer.webp')] bg-cover bg-center bg-no-repeat">
      <div className="text-secondary flex h-full w-full flex-col items-center justify-center gap-5 px-[100px]">
        <div className="flex flex-col items-center gap-1">
          <h1 className="w-[55%] text-center text-[32px] leading-none font-extrabold">
            Terima kasih sudah menggunakan ReCapstone untuk mencari Project yang ingin diteruskan💡.
          </h1>
          <p className="font-weight-[400] text-center text-[18px]">
            Jika ada kendala, bug, atau pertanyaan, jangan sungkan untuk hubungi admin ya!
          </p>
        </div>
        <div className="flex flex-col items-center">
          <a href="wa.me/6281234567890" className="hover:underline">
            +62 812-3456-7890 (Admin)
          </a>
          <a href="mailto:capstone@dteti.ugm.ac.id" className="hover:underline">
            capstone@dteti.ugm.ac.id (Email)
          </a>
        </div>
        <div className="text-center text-sm italic">Dikembangkan dengan ❤️ oleh mahasiswa DTETI UGM.</div>
      </div>
    </footer>
  );
}
