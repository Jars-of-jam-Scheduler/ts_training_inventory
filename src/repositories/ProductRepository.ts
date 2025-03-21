import { Product } from "../models/Product";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
    private products: Array<Product> = [];

    getProducts(): Array<Product> {
        return this.products;
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }

    updateProduct(uuid: string, quantity: number): void {
        const productToUpdate = this.products.find(p => p.getUuid() === uuid);
        
        if (productToUpdate) {
            productToUpdate.setQuantity(quantity);
        } else {
            console.warn(`Produit avec le UUID ${uuid} non trouvé pour la mise à jour.`);
        }
    }

    findProductByName(name: string): Product | undefined {
        return this.products.find(p => p.getName() === name);
    }
}