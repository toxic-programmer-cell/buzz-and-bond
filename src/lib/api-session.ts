import { cookies } from "next/headers";
import { SessionPayload, verifyToken } from "./auth";

export class AuthenticationError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "AuthenticationError"
    }
}

export async function verifyApiSession(): Promise<SessionPayload> {
    const cokkieStore = await cookies()

    const sessionCokkie = cokkieStore.get("bb_session");

    if (!sessionCokkie?.value) {
        throw new AuthenticationError("No session cokkie found");
    }

    const session = await verifyToken(sessionCokkie?.value);

    if (!session) {
        throw new AuthenticationError("Invalid session");
    }

    if (!session.id || !session.email || !session.role) {
        throw new AuthenticationError("Invalid session payload.");
    }

    return session;
}