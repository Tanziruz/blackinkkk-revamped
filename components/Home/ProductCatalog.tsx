import ProductGrid from "../ProductGrid";
import { Sparkle } from "lucide-react";
import CatalogHeading from "../CatalogHeading";

export default function ProductCatalog() {
    return (
        <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16 flex flex-col gap-3 md:gap-4 lg:gap-5 w-full overflow-hidden">
            <CatalogHeading Tagtitle="New Arrivals" TagIcon={Sparkle} buttonTitle="See all collections" HeadingTitle1="Fresh fits in" HeadingTitle2="our latest drop" hrefButton="/products" hrefTag="/products"/>
            <ProductGrid />
        </section>
    );
}
