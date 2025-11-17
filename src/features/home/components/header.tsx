export function Header() {
  return (
    <header className="relative h-[650px] w-full bg-[url('/header.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 top-[158px] z-20 flex items-center justify-center md:top-[120px]">
        <div className="max-w-5xl px-8 text-center md:gap-6">
          <h1 className="text-[28px] font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            Capstone Project DTETI
          </h1>
          <p className="text-sm leading-relaxed font-normal text-white drop-shadow-md md:text-lg lg:text-xl">
            The official platform for documentation, collaboration, and publication of final projects by DTETI UGM students. 
            A hub for integrating innovation, technology, and collaboration among students towards real solutions for society.
          </p>
        </div>
      </div>
    </header>
  );
}
