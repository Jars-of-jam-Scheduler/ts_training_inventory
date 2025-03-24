import { WarehouseController } from '../../controllers/WarehouseController';
import { WarehouseService } from '../../services/WarehouseService';
import { Product } from '../../models/Product';
import { IProductRepository } from '../../repositories/IProductRepository';
import { AddProductPayload } from '../../payloads/AddProductPayload';
import { FindProductPayload } from '../../payloads/FindProductPayload';
import { UpdateProductPayload } from '../../payloads/UpdateProductPayload';

const mockProductRepository: jest.Mocked<IProductRepository> = {
  getProducts: jest.fn(),
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
  findProductByName: jest.fn(),
};

const mockWarehouseService: jest.Mocked<WarehouseService> = {
  productRepository: mockProductRepository,
  getProducts: jest.fn(),
  getTotalPrice: jest.fn(),
  findProduct: jest.fn(),
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
} as any;

describe('WarehouseController', () => {
  let controller: WarehouseController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new WarehouseController(mockWarehouseService);
  });

  test('getProducts should return a 200 response with products', async () => {
    const mockProducts = [new Product('1', 'Product A', 10, 5)];
    (mockWarehouseService.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const response = await controller.getProducts();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockProducts);
  });

  test('getTotalPrice should return a 200 response with the total price', async () => {
    (mockWarehouseService.getTotalPrice as jest.Mock).mockResolvedValue(50);

    const response = await controller.getTotalPrice();

    expect(response.status).toBe(200);
    expect(response.data).toBe(50);
  });

  test('findProduct should return a 200 response with the found product', async () => {
    const mockProduct = new Product('1', 'Test Product', 10, 5);
    (mockWarehouseService.findProduct as jest.Mock).mockResolvedValue(mockProduct);
    const payload: FindProductPayload = { name: 'Test Product' };

    const response = await controller.findProduct(payload);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockProduct);
  });

  test('addProduct should return a 201 response with the new product', async () => {
    const mockNewProduct = new Product('2', 'New Product', 20, 1);
    (mockWarehouseService.addProduct as jest.Mock).mockResolvedValue(mockNewProduct);
    const payload: AddProductPayload = { name: 'New Product', price: 20, quantity: 1 };

    const response = await controller.addProduct(payload);

    expect(response.status).toBe(201);
    expect(response.data).toEqual(mockNewProduct);
  });

  test('updateProduct should return a 204 response', async () => {
    const payload: UpdateProductPayload = { uuid: 'some-uuid', quantity: 10 };

    (mockWarehouseService.updateProduct as jest.Mock).mockResolvedValue(undefined);
    const response = await controller.updateProduct(payload);

    expect(response.status).toBe(204);
    expect(response.data).toBeUndefined();
  });
});
