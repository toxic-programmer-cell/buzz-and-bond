
import { prisma } from "@/lib/prisma";
import { PaymentInput } from "@/validations/payment.schema";
import { Prisma } from "@prisma/client";

class PaymentRepository {

    create(data: Prisma.PaymentCreateInput) {
        return prisma.payment.create({
            data,
        });
    }

    findByOrderId(orderId: string) {
        return prisma.payment.findUnique({
            where: {
                orderId,
            },
        });
    }

    markPaid(
        id: string,
        paymentId: string,
        signature: string
    ) {
        return prisma.payment.update({
            where: {
                id,
            },
            data: {
                paymentId,
                signature,
                status: "PAID",
            },
        });
    }

    markFailed(
        id: string,
        paymentId?: string
    ) {
        return prisma.payment.update({
            where: { id },
            data: {
                paymentId,
                status: "FAILED",
            },
        });
    }

    update(
        id: string,
        data: {
            paymentId?: string;
            signature?: string;
            orderId?: string;
            status?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
        }
    ) {
        return prisma.payment.update({
            where: { id },
            data,
        });
    }

    // updateOrderId(id: string, orderId: string) {
    //     return prisma.payment.update({
    //         where: { id },
    //         data: {
    //             orderId,
    //         },
    //     });
    // }

}

export default new PaymentRepository();