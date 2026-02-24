import { Search } from "lucide-react";
import clsx from "clsx";

interface SearchProps {
    variant?: "search1" | "search2";
}

export default function Nav_Search({ variant = "search1" }: SearchProps) {
    return (
        <>
            <div className={clsx(
                "w-9.25 h-9 hover:cursor-pointer hover:scale-110 flex justify-center transition duration-200 items-center flex-wrap rounded-full",
                {
                    "bg-white-15 hover:bg-white-30 ": variant === "search1",
                    "bg-white hover:bg-white-20": variant === "search2",
                }
            )}>
                <div className="w-auto h-auto">
                    <Search color={variant === "search1" ? "#ffffff" : "#000000"} />
                </div>
            </div>
        </>
    );
}