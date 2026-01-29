import Image from "next/image";

export default function Hero(){ 
    return (
    <div 
        className="relative flex min-h-[85vh] flex-col items-center justify-center bg-[#edece8] px-6"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.01) 50px, rgba(0,0,0,0.08) 51px),
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,0.01) 50px, rgba(0,0,0,0.08) 51px)
          `,
        }}
      >
        <div 
          className="pointer-events-none fixed inset-0 z-10"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)',
          }}
        />
        
        <div className="max-w-2xl text-center">
          <Image
            src="/logo.png"
            alt="Cliro"
            width={120}
            height={60}
            className="mx-auto mb-4 h-24 w-auto"
          />

          <h1 className="font-semibold text-black/80">
            <span className="block text-2xl tracking-tight sm:text-4xl md:text-6xl">
              Cliro, your best
            </span>
            <span className="mt-2 block whitespace-nowrap text-2xl tracking-tight sm:text-4xl md:text-6xl">
              note Chrome extension
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-md font-mono text-sm leading-relaxed text-black/60">
            Cliro enhances your browsing experience with intelligent assistance.
          </p>
          

          <div className="mx-auto mt-10 max-w-xs">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border-b border-dashed border-black/40 bg-transparent py-3 text-center font-mono text-sm text-black placeholder:text-black/40 focus:border-black/40 focus:outline-none"
            />
            <button className="mt-6 w-full font-mono text-xs font-semibold text-black/80 hover:text-black">
              [join waitlist]
            </button>
          </div>
        </div>
        
      </div>
    );
}