import { NextResponse } from "next/server";
import { makeToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
        return NextResponse.json(
            { error: "Admin password not configured." },
            { status: 500 }
        );
    }

    if (password !== adminPassword) {
        return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const token = await makeToken(password);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // 8-hour session
        maxAge: 60 * 60 * 8,
    });
    return response;
}
