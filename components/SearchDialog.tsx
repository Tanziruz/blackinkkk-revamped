"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, ArrowUpRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/types/product";

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    products: Product[];
}

export default function SearchDialog({ open, onOpenChange, products }: SearchDialogProps) {
    const [query, setQuery] = useState("");
    const [activeIdx, setActiveIdx] = useState(0);
    const [prevOpen, setPrevOpen] = useState(open);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Derived-state reset when dialog transitions to open (React-approved synchronous pattern)
    if (prevOpen !== open) {
        setPrevOpen(open);
        if (open) {
            setQuery("");
            setActiveIdx(0);
        }
    }

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return products.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                (p.category ?? "").toLowerCase().includes(q) ||
                (p.description ?? "").toLowerCase().includes(q)
        ).slice(0, 8);
    }, [query, products]);

    // Clamp active index to results bounds
    const safeActiveIdx = results.length > 0 ? Math.min(activeIdx, results.length - 1) : 0;

    // Side-effect only: focus input when dialog opens
    useEffect(() => {
        if (open) {
            const id = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(id);
        }
    }, [open]);

    function navigateTo(id: string) {
        onOpenChange(false);
        router.push(`/products/${id}`);
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (results.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIdx((i) => (i + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx((i) => (i - 1 + results.length) % results.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            navigateTo(results[safeActiveIdx].id);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className={[
                    // base
                    "bg-bg p-0 gap-0 overflow-hidden border border-black/6 shadow-2xl outline-none",
                    // mobile: pin to top edge, full width, slide from top
                    "max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0",
                    "max-sm:w-full max-sm:max-w-full max-sm:rounded-t-none max-sm:rounded-b-2xl",
                    "max-sm:data-[state=open]:slide-in-from-top-4 max-sm:data-[state=closed]:slide-out-to-top-4",
                    // desktop: centered, constrained
                    "sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%]",
                    "sm:max-w-lg sm:rounded-2xl",
                ].join(" ")}
            >
                <DialogTitle className="sr-only">Search products</DialogTitle>

                {/* ── Input row ── */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-black/6">
                    <Search size={15} strokeWidth={1.8} className="text-gray shrink-0" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search products…"
                        className="flex-1 bg-transparent font-Ronzino-Medium text-[15px] text-black placeholder:text-gray placeholder:font-Inter placeholder:text-[14px] tracking-[-0.025em] outline-none"
                    />
                    {query ? (
                        <button
                            onClick={() => setQuery("")}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-beige text-gray hover:text-black hover:bg-black/8 transition-colors cursor-pointer"
                        >
                            <X size={11} strokeWidth={2.2} />
                        </button>
                    ) : (
                        <button
                            onClick={() => onOpenChange(false)}
                            className="sm:hidden w-6 h-6 flex items-center justify-center rounded-full bg-beige text-gray hover:text-black transition-colors cursor-pointer"
                        >
                            <X size={11} strokeWidth={2.2} />
                        </button>
                    )}
                    <kbd className="hidden sm:inline-flex items-center font-Inter text-[10px] text-gray border border-black/10 rounded-md px-1.5 py-0.5 select-none tracking-wide">
                        ESC
                    </kbd>
                </div>

                {/* ── Results list ── */}
                {results.length > 0 && (
                    <ul className="py-1 max-h-[60vh] sm:max-h-80 overflow-y-auto">
                        {results.map((product, i) => (
                            <li key={product.id}>
                                <button
                                    onMouseEnter={() => setActiveIdx(i)}
                                    onClick={() => navigateTo(product.id)}
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 cursor-pointer transition-colors duration-100 ${
                                        i === safeActiveIdx ? "bg-black/4" : "hover:bg-black/4"
                                    }`}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative w-11 h-14 rounded-xl overflow-hidden bg-beige shrink-0">
                                        <Image
                                            src={product.image_main}
                                            alt={product.title}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="font-Ronzino-Medium text-dark-1 text-[14px] tracking-[-0.025em] leading-[1.35em] truncate">
                                            {product.title}
                                        </p>
                                        {product.category && (
                                            <span className="inline-block mt-1 font-Inter text-[10px] text-gray tracking-[0.04em] uppercase bg-beige rounded-full px-2 py-0.5 leading-none">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-col items-end shrink-0 gap-0.5">
                                        <span className="font-Ronzino-Medium text-dark-1 text-[14px] tracking-[-0.025em]">
                                            ${product.price}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="font-Inter text-gray text-[11px] line-through leading-none">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    <ArrowUpRight
                                        size={14}
                                        strokeWidth={1.8}
                                        className={`shrink-0 text-gray transition-opacity duration-100 ${
                                            i === safeActiveIdx ? "opacity-60" : "opacity-0"
                                        }`}
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* ── Empty state ── */}
                {query.trim() && results.length === 0 && (
                    <div className="py-12 flex flex-col items-center gap-2">
                        <span className="font-Ronzino-Medium text-dark-1 text-[16px] tracking-[-0.025em]">
                            No results for &ldquo;{query}&rdquo;
                        </span>
                        <span className="font-Inter text-gray text-[13px] tracking-[-0.01em]">
                            Try a different keyword.
                        </span>
                    </div>
                )}

                {/* ── Idle hint ── */}
                {!query.trim() && (
                    <div className="py-10 flex flex-col items-center gap-1">
                        <span className="font-Ronzino-Medium text-dark-1 text-[15px] tracking-[-0.02em]">
                            What are you looking for?
                        </span>
                        <span className="font-Inter text-gray text-[12px] tracking-[-0.01em]">
                            Type to search across all products
                        </span>
                    </div>
                )}

                {/* ── Footer hints (desktop only) ── */}
                {results.length > 0 && (
                    <div className="hidden sm:flex border-t border-black/6 px-4 py-2.5 items-center gap-4">
                        {[["↑↓", "navigate"], ["↵", "open"], ["ESC", "close"]].map(([key, label]) => (
                            <span key={key} className="font-Inter text-[10px] text-gray flex items-center gap-1.5 tracking-[0.02em] uppercase">
                                <kbd className="border border-black/10 rounded-md px-1.5 py-0.5 font-Inter text-[10px]">{key}</kbd>
                                {label}
                            </span>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
