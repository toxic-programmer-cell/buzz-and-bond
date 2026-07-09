"use client";

import { cn } from "@/utils/cn";

type MenuButtonProps = {
    onClick?: () => void;
};

export default function MenuButton({
    onClick,
}: MenuButtonProps) {
    return (
        <button
            onClick={onClick}
            aria-label="Open Menu"
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
                className="
        absolute
        h-[2px]
        w-5
        -translate-y-[4px]
        bg-white
        transition-all
        duration-300
        group-hover:bg-black
      "
            />

            <span
                className="
        absolute
        h-[2px]
        w-5
        translate-y-[4px]
        bg-white
        transition-all
        duration-300
        group-hover:bg-black
      "
            />
        </button>
    );
}