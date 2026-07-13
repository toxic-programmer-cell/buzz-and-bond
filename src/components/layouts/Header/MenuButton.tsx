"use client";

import { cn } from "@/utils/cn";

type MenuButtonProps = {
    isOpen?: boolean;
    onClick?: () => void;
};

export default function MenuButton({
    isOpen = false,
    onClick,
}: MenuButtonProps) {
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            className={cn(
                "group",
                "relative",
                "flex",
                "h-12",
                "w-12",
                "items-center",
                "justify-center",
                "rounded-full",
                "border",
                "border-white/25",
                "backdrop-blur-sm",
                "transition-all",
                "duration-300",
                "hover:bg-white"
            )}
        >
            <span
                className={cn(
                    "absolute h-[2px] w-5 bg-white transition-all duration-300 group-hover:bg-black",
                    isOpen ? "rotate-45 translate-y-0" : "-translate-y-[4px]"
                )}
            />

            <span
                className={cn(
                    "absolute h-[2px] w-5 bg-white transition-all duration-300 group-hover:bg-black",
                    isOpen ? "-rotate-45 translate-y-0" : "translate-y-[4px]"
                )}
            />
        </button>
    );
}