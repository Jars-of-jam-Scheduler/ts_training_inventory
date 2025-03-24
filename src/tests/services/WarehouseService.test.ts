import { WarehouseService } from '../../services/WarehouseService';
import { IProductRepository } from '../../repositories/IProductRepository';
import { Product } from '../../models/Product';

const mockProductRepository = {
  getProducts: jest.fn(),
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
  findProductByName: jest.fn(),
} as jest.Mocked<IProductRepository>;

describe('WarehouseService', () => {
  let service: WarehouseService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new WarehouseService(mockProductRepository);
  });

  test('getProducts should call the repository method', async () => {
    await service.getProducts();
    expect(mockProductRepository.getProducts).toHaveBeenCalledTimes(1);
  });

  test('getTotalPrice should calculate the correct total price', async () => {
    mockProductRepository.getProducts.mockResolvedValue([
      new Product('1', 'Product A', 5.0, 2),
      new Product('2', 'Product B', 10.0, 3),
    ]);
    const total = await service.getTotalPrice();
    expect(total).toBe(40);
  });

  test('findProduct should call the repository method', async () => {
    const productName = 'Test Product';
    await service.findProduct(productName);
    expect(mockProductRepository.findProductByName).toHaveBeenCalledWith(productName);
  });

  test('addProduct should create a new product and call the repository', async () => {
    const productName = 'New Product';
    const productPrice = 15.0;
    const productQuantity = 1;
    await service.addProduct(productName, productPrice, productQuantity);
    expect(mockProductRepository.addProduct).toHaveBeenCalledTimes(1);
  });

  test('updateProduct should call the repository method', async () => {
    const productId = 'some-uuid';
    const newQuantity = 5;
    await service.updateProduct(productId, newQuantity);
    expect(mockProductRepository.updateProduct).toHaveBeenCalledWith(productId, newQuantity);
  });
});
