import Hero from "@/components/Home/Hero";
import ProductCatalog from "@/components/Home/ProductCatalog";
import Nav from "@/components/Nav";

export default function Home(){
  return (
    <div className="overflow-hidden">
    <Nav/>
    <Hero></Hero>
    <ProductCatalog/>
    </div>
  );
}