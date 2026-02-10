"use client";

import { useState, useEffect } from "react";
import { COLORS, OPACITY, TYPOGRAPHY } from "./constants";
import WaitlistForm from "./WaitlistForm";
import { getPublicConfig } from "../../utils/api";

export default function HeroTitle({
    onShowFullForm,
    dropdownOpen,
    isClosing,
    status,
    errorMessage,
    form,
    onJoinClick,
    // These props are not used directly but are passed down to WaitlistForm
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onToggleWhyCliro,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onToggleLanguage,
    onSubmit
}) {
    const [email, setEmail] = useState("");
    const [tempForm, setTempForm] = useState({
        email: "",
        name: "",
        whyCliro: [], // Will store interest_reason ID
        mainLanguages: [], // Will store language codes
    });
    const [backendConfig, setBackendConfig] = useState(null);
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isLive: false
    });

    // Target date: February 13, 2026 at 2:00 PM CST (Central Standard Time)
    const targetDate = new Date('2026-02-13T14:00:00-06:00');

    // Static description
    const description = "The intelligent note-taking extension that transforms how you capture and organize information. Cliro seamlessly integrates with your browser to make research, learning, and productivity effortless.";

    // Fetch backend config on component mount
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const config = await getPublicConfig();
                setBackendConfig(config);
            } catch (error) {
                console.error('Error loading config:', error);
            } finally {
                setIsLoadingConfig(false);
            }
        };

        fetchConfig();
    }, []);

    // Countdown timer
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setCountdown({
                    days,
                    hours,
                    minutes,
                    seconds,
                    isLive: false
                });
            } else {
                // Countdown has ended - show "Live Now!"
                setCountdown({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isLive: true
                });
            }
        };

        // Calculate immediately
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleJoinWaitlist = (e) => {
        e.preventDefault();
        // Set the email in the temp form if entered
        if (email.trim()) {
            setTempForm(prev => ({ ...prev, email }));
        }
        // Call parent callback to show full form
        if (onShowFullForm) {
            onShowFullForm(email.trim() ? email : "");
        }
        // Also trigger the join click to open dropdown
        if (onJoinClick) {
            onJoinClick();
        }
    };

    const handleEmailKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleJoinWaitlist(e);
        }
    };

    // Handle form changes within HeroTitle
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setTempForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle "Why Cliro?" toggle for tempForm
    const handleToggleWhyCliro = (optionId) => {
        setTempForm(prev => {
            // For single selection: if option already selected, remove it
            if (prev.whyCliro.includes(optionId)) {
                return { ...prev, whyCliro: [] };
            }
            // Otherwise, replace with new selection
            else {
                return { ...prev, whyCliro: [optionId] };
            }
        });
    };

    // Handle language toggle for tempForm with FIFO replacement
    const handleToggleLanguage = (languageCode) => {
        setTempForm(prev => {
            const currentLanguages = [...prev.mainLanguages];

            if (currentLanguages.includes(languageCode)) {
                // Remove if already selected
                return {
                    ...prev,
                    mainLanguages: currentLanguages.filter(lang => lang !== languageCode)
                };
            } else if (currentLanguages.length < 3) {
                // Add if less than 3 selected
                return {
                    ...prev,
                    mainLanguages: [...currentLanguages, languageCode]
                };
            } else {
                // If already at max, remove the oldest (first) and add the new one
                const newLanguages = [...currentLanguages.slice(1), languageCode];
                return {
                    ...prev,
                    mainLanguages: newLanguages
                };
            }
        });
    };

    // Handle form submit - just pass to parent
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Merge temp form with parent form
        const mergedForm = { ...form, ...tempForm };

        // Validate form and show error messages
        if (!mergedForm.email || !mergedForm.email.includes('@')) {
            if (onSubmit) {
                onSubmit(e, mergedForm, "Please enter a valid email address", "error");
            }
            return;
        }

        if (!mergedForm.name || mergedForm.name.trim().length < 2) {
            if (onSubmit) {
                onSubmit(e, mergedForm, "Please enter your name", "error");
            }
            return;
        }

        if (mergedForm.whyCliro.length === 0) {
            if (onSubmit) {
                onSubmit(e, mergedForm, "Please select why you're interested in Cliro", "error");
            }
            return;
        }

        if (mergedForm.mainLanguages.length === 0) {
            if (onSubmit) {
                onSubmit(e, mergedForm, "Please select at least one language", "error");
            }
            return;
        }

        // Call parent onSubmit if validation passes
        if (onSubmit) {
            onSubmit(e, mergedForm, "", "loading");
        }
    };

    // Format the target date for display
    const formattedDate = targetDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const formattedTime = targetDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    return (
        <section className="relative flex items-center justify-center px-4 md:py-12">
            <div className="relative z-10 text-center max-w-3xl">
                {/* Video Section */}
                <div className="relative max-w-[225px] mx-auto overflow-hidden rounded-xl mb-8">
                    <video
                        src="/cliroHorizontal.mp4"
                        className="w-full h-auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        disableRemotePlayback
                        style={{
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div
                        className="absolute inset-0 pointer-events-auto cursor-default"
                        onClick={(e) => e.preventDefault()}
                        onDoubleClick={(e) => e.preventDefault()}
                    />
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-semibold mb-3 tracking-tight"
                    style={{
                        fontFamily: TYPOGRAPHY.fontSans,
                        color: COLORS.dark,
                        letterSpacing: '-0.02em',
                    }}>
                    Cliro, your best
                    <br />
                    note Chrome extension
                </h1>

                {/* Countdown Timer */}
                <div className="max-w-md mx-auto pt-8 pb-6">
                    {!countdown.isLive ? (
                        <div className="flex justify-center items-center gap-2 md:gap-4">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold font-mono"
                                    style={{ color: COLORS.dark }}>
                                    {countdown.days.toString().padStart(2, '0')}
                                </div>
                                <div className="text-xs font-mono mt-1"
                                    style={{ color: OPACITY.dark40 }}>
                                    DAYS
                                </div>
                            </div>

                            <div className="text-xl font-mono"
                                style={{ color: OPACITY.dark30 }}>
                                :
                            </div>

                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold font-mono"
                                    style={{ color: COLORS.dark }}>
                                    {countdown.hours.toString().padStart(2, '0')}
                                </div>
                                <div className="text-xs font-mono mt-1"
                                    style={{ color: OPACITY.dark40 }}>
                                    HOURS
                                </div>
                            </div>

                            <div className="text-xl font-mono"
                                style={{ color: OPACITY.dark30 }}>
                                :
                            </div>

                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold font-mono"
                                    style={{ color: COLORS.dark }}>
                                    {countdown.minutes.toString().padStart(2, '0')}
                                </div>
                                <div className="text-xs font-mono mt-1"
                                    style={{ color: OPACITY.dark40 }}>
                                    MINUTES
                                </div>
                            </div>

                            <div className="text-xl font-mono"
                                style={{ color: OPACITY.dark30 }}>
                                :
                            </div>

                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold font-mono"
                                    style={{ color: COLORS.dark }}>
                                    {countdown.seconds.toString().padStart(2, '0')}
                                </div>
                                <div className="text-xs font-mono mt-1"
                                    style={{ color: OPACITY.dark40 }}>
                                    SECONDS
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-4 px-6 rounded-lg"
                            style={{
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                border: `1px dashed rgba(16, 185, 129, 0.3)`,
                            }}>
                            <div className="text-sm font-mono"
                                style={{ color: OPACITY.dark40 }}>
                                Cliro is now available. Join the waitlist for early access!
                            </div>
                        </div>
                    )}
                </div>

                {/* Static Description */}
                <div className="relative max-w-2xl mx-auto mb-8">
                    <p className="text-base md:text-lg leading-relaxed p-3"
                        style={{
                            color: OPACITY.dark40,
                            fontFamily: TYPOGRAPHY.fontSans,
                            lineHeight: '1.7',
                        }}>
                        {description}
                    </p>
                </div>

                {/* Conditional rendering: Email form OR Waitlist form */}
                {!dropdownOpen ? (
                    <>
                        {/* Email Form */}
                        <div className="max-w-md mx-auto mb-6">
                            <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleEmailKeyDown}
                                    className="flex-1 h-11 px-4 text-sm rounded-lg outline-none transition-all"
                                    style={{
                                        border: `1px dashed ${OPACITY.dark20}`,
                                        color: COLORS.dark,
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        transition: 'all 200ms ease',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = OPACITY.dark30;
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = OPACITY.dark20;
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="h-11 px-6 text-sm rounded-lg transition-all font-mono hover:scale-105"
                                    style={{
                                        backgroundColor: COLORS.dark,
                                        color: COLORS.light,
                                        transition: 'all 200ms ease',
                                    }}
                                >
                                    [join waitlist]
                                </button>
                            </form>
                        </div>

                        {/* Helper text */}
                        <p className="text-xs font-mono mb-0"
                            style={{ color: OPACITY.dark30 }}>
                            Join 2,500+ early adopters on the waitlist
                        </p>
                    </>
                ) : (
                    /* Waitlist Form - Show when dropdown is open */
                    <div className="max-w-2xl mx-auto">
                        {isLoadingConfig ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                <p className="text-sm text-gray-500 mt-2">Loading form...</p>
                            </div>
                        ) : backendConfig ? (
                            <WaitlistForm
                                dropdownOpen={dropdownOpen}
                                isClosing={isClosing}
                                status={status}
                                errorMessage={errorMessage}
                                form={{ ...form, ...tempForm }}
                                onJoinClick={onJoinClick}
                                onChange={handleFormChange}
                                onToggleWhyCliro={handleToggleWhyCliro}
                                onToggleLanguage={handleToggleLanguage}
                                onSubmit={handleFormSubmit}
                                // Pass backend config to WaitlistForm
                                interestReasons={backendConfig.interest_reasons || []}
                                supportedLanguages={backendConfig.supported_languages || []}
                            />
                        ) : (
                            <div className="text-center py-8 text-red-500">
                                Failed to load form. Please refresh the page.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}