import Image from "next/image";

export default function Features() {
    return (
    <div className="relative z-20 bg-[#0a0a0a] px-6 py-44">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-5xl font-semibold text-[#edece8]">
            Your time is precious.
          </p> <p className="text-5xl font-semibold text-[#edece8]">
          Cliro knows.
                    </p>
          
          <p className="mx-auto mt-8 max-w-md font-mono text-sm leading-relaxed  text-[#edece8]/80">
            Summarize pages, extract insights, and interact with content — all
            without leaving your browser.
          </p>

          <div className="mt-16 flex justify-center">
            <Image
              src="/cliro-menu.png"
              alt="Cliro menu"
              width={400}
              height={300}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
      );
}