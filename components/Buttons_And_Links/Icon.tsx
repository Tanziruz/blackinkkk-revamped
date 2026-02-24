import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface SearchProps {
    variant?: "variant1" | "variant2";
    icon: LucideIcon;
}

export default function Icon({ variant = "variant1", icon: Icon }: SearchProps) {
    return (
        <>
            <div className={clsx(
                "w-9.25 h-9 hover:cursor-pointer hover:scale-110 flex justify-center transition duration-200 items-center flex-wrap rounded-full",
                {
                    "bg-white-15 hover:bg-white-30": variant === "variant1",
                    "bg-white hover:bg-white-80 ": variant === "variant2",
                }
            )}>
                <div className="w-auto h-auto">
                    <Icon color={variant === "variant1" ? "#ffffff" : "#000000"} />
                </div>
            </div>
        </>
    );
}