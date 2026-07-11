import { NextRequest, NextResponse } from "next/server";

import paymentService from "@/services/payment.services";

export async function POST(request: NextRequest) {

    try {

        const body = await request.json();

        const payment =
            await paymentService.verify(body);

        return NextResponse.json({
            success: true,
            payment,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Payment verification failed",
            },
            {
                status: 400,
            }
        );

    }

}