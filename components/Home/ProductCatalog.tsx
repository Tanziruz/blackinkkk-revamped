import Tag_Link from "../Buttons_And_Links/TagLink";
import Button from "../Buttons_And_Links/Button";
import ProductGrid from "./ProductGrid";
import { Sparkle } from "lucide-react";

export default function ProductCatalog() {
    return (
        <section className="px-5 md:px-10 py-10 flex flex-col gap-4 w-full overflow-hidden">
            <Tag_Link title="New Arrivals" leftIcon={Sparkle} />
            <div className="flex items-end justify-between gap-4">
                <h2 className="mb-20 !min-w-0 ">Fresh fits in<br />our latest drop</h2>
                <Button variant="btn2" title="See all collections" />
            </div>
            <ProductGrid />
        </section>
    );
}
