"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { COLORS, OPACITY, TYPOGRAPHY } from "./constants";

export default function HeroTitle({ onScrollToContent }) {
    const [description, setDescription] = useState(
        "The intelligent note-taking extension that transforms how you capture and organize information. Cliro seamlessly integrates with your browser to make research, learning, and productivity effortless."
    );
    const [isEditing, setIsEditing] = useState(false);
    const editableRef = useRef(null);
    const lastHtmlRef = useRef("");

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
            // Save current content before focusing
            lastHtmlRef.current = editableRef.current.innerHTML;

            // Set focus and position cursor at end
            editableRef.current.focus();

            // Move cursor to end of content
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(editableRef.current);
            range.collapse(false); // false means collapse to end
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
            // Insert line break instead of default behavior
            document.execCommand('insertLineBreak');
            return;
        }

        if (e.key === 'Escape') {
            // Restore previous content if escape is pressed
            if (editableRef.current) {
                editableRef.current.innerHTML = lastHtmlRef.current;
            }
            setIsEditing(false);
            e.preventDefault();
        }
    };

    return (
        <section className="relative flex items-center justify-center px-4 py-8 md:py-12">
            <div className="relative z-10 text-center max-w-3xl">
                {/* Logo - Close to title */}
                <div className="mb-2">
                    <img
                        src="/flowanimation3.gif"
                        alt="Cliro"
                        className="h-14 w-auto mx-auto"
                    />
                </div>

                {/* Title - Close to logo */}
                <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight"
                    style={{
                        fontFamily: TYPOGRAPHY.fontSans,
                        color: COLORS.dark,
                        letterSpacing: '-0.02em',
                    }}>
                    Cliro
                </h1>

                {/* Editable Description */}
                <div className="relative max-w-2xl mx-auto mb-6">
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

                    {/* Edit hint - subtle */}
                    {!isEditing && (
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <span className="text-xs font-mono"
                                style={{ color: OPACITY.dark30 }}>
                                Click to edit
                            </span>
                        </div>
                    )}
                </div>

                {/* Fixed CTA that scrolls to video */}
                <div className="mt-8">
                    <button
                        onClick={onScrollToContent}
                        className="group flex items-center justify-center gap-2 mx-auto text-sm font-mono hover:gap-3 transition-all duration-300"
                        style={{ color: OPACITY.dark40 }}
                    >
                        <span>Watch the demo</span>
                        <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
}