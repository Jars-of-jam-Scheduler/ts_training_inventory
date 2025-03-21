import { AxiosHeaders, AxiosResponse } from "axios";
import { Product } from "../models/Product";
import { WarehouseService } from "../services/WarehouseService";
import { IWarehouseController } from "./IWarehouseController";
import { AddProductPayload } from "../payloads/AddProductPayload";
import { UpdateProductPayload } from "../payloads/UpdateProductPayload";
import { FindProductPayload } from "../payloads/FindProductPayload";

export class WarehouseController implements IWarehouseController {
    private warehouseService: WarehouseService;

    constructor(warehouseService: WarehouseService) {
        this.warehouseService = warehouseService;
    }

    addProduct(request: AddProductPayload): AxiosResponse<Product> {
        const newProduct = this.warehouseService.addProduct(
            request.name,
            request.price,
            request.quantity
        );

        return {
            data: newProduct,
            status: 201,
            statusText: 'Created',
            headers: {},
            config: {
                headers: new AxiosHeaders()
            }
        };
    }

    updateProduct(request: UpdateProductPayload): AxiosResponse<void> {
        this.warehouseService.updateProduct(request.uuid, request.quantity);

        return {
            data: undefined,
            status: 204,
            statusText: 'No Content',
            headers: {},
            config: {
                headers: new AxiosHeaders()
            }
        };
    }

    getProducts(): AxiosResponse<Array<Product>> {
        const products = this.warehouseService.getProducts();

        return {
            data: products,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: new AxiosHeaders()
            }
        };
    }

    getTotalPrice(): AxiosResponse<number> {
        const totalPrice = this.warehouseService.getTotalPrice();

        return {
            data: totalPrice,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: new AxiosHeaders()
            }
        };
    }

    findProduct(request: FindProductPayload): AxiosResponse<Product | undefined> {
        const product = this.warehouseService.findProduct(request.name);

        return {
            data: product,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: new AxiosHeaders()
            }
        };
    }
}