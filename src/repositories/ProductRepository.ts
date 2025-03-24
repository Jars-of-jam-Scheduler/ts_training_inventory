import { injectable } from "tsyringe";
import { Product } from "../models/Product";
import { IProductRepository } from "./IProductRepository";

@injectable()
export class ProductRepository implements IProductRepository {
    private products: Array<Product> = [];

    async getProducts(): Promise<Array<Product>> {
        return await this.products;
    }

    async addProduct(product: Product): Promise<void> {
        await this.products.push(product);
    }

    async updateProduct(uuid: string, quantity: number): Promise<void> {
        const productToUpdate = await this.products.find(p => p.getUuid() === uuid);
        
        if (productToUpdate) {
            productToUpdate.setQuantity(quantity);
        } else {
            console.warn(`Produit avec le UUID ${uuid} non trouvé pour la mise à jour.`);
        }
    }

    async findProductByName(name: string): Promise<Product | undefined> {
        return await this.products.find(p => p.getName() === name);
    }
}