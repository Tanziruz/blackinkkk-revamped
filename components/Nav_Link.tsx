import Link from "next/link";
import clsx from "clsx";

interface NavLinkProps {
    title: string;
    href: string;
    variant?: "light" | "dark";
}

export default function Nav_Link({ title, href, variant = "light" }: NavLinkProps) {
    return (
        <Link href={href}>
            <p className={clsx(
                "t16 hover:cursor-pointer transition duration-300",
                {
                    "text-white hover:text-white-60": variant === "light",
                    "text-black hover:text-black-80": variant === "dark",
                }
            )}>{title}</p>
        </Link>
    );
}