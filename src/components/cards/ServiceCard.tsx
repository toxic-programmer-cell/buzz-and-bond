import React from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ServiceCardProps {
    img?: string | StaticImageData;
    title: string;
    description: string;
    className?: string;
}

export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
    ({ img, title, description, className }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "w-full bg-[#121212] border border-white/5 rounded-[32px] shadow-2xl relative group overflow-hidden flex flex-col justify-between h-full min-h-[420px] md:min-h-[480px] will-change-transform text-center",
                    className
                )}
            >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                {/* Main Content Wrapper */}
                <div className="flex flex-col items-center w-full h-full justify-between relative z-10 gap-6 px-6 md:px-8">
                    {/* Image Container */}
                    {img && (
                        <div className="w-full flex justify-center mt-2">
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src={img}
                                    alt={title}
                                    fill
                                    className="object-cover rounded-[32px] transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    {/* Text Container */}
                    <div className="flex flex-col items-center flex-grow justify-center py-3">
                        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight leading-tight group-hover:text-neutral-200 transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-sm md:text-base text-neutral-400 font-normal leading-relaxed max-w-[320px] mt-4 group-hover:text-neutral-300 transition-colors duration-300 mx-auto">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Subtle bottom line shine */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
            </div>
        );
    }
);

ServiceCard.displayName = "ServiceCard";
