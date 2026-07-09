import Link from "next/link";
import Image from "next/image";

export default function Logo({ 
    width, 
    height,
    className
}: { 
    width: number; 
    height: number;
    className?: string;
}) {
    return (
        <Link
            href="/"
            aria-label="Buzz & Bond Home"
            className="relative z-50 block"
        >
            <Image
                src="/Logo.png"
                alt="Buzz & Bond"
                width={width}
                height={height}
                priority
                className={className}
            />
        </Link>
    );
}