import { z } from "zod";

export const PaymentVerifySchema = z.object({
    razorpay_order_id: z.string(),

    razorpay_payment_id: z.string(),

    razorpay_signature: z.string(),
});

export type PaymentVerifyInput =
    z.infer<typeof PaymentVerifySchema>;