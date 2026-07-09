export const headingVariants = {
    display: "text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9]",
    hero:
        "text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight",

    section:
        "text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight",

    title:
        "text-2xl md:text-3xl font-semibold",

    subtitle:
        "text-lg uppercase tracking-[0.25em]",
} as const;

export const headingAlign = {
    left: "text-left",

    center: "text-center",

    right: "text-right",
} as const;

export const textVariants = {
    xs: "text-xs leading-5",
    sm: "text-sm leading-6",
    md: "text-base leading-7",
    lg: "text-lg leading-8",
    xl: "text-xl leading-9",
} as const;

export const textColors = {
    primary: "text-white",
    secondary: "text-neutral-900",
    light: "text-neutral-200",
    muted: "text-neutral-400",
} as const;