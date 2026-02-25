import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
    icon: LucideIcon;
    info: string;
    title: string;
}


export default function InfoCard({ icon: Icon, info, title }: InfoCardProps) {
    return (
        <>
            <div className="w-88.25 h-fit flex flex-col justify-center items-center gap-9.5 p-5.5 bg-beige overflow-hidden rounded-xl ">
                <div className="size-15 flex justify-center items-center bg-bg overflow-clip rounded-lg">
                        <Icon color="#000000" size={28} />  
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <p className="t20 text-black text-center lg:min-w-0! mb-1 ">{title}</p>
                    <p className="t18 text-center lg:min-w-0! mb-0">{info}</p>
                </div>
            </div>
        </>
    );
}