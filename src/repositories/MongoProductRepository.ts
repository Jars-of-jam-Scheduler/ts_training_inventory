import { IProductRepository } from './IProductRepository';
import { Product } from '../models/Product';
import ProductModel from '../models/ProductModel';
import { IProductDocument } from '../models/IProductDocument';
import { injectable } from 'tsyringe';

@injectable()
export class MongoProductRepository implements IProductRepository {
    async getProducts(): Promise<Array<Product>> {
        const products = await ProductModel.find<IProductDocument>();
        return products.map(p => new Product(p.uuid, p.name, p.price, p.quantity, p.criticalQuantity, p._id));
    }

    async addProduct(product: Product): Promise<void> {
        const newProduct = new ProductModel({
            uuid: product.getUuid(),
            name: product.getName(),
            price: product.getPrice(),
            quantity: product.getQuantity(),
            criticalQuantity: product.getCriticalQuantity(),
        });
        await newProduct.save();
    }

    async updateProduct(
        uuid: string,
        name?: string,
        price?: number,
        quantity?: number,
        criticalQuantity?: number
    ): Promise<Product | undefined> {
        const updatedDocument = await ProductModel.findOneAndUpdate<IProductDocument>(
            { uuid: uuid },
            {
                name: name,
                price: price,
                quantity: quantity,
                criticalQuantity: criticalQuantity
            },
            { new: true }
        )
            .exec();

        if (updatedDocument) {
            return new Product(
                updatedDocument.uuid,
                updatedDocument.name,
                updatedDocument.price,
                updatedDocument.quantity,
                updatedDocument.criticalQuantity,
                updatedDocument._id
            );
        }

        return undefined;
    }

    async findProductByName(name: string): Promise<Product | undefined> {
        const product = await ProductModel.findOne<IProductDocument>({ name: name });
        if (product) {
            return new Product(product.uuid, product.name, product.price, product.quantity, product.criticalQuantity, product._id);
        }
        return undefined;
    }
}