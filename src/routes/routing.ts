import { Request, Response, Router } from 'express';
import { WarehouseController } from '../controllers/WarehouseController';
import { container } from 'tsyringe';
import { matchedData, param, validationResult } from 'express-validator';

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

router.get(
    '/products/:name',
    param('name')
        .trim()
        .isAlpha().withMessage('Product name must be a string.')
        .isLength({ min: 1, max: 255 }).withMessage('Product name must be between 1 and 3 characters.'),
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });

            return;
        }

        const data = matchedData(req);
        const response = await warehouseController.findProductByName({ name: data.name });
        res.status(response.status).json(response.data);
    }
);

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