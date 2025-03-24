import { container } from 'tsyringe';
import { IProductRepository } from '../repositories/IProductRepository';
import { MongoProductRepository } from '../repositories/MongoProductRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { WarehouseService } from '../services/WarehouseService';

const storageMode = process.env.STORAGE_MODE || 'array';

if (storageMode === 'mongo') {
    container.register<IProductRepository>('IProductRepository', {
        useClass: MongoProductRepository,
    });
    console.log('Mode de stockage configuré : MongoDB');
} else {
    container.register<IProductRepository>('IProductRepository', {
        useClass: ProductRepository,
    });
    console.log('Mode de stockage configuré : Array');
}

container.register('WarehouseService', WarehouseService);
