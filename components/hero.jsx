"use client";

import { useState } from "react";
import { submitWaitlist } from "../lib/api";

const inputClass =
  "w-full border-b border-dashed border-black/40 bg-transparent py-2.5 text-center font-mono text-sm text-black placeholder:text-black/40 focus:border-black/40 focus:outline-none";

const WHY_CLIRO_OPTIONS = [
  "Better note-taking",
  "Productivity",
  "Research & learning",
  "Browser organization",
  "Quick capture",
  "Other",
];

const LANGUAGE_OPTIONS = [
  "English",
  "Spanish",
  "French",
  "German",
  "Portuguese",
  "Italian",
  "Dutch",
  "Japanese",
  "Chinese",
];

const MAX_LANGUAGES = 3;

export default function Hero() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "",
    whyCliro: [],
    mainLanguages: [],
  });
  const handleJoinClick = () => {
    if (dropdownOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setDropdownOpen(false);
        setIsClosing(false);
        setStatus("idle");
        setErrorMessage("");
      }, 250);
    } else {
      setDropdownOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleWhyCliro = (option) => {
    setForm((prev) => {
      const next = prev.whyCliro.includes(option)
        ? prev.whyCliro.filter((x) => x !== option)
        : [...prev.whyCliro, option];
      return { ...prev, whyCliro: next };
    });
  };

  const toggleLanguage = (option) => {
    setForm((prev) => {
      if (prev.mainLanguages.includes(option)) {
        return { ...prev, mainLanguages: prev.mainLanguages.filter((x) => x !== option) };
      }
      if (prev.mainLanguages.length >= MAX_LANGUAGES) return prev;
      return { ...prev, mainLanguages: [...prev.mainLanguages, option] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    const { ok, error } = await submitWaitlist({
      email: form.email.trim(),
      name: form.name.trim(),
      whyCliro: form.whyCliro,
      mainLanguages: form.mainLanguages,
    });
    if (ok) {
      setStatus("success");
      setForm({ email: "", name: "", whyCliro: [], mainLanguages: [] });
      setDropdownOpen(false);
    } else {
      setStatus("error");
      setErrorMessage(error || "Something went wrong");
    }
  };

  return (
    <div
      className="relative flex min-h-[85vh] flex-col items-center justify-center bg-[#edece8] px-6"
      style={{
        backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.01) 50px, rgba(0,0,0,0.08) 50px),
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,0.01) 50px, rgba(0,0,0,0.08) 51px)
          `,
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      <div className="max-w-2xl text-center">
        <div className="mx-auto mb-4 flex h-24 w-[120px] items-center justify-center">
          <img
            src="/flowanimation3.gif"
            alt="Cliro"
            className="h-full w-auto object-contain"
          />
        </div>

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
          <button
            type="button"
            onClick={handleJoinClick}
            className="w-full font-mono text-xs font-semibold text-black/80 hover:text-black"
          >
            [join waitlist]
          </button>

          {(dropdownOpen || isClosing) && (
            <div
              className={`mt-4 overflow-hidden rounded border border-dashed border-black/30 bg-black/[0.02] text-left ${
                isClosing ? "animate-dropdown-out" : "animate-dropdown-in"
              }`}
            >
            <form
              onSubmit={handleSubmit}
              className="dropdown-form p-4"
            >
              <label className="mt-1 block font-mono text-xs text-black/60">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <label className="mt-3 block font-mono text-xs text-black/60">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <label className="mt-3 block font-mono text-xs text-black/60">
                Why Cliro? (select all that apply)
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {WHY_CLIRO_OPTIONS.map((opt) => {
                  const selected = form.whyCliro.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleWhyCliro(opt)}
                      className={`option-square relative flex min-h-[3rem] items-center justify-center overflow-hidden rounded-lg border-2 bg-white px-2.5 py-2 text-center font-mono text-[9px] leading-tight transition-colors ${
                        selected
                          ? "border-[#2563eb] text-[#2563eb]"
                          : "border-black/20 text-black/80 hover:border-black/40"
                      }`}
                    >
                      {selected && (
                        <span className="absolute right-1 top-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 6l3 3 5-6" />
                          </svg>
                        </span>
                      )}
                      <span className="w-full break-words pr-5 text-center text-[9px]">{opt}</span>
                    </button>
                  );
                })}
              </div>
              <label className="mt-3 block font-mono text-xs text-black/60">
                Main languages (max {MAX_LANGUAGES})
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {LANGUAGE_OPTIONS.map((opt) => {
                  const selected = form.mainLanguages.includes(opt);
                  const disabled =
                    !selected && form.mainLanguages.length >= MAX_LANGUAGES;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => !disabled && toggleLanguage(opt)}
                      disabled={disabled}
                      className={`option-square relative flex min-h-[3rem] items-center justify-center overflow-hidden rounded-lg border-2 bg-white px-2.5 py-2 text-center font-mono text-[9px] leading-tight transition-colors ${
                        disabled
                          ? "cursor-not-allowed border-black/15 bg-black/[0.02] text-black/40"
                          : selected
                            ? "border-[#2563eb] text-[#2563eb]"
                            : "border-black/20 text-black/80 hover:border-black/40"
                      }`}
                    >
                      {selected && (
                        <span className="absolute right-1 top-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 6l3 3 5-6" />
                          </svg>
                        </span>
                      )}
                      <span className="w-full break-words pr-5 text-center text-[9px]">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {status === "error" && (
                <p className="mt-2 font-mono text-xs text-red-600">
                  {errorMessage}
                </p>
              )}
              {status === "success" && (
                <p className="mt-2 font-mono text-xs text-green-700">
                  You're on the list. We'll be in touch.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-4 w-full font-mono text-xs font-semibold text-black/80 hover:text-black disabled:opacity-50"
              >
                {status === "loading" ? "[sending…]" : "[submit]"}
              </button>
            </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
