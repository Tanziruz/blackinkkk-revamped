"use client";

import { allCountries } from "country-telephone-data";
import { Mail, Phone, MapPin, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { z } from "zod";

const countryList = allCountries
    .filter((c) => c.priority === 0)
    .map((c) => ({ iso2: c.iso2, name: c.name.replace(/\s*\(.*\)\s*$/, ""), dial: `+${c.dialCode}` }));

const contactSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    phone: z
        .string()
        .min(7, "Phone number is too short")
        .regex(/^[+\d\s\-().]+$/, "Enter a valid phone number"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFields = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactFields, string>>;

const empty: ContactFields = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

function InfoCard({ icon: Icon, value, label }: { icon: typeof Mail; value: string; label: string }) {
    return (
        <div className="flex-1 min-w-0 flex flex-col items-center gap-3 bg-beige rounded-2xl px-6 py-6 text-center">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-black shrink-0">
                <Icon size={20} color="#ffffff" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-0.5">
                <p className="font-Inter text-black font-medium text-[15px] tracking-[-0.02em] leading-snug mb-0!">
                    {value}
                </p>
                <p className="font-Inter text-black/50 text-[13px] tracking-[-0.01em] leading-none mb-0!">
                    {label}
                </p>
            </div>
        </div>
    );
}

const inputBase =
    "w-full bg-white rounded-xl px-4 py-3 font-Inter text-[14px] text-black placeholder:text-black/35 tracking-[-0.02em] outline-none focus:ring-2 transition";

function Field({
    label,
    type = "text",
    placeholder,
    value,
    error,
    className = "",
    onChange,
    onBlur,
}: {
    label: string;
    type?: string;
    placeholder: string;
    value: string;
    error?: string;
    className?: string;
    onChange: (v: string) => void;
    onBlur: () => void;
}) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="font-Inter text-black text-[14px] tracking-[-0.02em] font-medium">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                suppressHydrationWarning
                className={`${inputBase} ${error ? "ring-2 ring-red-400" : "focus:ring-black/10"}`}
            />
            {error && (
                <p className="font-Inter text-red-500 text-[12px] tracking-[-0.01em] mb-0!">{error}</p>
            )}
        </div>
    );
}

