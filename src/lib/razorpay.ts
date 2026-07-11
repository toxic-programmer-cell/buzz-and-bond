// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,

// });


// export default razorpay;

import Razorpay from "razorpay";

export function getRazorpay() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
        throw new Error("Razorpay credentials are missing.");
    }

    return new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });
}