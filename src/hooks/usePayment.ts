"use client";

import loadRazorpay from "@/lib/loadRazorpay";

export default function usePayment() {

    async function pay(
        purpose: "EVENT" | "MEMBERSHIP",
        referenceId: string,
        ticketQuantity?: number
    ) {

        const loaded = await loadRazorpay();

        if (!loaded) {
            throw new Error("Unable to load Razorpay.");
        }

        const response = await fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                purpose,
                referenceId,
                quantity: ticketQuantity,
            }),
        });

        if (!response.ok) {
            throw new Error("Unable to create payment.");
        }

        const data = await response.json();

        // console.log(data.order);

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,

            amount: data.order.amount,

            currency: data.order.currency,

            name: "Buzz & Bond",

            description:
                purpose === "EVENT"
                    ? "Event Booking"
                    : "Membership Purchase",

            order_id: data.order.id,

            handler: async (response: {
                razorpay_order_id: string;
                razorpay_payment_id: string;
                razorpay_signature: string;
            }) => {

                const verify = await fetch("/api/payment/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(response),
                });

                if (!verify.ok) {
                    alert("Payment verification failed.");
                    return;
                }

                const result = await verify.json();

                console.log(result);

                alert("Payment Successful 🎉");
            },

            theme: {
                color: "#F97316",
            },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();

    }

    return {
        pay,
    };
}