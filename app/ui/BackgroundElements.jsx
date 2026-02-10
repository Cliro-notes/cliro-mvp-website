import {
    Pencil,
    Notebook,
    FileText,
    PenTool,
    BookOpen,
    Feather,
    Highlighter,
} from 'lucide-react';
import { COLORS } from './colors';

export const BackgroundElements = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Grid pattern - using your color constants */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, currentColor 1px, transparent 1px),
                        linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    color: COLORS.dark,
                }}
            />

            {/* Icons - adjusted opacity for full-site background */}
            <div className="absolute top-1/5 right-[15%] w-8 h-8 opacity-[0.03]">
                <Pencil className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute bottom-1/3 left-[10%] w-10 h-10 opacity-[0.03]">
                <Notebook className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute top-2/3 right-[10%] w-12 h-12 opacity-[0.03]">
                <FileText className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute bottom-1/4 right-[25%] w-8 h-8 opacity-[0.03]">
                <PenTool className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute top-1/3 left-1/2 w-12 h-12 opacity-[0.03] transform -translate-x-1/2">
                <BookOpen className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute top-3/4 left-[20%] w-9 h-9 opacity-[0.03]">
                <Feather className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute top-1/2 left-[15%] w-10 h-10 opacity-[0.03]">
                <Highlighter className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute bottom-1/5 right-[10%] w-7 h-7 opacity-[0.03]">
                <Pencil className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute top-1/4 left-[30%] w-9 h-9 opacity-[0.03]">
                <Notebook className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>

            {/* More subtle elements for coverage */}
            <div className="absolute top-[15%] left-[5%] w-6 h-6 opacity-[0.02]">
                <BookOpen className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute bottom-[15%] left-[5%] w-6 h-6 opacity-[0.02]">
                <FileText className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute top-[10%] right-[5%] w-6 h-6 opacity-[0.02]">
                <PenTool className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
            <div className="absolute bottom-[10%] right-[5%] w-6 h-6 opacity-[0.02]">
                <Feather className="w-full h-full" style={{ color: COLORS.dark }} />
            </div>
        </div>
    );
};