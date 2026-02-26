"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import ProductCardTag from "./Buttons_And_Links/ProductCardTag";
import BestSellerTag from "./Buttons_And_Links/BestSellerTag";
import {
    Globe2,
    Scissors,
    BadgeCheck,
    ShieldCheck,
    MapPin,
    CreditCard,
    RotateCcw,
} from "lucide-react";

interface Props {
    product: Product;
}

const FEATURES = [
    {
        icon: ShieldCheck,
        title: "Trusted Quality",
        desc: "Every piece is checked to ensure it meets our standards.",
    },
    {
        icon: MapPin,
        title: "Real Time Tracking",
        desc: "Get live updates from our warehouse to your doorstep.",
    },
    {
        icon: CreditCard,
        title: "Secure Payments",
        desc: "Shop confidently with our secure, encrypted checkout.",
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        desc: "Change your mind? Return any item easily within thirty days.",
    },
];

export default function ProductDetail({ product }: Props) {
    const hasColors = !!(product.colors && product.colors.length > 0);

    const [activeColorIndex, setActiveColorIndex] = useState(0);

    const currentImageMain = hasColors
        ? product.colors![activeColorIndex].image_main
        : product.image_main;

    const thumbnails = hasColors
        ? product.colors!.map((c) => ({ src: c.image_main, label: c.name }))
        : [];

    return (
        <div className="w-full bg-bg pt-10">
            <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">

                    <div className="w-full lg:w-1/2">
                        <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-beige">
                            <div className="absolute top-4 left-4 z-10">
                                {product.tag === "new" && <ProductCardTag />}
                                {product.tag === "best-seller" && <BestSellerTag />}
                            </div>

                            <Image
                                src={currentImageMain}
                                alt={product.title}
                                fill
                                className="object-cover object-center transition-opacity duration-400"
                                priority
                            />

                            {hasColors && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {thumbnails.map((thumb, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveColorIndex(i)}
                                            aria-label={thumb.label}
                                            className={`relative w-11 h-13 sm:w-12 sm:h-14.5 rounded-xl overflow-hidden shrink-0 transition-all duration-200 ${
                                                i === activeColorIndex
                                                    ? "ring-2 ring-black ring-offset-1 scale-105"
                                                    : "ring-1 ring-white/70 hover:ring-white"
                                            }`}
                                        >
                                            <Image
                                                src={thumb.src}
                                                alt={thumb.label}
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col">

                        <div className="flex items-center gap-2 mb-5">
                            <Link
                                href="/products"
                                className="font-Inter text-[13px] md:text-[14px] text-gray hover:text-black transition-colors duration-200"
                            >
                                Shop
                            </Link>
                            <span className="font-Inter text-[13px] md:text-[14px] text-gray">•</span>
                            <span className="font-Inter text-[13px] md:text-[14px] text-black">
                                {product.category ?? "Men's Wear"}
                            </span>
                        </div>

                        <h2 className="font-Ronzino-Medium text-black text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] tracking-[-0.03em] leading-[1.12em] mb-4">
                            {product.title}
                        </h2>

                        <div className="flex items-baseline gap-3 mb-5">
                            <span className="font-Ronzino-Medium text-black text-[22px] md:text-[26px] tracking-[-0.03em] leading-[1.4em]">
                                USD ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="font-Ronzino-Medium text-gray-2 text-[15px] md:text-[16px] tracking-[-0.035em] leading-[1.5em] line-through">
                                    USD ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {product.description && (
                            <p className="font-Inter text-[13px] md:text-[14px] text-[#6E6E6E] tracking-[-0.02em] leading-[1.65em] mb-6">
                                {product.description}
                            </p>
                        )}

                        {hasColors && (
                            <div className="mb-5">
                                <p className="font-Inter text-[13px] text-black mb-2.5">
                                    <span className="font-medium">Colour</span>
                                    <span className="text-gray ml-2">
                                        {product.colors![activeColorIndex].name}
                                    </span>
                                </p>
                                <div className="flex items-center gap-2.5">
                                    {product.colors!.map((color, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveColorIndex(i)}
                                            title={color.name}
                                            aria-label={color.name}
                                            className={`w-7 h-7 rounded-full transition-all duration-200 cursor-pointer ${
                                                i === activeColorIndex
                                                    ? "ring-2 ring-black ring-offset-2 scale-110"
                                                    : "ring-1 ring-black/20 hover:ring-black/50"
                                            }`}
                                            style={{ backgroundColor: color.hex }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            {product.stock > 10 ? (
                                <p className="font-Inter text-[13px] font-medium" style={{ color: "#2E7D32" }}>
                                    ✓ {product.stock} in stock
                                </p>
                            ) : product.stock > 0 ? (
                                <p className="font-Inter text-[13px] font-medium" style={{ color: "#E65100" }}>
                                    ⚠ Only {product.stock} left in stock
                                </p>
                            ) : (
                                <p className="font-Inter text-[13px] font-medium" style={{ color: "#C62828" }}>
                                    ✗ Out of stock
                                </p>
                            )}
                        </div>

                        <button
                            className="w-full bg-black text-white font-Inter text-[15px] md:text-[16px] tracking-[-0.02em] leading-[1.5em] py-4 rounded-full hover:bg-black/85 active:scale-[0.99] transition-all duration-200 mb-7 cursor-pointer"
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? "Sold Out" : "Order Now"}
                        </button>

                        {product.details && (
                            <div className="border-t border-black/10">
                                {/* Material */}
                                <div className="flex items-start gap-3.5 py-4 border-b border-black/10">
                                    <Globe2 className="w-4.5 h-4.5 text-black mt-0.5 shrink-0" strokeWidth={1.5} />
                                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                                        <span className="font-Inter text-[13px] md:text-[14px] text-black font-medium leading-[1.5em] shrink-0">
                                            Material
                                        </span>
                                        <span className="font-Inter text-[13px] md:text-[14px] text-gray leading-[1.5em] sm:text-right">
                                            {product.details.material}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5 py-4 border-b border-black/10">
                                    <Scissors className="w-4.5 h-4.5 text-black mt-0.5 shrink-0" strokeWidth={1.5} />
                                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                                        <span className="font-Inter text-[13px] md:text-[14px] text-black font-medium leading-[1.5em] shrink-0">
                                            Care
                                        </span>
                                        <span className="font-Inter text-[13px] md:text-[14px] text-gray leading-[1.5em] sm:text-right">
                                            {product.details.care}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5 py-4">
                                    <BadgeCheck className="w-4.5 h-4.5 text-black mt-0.5 shrink-0" strokeWidth={1.5} />
                                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                                        <span className="font-Inter text-[13px] md:text-[14px] text-black font-medium leading-[1.5em] shrink-0">
                                            Warranty
                                        </span>
                                        <span className="font-Inter text-[13px] md:text-[14px] text-gray leading-[1.5em] sm:text-right">
                                            {product.details.warranty}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="px-4 sm:px-6 md:px-10 lg:px-16 pb-12 md:pb-16 lg:pb-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="bg-white rounded-2xl p-5 md:p-6">
                            <feature.icon
                                className="w-6 h-6 text-black mb-4"
                                strokeWidth={1.5}
                            />
                            <p className="font-Ronzino-Medium text-black text-[14px] md:text-[15px] tracking-[-0.02em] leading-[1.35em] mb-1.5">
                                {feature.title}
                            </p>
                            <p className="font-Inter text-[12px] md:text-[13px] text-gray tracking-[-0.01em] leading-[1.55em]">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
