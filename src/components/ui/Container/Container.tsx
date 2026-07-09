import { cn } from "@/utils/cn";
import { containerSizes } from "@/config/layout";

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
    size?: keyof typeof containerSizes;
};

export default function Container({
    children,
    className,
    size = "lg",
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full px-5 md:px-8 lg:px-10",
                containerSizes[size],
                className
            )}
        >
            {children}
        </div>
    );
}