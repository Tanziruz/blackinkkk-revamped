/**
 * Data Access Layer — Products
 *
 * All product data flows through this file.
 * Components never import from `data/products.json` directly.
 *
 * To swap to MongoDB later:
 *  1. Install `mongodb` or `mongoose`
 *  2. Replace the JSON import + return below with your DB query
 *  3. Nothing else changes — no component needs to be touched
 */

import type { Product } from "@/types/product";
import rawProducts from "@/data/products.json";

export async function getProducts(): Promise<Product[]> {
    // --- Current: static JSON ---
    return rawProducts as Product[];

    // --- Future: MongoDB example ---
    // const client = await clientPromise;
    // const db = client.db("blackinkkk");
    // return db.collection<Product>("products").find({}).toArray();
}

export async function getHomeProducts(): Promise<Product[]> {
    const products = await getProducts();
    return products.filter((p) => p.includeHome === true);
}

export async function getProductById(id: string): Promise<Product | null> {
    const products = await getProducts();
    return products.find((p) => p.id === id) ?? null;
}
