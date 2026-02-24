import { ArrowUpRight } from "lucide-react";

export default function Icon() {
    return (
        <>
            <div className="w-7.5 h-7.5 hover:cursor-pointer hover:scale-110 flex justify-center bg-white hover:bg-white-80 transition-all duration-300 ease-out items-center flex-wrap rounded-full overflow-hidden opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100">
                <div className="w-auto h-auto translate-x-[-8px] translate-y-[8px] opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <ArrowUpRight color="#000000" size={15} />
                </div>
            </div>
        </>
    );
}