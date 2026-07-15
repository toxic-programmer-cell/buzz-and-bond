import crypto from "crypto";
import { getRazorpay } from "@/lib/razorpay";

const razorpay = getRazorpay()

import repository from "@/repositorys/payment.repository";
import {
    PaymentInput,
    PaymentSchema,
} from "@/validations/payment.schema";
import { PaymentVerifyInput, PaymentVerifySchema } from "@/validations/paymentVerify.schema";
import { verifySignature } from "@/lib/verifySignature";
import eventRepository from "@/repositorys/event.repository";
import { prisma } from "@/lib/prisma";

class PaymentService {
    async create(data: PaymentInput) {
        const validated = PaymentSchema.parse(data);

        // console.log("payment service", validated)
        const event = await eventRepository.findById(validated.referenceId)

        if (!event) {
            throw new Error("Event not found");
        }

        const amount = event.price * validated.quantity;

        // 1. Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects paise
            currency: validated.currency,
            receipt: crypto.randomUUID(),
        });

        // 2. Create payment record
        const payment = await repository.create({
            amount,
            quantity: validated.quantity,
            purpose: validated.purpose,
            referenceId: validated.referenceId,
            currency: validated.currency,
            orderId: order.id,
        });

        // 3. Save Razorpay order ID
        // await repository.updateOrderId(payment.id, order.id);

        // 4. Return data to frontend
        return {
            paymentId: payment.id,
            order,
        };
    }

    async verify(data: PaymentVerifyInput) {

        const validated =
            PaymentVerifySchema.parse(data);

        const payment =
            await repository.findByOrderId(
                validated.razorpay_order_id
            );

        if (!payment) {
            throw new Error("Payment not found");
        }

        const verified =
            verifySignature(
                validated.razorpay_order_id,
                validated.razorpay_payment_id,
                validated.razorpay_signature
            );

        if (!verified) {
            throw new Error("Invalid payment signature");
        }

        // return repository.markPaid(
        //     payment.id,
        //     validated.razorpay_payment_id,
        //     validated.razorpay_signature
        // );

        return prisma.$transaction(async (tx) => {
            // const paymentUpdate = await repository.markPaid(
            //     payment.id,
            //     validated.razorpay_payment_id,
            //     validated.razorpay_signature
            // )

            const paymentUpdate = await tx.payment.update({
                where: {
                    id: payment.id,
                },
                data: {
                    paymentId: validated.razorpay_payment_id,
                    signature: validated.razorpay_signature,
                    status: "PAID",
                },
            })

            if (!paymentUpdate) {
                throw new Error("Payment update failed")
            }

            // Here write logic to update the available seat
            if (payment.purpose === "EVENT") {
                const event = await tx.event.findUnique({
                    where: { id: payment.referenceId }
                })

                if (!event) {
                    throw new Error("Event not found")
                }

                if (event.seats < payment.quantity) {
                    throw new Error("Not enough seats available")
                }

                await tx.event.update({
                    where: {
                        id: payment.referenceId
                    },
                    data: {
                        seats: {
                            decrement: payment.quantity,
                        }
                    }
                })
            }

            return paymentUpdate;
        })
    }



    findByOrderId(orderId: string) {
        return repository.findByOrderId(orderId);
    }


}

export default new PaymentService();