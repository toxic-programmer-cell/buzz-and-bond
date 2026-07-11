import { cn } from "@/utils/cn";
import {
    headingAlign,
    headingVariants,
} from "@/config/typography";
// import type { ReactNode, ElementType } from "react";

type HeadingProps = {
    children: React.ReactNode;

    tag?: keyof React.JSX.IntrinsicElements;

    variant?: keyof typeof headingVariants;

    align?: keyof typeof headingAlign;

    className?: string;
};

export default function Heading({
    children,
    tag = "h2",
    variant = "section",
    align = "left",
    className,
}: HeadingProps) {
    const Component = tag;

    return (
        <Component
            className={cn(
                headingVariants[variant],
                headingAlign[align],
                className
            )}
        >
            {children}
        </Component>
    );
}