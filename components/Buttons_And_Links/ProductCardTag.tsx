import { Sparkles } from "lucide-react";

export default function ProductCardTag() {
    return (
        // <>
            <div className="w-fit flex justify-between items-center bg-white rounded-full px-[12px] py-[5px] gap-[5px]">
                <Sparkles size={12} color="#000000" />
                <p className="font-Ronzino-Medium text-black text-[11px] lg:text-[14px] tracking-[-0.03em] leading-[1.5em]   ">New</p>
            </div>
        // </>
    );
}