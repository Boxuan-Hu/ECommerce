import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExitsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
    // find the item in the cart based on item id
    
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;

      alreadyExitsInCart = (existingCartItem != undefined);
    }

    //check if we found it
    if (alreadyExitsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();

  }
  
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribes will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartitem of this.cartItems) {
      const subTotalPrice = tempCartitem.quantity * tempCartitem.unitPrice;
      console.log(`${tempCartitem.name}`);
    }
    console.log(`total price: ${totalPriceValue.toFixed(2)}`);
    console.log('----')
  }
}
