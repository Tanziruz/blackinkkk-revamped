export type ProductTag = "best-seller" | "new" | null;

export interface Product {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image_main: string;
    image_hover: string;
    tag?: ProductTag;
    includeHome?: boolean;
}
