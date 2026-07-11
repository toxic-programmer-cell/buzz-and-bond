import { z } from "zod";

export const PaymentSchema = z.object({
    // amount: z.number().positive(),
    purpose: z.enum(["EVENT", "MEMBERSHIP"]),
    referenceId: z.string(),
    quantity: z.number().int().min(1).default(1),
    currency: z.string().default("INR"),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;