import StayConnected from "@/components/Home/StayConnected";
import Hero from "@/components/Home/Hero";
import OurCollection from "@/components/Home/OurCollection";
import ProductCatalog from "@/components/Home/ProductCatalog";
import Nav from "@/components/Nav";
import Footer from "@/components/Home/Footer";

export default function Home(){
  return (
    <div className="overflow-hidden">
    <Nav/>
    <Hero></Hero>
    <ProductCatalog/>
    <OurCollection/>
    <StayConnected/>
    <Footer/>
    </div>
  );
}