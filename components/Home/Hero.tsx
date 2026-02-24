import { Search, Tag } from "lucide-react";
import Button from "../Button";
import Nav_Search from "../Nav_Search";
import Nav_Link from "../Nav_Link";
import Tag_Link from "../Tag_Link";
import Footer_Link from "./Footer_Link";

export default function Home(){
    return (
        <>
        <section className="h-dvh w-screen flex flex-col justify-center items-center">
            <h1 className="text-center">Premium Wear For Modern Living</h1>
            <p className="t18 text-center"  >Discover our new range of soft clothes made for your daily look and your best days with the finest fabrics.</p>
            <Button title="Shop Now" variant="btn1"></Button>
            <Tag_Link title="Shop"/>
            <Footer_Link title="Shop"/>
        </section>
        </>
    );
}