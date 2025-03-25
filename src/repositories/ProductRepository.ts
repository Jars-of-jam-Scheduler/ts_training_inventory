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

    async updateProduct(
        uuid: string,
        name?: string,
        price?: number,
        quantity?: number,
        criticalQuantity?: number
    ): Promise<Product | undefined> {
        const productToUpdate = await this.products.find(p => p.getUuid() === uuid);

        if (productToUpdate) {
            if (name) {
                productToUpdate.setName(name);
            }

            if (price) {
                productToUpdate.setPrice(price);
            }

            if (quantity) {
                productToUpdate.setQuantity(quantity);
            }

            if (criticalQuantity) {
                productToUpdate.setCriticalQuantity(criticalQuantity);
            }

            return productToUpdate;
        } else {
            console.warn(`Produit avec le UUID ${uuid} non trouvé pour la mise à jour.`);
            
            return undefined;
        }
    }

    async findProductByName(name: string): Promise<Product | undefined> {
        return await this.products.find(p => p.getName() === name);
    }
}