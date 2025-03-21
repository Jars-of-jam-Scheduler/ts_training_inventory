export class Product {
    private uuid: string;
    private name: string;
    private price: number;
    private quantity: number;

    constructor(uuid: string, name: string, price: number, quantity: number) {
        this.uuid = uuid;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    setId(newUuid: string): void {
        this.uuid = newUuid;
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
}