import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface SearchProps {
    variant?: "variant1" | "variant2" | "variant3";
    icon: LucideIcon;
    onClick?: () => void;
    className?: string;
}

export default function Icon({ variant = "variant1", icon: IconComponent, onClick, className }: SearchProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "w-9.25 h-9 hover:cursor-pointer hover:scale-110 flex justify-center transition duration-200 items-center rounded-full",
                {
                    "bg-white-15 hover:bg-white-30": variant === "variant1",
                    "bg-white hover:bg-white-80 shadow-md": variant === "variant2",
                    "bg-black hover:bg-black/80": variant === "variant3",
                },
                className
            )}
        >
            <IconComponent color={variant === "variant2" ? "#000000" : "#ffffff"} />
        </div>
    );
}