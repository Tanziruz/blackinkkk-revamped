import type { LucideIcon } from "lucide-react";

interface SectionTagProps {
    icon: LucideIcon;
    title: string;
}

export default function SectionTag({ icon: Icon, title }: SectionTagProps) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-3 rounded-full bg-white shadow-md">
            <div className="flex items-center justify-center  rounded-full bg-black shrink-0">
                <Icon color="#ffffff"  />
            </div>
            <p className="font-Inter text-black text-[16px] tracking-[-0.02em] leading-none mb-0!">
                {title}
            </p>
        </div>
    );
}