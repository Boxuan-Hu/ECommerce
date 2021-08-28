import { Product } from "./product";

export class CartItem {

    id: string;
    name: string;
    imgaeUrl: string;
    unitPrice: number;

    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imgaeUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }

}
