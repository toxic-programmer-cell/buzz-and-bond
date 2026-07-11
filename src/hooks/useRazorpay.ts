"use client";

import { useEffect, useState } from "react";

export default function useRazorpay() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if ((window as any).Razorpay) {
            setLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        script.onload = () => setLoaded(true);
        script.onerror = () => setLoaded(false);

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return loaded;
}