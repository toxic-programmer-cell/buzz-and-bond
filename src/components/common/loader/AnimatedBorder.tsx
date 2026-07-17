"use client";

export default function AnimatedBorder() {
    return (
        <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 320 320"
        >
            <defs>

                <linearGradient
                    id="loader-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="50%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>

                <filter
                    id="loader-glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur
                        stdDeviation="6"
                        result="blur"
                    />

                    <feMerge>

                        <feMergeNode in="blur" />

                        <feMergeNode in="SourceGraphic" />

                    </feMerge>

                </filter>

            </defs>

            {/* Base Border */}

            <rect

                x="3"

                y="3"

                width="314"

                height="314"

                rx="28"

                fill="none"

                stroke="rgba(255,255,255,.05)"

                strokeWidth="2"

            />

            {/* Animated Border */}

            <rect

                className="loader-border loader-path"

                x="3"

                y="3"

                width="314"

                height="314"

                rx="28"

                fill="none"

                stroke="url(#loader-gradient)"

                strokeWidth="2"

                pathLength="100"

                filter="url(#loader-glow)"

            />

            {/* Moving Particle */}

            <circle

                className="loader-particle"

                r="5"

                fill="#ffffff"

                filter="url(#loader-glow)"

            />

        </svg>
    );
}