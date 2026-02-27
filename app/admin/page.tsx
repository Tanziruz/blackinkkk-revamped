"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                const data = await res.json();
                setError(data.error ?? "Incorrect password.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Brand */}
                <p className="text-white text-center text-xs tracking-[0.25em] uppercase mb-2 font-light opacity-60">
                    Admin
                </p>
                <h1 className="text-white text-center text-2xl tracking-[0.15em] uppercase font-light mb-10">
                    BLACKINKKK
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="password"
                            className="text-white/60 text-xs tracking-widest uppercase"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="bg-white/5 border border-white/15 text-white rounded-none px-4 py-3 text-sm tracking-wide outline-none focus:border-white/50 transition-colors placeholder:text-white/20"
                            placeholder="Enter admin password"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs tracking-wide">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-white text-black text-xs tracking-[0.2em] uppercase px-6 py-3.5 font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Verifying…" : "Enter"}
                    </button>
                </form>
            </div>
        </div>
    );
}
