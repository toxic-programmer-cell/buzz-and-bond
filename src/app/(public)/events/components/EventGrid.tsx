export default function EventGrid() {

    return (

        <section
            className="
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
        "
        >

            {Array.from({ length: 6 }).map((_, i) => (

                <div
                    key={i}
                    className="
                    h-[420px]
                    rounded-3xl
                    bg-neutral-100
                    "
                />

            ))}

        </section>

    );

}