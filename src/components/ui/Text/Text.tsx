import { cn } from "@/utils/cn";
import {
    textVariants,
    textColors,
} from "@/config/typography";

type TextProps = {
    as?: React.ElementType;
    children: React.ReactNode;
    variant?: keyof typeof textVariants;
    color?: keyof typeof textColors;
    className?: string;
};

export default function Text({
    as: Component = "p",
    children,
    variant = "md",
    color = "primary",
    className,
}: TextProps) {
    return (
        <Component
            className={cn(
                textVariants[variant],
                textColors[color],
                className
            )}
        >
            {children}
        </Component>
    );
}