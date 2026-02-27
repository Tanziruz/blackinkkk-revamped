"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

interface ImageDropZoneProps {
    label: string;
    value: string; // current image URL
    onChange: (url: string) => void;
}

async function uploadFile(file: File): Promise<string> {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Upload failed");
    const { url } = await res.json();
    return url;
}

export default function ImageDropZone({ label, value, onChange }: ImageDropZoneProps) {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleFile(file: File) {
        if (!file.type.startsWith("image/")) {
            setError("Only image files are allowed.");
            return;
        }
        setError("");
        setUploading(true);
        try {
            const url = await uploadFile(file);
            onChange(url);
        } catch {
            setError("Upload failed. Try again.");
        } finally {
            setUploading(false);
        }
    }

    function onDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }

    function onInputChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-white/60 text-xs tracking-widest uppercase">{label}</label>
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`
                    relative border border-dashed rounded-none cursor-pointer
                    flex items-center justify-center overflow-hidden
                    transition-colors h-36
                    ${dragging ? "border-white/70 bg-white/10" : "border-white/20 bg-white/5 hover:border-white/40"}
                `}
            >
                {value ? (
                    <Image
                        src={value}
                        alt="preview"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                        {uploading ? (
                            <span className="text-white/40 text-xs">Uploading…</span>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                <span className="text-white/30 text-xs">Drop or click to upload</span>
                            </>
                        )}
                    </div>
                )}
                {/* Uploading overlay */}
                {uploading && value && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white/60 text-xs">Uploading…</span>
                    </div>
                )}
            </div>
            {value && (
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onChange(""); }}
                    className="text-white/30 text-xs hover:text-red-400 transition-colors text-left"
                >
                    Remove
                </button>
            )}
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onInputChange}
            />
        </div>
    );
}
