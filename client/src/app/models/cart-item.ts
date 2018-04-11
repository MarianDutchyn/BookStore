import {ShoppingCart} from './shopping-cart';
import {Book} from './book';

export class CartItem {
  public id: number;
  public quantity: number;
  public subtotal: number;
  public book: Book;
  public shoppingCart: ShoppingCart
  public toUpdate: boolean;
}
