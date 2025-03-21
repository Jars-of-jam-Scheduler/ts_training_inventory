import { Product } from "../models/Product";
import { IProductRepository } from "../repositories/IProductRepository";
import { v4 as uuidv4 } from 'uuid';

export class WarehouseService {
    private productRepository: IProductRepository;

    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    getProducts(): Array<Product> {
        return this.productRepository.getProducts();
    }

    getTotalPrice(): number {
        const products = this.productRepository.getProducts();

        return products.reduce((sum, product) => sum + product.getPrice() * product.getQuantity(), 0);
    }

    findProduct(name: string): Product | undefined {
        return this.productRepository.findProductByName(name);
    }

    addProduct(name: string, price: number, quantity: number): Product {
        const newProduct = new Product(
            uuidv4(),
            name,
            price,
            quantity
        );

        this.productRepository.addProduct(newProduct);

        return newProduct;
    }

    updateProduct(uuid: string, quantity: number): void {
        this.productRepository.updateProduct(uuid, quantity);
    }
}