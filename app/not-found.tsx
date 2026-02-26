"use client";

import Link from "next/link";
import Prism from "./not-found-bg";

export default function NotFound() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-80px)] px-6 py-20 text-center overflow-hidden bg-black">

            <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                <Prism
                    animationType="3drotate"
                    scale={3.2}
                    glow={0.6}
                    noise={0.3}
                    bloom={0.8}
                    timeScale={0.3}
                      
                    suspendWhenOffscreen
                />
            </div>

            <h1 className="relative z-10 font-Fino text-[280px] sm:text-[300px] md:text-[320px] lg:text-[320px] leading-none tracking-tight text-white/10 select-none mb-0! -mt-5">
                404
            </h1>

            <div className="relative z-10 flex flex-col items-center gap-5 -mt-16 sm:-mt-24 lg:-mt-32">
                <div className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-1.5 text-[13px] font-Inter tracking-[-0.02em] select-none">
                    Page not found
                </div>

                <h2 className="text-[32px]! sm:text-[40px]! lg:text-[48px]! mb-0! leading-tight! text-white!">
                    Looks like you&apos;re<br />lost
                </h2>

                <p className="t16 mb-0! max-w-md text-white-60!">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
                    <Link
                        href="/"
                        className="bg-white text-black font-Inter text-[15px] tracking-[-0.03em] leading-[1.55em] rounded-3xl py-2 px-5 transition duration-300 hover:bg-gray-200"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/products"
                        className="font-Inter text-[15px] tracking-[-0.03em] leading-[1.55em] rounded-3xl py-2 px-5 border border-white/15 text-white transition duration-300 hover:bg-white/10"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>

           
        </section>
    );
}
