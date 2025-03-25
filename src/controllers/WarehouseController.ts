import { AxiosHeaders, AxiosResponse } from "axios";
import { Product } from "../models/Product";
import { WarehouseService } from "../services/WarehouseService";
import { IWarehouseController } from "./IWarehouseController";
import { AddProductPayload } from "../payloads/AddProductPayload";
import { UpdateProductPayload } from "../payloads/UpdateProductPayload";
import { FindProductPayload } from "../payloads/FindProductPayload";
import { injectable } from "tsyringe";

@injectable()
export class WarehouseController implements IWarehouseController {
    private warehouseService: WarehouseService;

    constructor(warehouseService: WarehouseService) {
        this.warehouseService = warehouseService;
    }

    async addProduct(request: AddProductPayload): Promise<AxiosResponse<Product>> {
        const newProduct = await this.warehouseService.addProduct(
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

    async updateProduct(request: UpdateProductPayload): Promise<AxiosResponse<Product | undefined>> {
        const updatedProduct = await this.warehouseService.updateProduct(
            request.uuid,
            request.name,
            request.price,
            request.quantity,
            request.criticalQuantity
        );

        if (updatedProduct) {
            return {
                data: updatedProduct,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {
                    headers: new AxiosHeaders()
                }
            };
        } else {
            return {
                data: undefined,
                status: 404,
                statusText: 'Not Found',
                headers: {},
                config: {
                    headers: new AxiosHeaders()
                }
            };
        }
    }

    async getProducts(): Promise<AxiosResponse<Array<Product>>> {
        const products = await this.warehouseService.getProducts();

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

    async getTotalPrice(): Promise<AxiosResponse<number>> {
        const totalPrice = await this.warehouseService.getTotalPrice();

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

    async findProduct(request: FindProductPayload): Promise<AxiosResponse<Product | undefined>> {
        const product = await this.warehouseService.findProduct(request.name);

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