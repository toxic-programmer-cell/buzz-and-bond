"use client";

export default function EventFilters() {

    return (

        <div
            className="
            mb-14
            flex
            flex-wrap
            gap-4
        "
        >

            <input
                placeholder="Search events..."
                className="
                h-12
                flex-1
                rounded-xl
                border
                px-5
                outline-none
                focus:border-black
                "
            />

            <select
                className="
                rounded-xl
                border
                px-5
                "
            >
                <option>All Categories</option>
            </select>

        </div>

    );

}