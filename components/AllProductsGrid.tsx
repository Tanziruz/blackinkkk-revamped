import { getProducts } from "@/lib/products";
import FilterableProductsGrid from "@/components/FilterableProductsGrid";

export default async function AllProductsGrid() {
    const products = await getProducts();
    return <FilterableProductsGrid products={products} />;
}
