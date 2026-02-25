import Image from "next/image";

interface ProductImageSwitchProps {
    image: string;
    isActive?: boolean;
}


export default function ProductImageSwitch({ image, isActive = false }: ProductImageSwitchProps) {

    return (
        <div className={`w-[36px] h-[36px] bg-transparent border rounded-full flex justify-center items-center transition-colors duration-300 ${isActive ? "border-black-80" : "border-black-15"}`}>
            <div className="w-[30px] h-[30px] overflow-clip rounded-full z-10 object-contain object-center">
                <Image src={image} alt="Product Image" width={30} height={30} />
            </div>
        </div>
    );
}