import { JWTPayload, jwtVerify, SignJWT } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

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
        .sign(secret)
}

export async function verifyToken(token: string) {
    const { payload } = await jwtVerify(token, secret)

    return payload as SessionPayload;
}