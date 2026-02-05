"use client";

import {
    Check,
    Mail,
    User,
    Loader2
} from "lucide-react";
import {
    COLORS,
    OPACITY,
    TYPOGRAPHY,
    inputClass,
    WHY_CLIRO_ICONS,
    LANGUAGE_FLAGS,
    WHY_CLIRO_OPTIONS,
    LANGUAGE_OPTIONS,
    MAX_LANGUAGES
} from "./constants";

export default function WaitlistForm({
    dropdownOpen,
    isClosing,
    status,
    errorMessage,
    form,
    onJoinClick,
    onChange,
    onToggleWhyCliro,
    onToggleLanguage,
    onSubmit
}) {
    return (
        <div className="relative">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-semibold mb-4"
                        style={{
                            fontFamily: TYPOGRAPHY.fontSans,
                            color: COLORS.dark,
                        }}>
                        Join the Waitlist
                    </h3>
                    <p className="text-lg"
                        style={{
                            color: OPACITY.dark30,
                            fontFamily: TYPOGRAPHY.fontSans,
                        }}>
                        Be among the first to experience Cliro's revolutionary approach to note-taking.
                    </p>
                </div>

                {/* Waitlist Button */}
                <button
                    type="button"
                    onClick={onJoinClick}
                    className="w-full max-w-md mx-auto font-mono text-lg font-medium py-4 rounded-xl mb-8 transition-all duration-300 hover:scale-105 hover:shadow-xl block"
                    style={{
                        color: COLORS.dark,
                        border: `3px dashed ${OPACITY.dark20}`,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    [join waitlist]
                </button>

                {/* Waitlist Form */}
                {(dropdownOpen || isClosing) && (
                    <div className="mt-8 w-full max-w-2xl mx-auto">
                        <div
                            className={`overflow-hidden rounded-2xl border-3 border-dashed backdrop-blur-lg transition-all duration-500 ${isClosing ? "animate-dropdown-out" : "animate-dropdown-in"
                                }`}
                            style={{
                                borderColor: OPACITY.dark20,
                                backgroundColor: `rgba(255, 255, 255, 0.95)`,
                                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <form
                                onSubmit={onSubmit}
                                className="p-8"
                            >
                                <h2
                                    className="text-2xl font-semibold mb-8 text-center"
                                    style={{
                                        color: COLORS.dark,
                                        fontFamily: TYPOGRAPHY.fontSans,
                                    }}
                                >
                                    Join the waitlist
                                </h2>

                                <div className="space-y-6">
                                    {/* Email field */}
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <Mail size={18} style={{ color: OPACITY.dark30 }} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your email address"
                                            value={form.email}
                                            onChange={onChange}
                                            required
                                            className={`${inputClass} pl-12`}
                                            style={{
                                                color: COLORS.dark,
                                                borderColor: OPACITY.dark20,
                                                fontFamily: TYPOGRAPHY.fontSans,
                                            }}
                                        />
                                    </div>

                                    {/* Name field */}
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <User size={18} style={{ color: OPACITY.dark30 }} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={onChange}
                                            required
                                            className={`${inputClass} pl-12`}
                                            style={{
                                                color: COLORS.dark,
                                                borderColor: OPACITY.dark20,
                                                fontFamily: TYPOGRAPHY.fontSans,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Why Cliro Section */}
                                <div className="mt-8">
                                    <label
                                        className="block text-sm font-medium mb-4 text-left"
                                        style={{
                                            color: OPACITY.dark30,
                                            fontFamily: TYPOGRAPHY.fontSans,
                                        }}
                                    >
                                        Why Cliro? (select all that apply)
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {WHY_CLIRO_OPTIONS.map((opt) => {
                                            const selected = form.whyCliro.includes(opt);
                                            const Icon = WHY_CLIRO_ICONS[opt];
                                            return (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => onToggleWhyCliro(opt)}
                                                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${selected
                                                        ? 'border-opacity-100 scale-95'
                                                        : 'border-opacity-20 hover:border-opacity-40 hover:bg-white/50'
                                                        }`}
                                                    style={{
                                                        borderColor: selected ? COLORS.dark : OPACITY.dark20,
                                                        borderWidth: '2px',
                                                        borderStyle: selected ? 'solid' : 'dashed',
                                                        backgroundColor: selected ? 'rgba(13, 9, 6, 0.05)' : 'transparent',
                                                        fontFamily: TYPOGRAPHY.fontSans,
                                                    }}
                                                >
                                                    {selected && (
                                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                                                            style={{ backgroundColor: COLORS.dark }}>
                                                            <Check size={12} color="white" />
                                                        </div>
                                                    )}
                                                    <Icon size={20} style={{ color: selected ? COLORS.dark : OPACITY.dark30, marginBottom: '8px' }} />
                                                    <span className="text-xs text-center leading-tight font-medium"
                                                        style={{ color: selected ? COLORS.dark : OPACITY.dark40 }}>
                                                        {opt}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Languages Section */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <label
                                            className="block text-sm font-medium text-left"
                                            style={{
                                                color: OPACITY.dark30,
                                                fontFamily: TYPOGRAPHY.fontSans,
                                            }}
                                        >
                                            Main languages
                                        </label>
                                        <span className="text-xs"
                                            style={{
                                                color: OPACITY.dark30,
                                                fontFamily: TYPOGRAPHY.fontSans,
                                            }}>
                                            {form.mainLanguages.length}/{MAX_LANGUAGES} selected
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {LANGUAGE_OPTIONS.map((opt) => {
                                            const selected = form.mainLanguages.includes(opt);
                                            const disabled = !selected && form.mainLanguages.length >= MAX_LANGUAGES;
                                            return (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => !disabled && onToggleLanguage(opt)}
                                                    disabled={disabled}
                                                    className={`relative flex items-center p-3 rounded-xl border transition-all duration-200 ${selected
                                                        ? 'border-opacity-100 scale-95'
                                                        : disabled
                                                            ? 'opacity-40 cursor-not-allowed'
                                                            : 'border-opacity-20 hover:border-opacity-40 hover:bg-white/50'
                                                        }`}
                                                    style={{
                                                        borderColor: selected ? COLORS.dark : OPACITY.dark20,
                                                        borderWidth: '2px',
                                                        borderStyle: selected ? 'solid' : 'dashed',
                                                        backgroundColor: selected ? 'rgba(13, 9, 6, 0.05)' : 'transparent',
                                                        fontFamily: TYPOGRAPHY.fontSans,
                                                    }}
                                                >
                                                    {selected && (
                                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                                                            style={{ backgroundColor: COLORS.dark }}>
                                                            <Check size={12} color="white" />
                                                        </div>
                                                    )}
                                                    <span className="text-xl mr-3">{LANGUAGE_FLAGS[opt]}</span>
                                                    <span className="text-sm font-medium"
                                                        style={{ color: selected ? COLORS.dark : disabled ? OPACITY.dark20 : OPACITY.dark40 }}>
                                                        {opt}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Status Messages */}
                                {status === "error" && (
                                    <div className="mt-6 p-4 rounded-xl text-center"
                                        style={{
                                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                            border: '2px dashed rgba(239, 68, 68, 0.3)',
                                        }}>
                                        <p
                                            className="text-sm font-medium"
                                            style={{
                                                color: COLORS.statusAttention,
                                                fontFamily: TYPOGRAPHY.fontSans,
                                            }}
                                        >
                                            {errorMessage}
                                        </p>
                                    </div>
                                )}
                                {status === "success" && (
                                    <div className="mt-6 p-4 rounded-xl text-center"
                                        style={{
                                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                            border: '2px dashed rgba(16, 185, 129, 0.3)',
                                        }}>
                                        <p
                                            className="text-sm font-medium"
                                            style={{
                                                color: COLORS.statusGood,
                                                fontFamily: TYPOGRAPHY.fontSans,
                                            }}
                                        >
                                            You're on the list. We'll be in touch.
                                        </p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="mt-8 w-full font-mono text-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl"
                                    style={{
                                        color: COLORS.dark,
                                        border: `3px dashed ${OPACITY.dark20}`,
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    }}
                                >
                                    {status === "loading" ? (
                                        <span className="flex items-center justify-center">
                                            <Loader2 size={20} className="animate-spin mr-3" />
                                            sending…
                                        </span>
                                    ) : (
                                        "[submit]"
                                    )}
                                </button>

                                {/* Close form button */}
                                <button
                                    type="button"
                                    onClick={onJoinClick}
                                    className="mt-6 w-full font-mono text-sm font-medium opacity-60 hover:opacity-100 transition-all duration-200"
                                    style={{
                                        color: OPACITY.dark30,
                                    }}
                                >
                                    [close form]
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}