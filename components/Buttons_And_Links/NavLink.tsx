import Link from "next/link";
import clsx from "clsx";

interface NavLinkProps {
    title: string;
    href: string;
    variant: "light" | "dark";
    onClick?: () => void;
}

export default function Nav_Link({ title, href, variant = "light", onClick }: NavLinkProps) {
    return (
        <Link href={href} onClick={onClick}>
            <span className={clsx(
                "btn-anim font-Ronzino-Medium text-[16px] tracking-[-0.03em] leading-[1.55em] hover:cursor-pointer",
                {
                    "text-white": variant === "light",
                    "text-black": variant === "dark",
                }
            )}>
                <span className="btn-label">
                    <span className="btn-label-primary">{title}</span>
                    <span className="btn-label-secondary">{title}</span>
                </span>
            </span>
        </Link>
    );
}