import { Request, Response, Router } from 'express';
import { WarehouseController } from '../controllers/WarehouseController';
import { ProductRepository } from '../repositories/ProductRepository';
import { WarehouseService } from '../services/WarehouseService';

const router = Router();

const productRepository = new ProductRepository();
const warehouseService = new WarehouseService(productRepository);
const warehouseController = new WarehouseController(warehouseService);

router.get('/products', (_req: Request, res: Response) => {
    const response = warehouseController.getProducts();
    res.status(response.status).json(response.data);
});

router.get('/products/total', (_req: Request, res: Response) => {
    const response = warehouseController.getTotalPrice();
    res.status(response.status).json(response.data);
});

router.get('/products/:name', (req: Request, res: Response) => {
    const requestPayload = { name: req.params.name };
    const response = warehouseController.findProduct(requestPayload);
    res.status(response.status).json(response.data);
});

router.post('/products', (req: Request, res: Response) => {
    const payload = req.body;
    const response = warehouseController.addProduct(payload);
    res.status(response.status).json(response.data);
});

router.put('/products/:uuid', (req: Request, res: Response) => {
    const payload = { uuid: req.params.uuid, quantity: req.body.quantity };
    const response = warehouseController.updateProduct(payload);
    res.status(response.status).send();
});

export default router;