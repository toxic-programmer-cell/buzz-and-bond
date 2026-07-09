import { cn } from "@/utils/cn";
import { sectionSpacing } from "@/config/layout";

type SectionProps = {
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    size?: keyof typeof sectionSpacing;
};

export default function Section({
    as: Component = "section",
    children,
    className,
    size = "md",
}: SectionProps) {
    return (
        <Component
            className={cn(sectionSpacing[size], className)}
        >
            {children}
        </Component>
    );
}