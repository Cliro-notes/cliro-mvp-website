"use client";

import { COLORS, OPACITY, TYPOGRAPHY, FEATURES } from "./constants";

export default function FeaturesSection({ onContentRef }) {
    return (
        <section
            ref={onContentRef}
            className="relative z-50"
        >
            <div className="max-w-6xl mx-auto px-4 py-20 md:py-32">
                {/* Features intro */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6"
                        style={{
                            fontFamily: TYPOGRAPHY.fontSans,
                            color: COLORS.dark,
                        }}>
                        Everything You Need for <br />
                        <span className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${COLORS.dark} 30%, ${OPACITY.dark40} 70%)`,
                            }}>
                            Intelligent Note-Taking
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12"
                        style={{
                            color: OPACITY.dark30,
                            fontFamily: TYPOGRAPHY.fontSans,
                        }}>
                        Cliro brings powerful note-taking capabilities directly to your browser,
                        making research, learning, and productivity effortless.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: `2px dashed ${OPACITY.dark20}`,
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div className="mb-6 inline-flex p-4 rounded-xl"
                                    style={{
                                        backgroundColor: `${feature.color}10`,
                                        border: `2px dashed ${feature.color}30`
                                    }}>
                                    <Icon size={28} style={{ color: feature.color }} />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3"
                                    style={{
                                        fontFamily: TYPOGRAPHY.fontSans,
                                        color: COLORS.dark,
                                    }}>
                                    {feature.title}
                                </h3>
                                <p className="text-sm leading-relaxed"
                                    style={{
                                        color: OPACITY.dark40,
                                        fontFamily: TYPOGRAPHY.fontSans,
                                    }}>
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}