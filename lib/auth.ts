// Uses Web Crypto API (crypto.subtle) — fully compatible with the Edge Runtime.

const SESSION_COOKIE = "admin_token";
const SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-secret-change-me";

async function hmacHex(message: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(SECRET),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
    return Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

/** Derive a deterministic token from the admin password + app secret. */
export async function makeToken(password: string): Promise<string> {
    return hmacHex(password);
}

/** Validate a raw cookie value against the admin password. */
export async function isValidToken(token: string): Promise<boolean> {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return false;
    const expected = await hmacHex(adminPassword);
    if (token.length !== expected.length) return false;
    // Constant-time comparison to prevent timing attacks
    let diff = 0;
    for (let i = 0; i < token.length; i++) {
        diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return diff === 0;
}

export { SESSION_COOKIE };
