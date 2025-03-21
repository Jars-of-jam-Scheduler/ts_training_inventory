import { ProductRepository } from '../../repositories/ProductRepository';
import { Product } from '../../models/Product';

describe('ProductRepository', () => {
    let repository: ProductRepository;

    beforeEach(() => {
        repository = new ProductRepository();
    });

    test('should return an empty array when no products are added', () => {
        expect(repository.getProducts()).toEqual([]);
    });

    test('should add a product to the repository', () => {
        const product = new Product('1', 'Product A', 5.0, 2);
        repository.addProduct(product);
        expect(repository.getProducts()).toEqual([product]);
    });

    test('should update the quantity of an existing product', () => {
        const product1 = new Product('1', 'Product A', 5.0, 2);
        repository.addProduct(product1);
        repository.updateProduct('1', 10);
        expect(repository.getProducts()[0].getQuantity()).toBe(10);
    });

    test('should not update quantity if product UUID is not found', () => {
        const product1 = new Product('1', 'Product A', 5.0, 2);
        repository.addProduct(product1);
        repository.updateProduct('2', 10);
        expect(repository.getProducts()[0].getQuantity()).toBe(2);
    });

    test('should find a product by name', () => {
        const product1 = new Product('1', 'Product A', 5.0, 2);
        const product2 = new Product('2', 'Product B', 10.0, 5);
        repository.addProduct(product1);
        repository.addProduct(product2);
        expect(repository.findProductByName('Product A')).toEqual(product1);
        expect(repository.findProductByName('Product C')).toBeUndefined();
    });
});