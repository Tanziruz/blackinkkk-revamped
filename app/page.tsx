import CustomerReviews from "@/components/Home/CustomerReviews";
import Hero from "@/components/Home/Hero";
import OurCollection from "@/components/Home/OurCollection";
import ProductCatalog from "@/components/Home/ProductCatalog";
import Nav from "@/components/Nav";

export default function Home(){
  return (
    <div className="overflow-hidden">
    <Nav/>
    <Hero></Hero>
    <ProductCatalog/>
    <OurCollection/>
    <CustomerReviews/>
    </div>
  );
}