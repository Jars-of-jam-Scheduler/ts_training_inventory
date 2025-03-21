import { Product } from '../../models/Product';

describe('Product', () => {
    let product: Product;

    beforeEach(() => {
        product = new Product('123', 'Test Product', 10.0, 5);
    });

    test('should create a new product with correct properties', () => {
        expect(product.getUuid()).toBe('123');
        expect(product.getName()).toBe('Test Product');
        expect(product.getPrice()).toBe(10.0);
        expect(product.getQuantity()).toBe(5);
    });

    test('should update product properties correctly', () => {
        product.setName('Updated Product');
        product.setPrice(20.0);
        product.setQuantity(10);

        expect(product.getName()).toBe('Updated Product');
        expect(product.getPrice()).toBe(20.0);
        expect(product.getQuantity()).toBe(10);
    });
});