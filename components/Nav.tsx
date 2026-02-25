"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Button from "./Buttons_And_Links/Button";
import Icon from "./Buttons_And_Links/Icon";
import Nav_Link from "./Buttons_And_Links/NavLink";

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.9);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full grid grid-cols-3 items-center py-2 px-5 z-50 transition-colors duration-300 ${
            scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}>
            <span className={`font-Krona uppercase text-[17px] tracking-[-0.03em] leading-[1.4em] transition duration-300 justify-self-start hover:scale-105 transition  ${
                scrolled ? "text-black" : "text-white"
            }`}>
                <Link href="/">BlackInkkk</Link>
            </span>
            <div className="flex justify-center items-center gap-6 backdrop-blur-xs rounded-full px-4 py-2">
                <Nav_Link variant={scrolled ? "dark" : "light"} title="Home" href="#home" />
                <Nav_Link variant={scrolled ? "dark" : "light"} title="Shop" href="#shop" />
                <Nav_Link variant={scrolled ? "dark" : "light"} title="About" href="#about" />
                <Nav_Link variant={scrolled ? "dark" : "light"} title="Contact" href="#contact" />
            </div>
            <div className="flex justify-end items-center gap-2.5 backdrop-blur-xs rounded-full px-4 py-2">
                <Icon icon={Search} variant={scrolled ? "variant2" : "variant1"} />
                <Button variant={scrolled ? "btn2" : "btn1"} title="Shop All Items" />
            </div>
        </nav>
    );
}
