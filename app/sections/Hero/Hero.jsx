"use client";

import { useState, useRef, useEffect } from "react";
import { submitWaitlist } from "../../../lib/api";
import HeroTitle from "./HeroTitle";
import VideoSection from "./VideoSection";
import FeaturesSection from "./FeaturesSection";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        email: "",
        name: "",
        whyCliro: [],
        mainLanguages: [],
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

    const scrollToContent = () => {
        // This should target the VideoSection
        const videoSection = document.querySelector('[data-video-section]');
        if (videoSection) {
            videoSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'  // Align to top of viewport
            });
        }
    };

    return (
        <div className="relative">
            {/* Hero Title Section */}
            <HeroTitle onScrollToContent={scrollToContent} />

            {/* Sticky Video Demo Section */}
            <VideoSection
                isVideoSticky={isVideoSticky}
                scrollProgress={scrollProgress}
                onScrollToContent={scrollToContent}
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

            {/* Features Section */}
            <FeaturesSection onContentRef={(ref) => contentSectionRef.current = ref} />

            {/* Waitlist Form Section */}
            <div className="max-w-6xl mx-auto px-4 pb-20 md:pb-32">
                <WaitlistForm
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
            </div>
        </div>
    );
}