import { NextRequest, NextResponse } from "next/server";
import paymentService from "@/services/payment.services";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const payment = await paymentService.create(body);

        return NextResponse.json(payment, {
            status: 201,
        });

    } catch (error) {

        console.error("Payment API Error:", error);

        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
                error:
                    error instanceof Error
                        ? error.stack
                        : error,
            },
            {
                status: 500,
            }
        );
    }
}