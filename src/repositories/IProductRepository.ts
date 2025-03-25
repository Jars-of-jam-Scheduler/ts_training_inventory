import { Product } from "../models/Product";

export interface IProductRepository {
    getProducts(): Promise<Array<Product>>;
    addProduct(product: Product): Promise<void>;
    updateProduct(
        uuid: string,
        name?: string,
        price?: number,
        quantity?: number,
        criticalQuantity?: number
    ): Promise<Product | undefined>;
    findProductByName(name: string): Promise<Product | undefined>;
}