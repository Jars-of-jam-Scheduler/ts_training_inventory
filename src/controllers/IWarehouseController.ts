import { AxiosResponse } from "axios";
import { Product } from '../models/Product'
import { AddProductPayload } from "../payloads/AddProductPayload";
import { FindProductPayload } from "../payloads/FindProductPayload";
import { UpdateProductPayload } from "../payloads/UpdateProductPayload";

export interface IWarehouseController {
    addProduct(request: AddProductPayload): AxiosResponse<Product>;
    updateProduct(request: UpdateProductPayload): AxiosResponse<void>;
    getProducts(): AxiosResponse<Array<Product>>;
    getTotalPrice(): AxiosResponse<number>;
    findProduct(request: FindProductPayload): AxiosResponse<Product | undefined>;
}