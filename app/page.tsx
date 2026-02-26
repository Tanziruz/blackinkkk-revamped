import StayConnected from "@/components/Home/StayConnected";
import Hero from "@/components/Home/Hero";
import OurCollection from "@/components/Home/OurCollection";
import ProductCatalog from "@/components/Home/ProductCatalog";

export default function Home(){
  return (
    <div className="overflow-hidden">
      <Hero />
      <ProductCatalog />
      <OurCollection />
      <StayConnected />
    </div>
  );
}