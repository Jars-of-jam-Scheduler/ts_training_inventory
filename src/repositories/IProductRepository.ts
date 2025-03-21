import { Product } from "../models/Product";

export interface IProductRepository {
    getProducts(): Array<Product>,
    addProduct(product: Product): void,
    updateProduct(uuid: string, quantity: number): void,
    findProductByName(name: string): Product | undefined
}