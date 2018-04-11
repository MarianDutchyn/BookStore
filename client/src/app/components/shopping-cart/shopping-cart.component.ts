import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app.const';
import {CartItem} from '../../models/cart-item';
import {Book} from '../../models/book';
import {ShoppingCart} from '../../models/shopping-cart';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private cartItemList: CartItem [] = [];
  private selectedBook: Book;
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private emptyCart: boolean;
  private cartItemUpdated: boolean;
  private notEnoughStock: boolean;


  constructor(private cartService: CartService, private router: Router) { }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/viewBook', this.selectedBook.id]);
  }


  getCartItemList() {
    this.cartService.getCartItemList().subscribe(
      res => {
        this.cartItemList = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  getShoppingCart() {
    this.cartService.getShoppingCart().subscribe(
      res => {
        this.shoppingCart = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
      res => {
        this.getCartItemList();
        this.getShoppingCart();
      },
      error => {
        console.log(error);
      }
    );
  }

  onUpdateCartItem(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem.id, cartItem.quantity).subscribe(
      res => {
        this.cartItemUpdated = true;
        this.getShoppingCart();
      },
      error => {
        this.cartItemUpdated = false;
        console.log(error);
      }
    );
  }


  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
  }

}
