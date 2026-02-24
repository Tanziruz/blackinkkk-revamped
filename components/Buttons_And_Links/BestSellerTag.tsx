import { Crown } from "lucide-react";

export default function BestSellerTag() {
    return (
        // <>
            <div className="w-fit flex justify-between items-center bg-black rounded-full px-[12px] py-[5px] gap-[5px]">
                <Crown size={12} color="#ffffff" />
                <p className="font-Ronzino-Medium text-white text-[11px] lg:text-[14px] tracking-[-0.03em] leading-[1.5em]   ">Best Seller</p>
            </div>
        // </>
    );
}