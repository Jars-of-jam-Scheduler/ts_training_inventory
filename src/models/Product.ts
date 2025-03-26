import { ObjectId } from "mongodb";

export class Product {
    constructor(
        private uuid: string,
        private name: string,
        private price: number,
        private quantity: number,
        private criticalQuantity: number,
        private _id?: ObjectId
    ) {
        this.uuid = uuid;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.criticalQuantity = criticalQuantity;
        this._id = _id;
    }

    setName(newName: string): void {
        this.name = newName;
    }

    setPrice(newPrice: number): void {
        this.price = newPrice;
    }

    setQuantity(newQuantity: number): void {
        this.quantity = newQuantity;
    }

    setCriticalQuantity(newCriticalQuantity: number): void {
        this.criticalQuantity = newCriticalQuantity;
    }

    getUuid(): string {
        return this.uuid;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getCriticalQuantity(): number {
        return this.criticalQuantity;
    }

    getId(): ObjectId | undefined {
        return this._id;
    }
}