import type { Product } from "@/types/product";
import clientPromise from "./mongodb";

const DB = "blackinkkk";
const COLLECTION = "products";

async function collection() {
    const client = await clientPromise;
    return client.db(DB).collection<Product>(COLLECTION);
}

export async function getProducts(): Promise<Product[]> {
    const col = await collection();
    return col.find({}, { projection: { _id: 0 } }).toArray();
}

export async function getHomeProducts(): Promise<Product[]> {
    const col = await collection();
    return col.find({ includeHome: true }, { projection: { _id: 0 } }).toArray();
}

export async function getProductById(id: string): Promise<Product | null> {
    const col = await collection();
    return col.findOne({ id }, { projection: { _id: 0 } });
}
