export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 backdrop-blur-xs">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="text-sm font-semibold text-black">
          cliro
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/80">
          Coming Soon
        </div>
      </div>
    </header>
  );
}