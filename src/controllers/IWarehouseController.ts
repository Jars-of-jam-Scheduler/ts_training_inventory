import { AxiosResponse } from "axios";
import { Product } from '../models/Product'
import { AddProductPayload } from "../payloads/AddProductPayload";
import { FindProductByNamePayload } from "../payloads/FindProductByNamePayload";
import { UpdateProductPayload } from "../payloads/UpdateProductPayload";

export interface IWarehouseController {
    addProduct(request: AddProductPayload): Promise<AxiosResponse<Product>>;
    updateProduct(request: UpdateProductPayload): Promise<AxiosResponse<Product | undefined>>;
    getProducts(): Promise<AxiosResponse<Array<Product>>>;
    getTotalPrice(): Promise<AxiosResponse<number>>;
    findProductByName(request: FindProductByNamePayload): Promise<AxiosResponse<Product | undefined>>;
}