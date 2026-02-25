"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Buttons_And_Links/Button";
import Icon from "./Buttons_And_Links/Icon";
import Nav_Link from "./Buttons_And_Links/NavLink";

const mobileLinks = ["Home", "About", "Shop", "Contact"] as const;

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.9);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isLight = !scrolled && !menuOpen;
    const linkVariant = isLight ? "light" : "dark";
    const iconVariant = isLight ? "variant1" : "variant2";

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
                scrolled || menuOpen ? "bg-white shadow-sm" : "bg-transparent"
            }`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* ── Desktop ── */}
            <div className="hidden md:grid grid-cols-3 items-center py-2 px-5">
                <motion.span
                    className={`font-Krona uppercase text-[17px] tracking-[-0.03em] leading-[1.4em] transition duration-300 justify-self-start hover:scale-105 ${
                        scrolled ? "text-black" : "text-white"
                    }`}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href="/">BlackInkkk</Link>
                </motion.span>

                <div className="flex justify-center items-center gap-6 backdrop-blur-xs rounded-full px-4 py-2">
                    {(["Home", "Shop", "About", "Contact"] as const).map((title, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Nav_Link variant={scrolled ? "dark" : "light"} title={title} href={`#${title.toLowerCase()}`} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="flex justify-end items-center gap-2.5 px-4 py-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Icon icon={Search} variant={scrolled ? "variant2" : "variant1"} />
                    <Button variant={scrolled ? "btn2" : "btn1"} title="Shop All Items" />
                </motion.div>
            </div>

            <div className="flex md:hidden justify-between items-center py-3 px-5">
                <motion.span
                    className={`font-Krona uppercase text-[17px] tracking-[-0.03em] leading-[1.4em] transition duration-300 ${
                        isLight ? "text-white" : "text-black"
                    }`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href="/">BlackInkkk</Link>
                </motion.span>

                <motion.div
                    className="flex items-center gap-2.5"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Icon icon={Search} variant={iconVariant} />
                    <motion.div
                        animate={{ rotate: menuOpen ? 135 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Icon
                            icon={menuOpen ? X : Plus}
                            variant={menuOpen ? "variant3" : iconVariant}
                            onClick={() => setMenuOpen((o) => !o)}
                        />
                    </motion.div>
                </motion.div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="md:hidden overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex flex-col items-center gap-8 pb-10 pt-6">
                            {mobileLinks.map((title, i) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ delay: 0.05 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Nav_Link variant={linkVariant} title={title} href={`#${title.toLowerCase()}`} />
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ delay: 0.05 + mobileLinks.length * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Button variant="btn2" title="Shop all items" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
