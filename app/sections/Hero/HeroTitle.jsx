"use client";

import { useState, useRef, useEffect } from "react";
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
    const [description, setDescription] = useState(
        "The intelligent note-taking extension that transforms how you capture and organize information. Cliro seamlessly integrates with your browser to make research, learning, and productivity effortless."
    );
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState("");
    const [tempForm, setTempForm] = useState({
        email: "",
        name: "",
        whyCliro: [], // Will store interest_reason ID
        mainLanguages: [], // Will store language codes
    });
    const [backendConfig, setBackendConfig] = useState(null);
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);

    const editableRef = useRef(null);
    const emailInputRef = useRef(null);
    const lastHtmlRef = useRef("");
    const videoRef = useRef(null);

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

    // Initialize video to play in loop
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => {
                console.log('Video autoplay failed:', e);
            });
        }
    }, []);

    // Handle click outside to save
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isEditing && editableRef.current && !editableRef.current.contains(e.target)) {
                setIsEditing(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditing]);

    // Set cursor position when editing starts
    useEffect(() => {
        if (isEditing && editableRef.current) {
            lastHtmlRef.current = editableRef.current.innerHTML;
            editableRef.current.focus();

            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(editableRef.current);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }, [isEditing]);

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleClick = (e) => {
        if (!isEditing) {
            setIsEditing(true);
        }
    };

    const handleInput = (e) => {
        setDescription(e.currentTarget.textContent);
        lastHtmlRef.current = e.currentTarget.innerHTML;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.execCommand('insertLineBreak');
            return;
        }

        if (e.key === 'Escape') {
            if (editableRef.current) {
                editableRef.current.innerHTML = lastHtmlRef.current;
            }
            setIsEditing(false);
            e.preventDefault();
        }
    };

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

    return (
        <section className="relative flex items-center justify-center px-4 md:py-12">
            <div className="relative z-10 text-center max-w-3xl">


                {/* Video Section - Added between description and email form */}
                <div className="relative max-w-[225px] mx-auto overflow-hidden rounded-xl">
                    <video
                        ref={videoRef}
                        src="/cliro-presentation.mp4"
                        className="w-full h-auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        disableRemotePlayback
                        style={{
                            pointerEvents: 'none', // Disable user interaction
                            userSelect: 'none', // Prevent selection
                        }}
                        onContextMenu={(e) => e.preventDefault()} // Disable right-click
                    >
                        Your browser does not support the video tag.
                    </video>
                    {/* Overlay to prevent any interaction */}
                    <div
                        className="absolute inset-0 pointer-events-auto cursor-default"
                        onClick={(e) => e.preventDefault()}
                        onDoubleClick={(e) => e.preventDefault()}
                    />
                </div>

                {/* Title - Made bold/semi-bold */}
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

                {/* Editable Description */}
                <div className="relative max-w-2xl mx-auto mb-8">
                    <div
                        ref={editableRef}
                        className="text-base md:text-lg leading-relaxed p-3 rounded transition-all duration-200 cursor-text select-text outline-none"
                        style={{
                            color: OPACITY.dark40,
                            fontFamily: TYPOGRAPHY.fontSans,
                            lineHeight: '1.7',
                            minHeight: '90px',
                            ...(isEditing && {
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderBottom: `1px dashed ${OPACITY.dark20}`,
                            }),
                        }}
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onClick={handleClick}
                        onDoubleClick={handleDoubleClick}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        onBlur={() => setIsEditing(false)}
                        dangerouslySetInnerHTML={{ __html: description }}
                    />

                    {/* Edit hint */}
                    {!isEditing && (
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <span className="text-xs font-mono"
                                style={{ color: OPACITY.dark30 }}>
                                Click to edit
                            </span>
                        </div>
                    )}
                </div>

                {/* Conditional rendering: Email form OR Waitlist form */}
                {!dropdownOpen ? (
                    <>
                        {/* Email Form */}
                        <div className="max-w-md mx-auto mb-6">
                            <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    ref={emailInputRef}
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