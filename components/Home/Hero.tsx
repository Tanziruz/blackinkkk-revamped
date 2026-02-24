import { Mail } from "lucide-react";
import InfoCard from "../Cards/InfoCard";


export default function Home(){
    return (
        <>
        <section className="h-dvh max-w-screen w-full overflow-x-hidden flex flex-col justify-center items-center">
            <h1 className="text-center">Premium Wear For Modern Living</h1>
          <p className="t18 text-center"  >Discover our new range of soft clothes made for your daily look and your best days with the finest fabrics.</p>
            <InfoCard title="Email Address" info="contact@blackinkkk.com" icon={Mail}/>
        </section>
        </>
    );
}