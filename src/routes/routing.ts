import { Request, Response, Router } from 'express';
import { WarehouseController } from '../controllers/WarehouseController';
import { container } from 'tsyringe';

const router = Router();

const warehouseController = container.resolve(WarehouseController);

router.get('/products', async (_req: Request, res: Response) => {
    const response = await warehouseController.getProducts();
    res.status(response.status).json(response.data);
});

router.get('/products/total', async (_req: Request, res: Response) => {
    const response = await warehouseController.getTotalPrice();
    res.status(response.status).json(response.data);
});

router.get('/products/:name', async (req: Request, res: Response) => {
    const response = await warehouseController.findProduct({ name: req.params.name });
    res.status(response.status).json(response.data);
});

router.post('/products', async (req: Request, res: Response) => {
    const response = await warehouseController.addProduct(req.body);
    res.status(response.status).json(response.data);
});

router.put('/products/:uuid', async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const { name, price, quantity, criticalQuantity } = req.body;
    const response = await warehouseController.updateProduct({ uuid, name, price, quantity, criticalQuantity });
    res.status(response.status).send();
});

export default router;