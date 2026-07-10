"use client";

export default function Hero() {

    return (

        <section
            className="
            relative
            flex
            min-h-[60vh]
            items-center
            overflow-hidden
            bg-gradient-to-b
            from-orange-50
            to-white
        "
        >

            <div className="container mx-auto px-6">

                <div className="max-w-3xl">

                    <p className="mb-4 font-medium text-orange-500">
                        Buzz & Bond Events
                    </p>

                    <h1
                        className="
                        text-5xl
                        font-bold
                        leading-tight
                        lg:text-7xl
                    "
                    >
                        Discover events
                        that create
                        meaningful
                        connections.
                    </h1>

                    <p
                        className="
                        mt-8
                        max-w-xl
                        text-lg
                        text-neutral-600
                    "
                    >
                        Workshops, networking sessions,
                        meetups and unforgettable
                        experiences built around community.
                    </p>

                    <button
                        className="
                        mt-10
                        rounded-full
                        bg-black
                        px-8
                        py-4
                        text-white
                        transition
                        hover:scale-105
                    "
                    >
                        Browse Events
                    </button>

                </div>

            </div>

        </section>

    );
}