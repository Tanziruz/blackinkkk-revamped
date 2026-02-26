import { getProducts } from "@/lib/products";
import NavBar from "./Nav";

export default async function NavWrapper() {
    const products = await getProducts();
    return <NavBar products={products} />;
}
