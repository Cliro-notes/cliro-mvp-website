"use client";

import { useState, useRef, useEffect } from "react";
import { joinWaitlist } from "../../utils/api";
import HeroTitle from "./HeroTitle";
import VideoSection from "./VideoSection";

export default function Hero() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        email: "",
        name: "",
        whyCliro: [], // Will store interest_reason ID
        mainLanguages: [], // Will store language codes
    });
    const [isVideoSticky, setIsVideoSticky] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    // Refs
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const stickySectionRef = useRef(null);
    const contentSectionRef = useRef(null);

    // Handle scroll for sticky video
    useEffect(() => {
        const handleScroll = () => {
            if (!stickySectionRef.current || !contentSectionRef.current) return;

            const stickySection = stickySectionRef.current;
            const contentSection = contentSectionRef.current;
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const stickyHeight = stickySection.offsetHeight;
            const contentTop = contentSection.offsetTop;

            // Calculate scroll progress
            const progress = Math.max(0, Math.min(1, (scrollTop - stickyHeight) / (contentTop - stickyHeight)));
            setScrollProgress(progress);

            // Make video sticky when it reaches top
            if (scrollTop > stickyHeight) {
                setIsVideoSticky(true);
            } else {
                setIsVideoSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            if (prev.mainLanguages.length >= 3) return prev;
            return { ...prev, mainLanguages: [...prev.mainLanguages, option] };
        });
    };

    const handleSubmit = async (e, formData = form, message = "", newStatus = "loading") => {
        e.preventDefault();
        setStatus(newStatus);
        setErrorMessage(message);

        // If there's already an error message from validation, don't proceed
        if (newStatus === "error") {
            return;
        }

        // If it's loading state (actual form submission)
        if (newStatus === "loading") {
            try {
                // Prepare data for backend using helper functions
                const waitlistData = {
                    email: formData.email.trim(),
                    name: formData.name.trim(),
                    interest_reason: formData.whyCliro[0], // Get first selected reason
                    preferred_languages: formData.mainLanguages
                };

                console.log('Sending waitlist data:', waitlistData);

                // Send to backend using the API utility
                const result = await joinWaitlist(waitlistData);

                if (result.success) {
                    // Success
                    setStatus("success");
                    setErrorMessage("");
                    setForm({ email: "", name: "", whyCliro: [], mainLanguages: [] });

                    // Auto-close the form after success
                    setTimeout(() => {
                        setIsClosing(true);
                        setTimeout(() => {
                            setDropdownOpen(false);
                            setIsClosing(false);
                        }, 250);
                    }, 3000);

                } else {
                    // Error from API
                    setStatus("error");
                    setErrorMessage(result.error || "Failed to join waitlist. Please try again.");
                }

            } catch (error) {
                // Network or unexpected error
                setStatus("error");
                setErrorMessage(error.message || "Failed to join waitlist. Please try again.");
            }
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoContainerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Handle email submission from HeroTitle
    const handleShowFullForm = (email) => {
        // Set the email in form if provided
        if (email) {
            setForm(prev => ({ ...prev, email }));
        }
        // Open the dropdown form
        setDropdownOpen(true);
    };

    return (
        <div className="relative">
            {/* Hero Title Section - Now includes the waitlist form */}
            <HeroTitle
                onShowFullForm={handleShowFullForm}
                dropdownOpen={dropdownOpen}
                isClosing={isClosing}
                status={status}
                errorMessage={errorMessage}
                form={form}
                onJoinClick={handleJoinClick}
                onChange={handleChange}
                onToggleWhyCliro={toggleWhyCliro}
                onToggleLanguage={toggleLanguage}
                onSubmit={handleSubmit}
            />

            {/* Sticky Video Demo Section */}
            <VideoSection
                isVideoSticky={isVideoSticky}
                scrollProgress={scrollProgress}
                isFullscreen={isFullscreen}
                isPlaying={isPlaying}
                isMuted={isMuted}
                onToggleFullscreen={toggleFullscreen}
                onTogglePlayPause={togglePlayPause}
                onToggleMute={toggleMute}
                onVideoRef={(ref) => videoRef.current = ref}
                onContainerRef={(ref) => videoContainerRef.current = ref}
                onSectionRef={(ref) => stickySectionRef.current = ref}
            />
        </div>
    );
}