export default function ContactForm() {
    const [values, setValues] = useState<ContactFields>(empty);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const [dialCode, setDialCode] = useState("+91");
    const [phoneNum, setPhoneNum] = useState("");
    const [countrySearch, setCountrySearch] = useState("");

    function set(field: keyof ContactFields) {
        return (v: string) => {
            setValues((prev) => ({ ...prev, [field]: v }));
            const result = contactSchema.shape[field].safeParse(v);
            if (result.success) setErrors((prev) => ({ ...prev, [field]: undefined }));
        };
    }

    function handleDialChange(code: string) {
        setDialCode(code);
        const full = (code + " " + phoneNum).trim();
        setValues((prev) => ({ ...prev, phone: full }));
        const result = contactSchema.shape.phone.safeParse(full);
        if (result.success) setErrors((prev) => ({ ...prev, phone: undefined }));
    }

    function handlePhoneNum(num: string) {
        setPhoneNum(num);
        const full = (dialCode + " " + num).trim();
        setValues((prev) => ({ ...prev, phone: full }));
        const result = contactSchema.shape.phone.safeParse(full);
        if (result.success) setErrors((prev) => ({ ...prev, phone: undefined }));
    }

    function blurField(field: keyof ContactFields) {
        return () => {
            const result = contactSchema.shape[field].safeParse(values[field]);
            setErrors((prev) => ({
                ...prev,
                [field]: result.success ? undefined : result.error.issues[0].message,
            }));
        };
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const result = contactSchema.safeParse(values);
        if (!result.success) {
            const fieldErrors: FieldErrors = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof ContactFields;
                if (!fieldErrors[key]) fieldErrors[key] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});
        setSubmitted(true);
        setValues(empty);
        setPhoneNum("");
    }

    return (
        <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-14 lg:py-18 flex flex-col gap-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard icon={Mail} value="Blackinkkk@aol.com" label="Email Address" />
                <InfoCard icon={Phone} value="+91 98103 67883" label="Phone Number" />
                <InfoCard icon={MapPin} value="Ghaziabad, Uttar Pradesh 201001" label="Location" />
            </div>

            <div className="flex flex-col lg:flex-row gap-0 bg-beige rounded-2xl overflow-hidden">

                <div className="relative w-full lg:w-[38%] aspect-4/3 lg:aspect-auto lg:min-h-135 shrink-0">
                    <Image src="/Contact.avif" alt="Contact" fill className="object-cover object-center" />
                </div>

                <form className="flex-1 flex flex-col gap-4 px-6 sm:px-8 py-8" onSubmit={handleSubmit} noValidate>

                    {submitted && (
                        <div className="bg-black text-white font-Inter text-[14px] tracking-[-0.02em] rounded-xl px-4 py-3">
                            Message sent! We&apos;ll get back to you soon.
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="First Name" placeholder="Nasir" value={values.firstName} error={errors.firstName} onChange={set("firstName")} onBlur={blurField("firstName")} />
                        <Field label="Last Name" placeholder="Nawaz" value={values.lastName} error={errors.lastName} onChange={set("lastName")} onBlur={blurField("lastName")} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Email" type="email" placeholder="test@gmail.com" value={values.email} error={errors.email} onChange={set("email")} onBlur={blurField("email")} />
                        {/* Phone — country dial-code dropdown + number input */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-Inter text-black text-[14px] tracking-[-0.02em] font-medium">Phone No</label>
                            <div className={`flex rounded-xl overflow-hidden bg-white transition ${
                                errors.phone ? "ring-2 ring-red-400" : "focus-within:ring-2 focus-within:ring-black/10"
                            }`}>
                                <DropdownMenu onOpenChange={() => setCountrySearch("")}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            type="button"
                                            className="flex items-center gap-1.5 shrink-0 border-r border-black/10 px-3 py-3 font-Inter text-[14px] text-black tracking-[-0.02em] outline-none cursor-pointer hover:bg-black/3 transition"
                                        >
                                            {dialCode}
                                            <ChevronDown size={13} className="text-black/50" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-72 overflow-hidden p-0" align="start">
                                        <div className="px-2 pt-2 pb-1.5 border-b border-black/10 bg-popover">
                                            <div className="flex items-center gap-2 rounded-lg bg-black/5 px-2.5 py-1.5">
                                                <Search size={13} className="text-black/40 shrink-0" />
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Search country or code..."
                                                    value={countrySearch}
                                                    onChange={(e) => setCountrySearch(e.target.value)}
                                                    className="flex-1 bg-transparent font-Inter text-[13px] text-black placeholder:text-black/40 tracking-[-0.01em] outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-56 overflow-y-auto">
                                            {countryList
                                                .filter(
                                                    (c) =>
                                                        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
                                                        c.dial.includes(countrySearch)
                                                )
                                                .map((c) => (
                                                    <DropdownMenuItem
                                                        key={c.iso2}
                                                        onSelect={() => handleDialChange(c.dial)}
                                                        className="flex gap-2 items-center px-3 py-2 font-Inter text-[13px] tracking-[-0.01em] cursor-pointer rounded-none"
                                                    >
                                                        <span className="w-10 shrink-0 text-black/55">{c.dial}</span>
                                                        <span className="text-black">{c.name}</span>
                                                    </DropdownMenuItem>
                                                ))}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <input
                                    type="tel"
                                    placeholder="98103 67883"
                                    value={phoneNum}
                                    onChange={(e) => handlePhoneNum(e.target.value)}
                                    onBlur={() => {
                                        const full = (dialCode + " " + phoneNum).trim();
                                        const result = contactSchema.shape.phone.safeParse(full);
                                        setErrors((prev) => ({
                                            ...prev,
                                            phone: result.success ? undefined : result.error.issues[0].message,
                                        }));
                                    }}
                                    suppressHydrationWarning
                                    className="flex-1 min-w-0 bg-transparent px-4 py-3 font-Inter text-[14px] text-black placeholder:text-black/35 tracking-[-0.02em] outline-none"
                                />
                            </div>
                            {errors.phone && (
                                <p className="font-Inter text-red-500 text-[12px] tracking-[-0.01em] mb-0!">{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <Field label="Subject" placeholder="Enquiry ...." value={values.subject} error={errors.subject} onChange={set("subject")} onBlur={blurField("subject")} />

                    <div className="flex flex-col gap-1.5">
                        <label className="font-Inter text-black text-[14px] tracking-[-0.02em] font-medium">Message</label>
                        <textarea
                            placeholder="Enter message here..."
                            rows={5}
                            value={values.message}
                            onChange={(e) => set("message")(e.target.value)}
                            onBlur={blurField("message")}
                            suppressHydrationWarning
                            className={`${inputBase} resize-y ${errors.message ? "ring-2 ring-red-400" : "focus:ring-black/10"}`}
                        />
                        {errors.message && (
                            <p className="font-Inter text-red-500 text-[12px] tracking-[-0.01em] mb-0!">{errors.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-Inter text-[15px] tracking-[-0.02em] py-3.5 rounded-2xl hover:bg-black/85 transition duration-200 cursor-pointer"
                    >
                        Send Message
                    </button>
                </form>
            </div>

        </section>
    );
}
