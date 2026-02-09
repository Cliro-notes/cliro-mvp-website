import {
    BookOpen,
    HelpCircle,
    Target,
    Layers,
    Clock,
    Video,
    GraduationCap,
    Briefcase,
    Accessibility,
    Brain,
    StickyNote,
    Bookmark,
    Highlighter,
    FileText,
    Pin,
} from "lucide-react";

// Import your constants
import { COLORS, OPACITY, TYPOGRAPHY } from "../../ui/colors";

// Input styles
export const inputClass =
    "w-full bg-transparent py-3.5 px-4 text-sm rounded-lg border border-dashed transition-all duration-200 focus:outline-none focus:border-opacity-60 placeholder:opacity-50";

export const WHY_CLIRO_ICONS = {
    'Productivity': Clock,
    'Writing': FileText,
    'Learning': BookOpen,
    'Content Creation': Video,
    'Student Work': GraduationCap,
    'Business': Briefcase,
    'Accessibility': Accessibility,
    'Other': HelpCircle,
};

export const LANGUAGE_FLAGS = {
    'English': '🇺🇸',
    'Spanish': '🇪🇸',
    'French': '🇫🇷',
    'German': '🇩🇪',
    'Italian': '🇮🇹',
    'Portuguese': '🇵🇹',
};

// We'll update MAX_LANGUAGES to match backend
export const MAX_LANGUAGES = 3;

export const FLOATING_ELEMENTS = [
    { icon: StickyNote, text: "Quick Notes", x: "10%", y: "20%", delay: 0 },
    { icon: Bookmark, text: "Bookmarks", x: "85%", y: "30%", delay: 0.2 },
    { icon: Highlighter, text: "Highlights", x: "15%", y: "70%", delay: 0.4 },
    { icon: FileText, text: "Documents", x: "80%", y: "60%", delay: 0.6 },
    { icon: Pin, text: "Tags", x: "20%", y: "85%", delay: 0.8 },
    { icon: BookOpen, text: "Library", x: "75%", y: "15%", delay: 1.0 },
];

export const FEATURES = [
    {
        icon: Target,
        title: "Smart Capture",
        description: "Instantly save content from any webpage with intelligent context detection.",
        color: "#2563eb"
    },
    {
        icon: Layers,
        title: "Organized Workflow",
        description: "Automatically categorize and tag notes for easy retrieval later.",
        color: "#10b981"
    },
    {
        icon: Brain,
        title: "AI Powered",
        description: "Get smart summaries, suggestions, and connections between your notes.",
        color: "#8b5cf6"
    },
];

export { COLORS, OPACITY, TYPOGRAPHY };