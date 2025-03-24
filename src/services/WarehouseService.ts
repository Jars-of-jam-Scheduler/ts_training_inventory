import { Product } from "../models/Product";
import { IProductRepository } from "../repositories/IProductRepository";
import { v4 as uuidv4 } from 'uuid';
import { inject, injectable } from "tsyringe";

@injectable()
export class WarehouseService {
    constructor(
        @inject('IProductRepository') private productRepository: IProductRepository
    ) {
    }

    async getProducts(): Promise<Array<Product>> {
        return await this.productRepository.getProducts();
    }

    async getTotalPrice(): Promise<number> {
        const products = await this.productRepository.getProducts();

        return products.reduce((sum, product) => sum + product.getPrice() * product.getQuantity(), 0);
    }

    async findProduct(name: string): Promise<Product | undefined> {
        return await this.productRepository.findProductByName(name);
    }

    async addProduct(name: string, price: number, quantity: number): Promise<Product> {
        const newProduct = new Product(
            uuidv4(),
            name,
            price,
            quantity
        );

        await this.productRepository.addProduct(newProduct);

        return newProduct;
    }

    async updateProduct(uuid: string, quantity: number): Promise<void> {
        await this.productRepository.updateProduct(uuid, quantity);
    }
}