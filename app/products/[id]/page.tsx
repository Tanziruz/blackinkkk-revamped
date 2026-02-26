import { getProductById, getProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) return { title: "Product Not Found" };
    return {
        title: `${product.title} — BlackInkkk`,
        description: product.description ?? `Shop ${product.title} at BlackInkkk.`,
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return <ProductDetail product={product} />;
}
