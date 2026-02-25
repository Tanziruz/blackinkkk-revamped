import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    title: string;
    info: string;
    icon: LucideIcon;
}


export default function FeatureCard({ title, info, icon: Icon }: FeatureCardProps) {
    return (
        <>
            <div className="h-fit w-69.25 flex flex-col justify-center gap-9.5 items-start p-5 rounded-xl bg-beige overflow-clip ">
                <div className="rounded-full bg-white w-11 h-11 flex justify-center items-center ">
                    <Icon color="#000000" size={20} />
                </div>
                <div className="w-full">
                    <p className="t20 mb-3 lg:min-w-0!">{title}</p>
                    <p className="t16 w-full lg:min-w-0!">{info}</p>
                </div>
            </div>
        </>
    );
}