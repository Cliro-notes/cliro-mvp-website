"use client";

import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize2,
    Minimize2,
    ChevronDown
} from "lucide-react";
import { FLOATING_ELEMENTS, OPACITY, TYPOGRAPHY } from "./constants";

export default function VideoSection({
    isVideoSticky,
    scrollProgress,
    onScrollToContent,
    isFullscreen,
    isPlaying,
    isMuted,
    onToggleFullscreen,
    onTogglePlayPause,
    onToggleMute,
    onVideoRef,
    onContainerRef,
    onSectionRef  // This is the prop that should be used as ref
}) {
    return (
        <section
            data-video-section
            ref={onSectionRef}  // Changed from stickySectionRef to onSectionRef
            className={`relative ${isVideoSticky ? 'fixed top-0 left-0 right-0 z-40' : 'relative'}`}
        >
            {/* Video container */}
            <div
                ref={onContainerRef}
                className="relative bg-black"
                style={{
                    height: isVideoSticky ? '100vh' : '90vh',
                    transition: 'height 0.3s ease'
                }}
            >
                <video
                    ref={onVideoRef}
                    src="/cliroFinalVideo.mp4"
                    className="w-full h-full object-contain"
                    poster="/flowanimation3.gif"
                    loop
                    muted={isMuted}
                    playsInline
                    autoPlay
                />

                {/* Floating elements around video */}
                {FLOATING_ELEMENTS.map((element, index) => {
                    const Icon = element.icon;
                    return (
                        <div
                            key={index}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: element.x,
                                top: element.y,
                                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                                animationDelay: `${element.delay}s`,
                            }}
                        >
                            <div className="flex flex-col items-center">
                                <div className="p-3 rounded-xl mb-2 backdrop-blur-sm"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        border: `1px dashed rgba(255, 255, 255, 0.3)`,
                                    }}>
                                    <Icon size={24} color="white" />
                                </div>
                                <span className="text-white text-xs font-medium whitespace-nowrap"
                                    style={{ fontFamily: TYPOGRAPHY.fontSans }}>
                                    {element.text}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Enhanced video controls */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-4 bg-black/60 backdrop-blur-lg rounded-full px-6 py-3">
                        <button
                            onClick={onTogglePlayPause}
                            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 hover:bg-white/20"
                        >
                            {isPlaying ? (
                                <Pause size={20} color="white" />
                            ) : (
                                <Play size={20} color="white" />
                            )}
                        </button>

                        <button
                            onClick={onToggleMute}
                            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 hover:bg-white/20"
                        >
                            {isMuted ? (
                                <VolumeX size={20} color="white" />
                            ) : (
                                <Volume2 size={20} color="white" />
                            )}
                        </button>

                        <div className="h-6 w-px bg-white/30" />

                        <button
                            onClick={onToggleFullscreen}
                            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 hover:bg-white/20"
                        >
                            {isFullscreen ? (
                                <Minimize2 size={20} color="white" />
                            ) : (
                                <Maximize2 size={20} color="white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Video label */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 rounded-full backdrop-blur-sm"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: `1px dashed rgba(255, 255, 255, 0.3)`,
                        }}>
                        <span className="text-white text-sm font-medium"
                            style={{ fontFamily: TYPOGRAPHY.fontSans }}>
                            Watch Cliro in action
                        </span>
                    </div>
                </div>
            </div>

            {/* Scroll progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                    className="h-full transition-all duration-200"
                    style={{
                        width: `${scrollProgress * 100}%`,
                        backgroundColor: 'white',
                    }}
                />
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translate(-50%, -50%) translateY(0px);
                    }
                    50% {
                        transform: translate(-50%, -50%) translateY(-10px);
                    }
                }
            `}</style>
        </section>
    );
}