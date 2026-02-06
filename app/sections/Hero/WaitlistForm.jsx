import {
    Check,
    Mail,
    User,
    Loader2,
    X,
    AlertCircle,
    Clock,
    FileText,
    BookOpen,
    Video,
    GraduationCap,
    Briefcase,
    Accessibility,
    HelpCircle
} from "lucide-react";
import {
    COLORS,
    OPACITY,
    TYPOGRAPHY,
    MAX_LANGUAGES
} from "./constants";

// Icon mapping for interest reasons
const INTEREST_ICONS = {
    productivity: Clock,
    writing: FileText,
    learning: BookOpen,
    content: Video,
    students: GraduationCap,
    business: Briefcase,
    accessibility: Accessibility,
    other: HelpCircle
};

// Fallback icon
const DEFAULT_ICON = HelpCircle;

export default function WaitlistForm({
    dropdownOpen = true,
    isClosing,
    status,
    errorMessage,
    form,
    onJoinClick,
    onChange,
    onToggleWhyCliro,
    onToggleLanguage,
    onSubmit,
    interestReasons = [],
    supportedLanguages = []
}) {
    // Prevent form submission on Enter key in input fields
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    // Handle "Why Cliro?" selection - single select only
    const handleWhyCliroClick = (reasonId) => {
        if (form.whyCliro.includes(reasonId)) {
            // If already selected, deselect it
            onToggleWhyCliro(reasonId);
        } else {
            // If not selected, select only this one (remove others)
            if (form.whyCliro.length > 0) {
                // Remove the existing selection
                onToggleWhyCliro(form.whyCliro[0]);
            }
            // Add the new selection
            onToggleWhyCliro(reasonId);
        }
    };

    // Get icon for interest reason
    const getInterestIcon = (reasonId) => {
        const Icon = INTEREST_ICONS[reasonId] || DEFAULT_ICON;
        return Icon;
    };

    // Get display name for interest reason
    const getInterestDisplayName = (reason) => {
        return reason.label || reason.name || reason.id || reason;
    };

    // Get display name for language
    const getLanguageDisplayName = (language) => {
        return language.name || language.code || language;
    };

    // Get flag for language
    const getLanguageFlag = (language) => {
        return language.flag || '🌐';
    };

    return (
        <div className="w-full">
            <div className="w-full">
                <div
                    className={`overflow-hidden rounded-xl border-2 border-dashed backdrop-blur-sm transition-all duration-300 ${isClosing ? "animate-dropdown-out" : "animate-dropdown-in"
                        }`}
                    style={{
                        borderColor: OPACITY.dark20,
                        backgroundColor: `rgba(255, 255, 255, 0.9)`,
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <form
                        onSubmit={onSubmit}
                        className="p-6"
                    >
                        {/* Form header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2
                                className="text-xl font-semibold"
                                style={{
                                    color: COLORS.dark,
                                    fontFamily: TYPOGRAPHY.fontSans,
                                }}
                            >
                                Complete your profile
                            </h2>
                            <button
                                type="button"
                                onClick={onJoinClick}
                                className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                                style={{
                                    color: OPACITY.dark30,
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Email & Name fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="relative">
                                <label
                                    className="block text-xs font-medium mb-1.5"
                                    style={{
                                        color: OPACITY.dark40,
                                        fontFamily: TYPOGRAPHY.fontSans,
                                    }}
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <Mail size={16} style={{ color: OPACITY.dark30 }} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={onChange}
                                        onKeyDown={handleKeyDown}
                                        required
                                        className="w-full bg-transparent py-3 pl-10 pr-4 text-sm rounded-lg border border-dashed outline-none transition-all placeholder:opacity-50"
                                        style={{
                                            color: COLORS.dark,
                                            borderColor: OPACITY.dark20,
                                            fontFamily: TYPOGRAPHY.fontSans,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label
                                    className="block text-xs font-medium mb-1.5"
                                    style={{
                                        color: OPACITY.dark40,
                                        fontFamily: TYPOGRAPHY.fontSans,
                                    }}
                                >
                                    Name
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <User size={16} style={{ color: OPACITY.dark30 }} />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={onChange}
                                        onKeyDown={handleKeyDown}
                                        required
                                        className="w-full bg-transparent py-3 pl-10 pr-4 text-sm rounded-lg border border-dashed outline-none transition-all placeholder:opacity-50"
                                        style={{
                                            color: COLORS.dark,
                                            borderColor: OPACITY.dark20,
                                            fontFamily: TYPOGRAPHY.fontSans,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Why Cliro Section */}
                        <div className="mb-6">
                            <label
                                className="block text-xs font-medium mb-3"
                                style={{
                                    color: OPACITY.dark40,
                                    fontFamily: TYPOGRAPHY.fontSans,
                                }}
                            >
                                Why Cliro? (select one)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {interestReasons.map((reason) => {
                                    const reasonId = reason.id || reason;
                                    const selected = form.whyCliro.includes(reasonId);
                                    const Icon = getInterestIcon(reasonId);

                                    return (
                                        <button
                                            key={reasonId}
                                            type="button"
                                            onClick={() => handleWhyCliroClick(reasonId)}
                                            className={`relative flex flex-col items-center justify-center p-2.5 rounded-lg border transition-all duration-150 ${selected
                                                ? 'border-opacity-100'
                                                : 'border-opacity-20 hover:border-opacity-40 hover:bg-white/30'
                                                }`}
                                            style={{
                                                borderColor: selected ? COLORS.dark : OPACITY.dark20,
                                                borderWidth: '1.5px',
                                                borderStyle: selected ? 'solid' : 'dashed',
                                                backgroundColor: selected ? 'rgba(13, 9, 6, 0.03)' : 'transparent',
                                                fontFamily: TYPOGRAPHY.fontSans,
                                            }}
                                        >
                                            {selected && (
                                                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: COLORS.dark }}>
                                                    <Check size={10} color="white" />
                                                </div>
                                            )}
                                            <Icon size={16} style={{ color: selected ? COLORS.dark : OPACITY.dark30, marginBottom: '6px' }} />
                                            <span className="text-xs text-center leading-tight"
                                                style={{ color: selected ? COLORS.dark : OPACITY.dark40 }}>
                                                {getInterestDisplayName(reason)}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Languages Section */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <label
                                    className="block text-xs font-medium"
                                    style={{
                                        color: OPACITY.dark40,
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
                                    {form.mainLanguages.length}/{MAX_LANGUAGES}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {supportedLanguages.map((language) => {
                                    const languageCode = language.code || language;
                                    const selected = form.mainLanguages.includes(languageCode);

                                    return (
                                        <button
                                            key={languageCode}
                                            type="button"
                                            onClick={() => onToggleLanguage(languageCode)}
                                            className={`relative flex items-center p-2.5 rounded-lg border transition-all duration-150 ${selected
                                                ? 'border-opacity-100'
                                                : 'border-opacity-20 hover:border-opacity-40 hover:bg-white/30'
                                                }`}
                                            style={{
                                                borderColor: selected ? COLORS.dark : OPACITY.dark20,
                                                borderWidth: '1.5px',
                                                borderStyle: selected ? 'solid' : 'dashed',
                                                backgroundColor: selected ? 'rgba(13, 9, 6, 0.03)' : 'transparent',
                                                fontFamily: TYPOGRAPHY.fontSans,
                                            }}
                                        >
                                            {selected && (
                                                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: COLORS.dark }}>
                                                    <Check size={10} color="white" />
                                                </div>
                                            )}
                                            <span className="text-lg mr-2">{getLanguageFlag(language)}</span>
                                            <span className="text-xs"
                                                style={{ color: selected ? COLORS.dark : OPACITY.dark40 }}>
                                                {getLanguageDisplayName(language)}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Error Message */}
                        {errorMessage && status !== "success" && (
                            <div className="mb-4 p-3 rounded-lg text-center flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                    border: '1px dashed rgba(239, 68, 68, 0.2)',
                                }}>
                                <AlertCircle size={14} style={{ color: COLORS.statusAttention }} />
                                <p
                                    className="text-xs font-medium"
                                    style={{
                                        color: COLORS.statusAttention,
                                        fontFamily: TYPOGRAPHY.fontSans,
                                    }}
                                >
                                    {errorMessage}
                                </p>
                            </div>
                        )}

                        {/* Success Message */}
                        {status === "success" && (
                            <div className="mb-4 p-3 rounded-lg text-center flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                                    border: '1px dashed rgba(16, 185, 129, 0.2)',
                                }}>
                                <Check size={14} style={{ color: COLORS.statusGood }} />
                                <p
                                    className="text-xs font-medium"
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
                            className="w-full py-3 text-sm font-mono rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                color: COLORS.dark,
                                border: `1.5px dashed ${OPACITY.dark20}`,
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            }}
                        >
                            {status === "loading" ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 size={16} className="animate-spin mr-2" />
                                    sending…
                                </span>
                            ) : (
                                "[submit]"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}