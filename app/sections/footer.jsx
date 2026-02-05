export default function Footer() {
return (
  <> 
    <footer 
    className="relative z-20 bg-[#edece8] px-6 py-12"
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

    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <img
          src="/flowanimation3.gif"
          alt="Cliro"
          className="h-12 w-auto opacity-50"
        />

        <div className="flex items-center gap-8">
          <a href="#" className="font-mono text-xs text-black/40 transition-colors hover:text-black">
            Twitter
          </a>
          <a href="#" className="font-mono text-xs text-black/40 transition-colors hover:text-black">
            Instagram
          </a>
          <a href="mailto:hello@cliro.app" className="font-mono text-xs text-black/40 transition-colors hover:text-black">
            Contact
          </a>
        </div>

        <p className="font-mono text-xs text-black/30">
          © 2026 Cliro
        </p>
      </div>
    </div>
  </footer>
  </>
);
}