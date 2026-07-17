"use client";

interface Props {
    textRef: React.RefObject<HTMLParagraphElement | null>;
}

export default function LoadingText({ textRef, }: Props) {
    return (
        <div className="mt-10 flex flex-col items-center text-center">

            <h2 className="loader-title text-white text-sm tracking-[0.35em] uppercase font-semibold">
                Buzz & Bond
            </h2>

            <p
                ref={textRef}
                className="
                    loader-text
                    mt-4
                    h-5
                    text-xs
                    uppercase
                    tracking-[0.28em]
                    text-zinc-400
                    h-5
                "
            >
                Initializing...
            </p>

        </div>
    );
}