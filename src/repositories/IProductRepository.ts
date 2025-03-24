import { Product } from "../models/Product";

export interface IProductRepository {
    getProducts(): Promise<Array<Product>>,
    addProduct(product: Product): Promise<void>,
    updateProduct(uuid: string, quantity: number): Promise<void>,
    findProductByName(name: string): Promise<Product | undefined>
}