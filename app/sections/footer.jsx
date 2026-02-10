// sections/Footer.jsx
export default function Footer() {
  return (
    <footer className="relative z-20 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <img
            src="/flowanimation3.gif"
            alt="Cliro"
            className="h-12 w-auto opacity-50"
          />

          <div className="flex items-center gap-8">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-black/40 transition-colors hover:text-black"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/cliro.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-black/40 transition-colors hover:text-black"
            >
              Instagram
            </a>
            <a
              href="mailto:clironotes@outlook.com"
              className="font-mono text-xs text-black/40 transition-colors hover:text-black"
            >
              Contact
            </a>
          </div>

          <p className="font-mono text-xs text-black/30">
            © 2026 Cliro
          </p>
        </div>
      </div>
    </footer>
  );
}