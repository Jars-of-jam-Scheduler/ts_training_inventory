import { IProductRepository } from './IProductRepository';
import { Product } from '../models/Product';
import ProductModel from '../models/ProductModel';
import { IProductDocument } from '../models/IProductDocument';
import { injectable } from 'tsyringe';

@injectable()
export class MongoProductRepository implements IProductRepository {
    async getProducts(): Promise<Array<Product>> {
        const products = await ProductModel.find<IProductDocument>();
        return products.map(p => new Product(p.uuid, p.name, p.price, p.quantity, p._id));
    }

    async addProduct(product: Product): Promise<void> {
        const newProduct = new ProductModel({
            uuid: product.getUuid(),
            name: product.getName(),
            price: product.getPrice(),
            quantity: product.getQuantity(),
        });
        await newProduct.save();
    }

    async updateProduct(uuid: string, quantity: number): Promise<void> {
        await ProductModel.updateOne({ uuid: uuid }, { quantity: quantity });
    }

    async findProductByName(name: string): Promise<Product | undefined> {
        const product = await ProductModel.findOne<IProductDocument>({ name: name });
        if (product) {
            return new Product(product.uuid, product.name, product.price, product.quantity, product._id);
        }
        return undefined;
    }
}