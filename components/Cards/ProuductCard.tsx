"use client";
import Image from "next/image";
import ProductImageSwitch from "../Buttons_And_Links/ProductImageSwitch";
import { useState } from "react";

interface ProductCardProps {
    image_main: string;
    image_hover: string;
    tag?: React.ReactNode;
    title: string;
    price: string;
    originalPrice?: string;
}

export default function ProductCard({ image_main, image_hover, tag, title, price, originalPrice }: ProductCardProps) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className="group w-full max-w-[373px] h-fit hover:cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div id="product-image" className="relative w-full aspect-[373/420] rounded-2xl overflow-hidden pl-2 pt-2">
                <div className="relative top-0 left-0 z-10">
                    {tag}
                </div>
                <Image src={image_main} alt="Product_Image" fill className="object-cover object-center transition-opacity duration-500 opacity-100 group-hover:opacity-0"/>
                <Image src={image_hover} alt="Product_Image_Hover" fill className="object-cover object-center transition-opacity duration-500 opacity-0 group-hover:opacity-100"/>
            </div>

            <div className=" px-1">
                <p className="t16 mt-3 mb-0 text-black font-[520]">{title}</p>
                <div className="flex justify-between items-center ">
                    <div className="flex items-center gap-2">
                        <p className="font-Ronzino-Medium text-black text-[22px] tracking-[-0.03em] leading-[1.5em] mb-0">{price}</p>
                        <p className="font-Ronzino-Medium text-gray-2 text-[15px] tracking-[-0.035em] leading-[1.5em] line-through">{originalPrice}</p>
                    </div>
                    <div className="flex items-center gap-2 relative bottom-4">
                        <ProductImageSwitch image={image_main} isActive={!hovered}/>
                        <ProductImageSwitch image={image_hover} isActive={hovered}/>
                    </div>
                    </div>
                </div>
            </div>
    );
}