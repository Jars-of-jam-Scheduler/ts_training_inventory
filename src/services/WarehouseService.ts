import { Product } from "../models/Product";
import { IProductRepository } from "../repositories/IProductRepository";
import { v4 as uuidv4 } from 'uuid';
import { inject, injectable } from "tsyringe";
import { NotificationService } from "./NotificationService";

@injectable()
export class WarehouseService {
    constructor(
        @inject('IProductRepository') private productRepository: IProductRepository,
        private notificationService: NotificationService
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

    async addProduct(name: string, price: number, quantity: number, criticalQuantity: number = 5): Promise<Product> {
        const newProduct = new Product(
            uuidv4(),
            name,
            price,
            quantity,
            criticalQuantity
        );

        await this.productRepository.addProduct(newProduct);

        return newProduct;
    }

    async updateProduct(
        uuid: string,
        name?: string,
        price?: number,
        quantity?: number,
        criticalQuantity?: number
    ): Promise<Product | undefined> {
        const updatedProduct = await this.productRepository.updateProduct(
            uuid,
            name,
            price,
            quantity,
            criticalQuantity
        );
        
        if (updatedProduct && quantity && quantity <= updatedProduct.getCriticalQuantity()) {
            await this.notificationService.sendLowStockEmail(updatedProduct);
        }

        return updatedProduct;
    }
}