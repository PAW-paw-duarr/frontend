export function Footer() {
  return (
    <div className="relative flex h-[379px] flex-col items-center justify-center bg-[url('/footer.png')] bg-cover bg-center text-center">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.58)]"></div>

      <div className="relative z-10">
        <div>{/* search */}</div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Terima kasih sudah menggunakan ReCapstone <br /> untuk mencari Project yang ingin diteruskan💡.
          </h1>
          <div className="mt-4 text-white">
            <p>Jika ada kendala, bug, atau pertanyaan, jangan sungkan untuk hubungi admin ya!</p>
            <p>+62 812-3456-7890 (Admin)</p>
            <p>capstone@dteti.ugm.ac.id (Email)</p>
            <p className="italic">Dikembangkan dengan ❤️ oleh mahasiswa DTETI UGM.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
