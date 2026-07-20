import { JWTPayload, jwtVerify, SignJWT } from "jose"

function getJWtSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET environment variable is missing. Authentication cannot start.")
    }

    if (secret.length < 32) {
        throw new Error("JWT_SECRET must be at least 32 characters long.")
    }

    return new TextEncoder().encode(secret)

}

export interface SessionPayload extends JWTPayload {
    id: string
    email: string
    role: string
}

export async function createToken(payload: SessionPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256"
        })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getJWtSecret())
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getJWtSecret())
        return payload as SessionPayload;
    } catch (error) {
        console.log("Error in verifying token:", error);
        return null;
    }

}