import { ProductRepository } from '../../repositories/ProductRepository';
import { Product } from '../../models/Product';

describe('ProductRepository', () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
  });

  test('should return an empty array when no products are added', async () => {
    const products = await repository.getProducts();
    expect(products).toEqual([]);
  });

  test('should add a product to the repository', async () => {
    const product = new Product('1', 'Product A', 5.0, 2);
    await repository.addProduct(product);
    const products = await repository.getProducts();
    expect(products).toEqual([product]);
  });

  test('should update the quantity of an existing product', async () => {
    const product1 = new Product('1', 'Product A', 5.0, 2);
    await repository.addProduct(product1);
    await repository.updateProduct('1', 10);
    const products = await repository.getProducts();
    expect(products[0].getQuantity()).toBe(10);
  });

  test('should not update quantity if product UUID is not found', async () => {
    const product1 = new Product('1', 'Product A', 5.0, 2);
    await repository.addProduct(product1);
    await repository.updateProduct('2', 10);
    const products = await repository.getProducts();
    expect(products[0].getQuantity()).toBe(2);
  });

  test('should find a product by name', async () => {
    const product1 = new Product('1', 'Product A', 5.0, 2);
    const product2 = new Product('2', 'Product B', 10.0, 5);
    await repository.addProduct(product1);
    await repository.addProduct(product2);
    const foundProduct = await repository.findProductByName('Product A');
    expect(foundProduct).toEqual(product1);
    const notFoundProduct = await repository.findProductByName('Product C');
    expect(notFoundProduct).toBeUndefined();
  });
});
