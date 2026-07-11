import crypto from "crypto";

export function verifySignature(
    orderId: string,
    paymentId: string,
    signature: string
) {
    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET!
        )
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

    return generatedSignature === signature;
}